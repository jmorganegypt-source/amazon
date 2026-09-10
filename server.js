require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// In-memory store (swap for Postgres/Supabase in production)
const orders = new Map();
const catalog = JSON.parse(fs.readFileSync(path.join(__dirname, 'amazon-catalog.json'), 'utf8'));

// ---------- Helpers ----------
const USE_MOCK = process.env.USE_MOCK === 'true';
const now = () => new Date().toISOString();

function findItem(sku) {
  return catalog.items.find(i => i.sku === sku);
}

// ---------- REAL Amazon MCF call (commented until SP-API approved) ----------
// async function createMCFOrder(order) {
//   // 1. Get access token via refresh token (LWA)
//   // 2. POST /fba/outbound/2020-07-01/fulfillmentOrders
//   //    body: { sellerFulfillmentOrderId, displayableOrderId, displayableOrderDate,
//   //            displayableOrderComment, shippingSpeedCategory, destinationAddress,
//   //            items: [{ sellerSku, quantity }] }
//   // 3. Amazon picks, packs, ships direct to customer. Tracking via
//   //    GET /fba/outbound/2020-07-01/fulfillmentOrders/{sellerFulfillmentOrderId}
// }

// ---------- MOCK MCF (runs today, no credentials needed) ----------
async function createMCFOrderMock(order) {
  await new Promise(r => setTimeout(r, 400)); // simulate API latency
  return {
    amazonOrderId: 'AMZ-MOCK-' + crypto.randomBytes(4).toString('hex').toUpperCase(),
    status: 'RECEIVED', // PLANNING -> RECEIVED -> SHIPPED -> DELIVERED
    trackingNumber: 'MCFAU' + Math.floor(1e9 + Math.random() * 9e9),
    carrier: 'Amazon Logistics',
    etaDays: 3
  };
}

// ---------- ROUTES ----------

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true, mode: USE_MOCK ? 'MOCK (set USE_MOCK=false + SP-API keys for live Amazon)' : 'LIVE', time: now() });
});

// Catalog — the top 100 items, Amazon-shippable flag
app.get('/api/catalog', (req, res) => {
  // Front-end reads this to render badges: Amazon items show Cash+Crypto only
  res.json({ count: catalog.items.length, items: catalog.items, rules: { amazonItems: 'cash_crypto_only' } });
});

// CREATE ORDER — MissingCash checkout hits this AFTER payment confirmed
// (crypto: only after on-chain confirmation. cash/trade: after both confirm)
app.post('/api/order', async (req, res) => {
  const { sku, qty, buyer, payment } = req.body;
  const item = findItem(sku);
  if (!item) return res.status(404).json({ error: 'Unknown SKU' });

  // --- Payment method validation (checkout menu: card / PayPal / crypto / swap) ---
  const method = ((payment && payment.method) || '').toUpperCase();
  const ALLOWED = ['CARD', 'CREDITCARD', 'PAYPAL', 'CRYPTO', 'CASH', 'TRADE', 'SWAP'];
  if (!ALLOWED.includes(method)) {
    return res.status(400).json({ error: 'Unknown payment method. Choose: credit card, PayPal, crypto' + (item.accepts && item.accepts.swap ? ', or swap' : '.') });
  }
  // Per-item rule: what THIS listing accepts
  const accepts = item.accepts || {};
  const ok =
    (method === 'CARD' || method === 'CREDITCARD') ? accepts.creditcard !== false :
    method === 'PAYPAL'  ? accepts.paypal === true :
    method === 'CRYPTO'  ? accepts.crypto === true :
    method === 'CASH'    ? accepts.cash !== false :
    (method === 'TRADE' || method === 'SWAP') ? accepts.swap === true : false;

  if (!ok) {
    const opts = [accepts.creditcard !== false && 'credit card', accepts.paypal && 'PayPal', accepts.crypto && 'crypto', accepts.swap && 'swap'].filter(Boolean).join(', ');
    return res.status(400).json({ error: 'This listing does not accept ' + method.toLowerCase() + '. Accepted here: ' + opts });
  }
  // Swap can never trigger Amazon MCF (ships only after confirmed payment)
  if ((method === 'TRADE' || method === 'SWAP') && item.shipsVia === 'Amazon MCF') {
    return res.status(400).json({ error: 'Store items ship via Amazon and require confirmed payment (card/PayPal/crypto). Swaps are for user meet-up listings.' });
  }

  if (item.stock < qty) return res.status(400).json({ error: 'Insufficient stock', stock: item.stock });

  // --- Payment gate: NEVER create Amazon shipment before confirmed funds ---
  const PAYMENT_CONFIRMED = payment && payment.status === 'CONFIRMED';
  if (!PAYMENT_CONFIRMED) {
    return res.status(402).json({ error: 'Payment not confirmed. No shipment created. (Crypto: wait for on-chain confirmation.)' });
  }

  const order = {
    id: 'MC-' + crypto.randomBytes(5).toString('hex').toUpperCase(),
    sku, qty, buyer, payment: payment.method,
    address: buyer.address,
    createdAt: now()
  };

  const mcf = USE_MOCK ? await createMCFOrderMock(order) : null; // : await createMCFOrder(order)
  order.fulfillment = mcf;
  order.status = 'SHIPPED_TO_AMAZON';
  item.stock -= qty;
  orders.set(order.id, order);

  console.log(`[${order.id}] ${qty}x ${item.title} -> Amazon MCF (${mcf.amazonOrderId}) -> ships to ${buyer.address.suburb}`);
  res.status(201).json({ order });
});

// TRACKING — poll this from the buyer's order page
app.get('/api/track/:orderId', (req, res) => {
  const order = orders.get(req.params.orderId);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  const elapsed = Date.now() - new Date(order.createdAt).getTime();
  const days = Math.floor(elapsed / 86400000);
  const status = days >= 4 ? 'DELIVERED' : days >= 1 ? 'SHIPPED' : 'RECEIVED_BY_AMAZON';
  res.json({
    orderId: order.id,
    status,
    carrier: order.fulfillment.carrier,
    trackingNumber: order.fulfillment.trackingNumber,
    message: status === 'DELIVERED' ? 'Delivered. Confirm to earn trust points!' : 'In transit via Amazon Logistics'
  });
});

// CONFIRM DELIVERY — both sides confirm -> trust score up
app.post('/api/confirm/:orderId', (req, res) => {
  const order = orders.get(req.params.orderId);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  order.status = 'COMPLETED';
  order.completedAt = now();
  res.json({ ok: true, trustNote: '+1 completed trade recorded for both profiles' });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`MissingCash backend running on :${process.env.PORT || 3000} [${USE_MOCK ? 'MOCK MCF' : 'LIVE MCF'}]`);
});
