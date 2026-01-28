# Launch checklist

Use this as the single source of truth before going live. Tick items when done.

**Important:** Any changes made when completing the steps below **must be implemented without affecting the look and UI**. The current design, layout, colours, typography, and behaviour of the site must stay the same unless a step explicitly calls for a visible change.

**Client instruction:** Do not take the site live until everything below (including cyber security, debug, SEO, and meta) is complete. **Go live only when all other sections are done.**

---

## 1. Cyber security

- [x] Review form handling: ensure contact form uses HTTPS and consent is recorded (Formspree or equivalent).
- [x] Confirm no secrets or API keys are exposed in client-side code or in the repo.
- [x] Privacy notice and cookie wording match what the site actually does (essential-only at launch).

---

## 2. Debug and quality

- [ ] Run through main user flows (home, contact, key pages) and fix any bugs.
- [ ] Test contact form submission and that emails are received.
- [ ] Check responsive behaviour on mobile and tablet.
- [ ] Fix or suppress console errors and clear “missing required” or build warnings where possible.

---

## 3. SEO and meta (complete before go-live)

- [ ] **robots.txt:** Implemented in `app/robots.ts`. Ensure `NEXT_PUBLIC_SITE_URL` is set in production so the sitemap URL in robots is correct.
- [ ] **Sitemap:** Implemented in `app/sitemap.ts`. Confirm `NEXT_PUBLIC_SITE_URL` is set in production so sitemap URLs use the live domain.
- [ ] **Root metadata and OG/twitter:** Implemented in `app/layout.tsx` (`metadataBase`, `openGraph`, `twitter`). Add a default share image later if desired (e.g. `openGraph.images`).
- [ ] **Favicon:** Add a favicon (e.g. `app/icon.png` or `public/favicon.ico`) and reference it so the site has an icon in tabs and bookmarks.

---

## 4. Legal and compliance

- [ ] **Cookies and analytics:** The privacy notice is aligned with “essential cookies only at launch” (no Google Analytics, no non-essential cookies). If you add analytics or non-essential cookies later, add a cookie-consent banner and update the privacy notice to match.
- [ ] **Contact consent:** The contact form in `components/Contact.tsx` requires explicit consent and sends it to Formspree. Confirm the Formspree form and consent fields are used in production and that form submissions are reviewed.

---

## 5. Configuration and content

- [ ] **Decap CMS:** In `public/admin/config.yml`, set `base_url` to the production URL for go-live. If the site is static on 123.reg, ensure `auth_endpoint` points to a working OAuth/proxy (e.g. Vercel oauth-server).
- [ ] **Contact form:** Confirm `NEXT_PUBLIC_FORMSPREE_ENDPOINT` (and `NEXT_PUBLIC_FORMSPREE_KEY` if used) in production. Fallback is `https://formspree.io/f/xaqqqyoa` (see `components/Contact.tsx`).
- [ ] **Docs:** `SITEMAP_GUIDE.md` has been updated to match the current site (e.g. Book Reviews removed from Resources).

---

## 6. Go live (do this last)

**Only after sections 1–5 are complete.**

- [ ] **Decide hosting:** 123.reg (static FTP) or Vercel (Node). The current workflow deploys from `./out/` to 123.reg via FTP; that only works if the site is built as a static export.
- [ ] **If 123.reg:** Add `output: 'export'` in `next.config.js` so `npm run build` produces the `out/` folder. Ensure Decap CMS auth uses an external provider and `public/admin/config.yml` `base_url` / `auth_endpoint` point to the right URLs.
- [ ] **If Vercel:** Use Vercel’s GitHub integration (or a Vercel-based workflow). No `out/` or static export needed.
- [ ] **GitHub Actions secrets** (for 123.reg): Set `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` in the repo’s Settings → Secrets and variables → Actions. See `DEPLOYMENT.md`.
- [ ] **Production env:** Set `NEXT_PUBLIC_SITE_URL` to the live URL (e.g. in GitHub env or host dashboard). Used by the sitemap and metadata.
- [ ] Point domain DNS at the host (123.reg or Vercel).
- [ ] Confirm SSL (HTTPS) and any redirects (e.g. www → apex or vice versa).
- [ ] Submit `sitemap.xml` in Google Search Console (and Bing if used).
- [ ] If you add analytics later, create the property and link Search Console to it.
