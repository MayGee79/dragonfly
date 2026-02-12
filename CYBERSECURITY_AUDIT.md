# Cybersecurity Audit — Dragonfly Psychotherapy Website

**Audit date:** February 2026  
**Scope:** Full codebase (Next.js app, API routes, admin/CMS, contact form, OAuth, dependencies).  
**Panel perspective:** Web application security, data protection (GDPR-aligned), and secure deployment.

---

## Executive summary

The site has **solid basics** (contact form validation, HTML escaping in email, secrets in env, admin/API not indexed). Several **hardening measures** are recommended: security headers, no information leakage in OAuth callback, rate limiting, and HTML sanitization for CMS-sourced content. **No critical vulnerabilities** that require immediate emergency patching were identified; the following is a structured audit with prioritized recommendations.

---

## 1. Contact form & API (`/api/contact`)

| Area | Status | Notes |
|------|--------|--------|
| Input validation | Good | Name, email, message required and trimmed; consent required; types checked. |
| HTML escaping | Good | `escapeHtml()` used for name, email, phone, message in email body (XSS in email / injection into HTML reduced). |
| Secrets | Good | `RESEND_API_KEY`, `CONTACT_EMAIL_*` from env; not exposed to client. |
| Error messages | Good | Production hides Resend details; generic message to user. |
| Rate limiting | Missing | No rate limit on POST; risk of form spam or abuse. |

**Recommendation (medium):** Add rate limiting to `/api/contact` (e.g. by IP or by identifier), via Vercel/server middleware or a small in-memory/store-based limiter, to cap submissions per IP per hour.

---

## 2. OAuth & admin (`/api/auth`, `/api/callback`)

| Area | Status | Notes |
|------|--------|--------|
| Client secret | Good | `OAUTH_CLIENT_SECRET` only used server-side; not sent to browser. |
| Redirect URI | Good | Built from request host/proto; matches typical OAuth use. |
| Token handling | Caution | Token returned in HTML page and sent via `postMessage(..., '*')`; Decap expects this, but targetOrigin `'*'` is permissive. |
| Information leakage | Issue | When `code` is missing, callback returns **debug info**: full URL, all search params, and **all request headers** in the 400 response. Headers can include sensitive data (cookies, authorization, etc.). |

**Recommendations:**

- **High:** Remove or strictly restrict debug output in `/api/callback` when `code` is missing. Do not expose `request.headers` (or any raw headers) to the client. Log server-side only if needed.
- **Low:** If you keep a postMessage flow, consider a specific `targetOrigin` (e.g. your site origin) instead of `'*'` where Decap allows.

---

## 3. Security headers

| Header | Status |
|--------|--------|
| Content-Security-Policy (CSP) | Not set |
| X-Frame-Options | Not set |
| Strict-Transport-Security (HSTS) | Not set |
| X-Content-Type-Options | Not set |
| Referrer-Policy | Not set |

**Recommendation (medium):** Add security headers in `next.config.js` or middleware so that all responses include at least:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY` (or `SAMEORIGIN` if you need to embed the site)
- `Referrer-Policy: strict-origin-when-cross-origin` (or similar)
- `Strict-Transport-Security` (e.g. `max-age=31536000; includeSubDomains`) when the site is served over HTTPS (often done at host/CDN).
- A **Content-Security-Policy** that allows only needed scripts and styles (your domain, Vercel Analytics, GA, Decap/unpkg if used). Start with a policy that doesn’t break the site and tighten gradually.

---

## 4. XSS and HTML handling

| Area | Status | Notes |
|------|--------|--------|
| Contact email body | Good | Escaped before inclusion in HTML email. |
| Blog post content | Caution | `dangerouslySetInnerHTML` used with HTML from `remark().use(remarkHtml)`. `remark-html` does not sanitize; if markdown or front matter ever contained raw HTML/script, it would run. |
| Professional membership | Caution | `membershipHtml` from `markdownToHtml()` (remark) injected via `dangerouslySetInnerHTML`. Same as above. |
| ContentSection | Caution | If content “looks like” HTML (`<`, `<p>`, `<div>`), it is passed **unchanged** into `dangerouslySetInnerHTML`. CMS-authored or imported content could introduce scripts. Plain markdown lines are wrapped in tags but not escaped, so `<script>` in a line could become live script. |
| FAQ schema | Good | `JSON.stringify` for LD+JSON; no user-controlled HTML. |
| OAuth callback script | Caution | `error.message` / `error.stack` and debug `log()` output are injected into HTML via string concat / `innerHTML`; if an error object were ever crafted to include HTML, that could be risky. Prefer text-only or escaped output. |

**Recommendations:**

- **Medium:** Sanitize all HTML that comes from CMS or markdown before rendering (e.g. `rehype-sanitize` in the remark pipeline, or a dedicated HTML sanitizer with an allowlist). Apply to blog, professional-membership, and any ContentSection content that can contain HTML.
- **Medium:** In `ContentSection`, either (1) never pass raw HTML through without sanitization, or (2) escape/sanitize the “markdown” path so that `<`, `>`, `"` in plain text cannot break out into tags or attributes.
- **Low:** In OAuth callback, ensure all dynamic content in the HTML (error messages, log lines) is escaped or rendered as text only.

---

## 5. Authentication & authorization

| Area | Status | Notes |
|------|--------|--------|
| Admin UI | Expected | `/admin` is a client-side app (Decap); auth is via GitHub OAuth. No server-side check that the viewer is “logged in” before serving the admin page HTML; anyone can load the page. Actual content changes require a valid GitHub token accepted by Decap/backend. |
| API routes | Good | `/api/contact` is unauthenticated by design. `/api/auth` and `/api/callback` are part of OAuth; no extra exposure. |
| robots.txt | Good | `disallow: /admin/` and `disallow: /api/` so crawlers are asked not to index those paths. |

**Recommendation (low):** If you want to reduce “noise” and make it harder for casual visitors to discover the admin UI, consider requiring a shared secret (e.g. query param or cookie) to show the admin page at all, or protect `/admin` with a host-level auth (e.g. Vercel Password Protection). This is defense-in-depth; the main protection remains GitHub OAuth and repo access.

---

## 6. Cookies & third-party scripts

| Area | Status | Notes |
|------|--------|--------|
| Cookie consent | Good | GA loaded only after consent; preference stored (e.g. localStorage). |
| GA / gtag | Expected | Third-party script; privacy policy and consent cover it. |
| Decap CMS | Expected | Loaded from unpkg; only on `/admin`. |

**Recommendation (low):** Ensure CSP and Subresource Integrity (SRI) for third-party scripts where feasible (e.g. Decap script) to reduce risk of tampered CDN responses.

---

## 7. Dependencies

| Area | Status | Notes |
|------|--------|--------|
| Next.js, React, Resend, etc. | No audit run | No `npm audit` or similar was run as part of this report. |

**Recommendation (high):** Run `npm audit` (and fix or accept risks) and keep dependencies updated, especially Next.js and any lib that handles user input or network (e.g. Resend).

**Update (Feb 2026):** `npm audit fix` applied; `glob` override to ^10.5.0 added; Next.js and eslint-config-next bumped to 14.2.35. Remaining: 1 high (Next.js DoS via Image Optimizer and HTTP deserialization). Fix requires Next 16 (breaking). Mitigation: `images.unoptimized: true` in next.config disables Image Optimizer, reducing exposure. Plan Next 16 upgrade when feasible.

---

## 8. Data protection (GDPR-aligned)

| Area | Status | Notes |
|------|--------|--------|
| Contact data | Good | Only used to send email and optional confirmation; no storage in app code. Resend’s own processing should be covered in your DPA/privacy docs. |
| Consent | Good | Explicit consent required for contact; marketing optional. |
| Privacy policy | Good | Mentioned in audit scope; ensure it reflects analytics, cookies, and any data sent to Resend/GA. |

No change required for this audit; keep consent and retention in line with your stated policy.

---

## 9. Summary of actions

| Priority | Action |
|----------|--------|
| High | Remove or restrict debug response in `/api/callback` (no raw headers or full URL to client). |
| High | Run `npm audit` and address critical/high issues; schedule dependency updates. |
| Medium | Add security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, HSTS, CSP). |
| Medium | Add rate limiting on `/api/contact`. |
| Medium | Sanitize HTML from CMS/markdown before any `dangerouslySetInnerHTML` (blog, professional-membership, ContentSection). |
| Low | Harden OAuth callback (escape dynamic content in HTML; consider targetOrigin for postMessage). |
| Low | Optional: extra protection for `/admin` (e.g. secret or host-level auth). |

---

This document is a snapshot for the Dragonfly Psychotherapy site. Re-audit after major changes or at least annually.
