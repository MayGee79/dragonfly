# Implementations: Cybersecurity, Privacy & Legal, SEO, Meta & Local SEO

Summary of all implementations done for Dragonfly Psychotherapy (dragonflypsychotherapy.co.uk).

---

## 1. Cybersecurity

| Item | Implementation |
|------|----------------|
| **Contact form – HTTPS** | Form submission uses Formspree over HTTPS. Code forces HTTPS (any `http://` endpoint is replaced with `https://`). See `components/Contact.tsx`. |
| **Contact form – consent** | Required consent checkbox: “I consent to Dragonfly Psychotherapy contacting me in response to this enquiry.” HTML `required` + JS validation; submission blocked if unchecked. Consent and marketing consent sent as “Yes”/“No” in payload. |
| **No secrets in client code** | No API keys or secrets in client-side code. Formspree endpoint uses `NEXT_PUBLIC_FORMSPREE_ENDPOINT` (or fallback); optional key via env. OAuth credentials only in server-side API routes (Vercel env). |
| **Privacy notice** | Privacy notice aligned with cookie consent. Section 13 (Cookies) covers essential cookies and analytics (Google Analytics); non-essential analytics load only after user consent via banner. |

---

## 2. Privacy policies and legal

| Item | Implementation |
|------|----------------|
| **Privacy Notice page** | Full privacy notice at `/privacy-policy` (`app/privacy-policy/page.tsx`). Covers data controller (Victoria Froome, Dragonfly Psychotherapy), lawful basis, what is collected (therapy clients, wellness walks, resource purchasers, CPD, workshops, website visitors, enquiries), sensitive data, confidentiality, security, sharing, retention, rights (access, correction, deletion, etc.), marketing, cookies, breaches, links, changes, and contact. |
| **UK GDPR / DPA** | Notice states compliance with UK GDPR, Data Protection Act 2018, and professional codes (BACP, UKCP). ICO registration (ZB904048) and contact details included. |
| **Cookies** | Section 13 (Cookies): essential cookies + analytics (Google Analytics). Cookie consent banner (`components/CookieConsent.tsx`) appears on first visit; GA loads only after user accepts. Consent/decline stored in localStorage. Optional link to Google Analytics opt-out. |
| **Contact consent (legal)** | Contact form requires explicit consent (“I consent to Dragonfly Psychotherapy contacting me in response to this enquiry”). Consent and marketing consent are sent with the submission (Formspree). Aligns with lawful basis for processing enquiries. |
| **Young people** | Section 6 of privacy notice: under-18s, parental consent for under-13s, record-keeping until 25 or 7 years after work ends. |
| **Metadata for privacy page** | Privacy Notice page has its own title and description and is set to be indexed (`robots: index, follow`) so the policy is findable. |

---

## 3. Analytics & Cookie Consent

| Item | Implementation |
|------|----------------|
| **Google Analytics (GA4)** | GA4 property with Measurement ID `G-39GL2MNTGV`. Loaded only after user accepts cookies via consent banner. Tracks page views, sessions, traffic sources. |
| **Cookie consent banner** | `components/CookieConsent.tsx` – fixed banner at bottom of page. Explains analytics use, links to Privacy Policy. Accept loads GA and stores preference; Decline stores preference without loading GA. Preference in localStorage so banner does not re-show. |
| **GDPR alignment** | Analytics cookies are non-essential; consent required before loading. Accept/Decline choices honoured. |

---

## 4. SEO – Technical

| Item | Implementation |
|------|----------------|
| **robots.txt** | `app/robots.ts` – allows all crawlers, points to sitemap. Sitemap URL uses `NEXT_PUBLIC_SITE_URL`. |
| **Sitemap (XML)** | `app/sitemap.ts` – dynamic sitemap at `/sitemap.xml`. All static pages + published blog posts. Priorities and change frequencies set. Base URL from `NEXT_PUBLIC_SITE_URL`. |
| **metadataBase** | `app/layout.tsx` – `metadataBase` set from `NEXT_PUBLIC_SITE_URL` (fallback: production URL). Used for canonical URLs and OG images. |
| **Production URL** | `NEXT_PUBLIC_SITE_URL` set in Vercel to `https://dragonflypsychotherapy.co.uk` for sitemap, metadata, and schema. |

---

## 5. Meta & Open Graph

| Item | Implementation |
|------|----------------|
| **Default title** | Root layout: “Counselling and Psychotherapy in Surrey \| Dragonfly Psychotherapy”. |
| **Title template** | `%s \| Dragonfly Psychotherapy` so child pages get consistent suffix. |
| **Default description** | Root layout: location-rich description (Guildford, East Horsley, Surrey, online, Dr Victoria Froome, BACP-registered). |
| **Open Graph** | Root layout: `type: website`, `locale: en_GB`, `siteName`, title, description, default image (`/images/dragonfly_logo_blue.png`). |
| **Twitter card** | Root layout: `summary_large_image`, title, description. |
| **Robots (default)** | Root layout: `index: true`, `follow: true`. |
| **Favicon** | `app/favicon.ico` + `icons.icon` in layout metadata. |

---

## 6. Page-level SEO & Meta

| Item | Implementation |
|------|----------------|
| **Per-page metadata** | All main pages have `metadata` (or `generateMetadata`): unique title and description. |
| **Pages with metadata** | Home (via layout), Anxiety, Depression, Burnout, Menopause, Health Anxiety, Life Transitions, Physical Health, Self-Esteem, Young People 11+, RSD, FAQs, Activities and Tools, Support and Resources, Workshops and Talks, Professional Membership, Shop, Testimonials, Privacy Notice, Blog (listing), Blog posts (per post), Contact Thank You, Sitemap. |
| **Open Graph per page** | Key pages include `openGraph` title and description. |
| **Thank-you page** | `robots: { index: false, follow: true }` so it is not indexed. |
| **Privacy & Sitemap** | `robots: { index: true, follow: true }`. |

---

## 7. Structured Data (Schema.org)

| Item | Implementation |
|------|----------------|
| **FAQPage** | FAQs page: JSON-LD `FAQPage` with all Q&As as `Question`/`Answer` for rich results and AI. |
| **BlogPosting** | Each blog post page: JSON-LD `BlogPosting` (headline, description, author, datePublished, image, publisher). |
| **LocalBusiness / ProfessionalService** | Homepage: JSON-LD `ProfessionalService` with name, description, url, telephone, email, address (Guildford), hasMap (Google Maps link), areaServed (Guildford, East Horsley, Woking, Cobham, Godalming, Leatherhead, Dorking, Surrey), geo (Guildford coordinates), priceRange, openingHours (“By appointment”), sameAs (Facebook, Instagram, LinkedIn). |

---

## 8. Local SEO

| Item | Implementation |
|------|----------------|
| **LocalBusiness schema** | See above: address, areaServed, geo, telephone, email, hasMap. |
| **Default meta (location)** | Root title/description and OG/Twitter include “Guildford”, “East Horsley”, “Surrey”, “Dr Victoria Froome”, “BACP-registered”. |
| **Location in descriptions** | Therapy and service pages use Surrey / local context in meta descriptions where relevant. |

---

## 9. Search Console & Sitemaps

| Item | Implementation |
|------|----------------|
| **Google Search Console** | Property added for dragonflypsychotherapy.co.uk. Verification file: `public/googlecdfc90605a577cda.html`. |
| **Sitemap submitted (Google)** | `sitemap.xml` submitted in Search Console. |
| **Bing Webmaster Tools** | Site added and sitemap submitted. |

---

## 10. Configuration & Docs

| Item | Implementation |
|------|----------------|
| **Decap CMS (production)** | `public/admin/config.yml`: `base_url: https://dragonflypsychotherapy.co.uk`. `auth_endpoint: /api/auth` for GitHub OAuth. |
| **Environment variables** | `.env.example` documents `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_FORMSPREE_ENDPOINT`, optional `NEXT_PUBLIC_FORMSPREE_KEY`. |
| **SITEMAP_GUIDE.md** | Updated: Book Reviews removed from Resources; priority/sections match current site. |

---

## 11. Go-live & Hosting

| Item | Implementation |
|------|----------------|
| **Hosting** | Vercel (GitHub integration). Custom domain: dragonflypsychotherapy.co.uk (+ www). |
| **SSL** | HTTPS via Vercel. |
| **Decap CMS login** | API routes `/api/auth` and `/api/callback` restored for production. GitHub OAuth App callback URL includes `https://dragonflypsychotherapy.co.uk/api/callback`. |
| **Vercel env** | `NEXT_PUBLIC_SITE_URL` set for production. |

---

## 12. Files Touched (reference)

- **Layout / global:** `app/layout.tsx` (metadata, OG, Twitter, robots, favicon; CookieConsent).
- **Cookie consent:** `components/CookieConsent.tsx`, `components/CookieConsent.module.css`.
- **Homepage:** `app/page.tsx` (LocalBusiness schema).
- **Sitemap / robots:** `app/sitemap.ts`, `app/robots.ts`.
- **Contact:** `components/Contact.tsx` (HTTPS, consent).
- **Privacy:** `app/privacy-policy/page.tsx` (content; cookies section).
- **Metadata per page:** All `app/**/page.tsx` for main routes (see list above).
- **FAQ schema:** `app/faqs/page.tsx`.
- **Blog schema:** `app/blog/[slug]/page.tsx`.
- **Config:** `public/admin/config.yml`, `.env.example`.
- **Docs:** `SITEMAP_GUIDE.md`, `LAUNCH_CHECKLIST.md`.

---

*Last updated: January 2026*
