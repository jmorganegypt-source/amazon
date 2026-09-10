MISSINGCASH — DEPLOYMENT GUIDE (demo -> live)
================================================
Total cost to launch: ~$25/year (domain) + $0 hosting on free tiers.

---------------------------------------------------------------
STEP 1 — FRONT-END (the marketplace demo)  [today, ~30 min, $0]
---------------------------------------------------------------
Option A: Netlify (easiest)
  1. zip the 'missingcash' folder -> app.netlify.com/drop
  2. Site is live instantly on a free netlify.app URL

Option B: Vercel / Cloudflare Pages — same drag-and-drop or git push.

HTTPS is automatic. Custom domain below.

---------------------------------------------------------------
STEP 2 — BACKEND (order API + Amazon MCF)  [~1 hr, $0]
---------------------------------------------------------------
Free tiers: Railway, Render, or Fly.io
  1. Push 'missingcash-backend' to a GitHub repo
  2. railway.app -> New Project -> Deploy from GitHub
  3. Add env vars from .env.example in the dashboard
  4. Copy the URL it gives you (e.g. https://missingcash-api.up.railway.app)

Then in app.js, replace http://localhost:3000/api/order with your URL.

---------------------------------------------------------------
STEP 3 — DOMAIN missingcash.com.au  [~$15-20/year]
---------------------------------------------------------------
  1. Check availability: register at crazydomains.com.au /
     netregistry.com.au / ventraip.com.au (all ~AU$15-20/yr)
  2. In Netlify: Domain settings -> add missingcash.com.au
  3. At your registrar, point DNS to Netlify's nameservers (they show
     you exactly which) — propagates within minutes to hours.
  4. Backend: create api.missingcash.com.au -> point to Railway URL.

---------------------------------------------------------------
STEP 4 — GOING FULLY LIVE (the honest checklist)
---------------------------------------------------------------
The demo runs on browser localStorage. Before real customers:
  [ ] Real accounts: swap localStorage for Supabase (free tier)
      - auth (email + phone OTP for trust)
      - listings, orders, offers tables
  [ ] Real payments: Stripe (card), PayPal Orders API, on-chain
      crypto checker (checkpayments API or自建 mempool watcher)
  [ ] Images: real photo upload (Supabase Storage / Cloudinary)
  [ ] Amazon MCF: Seller Central approval + SP-API keys -> USE_MOCK=false
  [ ] Legal: ABN, terms of service, privacy policy, AML/CTF self-
      assessment (AUSTRAC) BEFORE enabling crypto volume
  [ ] Safety: report moderation queue, blocklist, voucher-verification
      prompts

---------------------------------------------------------------
RECOMMENDED LAUNCH ORDER (don't skip steps)
---------------------------------------------------------------
Week 1:  domain + front-end live on Netlify (demo mode is fine —
         collect waitlist emails, post your own listings)
Week 2:  seed 50 real listings in ONE city (Melbourne) via outreach
Week 3:  Supabase accounts + real listings/photos
Week 4:  Stripe card payments for store items
Week 6:  Amazon Seller + MCF approval for your first 5 SKUs
Week 8:  crypto checkout + AUSTRAC assessment
         (only AFTER volume justifies it)
