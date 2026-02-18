# Client Update – February 2026

Summary of changes made to the Dragonfly Psychotherapy website since the last client update (POST_LAUNCH_IMPROVEMENTS, January 2026).

---

## 1. Search Console & SEO Fixes

- **Fix Search Console indexing** – Admin Save button and nav links fixed for better indexing
- **Canonical URLs without trailing slash** – Canonical URLs now match served URLs to reduce redirects
- **SEO: www canonical default** – www canonical applied, blog post canonical and index updates
- **“Discovered – currently not indexed”** – BlogPreview baseUrl set to www; explicit canonical and robots on all therapy pages (anxiety, depression, burnout, transitions, menopause, health-anxiety, physical-health, self-esteem, young-people, rejection-sensitive-dysphoria, neurodiversity); unique `excerpt` added to 9 blog posts (book-lovers-day, burnout-and-resilience, finding-hope-in-autumns-transformation, growth-begins-at-the-edge, january-reset, mid-year-reset, national-colouring-book-day, the-art-of-stopping part 1 & 2) for stronger meta descriptions. See **Search Console steps** below.

### Search Console steps (re-submit sitemap + request indexing)

Do these **after** the latest changes are live on the site (deploy first).

### 1. Re-submit the sitemap

1. Go to [Google Search Console](https://search.google.com/search-console) and open the property for [www.dragonflypsychotherapy.co.uk](https://www.dragonflypsychotherapy.co.uk) (or your verified property).
2. In the left menu, click **Sitemaps**.
3. In the box "Add a new sitemap", enter: `sitemap.xml`
4. Click **Submit**.
5. If the sitemap was already submitted, you can click the three dots next to it and choose **Resubmit sitemap** (or remove and add again). This tells Google to recrawl the sitemap.

### 2. Request indexing for priority URLs

1. In the left menu, click **URL Inspection** (under "Indexing" or "Inspection").
2. In the search box at the top, paste the **full URL** of a page you want Google to prioritise, e.g.:
   - `https://www.dragonflypsychotherapy.co.uk/anxiety`
   - `https://www.dragonflypsychotherapy.co.uk/blog/january-reset`
3. Press Enter. Wait for Google to "Inspect" the URL.
4. If the URL is "URL is not on Google", click **Request indexing**. If it says "URL is on Google", the page is already indexed; you can still request indexing to ask for a recrawl.
5. Repeat for other important URLs (e.g. 5–10 key therapy pages and a few blog posts). Don't request hundreds at once; Google may ignore excess requests.

Indexing can take from a few days to a few weeks. Re-check **Coverage** or **Pages** in Search Console after a week or two.

---

## 2. Analytics & Tracking

- **Vercel Analytics** – Added Vercel Analytics for site performance and traffic insights
- **GA4 contact form event** – Contact form now fires `contact_form_submit` event on successful submission
- **GA4 event reliability** – Exposed gtag on window, added dataLayer fallback; event fires on thank-you page for reliable delivery

---

## 3. Blog & Content

- **Blog posts** – New blog posts added, Decap CMS updates, image assets
- **Home blog preview section** – Blog preview on homepage, contact/workshops styling, RSD post image and headings
- **Blog navigation** – Prev/next navigation, book cards, "see more" pagination, bouncy button

---

## 4. Workshops & CMS

- **Workshops CMS** – Workshops editable via Decap CMS, gallery added
- **Link check** – Link checking and fixes
- **Mindful PDF rename** – Mindful Dot to Dots PDF renamed/updated
- **Admin tweaks** – Admin UI improvements

---

## 5. Design & Styling

- **Lighter lilac background** – Qualifications and photo boxes use lighter lilac background
- **Mobile fixes** – Workshops, accessibility, form overflow fixes
- **BACP logo** – Updated BACP logo asset

---

## 6. Security & Infrastructure

- **Security hardening** – Headers, rate limiting, HTML sanitization, OAuth hardening
- **Admin access protection** – Optional `ADMIN_ACCESS_SECRET` (cookie or query param) to restrict `/admin`
- **Sitemap/robots** – Sitemap and robots updates, remove Host directive from robots.txt
- **External links** – External links (e.g. bacp.co.uk, Surrey PDF) open in new tab
- **dev:clean script** – Added `npm run dev:clean` to clear cache and restart dev server

---

## 7. Performance (PageSpeed)

- **Preconnected origins (#4)** – Added `preconnect` for `img1.wsimg.com` (blog images) and `www.googletagmanager.com` (GA) so the browser can open connections earlier.
- **LCP (#5)** – Already optimised: hero logo uses `next/image` with `priority`, critical CSS inlined for hero background, below-the-fold sections loaded with `dynamic()` so they don’t block. No code change needed; re-run PageSpeed to confirm LCP timing.
- **Third parties (#6)** – Blog featured images from `img1.wsimg.com` and `shop.charliemackesy.com` now go through Next.js image optimisation: `remotePatterns` added in `next.config.js`, and all blog featured images (BlogPreview, BlogList, BlogCarousel, BlogPostsList, and individual post page) use `next/image` via `BlogFeaturedImage`. The browser no longer loads those images directly from third-party origins; Next serves optimised variants from your domain, reducing third-party request impact.
- **Large payloads (#7)** – Same change as #6: blog images are now optimised and sized by Next (quality 75, responsive `sizes`), so smaller image payloads. Local and remote featured images use the shared `BlogFeaturedImage` component with appropriate `sizes` for cards vs post header.

---

## 8. Admin CMS Improvements

### 8.1 Admin config.yml 404 Fix (Desktop & Mobile)

- **Problem:** Decap CMS could not load `config.yml` (404 error), blocking admin access. On mobile, this happened specifically when trying to log in.
- **Fix:**
  - Middleware now allows static admin files (`config.yml`, `config.local.yml`, CSS, JS) to bypass admin protection so they load correctly
  - Config URL is now an **absolute URL** in production (e.g. `https://www.dragonflypsychotherapy.co.uk/admin/config.yml`) to avoid mobile browsers resolving relative paths differently
  - Middleware supports trailing slash variants (`/admin/config.yml/`) for compatibility

### 8.2 Search Console Link

- Added a **Search Console** link in the admin navigation bar, next to Analytics, pointing to your Google Search Console property for dragonflypsychotherapy.co.uk

---

## 9. Printable Resources (Activities & Tools Page)

### 9.1 New PDFs Added

- **Paint Splatter Colouring** – Mindful colouring sheet (`paint_splatter.pdf`)
- **Reflective Journal** – Printable journal for reflection and self-awareness (`Reflective-Journal.pdf`)

### 9.2 Resource Card Design

- Each printable resource is now displayed as a card with:
  - Title and short description
  - **Download** button that appears on hover (always visible on mobile)
  - Lilac/primary colour styling matching the site
  - **Centred layout** on desktop and mobile

### 9.3 PDF Updates

- `paint_splatter.pdf` updated from your latest version
- `Reflective-Journal.pdf` updated from your latest version

---

## 10. Attempted Change (Reverted)

- **Understanding & Managing Anxiety section** – Attempted to switch from blue background to light lilac with curved separators. Reverted due to rendering and layout issues; section remains the original dark blue with standard curves.

---

## 11. Deployment

- Changes pushed to GitHub (`main` branch).
- Vercel deploys automatically on push
- Site: <https://www.dragonflypsychotherapy.co.uk>

---

## Files Modified (Recent Session)

| File | Change |
| ---- | ------ |
| `middleware.ts` | Admin static asset exceptions, trailing slash support |
| `app/admin/[[...slug]]/page.tsx` | Absolute config URL, Search Console link |
| `app/activities-and-tools/page.tsx` | Printable resource cards, new PDF links |
| `app/activities-and-tools/activities-and-tools.module.css` | Card styles, centred layout |
| `public/resources/paint_splatter.pdf` | Updated file |
| `public/resources/Reflective-Journal.pdf` | Added and updated |

Note: Many other files were modified across the updates above (blog, workshops, layout, analytics, etc.). Full history is in git.

---

Document created: February 2026
