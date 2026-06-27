# Dragonfly Shop (`dragonflyshop.co.uk`)

Separate Next.js 14 app: one-page Stripe checkout for RSD Handbook & Workbook (eBook + paperback), with Dragonfly-matched header/footer and shop background `#b9d5d6`.

## Local dev

```bash
cd dragonfly-shop
cp .env.example .env.local
# Copy the four **live** Price IDs from Stripe → Products (same as you created for launch).

npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) (port 3001 to avoid clashing with the main site on 3000).

## Vercel

1. New Vercel project, root directory **`dragonfly-shop`** (or import this folder as its own repo if you split it later).
2. Set env vars from `.env.example`.
3. Add domain **dragonflyshop.co.uk** and point DNS to Vercel.

## Rate limiting (recommended for production)

Checkout, download, and success routes are rate-limited per IP when Upstash Redis is connected:

1. Vercel → **dragonfly-shop** project → **Storage** or **Marketplace** → add **Upstash Redis** (free tier is fine).
2. Link it to the project — Vercel injects `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
3. Redeploy.

Without Upstash, the shop still works; limits are simply not enforced (useful for local dev).

## Digital files

Place PDFs in **`private/downloads/`** (see `private/downloads/README.txt`). They are served only through **`/api/download`**, which confirms the Stripe Checkout session is **paid** and includes that product. Do not put sellable PDFs in `public/` or they stay world-readable.

## Main site link

The main Dragonfly site nav **SHOP** link now points to `https://dragonflyshop.co.uk/`.

## Newsletter opt-in (MailerLite)

If the customer ticks the optional newsletter box at checkout, a Stripe webhook adds them to MailerLite as an **active** subscriber (single opt-in after the explicit tick box).

1. In Vercel (shop project), set `MAILERLITE_API_KEY` (same key as the main site is fine).
2. Optionally set `MAILERLITE_GROUP_ID` for a dedicated “shop” group.
3. In Stripe Dashboard → Developers → Webhooks (live mode), add endpoint:
   `https://dragonflyshop.co.uk/api/webhooks/stripe`
   Event: `checkout.session.completed`
4. Copy the signing secret into Vercel as `STRIPE_WEBHOOK_SECRET` and redeploy.

## Compliance documents

Age Appropriate Design Code website assessment (for GDPR audit section 13): `content/compliance/aadc-website-assessment-2026.txt` in the repo root (main site project).
