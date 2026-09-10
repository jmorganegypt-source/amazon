MISSINGCASH BACKEND + AMAZON MCF (Direct Shipment)
===================================================

WHAT THIS IS
  MissingCash order API. When a buyer pays (cash/crypto/trade confirmed),
  this backend creates a Fulfillment Order in YOUR Amazon Seller account
  and Amazon ships the item DIRECT to the customer. You never touch stock.

SETUP (runs in mock mode today - no credentials needed)
  1. npm install
  2. npm start
  3. Test:  curl localhost:3000/api/health

TRY THE FLOW
  curl -X POST localhost:3000/api/order -H "Content-Type: application/json" -d '{
    "sku":"MC-PS5-003","qty":1,
    "buyer":{"name":"Test Buyer","address":{"suburb":"Reservoir VIC","postcode":"3073"}},
    "payment":{"method":"USDT","status":"CONFIRMED"}
  }'
  -> returns order with Amazon tracking. Then:
  curl localhost:3000/api/track/<orderId>

GOING LIVE (Path B - real Amazon direct shipment)
  1. Create Amazon Seller account (Professional, ~AU$49.95/mo) - sellercentral.amazon.com.au
  2. Send inventory to an Amazon FBA warehouse (your wholesale stock,
     or stock supplied by your ABN-verified business sellers)
  3. Apply for SP-API access at developer.amazonservices.com.au
  4. Fill in .env, set USE_MOCK=false
  5. Uncomment createMCFOrder() in server.js (uses Selling Partner API:
     POST /fba/outbound/2020-07-01/fulfillmentOrders)

CRYPTO SAFETY (already enforced in code)
  - /api/order REFUSES to create a shipment unless payment.status === 'CONFIRMED'
  - Never flip that check to trust a buyer's word. On-chain confirmation only.
  - Amazon gets the address AFTER payment clears - never before.

PATH A (affiliate) - if you want revenue THIS WEEK instead:
  Sign up to Amazon Associates (affiliate-program.amazon.com.au), list the
  top-100 items on MissingCash with "Buy on Amazon" buttons, earn 1-10%.
  No shipment, no stock, no SP-API. Trade-off: checkout leaves your site.

NEXT STEPS
  - Swap the in-memory order store for Supabase/Postgres
  - Add webhook: Amazon -> your DB on SHIPPED/DELIVERED events
  - Wire the MissingCash front-end "Buy" button to POST /api/order

PAYMENT RULE (ENFORCED IN CODE)
  Checkout menu for buyers: CREDIT CARD | PAYPAL | CRYPTO  (+ SWAP if the
  listing allows it).

  Store owner items (these, shipsVia Amazon MCF):
    -> credit card / PayPal / crypto. Swap returns HTTP 400.
       Amazon ships only after confirmed payment, so a swap can never
       trigger fulfillment. These are YOUR items, sold under your
       "MissingCash Store" seller profile.

  Regular user listings (peer-to-peer, front-end marketplace):
    -> seller picks what they accept: card / PayPal / crypto / swap.
       Swap = in-person meet, both confirm, trust score goes up.

  The API validates payment.method against the item's own accepts flags -
  a buyer can never force a method the seller didn't offer.
