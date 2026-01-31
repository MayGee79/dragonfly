# Launch checklist

Use this as the single source of truth before going live. Tick items when done.

**Important:** Any changes made when completing the steps below **must be implemented without affecting the look and UI**.

---

## How to do this checklist

1. **Work in order** – Do sections 1 → 2 → 3 → 4 → 5, then 6 last.
2. **Test locally first** – Run `npm run dev`, open http://localhost:3000. See `DEBUG_WORKFLOW.md` for safe changes.
3. **Tick when done** – Change `- [ ]` to `- [x]` for each item you’ve completed.
4. **Don’t go live** until sections 1–5 are all ticked.

**Step 2 (Debug) – what to do:**
- **Run through main flows:** Open home, click nav links (Working Together, Contact, Support and Resources, etc.), open a blog post, go to FAQs. Fix any broken links or obvious bugs.
- **Test contact form:** Fill in name, email, message, tick consent, click Send. Check your Formspree inbox (or the email Formspree sends to) and confirm the submission arrived.
- **Check responsive:** Resize the browser or use DevTools (F12 → device toolbar). Check home, nav menu, contact section, and one other page on a narrow width (e.g. 375px). Note any layout breaks to fix later.
- **Build warnings:** Run `npm run build`. If you see warnings (e.g. metadataBase), we can fix them without changing the UI (see DEBUG_WORKFLOW.md).

**Step 3 (SEO) – what to do:**
- **robots / sitemap:** Already in the repo (`app/robots.ts`, `app/sitemap.ts`). Before go-live, set `NEXT_PUBLIC_SITE_URL` in Vercel (or your host) to your live URL.
- **metadataBase:** Already in `app/layout.tsx`. Same env var above.
- **Favicon:** Add a small image (e.g. `public/favicon.ico` or `app/icon.png`) so the browser tab shows your icon.

**Step 4–5:** Read each bullet; confirm or configure as described. Step 6 only after 1–5 are done.

--- The current design, layout, colours, typography, and behaviour of the site must stay the same unless a step explicitly calls for a visible change.

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
- [x] **Favicon:** Add a favicon (e.g. `app/icon.png` or `public/favicon.ico`) and reference it so the site has an icon in tabs and bookmarks.

---

## 4. Legal and compliance

- [x] **Cookies and analytics:** The privacy notice is aligned with “essential cookies only at launch” (no Google Analytics, no non-essential cookies). If you add analytics or non-essential cookies later, add a cookie-consent banner and update the privacy notice to match.
- [x] **Contact consent:** The contact form in `components/Contact.tsx` requires explicit consent and sends it to Formspree. Confirm the Formspree form and consent fields are used in production and that form submissions are reviewed.

---

## 5. Configuration and content

- [x] **Decap CMS:** In `public/admin/config.yml`, set `base_url` to the production URL for go-live. If the site is static on 123.reg, ensure `auth_endpoint` points to a working OAuth/proxy (e.g. Vercel oauth-server).
- [x] **Contact form:** Confirm `NEXT_PUBLIC_FORMSPREE_ENDPOINT` (and `NEXT_PUBLIC_FORMSPREE_KEY` if used) in production. Fallback is `https://formspree.io/f/xaqqqyoa` (see `components/Contact.tsx`).
- [x] **Docs:** `SITEMAP_GUIDE.md` has been updated to match the current site (e.g. Book Reviews removed from Resources).

---

## 6. Go live (do this last)

**Only after sections 1–5 are complete.**

- [x] **Decide hosting:** Vercel (Node) with GitHub integration. Custom domain dragonflypsychotherapy.co.uk.
- [x] **Vercel:** GitHub integration in use. No static export needed.
- [x] **GitHub Actions:** FTP deploy workflow set to manual trigger only (Vercel handles deployment).
- [x] **Production env:** `NEXT_PUBLIC_SITE_URL` set in Vercel to live URL. Used by sitemap and metadata.
- [x] Point domain DNS at Vercel.
- [x] Confirm SSL (HTTPS) and redirects.
- [x] Submit `sitemap.xml` in Google Search Console (and Bing).
- [x] Analytics: Google Analytics (GA4) with cookie consent banner. Search Console linked.
