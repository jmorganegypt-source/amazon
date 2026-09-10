
/* ============ MissingCash v2 — marketplace + store checkout ============ */
const LS = 'missingcash_v2';
const LS_ORDERS = 'missingcash_orders_v2';

/* ---------- Seed data ---------- */
function seed(){
  return {
    users: [
      {id:'store', name:'MissingCash Store', business:true, official:true, completed:132, rating:4.9, since:'Jun 2024',
       bio:'Official store. Stock held in Amazon warehouses — orders ship direct via Amazon MCF with tracking. ABN verified.'},
      {id:'u1', name:'Dave Morrow', business:false, completed:47, rating:4.8, since:'Mar 2024',
       bio:'Trading cars, boats & bikes around Melbourne for years. Fair deals only.'},
      {id:'u2', name:'Sarah Kwan', business:false, completed:9, rating:4.4, since:'Jan 2026',
       bio:'Decluttering the garage. Everything must go!'},
      {id:'u3', name:'Tom Reid', business:false, completed:1, rating:4.0, since:'Aug 2026',
       bio:'New to trading. Be kind!'},
      {id:'u4', name:'TileMax Clearance', business:true, completed:132, rating:4.9, since:'Jun 2024',
       bio:'End-of-line tiles & building materials. Bulk lots. ABN verified. Pickup Campbellfield VIC.'},
      {id:'u5', name:'Nikki Tran', business:false, completed:21, rating:4.6, since:'Oct 2025',
       bio:'Fishing gear, vouchers, festival tickets. Cash or USDT.'},
    ],
    listings: [
      /* ---- STORE ITEMS: ship via Amazon MCF, card/PayPal/crypto only ---- */
      {id:'s1', seller:'store', emoji:'🎮', title:'PS5 Disc Console Bundle (new, sealed)', price:749, stock:25,
       desc:'Brand new PS5 disc edition with 2 DualSense controllers. Sealed in box, ships from Amazon warehouse with tracking.',
       accepts:{creditcard:true, paypal:true, crypto:true, cash:false, swap:false}, cryptoTypes:['BTC','USDT'],
       shipsVia:'Amazon MCF', eta:'2–4 days', suburb:'Ships Australia-wide', when:'just now'},
      {id:'s2', seller:'store', emoji:'🛠️', title:'Milwaukee M18 8pc Tool Kit (new)', price:899, stock:40,
       desc:'M18 FUEL brushless 8-piece kit, brand new sealed. Tradie-grade. Ships direct from Amazon warehouse.',
       accepts:{creditcard:true, paypal:true, crypto:true, cash:false, swap:false}, cryptoTypes:['BTC','USDT'],
       shipsVia:'Amazon MCF', eta:'2–4 days', suburb:'Ships Australia-wide', when:'just now'},
      {id:'s3', seller:'store', emoji:'🌀', title:'Dyson V15 Detect (new)', price:949, stock:15,
       desc:'Latest Dyson V15 with laser dust detection. New, full warranty, ships direct.',
       accepts:{creditcard:true, paypal:true, crypto:true, cash:false, swap:false}, cryptoTypes:['BTC','ETH'],
       shipsVia:'Amazon MCF', eta:'2–4 days', suburb:'Ships Australia-wide', when:'just now'},
      {id:'s4', seller:'store', emoji:'☕', title:'Breville Barista Express (new)', price:699, stock:20,
       desc:'The cult espresso machine. New in box, ships direct with tracking.',
       accepts:{creditcard:true, paypal:true, crypto:true, cash:false, swap:false}, cryptoTypes:['USDT'],
       shipsVia:'Amazon MCF', eta:'2–4 days', suburb:'Ships Australia-wide', when:'just now'},
      {id:'s5', seller:'store', emoji:'🧱', title:'LEGO Retired Collector Set (new)', price:349, stock:12,
       desc:'Retired LEGO set — appreciates like shares. New, sealed. Ships direct.',
       accepts:{creditcard:true, paypal:true, crypto:true, cash:false, swap:false}, cryptoTypes:['BTC','USDT','ETH'],
       shipsVia:'Amazon MCF', eta:'2–4 days', suburb:'Ships Australia-wide', when:'just now'},
      {id:'s6', seller:'store', emoji:'⛺', title:'4-Person Camping Tent Kit (new)', price:299, stock:30,
       desc:'4-person dome tent + tarp + pegs kit. New, ships direct before the season rush.',
       accepts:{creditcard:true, paypal:true, crypto:true, cash:false, swap:false}, cryptoTypes:['USDT'],
       shipsVia:'Amazon MCF', eta:'2–4 days', suburb:'Ships Australia-wide', when:'just now'},

      /* ---- USER ITEMS: peer-to-peer, swap allowed ---- */
      {id:'l1', seller:'u1', emoji:'🚗', title:'1984 VK Commodore Limited Edition', price:15000,
       desc:'Genuine VK LE, 79,000 kms, original books, reg until 2027. Straight body, small paint fade on boot. Serious buyers only.',
       accepts:{creditcard:true, paypal:true, crypto:true, cash:true, swap:true}, cryptoTypes:['BTC','USDT'],
       tradeWants:['Jet ski','Boat','Project car + cash'], suburb:'Reservoir VIC', when:'2 hrs ago'},
      {id:'l2', seller:'u2', emoji:'🌊', title:'Sea-Doo GTI 130 Jet Ski', price:8500,
       desc:'2019 model, 62hrs, always serviced, trailer included. Selling because kids lost interest (sadly).',
       accepts:{creditcard:false, paypal:false, crypto:false, cash:true, swap:true}, cryptoTypes:[],
       tradeWants:['4x4 ute','Caravan','$ + dirt bikes'], suburb:'Frankston VIC', when:'5 hrs ago'},
      {id:'l3', seller:'u5', emoji:'🧾', title:'$200 Bunnings Gift Voucher', price:150,
       desc:'Received as a gift, no Bunnings near me. $150 firm (25% off). Will verify balance in store with you.',
       accepts:{creditcard:false, paypal:true, crypto:true, cash:true, swap:false}, cryptoTypes:['USDT'],
       suburb:'Coburg VIC', when:'8 hrs ago'},
      {id:'l5', seller:'u2', emoji:'🚵', title:'Giant Trance Mountain Bike (M)', price:900,
       desc:'2023, ridden 5 times, upgraded dropper post. RRP $2,400. No lowballs, you know what this is.',
       accepts:{creditcard:false, paypal:false, crypto:false, cash:true, swap:true}, cryptoTypes:[],
       tradeWants:['E-bike','PS5 + cash','Gym setup'], suburb:'Frankston VIC', when:'1 day ago'},
      {id:'l6', seller:'u3', emoji:'🎮', title:'Used PS5 Disc Edition + 6 games', price:650,
       desc:'Bought last year, barely used. 2 controllers. Games: Spider-Man 2, FC26, more.',
       accepts:{creditcard:false, paypal:true, crypto:true, cash:true, swap:true}, cryptoTypes:['USDT'],
       tradeWants:['Xbox Series X + cash','Drone'], suburb:'Werribee VIC', when:'2 days ago'},
      {id:'l7', seller:'u4', emoji:'📦', title:'BULK: 40 boxes Italian porcelain tiles 600x600', price:1800,
       desc:'End-of-line stock. RRP $65/box — grab all 40 boxes for $1,800. Trade counter or trades welcome.',
       accepts:{creditcard:true, paypal:true, crypto:true, cash:true, swap:true}, cryptoTypes:['BTC','USDT','ETH'],
       tradeWants:['Tools','Toyota Hiace','Forklift'], suburb:'Campbellfield VIC', when:'1 day ago'},
    ],
    wanted: [
      {id:'w1', user:'u3', title:'VK Commodore Limited Edition', offer:'Cash up to $14k, or swap + cash',
       desc:'Chasing my first VK LE. Any colour, must be running and registered. Happy to trade my jet ski + cash your way.'},
      {id:'w2', user:'u1', title:'Ride-on mower (working condition)', offer:'Swap my box trailer, or cash',
       desc:'Need a mower for the new block. Diesel preferred.'},
      {id:'w3', user:'u5', title:'Unwanted gift vouchers — any store', offer:'Pay 70–80% of face value, PayPal or USDT',
       desc:'Vouchers you will never use? I\'ll buy them. Must verify balance together in store or on the phone.'},
    ]
  };
}

/* ---------- Store ---------- */
let DB;
try { DB = JSON.parse(localStorage.getItem(LS)) || seed(); } catch(e){ DB = seed(); }
let ORDERS;
try { ORDERS = JSON.parse(localStorage.getItem(LS_ORDERS)) || []; } catch(e){ ORDERS = []; }
const LS_OFFERS = 'missingcash_offers_v2';
let OFFERS;
try { OFFERS = JSON.parse(localStorage.getItem(LS_OFFERS)) || seedOffers(); } catch(e){ OFFERS = seedOffers(); }
function seedOffers(){ return [
  {id:'OF-DEMO1', listingId:'l1', title:'1984 VK Commodore Limited Edition', emoji:'🚗',
   offer:'2019 Sea-Doo GTI + $6,500 your way', topup:6500, from:'Sarah Kwan', status:'PENDING', createdAt:new Date().toISOString()}
]; }
function save(){ localStorage.setItem(LS, JSON.stringify(DB)); localStorage.setItem(LS_ORDERS, JSON.stringify(ORDERS)); localStorage.setItem(LS_OFFERS, JSON.stringify(OFFERS)); }
save();

/* ---------- Helpers ---------- */
function trustOf(u){
  const score = u.completed * 1.5 + u.rating * 4;
  const level = score < 30 ? 'weak' : score < 80 ? 'average' : 'strong';
  const label = level === 'weak' ? 'WEAK' : level === 'average' ? 'AVERAGE' : 'STRONG';
  return {level, label};
}
const user = id => DB.users.find(u => u.id === id);
const listing = id => DB.listings.find(l => l.id === id);
const isStore = l => l.shipsVia === 'Amazon MCF';
function esc(s){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

/* ---------- Badges ---------- */
function payBadges(l){
  const a = l.accepts; let b = '';
  if(a.creditcard) b += '<span class="badge card">💳 Card</span>';
  if(a.paypal) b += '<span class="badge paypal">🅿️ PayPal</span>';
  if(a.crypto) b += '<span class="badge crypto">🪙 ' + esc(l.cryptoTypes.join(' · ')) + '</span>';
  if(a.cash) b += '<span class="badge cash">💵 Cash</span>';
  if(a.swap) b += '<span class="badge trade">🔁 Swap</span>';
  return b;
}
function storeRibbon(){
  return '<div class="store-ribbon">🏪 Ships via Amazon · tracked delivery</div>';
}

/* ---------- Router ---------- */
const app = document.getElementById('app');
window.addEventListener('hashchange', route);

function route(){
  const h = location.hash.slice(1) || '/';
  document.querySelectorAll('[data-nav]').forEach(a => a.classList.remove('active'));
  const key = h.split('/')[1] || 'home';
  const navEl = document.querySelector('[data-nav="' + key + '"]'); if(navEl) navEl.classList.add('active');
  window.scrollTo(0,0);
  if(h.startsWith('/listing/')) return renderListing(h.split('/')[2]);
  if(h.startsWith('/profile/')) return renderProfile(h.split('/')[2]);
  if(h.startsWith('/checkout/')) return renderCheckout(h.split('/')[2]);
  if(h.startsWith('/success/')) return renderSuccess(h.split('/')[2]);
  if(h.startsWith('/orders')) return renderOrders();
  if(h.startsWith('/dashboard')) return renderDashboard();
  if(h === '/browse') return renderBrowse();
  if(h === '/wanted') return renderWanted();
  if(h === '/post') return renderPost();
  if(h === '/how') return renderHow();
  return renderHome();
}

/* ---------- Views ---------- */
function listingCard(l){
  const u = user(l.seller), t = trustOf(u);
  return `<div class="card">
    <a href="#/listing/${l.id}"><div class="thumb">${l.emoji}${isStore(l)?'<span class="thumb-tag">🏪 AMAZON SHIPPED</span>':''}</div></a>
    <div class="body">
      <h3><a href="#/listing/${l.id}">${esc(l.title)}</a></h3>
      <div class="price">$${l.price.toLocaleString('en-AU')}</div>
      <div class="badges">${payBadges(l)}</div>
      ${l.accepts.swap && l.tradeWants ? '<div class="wants">🔁 Swap for: ' + l.tradeWants.map(esc).join(' / ') + '</div>' : ''}
      <div class="seller-line">
        <span><a href="#/profile/${u.id}">${esc(u.name)}</a>${u.official?' 🏪':u.business?' <span class="biz">· ABN ✓</span>':''}</span>
        <span class="trust ${t.level}">${t.label}</span>
      </div>
    </div>
  </div>`;
}

function renderHome(){
  const store = DB.listings.filter(isStore);
  const peer = DB.listings.filter(l => !isStore(l));
  app.innerHTML = `
  <div class="hero"><div class="container">
    <h1>That thing in your garage is <span class="hl">missing cash.</span></h1>
    <p>Australia's trade-first marketplace. Sell it, swap it, or take <b>card, PayPal or crypto</b> for it — plus the official 🏪 MissingCash Store ships straight to your door.</p>
    <div class="actions">
      <a class="btn gold" href="#/post">+ Post an Item — Free</a>
      <a class="btn ghost" style="background:transparent;color:#fff;border-color:#ffffff88" href="#/browse">Browse ${DB.listings.length} listings</a>
      <a class="btn ghost" style="background:transparent;color:#fff;border-color:#ffffff88" href="#/orders">📦 My orders</a>
    </div>
    <div class="stats">
      <div class="stat"><b>${store.length}</b><span>🏪 store items, Amazon-shipped</span></div>
      <div class="stat"><b>${peer.length}</b><span>peer listings with swaps</span></div>
      <div class="stat"><b>${DB.wanted.length}</b><span>wanted ads</span></div>
      <div class="stat"><b>$0</b><span>listing fees</span></div>
    </div>
  </div></div>

  <section><div class="container">
    <div class="section-head"><h2>🏪 MissingCash Store — ships via Amazon</h2><span style="font-size:13px;color:var(--muted)">Card · PayPal · crypto accepted</span></div>
    <div class="grid">${store.map(listingCard).join('')}</div>
  </div></section>

  <section style="padding-top:0"><div class="container">
    <div class="section-head"><h2>🔥 Peer listings — swaps welcome</h2><a href="#/browse">See all →</a></div>
    <div class="grid">${peer.slice(0,3).map(listingCard).join('')}</div>
  </div></section>

  <section style="padding-top:0"><div class="container">
    <div class="section-head"><h2>📣 Wanted ads</h2><a href="#/wanted">See all →</a></div>
    <div class="wanted-grid">${DB.wanted.map(wantedCard).join('')}</div>
  </div></section>`;
}

function wantedCard(w){
  const u = user(w.user), t = trustOf(u);
  return `<div class="wanted-card">
    <h3>🔎 ${esc(w.title)}</h3>
    <div class="offer">Offering: ${esc(w.offer)}</div>
    <p>${esc(w.desc)}</p>
    <div class="seller-line" style="margin-top:10px">
      <span><a href="#/profile/${u.id}">${esc(u.name)}</a></span>
      <span class="trust ${t.level}">${t.label}</span>
    </div>
  </div>`;
}

function renderBrowse(){
  app.innerHTML = `<section><div class="container">
    <div class="section-head"><h2>Browse items</h2>
      <div class="filters">
        <button class="chip active" onclick="renderBrowse()">All</button>
        <button class="chip" onclick="renderBrowse('store')">🏪 Store (Amazon-shipped)</button>
        <button class="chip" onclick="renderBrowse('swap')">🔁 Swap accepted</button>
        <button class="chip" onclick="renderBrowse('crypto')">🪙 Crypto accepted</button>
        <button class="chip" onclick="renderBrowse('business')">💼 Business</button>
      </div>
    </div>
    <div class="grid" id="browseGrid"></div>
  </div></section>`;
  window._browseFilter = null;
  applyBrowse();
}
function renderBrowseFiltered(f){ window._browseFilter = f;
  document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
  applyBrowse();
}
function applyBrowse(){
  const f = window._browseFilter;
  let items = DB.listings;
  if(f==='store') items = items.filter(isStore);
  if(f==='swap') items = items.filter(l=>l.accepts.swap);
  if(f==='crypto') items = items.filter(l=>l.accepts.crypto);
  if(f==='business') items = items.filter(l=>user(l.seller).business);
  document.getElementById('browseGrid').innerHTML = items.length ? items.map(listingCard).join('') : '<p>No listings here yet — <a href="#/post">post one</a>.</p>';
}

function renderWanted(){
  app.innerHTML = `<section><div class="container">
    <div class="section-head"><h2>📣 Wanted ads</h2>
    <button class="btn sm" onclick="toast('Wanted-ad posting opens with accounts. Email ads@missingcash.com.au')">+ Post a wanted ad</button></div>
    <div class="wanted-grid">${DB.wanted.map(wantedCard).join('')}</div>
  </div></section>`;
}

function renderListing(id){
  const l = listing(id);
  if(!l) return renderBrowse();
  const u = user(l.seller), t = trustOf(u);
  const opts = [l.accepts.creditcard&&'💳 card', l.accepts.paypal&&'🅿️ PayPal', l.accepts.crypto&&'🪙 crypto', l.accepts.cash&&'💵 cash', l.accepts.swap&&'🔁 swap'].filter(Boolean).join(' · ');
  app.innerHTML = `<section><div class="container">
    <a href="#/browse">← Back to browse</a>
    <div class="detail" style="margin-top:14px">
      <div>
        <div class="detail-hero">${l.emoji}</div>
        <div class="panel" style="margin-top:16px">
          <h2 style="margin-bottom:8px">${esc(l.title)}</h2>
          ${isStore(l) ? storeRibbon() : ''}
          <div class="badges" style="margin:10px 0">${payBadges(l)}</div>
          <p style="color:var(--muted)">${esc(l.desc)}</p>
          ${l.accepts.swap && l.tradeWants ? `<p style="margin-top:12px"><b>Happy to swap for:</b> ${l.tradeWants.map(esc).join(' · ')}</p>`:''}
          <p style="margin-top:12px;font-size:13.5px;color:var(--muted)">📍 ${esc(l.suburb)}${l.eta?` · 🚚 ${esc(l.eta)}`:''} · Posted ${esc(l.when)}${l.stock?` · ${l.stock} in stock`:''}</p>
          <p style="margin-top:8px;font-size:13px;color:var(--green-dark)"><b>Accepts:</b> ${opts}</p>
        </div>
      </div>
      <div>
        <div class="panel">
          <div class="price" style="font-size:30px;font-weight:800;color:var(--green-dark)">$${l.price.toLocaleString('en-AU')}</div>
          <p style="font-size:13px;color:var(--muted);margin:4px 0 16px">${isStore(l)?'New stock · ships via Amazon':'or make a swap offer'}</p>
          <a class="btn" style="width:100%;justify-content:center;display:flex" href="#/checkout/${l.id}">🛒 Buy / Swap now</a>
          <button class="btn ghost" style="width:100%;justify-content:center;margin-top:8px" onclick="toast('Saved to your watchlist (demo)')">⭐ Watch</button>
          <button class="btn ghost" style="width:100%;justify-content:center;margin-top:8px" onclick="toast('Listing reported. Reviewed within 24hrs (demo)')">🚩 Report</button>
        </div>
        <div class="panel" style="margin-top:16px">
          <div class="seller-box">
            <div class="avatar">${u.official?'🏪':esc(u.name[0])}</div>
            <div>
              <a href="#/profile/${u.id}"><b>${esc(u.name)}</b></a>${u.business&&!u.official?' <span class="biz">· ABN ✓</span>':''}<br>
              <span class="trust ${t.level}">${t.label}</span>
              <span style="font-size:12.5px;color:var(--muted)"> · ${u.completed} trades · ⭐ ${u.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div></section>`;
}

/* ---------- CHECKOUT ---------- */
let checkoutState = {};
function renderCheckout(id){
  const l = listing(id);
  if(!l) return renderBrowse();
  checkoutState = {id, method:null};
  const u = user(l.seller);
  const methods = [];
  if(l.accepts.creditcard) methods.push(['CARD','💳','Credit / debit card','Visa · Mastercard · Amex','card']);
  if(l.accepts.paypal) methods.push(['PAYPAL','🅿️','PayPal','Buyer protection included','paypal']);
  if(l.accepts.crypto) methods.push(['CRYPTO','🪙','Crypto',''+l.cryptoTypes.join(' · '),'crypto']);
  if(l.accepts.cash && !isStore(l)) methods.push(['CASH','💵','Cash on pickup','Meet in person','cash']);
  if(l.accepts.swap) methods.push(['SWAP','🔁','Swap offer','Offer something from their wishlist','swap']);

  app.innerHTML = `<section><div class="container">
    <a href="#/listing/${l.id}">← Back to listing</a>
    <div class="checkout" style="margin-top:14px">
      <div class="panel">
        <h2 style="margin-bottom:4px">Checkout</h2>
        <div class="co-item">
          <div class="co-emoji">${l.emoji}</div>
          <div>
            <b>${esc(l.title)}</b><br>
            <span style="font-size:13px;color:var(--muted)">Seller: ${esc(u.name)}${isStore(l)?' · 🏪 ships via Amazon':''}</span>
          </div>
          <div class="co-price">$${l.price.toLocaleString('en-AU')}</div>
        </div>
        ${isStore(l)?'<div class="warn-box">🏪 <b>Store item:</b> ships direct from Amazon warehouse with tracking (2–4 days). Payment is confirmed before dispatch — swaps are not available on store items.</div>':''}

        <h3 style="margin:18px 0 10px;font-size:15px">Choose how you pay</h3>
        <div class="pay-opts">
          ${methods.map(m=>`
          <div class="pay-opt" id="pm-${m[0]}" onclick="pickMethod('${m[0]}')">
            <div class="pay-ico">${m[1]}</div>
            <div class="pay-txt"><b>${m[2]}</b><span>${m[3]}</span></div>
            <div class="pay-radio"></div>
          </div>`).join('')}
        </div>

        <div id="payDetail"></div>

        <div id="placeRow" style="display:none;margin-top:18px">
          <button class="btn" id="placeBtn" style="width:100%;justify-content:center" onclick="placeOrder()">✅ Confirm</button>
          <p class="hint" style="text-align:center">By confirming you agree to inspect items on pickup and confirm delivery to earn trust points.</p>
        </div>
      </div>
      <div class="panel" style="height:fit-content">
        <h3 style="font-size:15px;margin-bottom:12px">Order summary</h3>
        <div class="sumrow"><span>${esc(l.title)}</span><b>$${l.price.toLocaleString('en-AU')}</b></div>
        <div class="sumrow"><span>Delivery</span><b>${isStore(l)?'$0 (included)':'Pickup'}</b></div>
        <div class="sumrow total"><span>Total</span><b id="coTotal">$${l.price.toLocaleString('en-AU')}</b></div>
        <p style="font-size:12.5px;color:var(--muted);margin-top:10px">🔒 The seller only receives your delivery address after your payment is confirmed.</p>
      </div>
    </div>
  </div></section>`;
}

function pickMethod(m){
  checkoutState.method = m;
  const l = listing(checkoutState.id);
  document.querySelectorAll('.pay-opt').forEach(p=>p.classList.remove('sel'));
  document.getElementById('pm-'+m).classList.add('sel');
  const d = document.getElementById('payDetail');
  document.getElementById('placeRow').style.display = 'block';

  if(m === 'CRYPTO'){
    d.innerHTML = `<div class="warn-box">🪙 <b>Crypto safety:</b> your order is sent to the seller for dispatch <b>only after</b> your transaction is confirmed on-chain (${esc(l.cryptoTypes.join(' · '))}). A screenshot of a "payment" is not a payment — wait for on-chain confirmation.</div>
    <label>Which coin?</label><select id="coCoin">${l.cryptoTypes.map(c=>`<option>${c}</option>`).join('')}</select>
    <label>Your wallet address (for refund if deal falls through)</label><input type="text" id="coWallet" placeholder="bc1q... / TQ...">`;
  } else if(m === 'CARD'){
    d.innerHTML = `<label>Card number</label><input type="text" id="coCard" placeholder="4242 4242 4242 4242 (demo — no real charge)">
    <div style="display:flex;gap:10px"><div style="flex:1"><label>Expiry</label><input type="text" placeholder="MM/YY"></div>
    <div style="flex:1"><label>CVC</label><input type="text" placeholder="123"></div></div>
    <p class="hint">Live mode: processed by Stripe — card details never touch our servers.</p>`;
  } else if(m === 'PAYPAL'){
    d.innerHTML = `<div class="warn-box" style="background:#eef6ff;border-color:#bfdcff;color:#0b4d8f">🅿️ You'll be redirected to PayPal to approve the payment, then returned here to confirm dispatch.</div>`;
  } else if(m === 'CASH'){
    d.innerHTML = `<label>Pickup arrangement</label><input type="text" id="coPickup" placeholder="e.g. This weekend, Reservoir VIC station">`;
  } else if(m === 'SWAP'){
    d.innerHTML = `<label>What are you offering? (seller wants: ${l.tradeWants.map(esc).join(' / ')})</label>
    <textarea id="coSwap" rows="3" placeholder="e.g. My jet ski + $500 your way..."></textarea>
    <label>Cash top-up (AUD, if any)</label><input type="number" id="coTopup" min="0" value="0">`;
  }
}

async function placeOrder(){
  const l = listing(checkoutState.id);
  const m = checkoutState.method;
  const btn = document.getElementById('placeBtn');
  btn.textContent = '⏳ Processing...'; btn.disabled = true;

  const order = {
    id: 'MC-' + Math.random().toString(16).slice(2,8).toUpperCase(),
    listingId: l.id, title: l.title, emoji: l.emoji,
    amount: l.price, qty: 1, method: m,
    coin: m==='CRYPTO' ? document.getElementById('coCoin').value : null,
    seller: user(l.seller).name,
    store: isStore(l),
    status: m==='SWAP' ? 'SWAP_OFFER_SENT' : (m==='CRYPTO' ? 'AWAITING_ONCHAIN' : 'PAID'),
    createdAt: new Date().toISOString(),
    tracking: isStore(l) && m!=='SWAP' ? 'AMZ-MOCK-' + Math.random().toString(16).slice(2,8).toUpperCase() : null
  };

  // Try the real backend first; fall back to local demo
  let backendNote = '';
  try {
    const r = await fetch('http://localhost:3000/api/order', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ sku:l.id, qty:1, buyer:{name:'Demo Buyer',address:{suburb:'Reservoir VIC'}}, payment:{method:m, status:'CONFIRMED'} }),
      signal: AbortSignal.timeout(1500)
    });
    if(r.ok) backendNote = ' (verified against backend API)';
  } catch(e){ backendNote = ' (demo mode — backend offline)'; }

  if(m === 'SWAP'){
    OFFERS.unshift({ id:'OF-'+Math.random().toString(16).slice(2,8).toUpperCase(),
      listingId:l.id, title:l.title, emoji:l.emoji,
      offer: document.getElementById('coSwap').value,
      topup: +document.getElementById('coTopup').value || 0,
      from:'Demo Buyer', status:'PENDING', createdAt:new Date().toISOString() });
    ORDERS.unshift(order); save();
    toast('🔁 Swap offer sent to the seller!');
    location.hash = '#/success/' + order.id; return;
  }
  ORDERS.unshift(order); save();
  toast('🎉 Order placed!' + backendNote);
  location.hash = '#/success/' + order.id;
}

function renderSuccess(id){
  const o = ORDERS.find(x=>x.id===id);
  if(!o) return renderHome();
  const statusMsg = {
    'SWAP_OFFER_SENT':'Your swap offer is with the seller. You\'ll be notified when they accept, decline, or counter.',
    'AWAITING_ONCHAIN':'Waiting for your crypto transaction to confirm on-chain. The seller ships only after confirmation.',
    'PAID': o.store ? 'Payment confirmed — order sent to Amazon for dispatch.' : 'Payment confirmed — arrange pickup with the seller.'
  }[o.status];
  app.innerHTML = `<section><div class="container">
    <div class="panel" style="max-width:560px;margin:30px auto;text-align:center">
      <div style="font-size:64px">${o.method==='SWAP'?'🔁':'🎉'}</div>
      <h2>${o.method==='SWAP'?'Offer sent!':'Order confirmed!'}</h2>
      <p style="color:var(--muted);margin-top:8px">${statusMsg}</p>
      <div class="panel" style="background:var(--green-light);margin-top:18px;text-align:left">
        <div class="sumrow"><span>Order</span><b>${o.id}</b></div>
        <div class="sumrow"><span>Item</span><b>${o.emoji} ${esc(o.title)}</b></div>
        <div class="sumrow"><span>Amount</span><b>$${o.amount.toLocaleString('en-AU')}${o.coin?' · '+o.coin:''}</b></div>
        <div class="sumrow"><span>Payment</span><b>${o.method}</b></div>
        ${o.tracking?`<div class="sumrow"><span>Tracking</span><b>${o.tracking}</b></div>`:''}
      </div>
      <div style="display:flex;gap:10px;justify-content:center;margin-top:18px">
        <a class="btn" href="#/orders">📦 Track my orders</a>
        <a class="btn ghost" href="#/browse">Keep browsing</a>
      </div>
    </div>
  </div></section>`;
}

function renderOrders(){
  app.innerHTML = `<section><div class="container">
    <div class="section-head"><h2>📦 My orders</h2></div>
    ${ORDERS.length ? ORDERS.map(o=>`
      <div class="panel" style="margin-bottom:12px">
        <div class="co-item">
          <div class="co-emoji">${o.emoji}</div>
          <div><b>${esc(o.title)}</b><br>
            <span style="font-size:13px;color:var(--muted)">${o.id} · ${o.method}${o.coin?' · '+o.coin:''} · seller: ${esc(o.seller)}</span></div>
          <div style="text-align:right"><b>$${o.amount.toLocaleString('en-AU')}</b><br>
            <span class="badge ${o.status==='COMPLETED'?'cash':'trade'}">${o.status.replace(/_/g,' ')}</span></div>
        </div>
        ${o.tracking && o.status!=='COMPLETED' ? `<button class="btn sm ghost" style="margin-top:10px" onclick="confirmDelivery('${o.id}')">✅ I received it — confirm & earn trust</button>`:''}
      </div>`).join('')
    : `<p style="color:var(--muted)">No orders yet. <a href="#/browse">Find something →</a></p>`}
  </div></section>`;
}
function confirmDelivery(id){
  const o = ORDERS.find(x=>x.id===id);
  o.status='COMPLETED'; save();
  toast('🤝 Delivery confirmed — trust point recorded for you and the seller!');
  route();
}

function renderDashboard(){
  const pendingOffers = OFFERS.filter(o=>o.status==='PENDING');
  const myOrders = ORDERS.filter(o=>o.store && o.status!=='COMPLETED' && o.status!=='DISPATCHED' && o.method!=='SWAP');
  const dispatched = ORDERS.filter(o=>o.status==='DISPATCHED');
  app.innerHTML = `<section><div class="container">
    <div class="section-head"><h2>🧑‍💼 Seller dashboard</h2><span style="font-size:13px;color:var(--muted)">MissingCash Store · ABN verified</span></div>

    <div class="section-head" style="margin-top:6px"><h2 style="font-size:17px">🔁 Incoming swap offers (${pendingOffers.length})</h2></div>
    ${pendingOffers.length ? pendingOffers.map(o=>`
      <div class="panel" style="margin-bottom:12px">
        <div class="co-item">
          <div class="co-emoji">${o.emoji}</div>
          <div style="flex:1"><b>${esc(o.title)}</b><br>
            <span style="font-size:13.5px;color:var(--ink)">💬 <b>${esc(o.from)}</b> offers: ${esc(o.offer)}${o.topup?` (+$${o.topup.toLocaleString('en-AU')} cash)`:''}</span><br>
            <span style="font-size:12.5px;color:var(--muted)">${o.id} · ${new Date(o.createdAt).toLocaleString('en-AU')}</span>
          </div>
        </div>
        <div style="display:flex;gap:10px;margin-top:12px">
          <button class="btn sm" onclick="offerAction('${o.id}','ACCEPTED')">✅ Accept & arrange meetup</button>
          <button class="btn sm ghost" onclick="offerAction('${o.id}','DECLINED')">✖ Decline</button>
        </div>
      </div>`).join('')
    : '<p style="color:var(--muted);margin-bottom:20px">No pending offers. Offers from buyers land here instantly.</p>'}

    <div class="section-head" style="margin-top:26px"><h2 style="font-size:17px">📦 Store orders to dispatch (${myOrders.length})</h2></div>
    ${myOrders.length ? myOrders.map(o=>`
      <div class="panel" style="margin-bottom:12px">
        <div class="co-item">
          <div class="co-emoji">${o.emoji}</div>
          <div style="flex:1"><b>${esc(o.title)}</b><br>
            <span style="font-size:13px;color:var(--muted)">${o.id} · ${o.method}${o.coin?' · '+o.coin:''} · $${o.amount.toLocaleString('en-AU')}</span>
          </div>
          <span class="badge trade">${o.status.replace(/_/g,' ')}</span>
        </div>
        <button class="btn sm" style="margin-top:10px" onclick="dispatchOrder('${o.id}')">🚚 Mark dispatched via Amazon MCF</button>
      </div>`).join('')
    : '<p style="color:var(--muted);margin-bottom:20px">No paid orders waiting. Paid orders appear here — click dispatch and Amazon ships direct.</p>'}

    ${dispatched.length? `<div class="section-head" style="margin-top:26px"><h2 style="font-size:17px">🚚 In transit</h2></div>` + dispatched.map(o=>`
      <div class="panel" style="margin-bottom:12px;opacity:.85">
        <div class="co-item"><div class="co-emoji">${o.emoji}</div>
        <div style="flex:1"><b>${esc(o.title)}</b><br><span style="font-size:13px;color:var(--muted)">${o.id} · tracking ${o.tracking||'—'}</span></div>
        <span class="badge card">DISPATCHED</span></div>
      </div>`).join('') :''}

    <div class="section-head" style="margin-top:26px"><h2 style="font-size:17px">🏪 My store performance</h2></div>
    <div class="steps" style="grid-template-columns:repeat(auto-fit,minmax(160px,1fr))">
      <div class="step"><h3 style="font-size:24px">${DB.listings.filter(l=>l.seller==='store').length}</h3><p>live store items</p></div>
      <div class="step"><h3 style="font-size:24px">${ORDERS.filter(o=>o.store).length}</h3><p>orders received</p></div>
      <div class="step"><h3 style="font-size:24px">${OFFERS.filter(o=>o.status==='ACCEPTED').length}</h3><p>swaps accepted</p></div>
    </div>
  </div></section>`;
}
function offerAction(id, status){
  const o = OFFERS.find(x=>x.id===id);
  o.status = status; save();
  if(status==='ACCEPTED'){
    toast('🤝 Swap accepted! Arrange a public meetup — confirm after the exchange so BOTH profiles earn trust points.');
  } else { toast('Offer declined. The buyer has been notified.'); }
  route();
}
function dispatchOrder(id){
  const o = ORDERS.find(x=>x.id===id);
  o.status='DISPATCHED'; save();
  toast('🚚 Order sent to Amazon MCF — tracking: ' + (o.tracking||'AMZ-MOCK') + ' (buyer notified)');
  route();
}

function renderProfile(id){
  const u = user(id);
  if(!u) return renderHome();
  const t = trustOf(u);
  const mine = DB.listings.filter(l=>l.seller===id);
  const myWanted = DB.wanted.filter(w=>w.user===id);
  const scorePct = Math.min(100, Math.round((u.completed*1.5 + u.rating*4) / 1.2));
  app.innerHTML = `<section><div class="container">
    <a href="#/browse">← Back</a>
    <div class="panel" style="margin-top:14px;max-width:640px">
      <div class="seller-box">
        <div class="avatar" style="width:64px;height:64px;font-size:26px">${u.official?'🏪':esc(u.name[0])}</div>
        <div>
          <h2>${esc(u.name)} ${u.official?'<span class="store-pill">OFFICIAL STORE</span>':u.business?'<span class="biz">· Business · ABN ✓</span>':''}</h2>
          <span class="trust ${t.level}" style="font-size:12px">${t.label} TRUST</span>
          <span style="font-size:13px;color:var(--muted)"> · ${u.completed} completed trades · ⭐ ${u.rating} avg · member since ${esc(u.since)}</span>
        </div>
      </div>
      <div style="background:#eef4f0;border-radius:8px;height:10px;margin-top:16px;overflow:hidden">
        <div style="background:${t.level==='strong'?'var(--green)':t.level==='average'?'var(--gold)':'var(--danger)'};height:100%;width:${scorePct}%"></div>
      </div>
      <p style="font-size:12.5px;color:var(--muted);margin-top:4px">Trust score rises with completed, both-sides-confirmed trades and reviews.</p>
      <p style="margin-top:14px">${esc(u.bio)}</p>
    </div>
    ${mine.length? `<div class="section-head" style="margin-top:26px"><h2>${u.official?'🏪 Store items':'Active listings'}</h2></div><div class="grid">${mine.map(listingCard).join('')}</div>`:''}
    ${myWanted.length? `<div class="section-head" style="margin-top:26px"><h2>Wanted ads</h2></div><div class="wanted-grid">${myWanted.map(wantedCard).join('')}</div>`:''}
  </div></section>`;
}

function renderPost(){
  app.innerHTML = `<section><div class="container">
    <div class="form-card">
      <h2>+ Post an item — free</h2>
      <p style="color:var(--muted);font-size:14px">Reach thousands of traders. Choose what you'll accept: card, PayPal, crypto, cash — or swaps.</p>
      <form onsubmit="return submitPost(event)">
        <label>What are you selling? *</label>
        <input type="text" id="fTitle" required placeholder="e.g. VK Commodore Limited Edition">
        <label>Pick an emoji for your photo tile *</label>
        <select id="fEmoji">
          <option>🚗</option><option>🌊</option><option>📦</option><option>🧾</option><option>🎮</option>
          <option>🚵</option><option>📱</option><option>🛠️</option><option>🛋️</option><option>🏍️</option>
          <option>⚽</option><option>🎣</option><option>💻</option><option>👕</option><option>🔧</option><option>🎟️</option>
        </select>
        <label>Asking price (AUD) *</label>
        <input type="number" id="fPrice" min="1" required placeholder="15000">
        <label>Description *</label>
        <textarea id="fDesc" rows="4" required placeholder="Condition, age, why you're selling, pickup location..."></textarea>
        <label>What will you accept? * (pick at least one)</label>
        <div class="checks">
          <label><input type="checkbox" id="fCash" checked> 💵 Cash</label>
          <label><input type="checkbox" id="fCard"> 💳 Card</label>
          <label><input type="checkbox" id="fPaypal"> 🅿️ PayPal</label>
          <label><input type="checkbox" id="fCrypto"> 🪙 Crypto</label>
          <label><input type="checkbox" id="fSwap"> 🔁 Swap</label>
        </div>
        <div id="cryptoRow" style="display:none">
          <label>Which coins?</label>
          <div class="checks">
            <label><input type="checkbox" class="coin" value="BTC"> BTC</label>
            <label><input type="checkbox" class="coin" value="USDT" checked> USDT</label>
            <label><input type="checkbox" class="coin" value="ETH"> ETH</label>
          </div>
        </div>
        <div id="swapRow" style="display:none">
          <label>Up to 3 things you'd swap for</label>
          <div class="trade-slot"><input type="text" class="twant" placeholder="e.g. Jet ski"></div>
          <div class="trade-slot"><input type="text" class="twant" placeholder="e.g. Boat"></div>
          <div class="trade-slot"><input type="text" class="twant" placeholder="e.g. Project car + cash"></div>
        </div>
        <label>Suburb & state *</label>
        <input type="text" id="fSuburb" required placeholder="e.g. Reservoir VIC">
        <button class="btn" style="margin-top:22px;width:100%;justify-content:center">🚀 Publish listing</button>
        <p class="hint">By posting you agree to meet in public places, never share bank logins, and confirm crypto on-chain before releasing items.</p>
      </form>
    </div>
  </div></section>`;
  const sync = () => {
    document.getElementById('cryptoRow').style.display = fCrypto.checked ? 'block':'none';
    document.getElementById('swapRow').style.display = fSwap.checked ? 'block':'none';
  };
  fCrypto.addEventListener('change', sync);
  fSwap.addEventListener('change', sync);
}

function submitPost(e){
  e.preventDefault();
  const accepts = { cash:fCash.checked, creditcard:fCard.checked, paypal:fPaypal.checked, crypto:fCrypto.checked, swap:fSwap.checked };
  if(!Object.values(accepts).some(Boolean)){ toast('Pick at least one payment option'); return false; }
  if(accepts.swap && ![...document.querySelectorAll('.twant')].some(i=>i.value.trim())){ toast('Add at least one thing you\'d swap for'); return false; }
  DB.listings.unshift({
    id:'l'+Date.now(), seller:'u1', emoji:fEmoji.value, title:fTitle.value.trim(),
    price:+fPrice.value, desc:fDesc.value.trim(), accepts,
    cryptoTypes: accepts.crypto ? [...document.querySelectorAll('.coin:checked')].map(c=>c.value) : [],
    tradeWants: accepts.swap ? [...document.querySelectorAll('.twant')].map(i=>i.value.trim()).filter(Boolean) : [],
    suburb:fSuburb.value.trim(), when:'just now'
  });
  save(); toast('🎉 Listed! Your item is live.'); location.hash = '#/browse'; return false;
}

function renderHow(){
  app.innerHTML = `<section><div class="container">
    <h2>How MissingCash works</h2>
    <div class="steps">
      <div class="step"><div class="num">1</div><h3>Snap it & post it — free</h3><p>Your unused stuff is missing cash. Post in 60 seconds with a price and what you'll accept: card, PayPal, crypto, cash or swaps.</p></div>
      <div class="step"><div class="num">2</div><h3>Pay your way</h3><p>Buyers pick what works for them at checkout: 💳 card, 🅿️ PayPal, 🪙 crypto — or 🔁 swap for peer listings.</p></div>
      <div class="step"><div class="num">3</div><h3>🏪 Store items ship via Amazon</h3><p>Official store items are dispatched from Amazon warehouses with tracking. Payment must confirm before dispatch — that's why store items don't take swaps.</p></div>
      <div class="step"><div class="num">4</div><h3>Build your trust score</h3><p>Confirm delivery after every deal: Weak → Average → Strong. Strong profiles sell faster and get better swap offers.</p></div>
    </div>

    <h2 style="margin-top:40px">🛡️ Trust & safety</h2>
    <div class="steps">
      <div class="step"><h3>Trust scores are earned</h3><p>Weak / Average / Strong is calculated from completed trades both parties confirm, plus star reviews. It can't be bought.</p></div>
      <div class="step"><h3>Crypto rules</h3><p>Orders dispatch only after on-chain confirmation. Screenshot "payments" are always scams. We never hold your crypto.</p></div>
      <div class="step"><h3>Meet safe</h3><p>Peer meetups: public place, bring a mate, inspect before you pay. Verify gift voucher balances together in store.</p></div>
      <div class="step"><h3>Store guarantees</h3><p>🏪 Store items are new stock, shipped by Amazon with tracking. Card/PayPal purchases carry their normal buyer protections.</p></div>
    </div>
  </div></section>`;
}

/* ---------- UI helpers ---------- */
function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg; t.style.display = 'block';
  clearTimeout(t._x); t._x = setTimeout(()=> t.style.display='none', 3200);
}
route();
