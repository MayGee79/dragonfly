# Post-Launch Improvements

Improvements implemented after the Dragonfly Psychotherapy site went live at dragonflypsychotherapy.co.uk.

---

## 1. Neurodiversity Page

| What | Fix for homepage "Neurodiversity" card linking to a non-existent page (404). |
|------|-------------------------------------------------------------------------------|
| Implementation | Created dedicated `/neurodiversity` page with ADHD/Autism support content. Updated SpecialInterests link, added to XML and HTML sitemaps. Styling matches other therapy topic pages (anxiety, depression, etc.). |

---

## 2. Workshop Photo Sizing

| What | Workshop section photo was too large. |
|------|--------------------------------------|
| Implementation | Reduced `max-width` to 560px and centred the image in `app/workshops-and-talks/workshops-and-talks.module.css`. |

---

## 3. GitHub Actions FTP Workflow

| What | FTP deploy workflow was failing on every push (missing FTP secrets). |
|------|---------------------------------------------------------------------|
| Implementation | Changed `.github/workflows/deploy.yml` trigger from `on: push` to `on: workflow_dispatch` (manual only). Vercel handles deployment via GitHub integration; FTP deploy kept for optional future use. |

---

## 4. Google Analytics (GA4)

| What | Need to track site traffic. |
|------|-----------------------------|
| Implementation | Added GA4 with Measurement ID `G-39GL2MNTGV`. Traffic data visible in Google Analytics (Reports, Realtime). |

---

## 5. Cookie Consent Banner

| What | GDPR-aligned consent for analytics cookies before loading Google Analytics. |
|------|-----------------------------------------------------------------------------|
| Implementation | Created `components/CookieConsent.tsx` – banner at bottom of page with Accept/Decline. GA loads only after Accept. Preference stored in `localStorage` so banner does not re-show. Links to Privacy Policy. |

---

## 6. Privacy Policy Update (Section 13 – Cookies)

| What | Privacy policy previously said "essential cookies only"; needed to reflect analytics and consent. |
|------|---------------------------------------------------------------------------------------------------|
| Implementation | Updated `app/privacy-policy/page.tsx` Section 13 to describe essential cookies and Google Analytics, and that analytics load only after user accepts via the consent banner. Kept link to Google Analytics opt-out. |

---

## 7. CSS Compatibility

| What | Deprecated `-webkit-overflow-scrolling: touch` was flagged by Microsoft Edge Tools. |
|------|------------------------------------------------------------------------------------|
| Implementation | Removed from `app/workshops-and-talks/workshops-and-talks.module.css`. Modern browsers handle overflow scrolling without it. |

---

## 8. Cleanup – Old Static HTML File

| What | `homepage.html` (old GoDaddy/Starfield export) was in the repo and causing linter warnings. |
|------|---------------------------------------------------------------------------------------------|
| Implementation | Deleted `homepage.html`. The live site is built from Next.js (`app/page.tsx`); the file was unused. |

---

## 9. Documentation Updates

| What | IMPLEMENTATIONS and LAUNCH_CHECKLIST needed to reflect post-launch changes. |
|------|---------------------------------------------------------------------------|
| Implementation | Added "Analytics & Cookie Consent" section to IMPLEMENTATIONS. Updated Privacy notice and Cookies rows. Updated LAUNCH_CHECKLIST Section 6 (Go live) with completed items. Added CookieConsent to Files Touched. |

---

*Document created: January 2026*
