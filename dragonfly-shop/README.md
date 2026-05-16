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

## Digital files

Place PDFs in **`private/downloads/`** (see `private/downloads/README.txt`). They are served only through **`/api/download`**, which confirms the Stripe Checkout session is **paid** and includes that product. Do not put sellable PDFs in `public/` or they stay world-readable.

## Main site link

The main Dragonfly site nav **SHOP** link now points to `https://dragonflyshop.co.uk/`.
