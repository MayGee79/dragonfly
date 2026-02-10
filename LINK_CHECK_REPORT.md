# Website link check report

Checked: internal routes, anchor links, and static assets.

---

## Internal page routes

All of these routes have a matching `app/.../page.tsx` and are **OK**:

| Link | Route exists |
| ------ | ---------------- |
| `/` | ✅ app/page.tsx |
| `/anxiety` | ✅ app/anxiety/page.tsx |
| `/depression` | ✅ app/depression/page.tsx |
| `/burnout` | ✅ app/burnout/page.tsx |
| `/transitions` | ✅ app/transitions/page.tsx |
| `/menopause` | ✅ app/menopause/page.tsx |
| `/health-anxiety` | ✅ app/health-anxiety/page.tsx |
| `/physical-health` | ✅ app/physical-health/page.tsx |
| `/self-esteem` | ✅ app/self-esteem/page.tsx |
| `/rejection-sensitive-dysphoria` | ✅ app/rejection-sensitive-dysphoria/page.tsx |
| `/young-people` | ✅ app/young-people/page.tsx |
| `/neurodiversity` | ✅ app/neurodiversity/page.tsx |
| `/shop` | ✅ app/shop/page.tsx |
| `/faqs` | ✅ app/faqs/page.tsx |
| `/professional-membership` | ✅ app/professional-membership/page.tsx |
| `/testimonials` | ✅ app/testimonials/page.tsx |
| `/support-and-resources` | ✅ app/support-and-resources/page.tsx |
| `/activities-and-tools` | ✅ app/activities-and-tools/page.tsx |
| `/workshops-and-talks` | ✅ app/workshops-and-talks/page.tsx |
| `/blog` | ✅ app/blog/page.tsx |
| `/blog/[slug]` | ✅ app/blog/[slug]/page.tsx (dynamic) |
| `/privacy-policy` | ✅ app/privacy-policy/page.tsx |
| `/sitemap` | ✅ app/sitemap/page.tsx |
| `/admin` | ✅ app/admin/[[...slug]]/page.tsx |
| `/contact/thank-you` | ✅ app/contact/thank-you/page.tsx |

---

## Homepage anchor links

All targets exist on the home page (in components):

| Link | Target ID | Location |
| ------ | ----------- | ----------- |
| `/#contact` | `id="contact"` | ✅ Contact.tsx |
| `/#work-together` | `id="work-together"` | ✅ WorkTogether.tsx |
| `/#special-interests` | `id="special-interests"` | ✅ SpecialInterests.tsx |
| `/#practical-info` | `id="practical-info"` | ✅ PracticalInfo.tsx |
| `/#about-me` | `id="about-me"` | ✅ AboutMe.tsx |
| `/#blog-preview` | `id="blog-preview"` | ✅ BlogPreview.tsx |
| `/#workshops` | `id="workshops"` | ✅ Workshops.tsx |
| `/#why-work-with-me` | `id="why-work-with-me"` | ✅ WhyWorkWithMe.tsx |

---

## Activities and Tools page anchors

All targets exist on the same page:

| Link | Target ID |
| ------ | ----------- |
| `#understanding-anxiety` | ✅ section id |
| `#mindfulness` | ✅ section id |
| `#what-is-resilience` | ✅ section id |
| `#printable-resources` | ✅ section id |
| `#mindful-colouring` | ✅ subheading id |
| `#dot-to-dot` | ✅ subheading id |
| `#word-searches` | ✅ subheading id |

---

## Static files (PDFs / resources)

| Link | File exists |
| ------ | ------------- |
| `/resources/Mindful-Dot-to-Dots.pdf` | ✅ public/resources/Mindful-Dot-to-Dots.pdf |
| `/resources/Therapeutic-Wordsearch-Collection.pdf` | ✅ public/resources/Therapeutic-Wordsearch-Collection.pdf |
| `/resources/Surrey-Children-Young-People-Resources-Guide-January-2026.pdf` | ✅ public/resources/... (PDF exists) |

---

## Special Interests cards (from CMS)

Links from `content/homepage/special-interests.md` all point to the internal routes listed above and match existing `app/.../page.tsx` routes. **OK.**

---

## External links (not verified for reachability)

These are left as-is; only presence and format were checked:

- Analytics: `https://analytics.google.com/...`
- Hub of Hope: `https://hubofhope.co.uk`
- Mind: `https://www.mind.org.uk/`
- Anxiety UK: `https://anxietyuk.org.uk`
- NHS, BACP, Google Maps, tel:, mailto:
- Social: Facebook, Instagram, LinkedIn, Substack
- maiven.org.uk, product links from Shop (CMS)

---

## Summary

- **Internal routes:** All checked; all have a matching page.
- **Homepage anchors:** All targets exist.
- **Activities and Tools anchors:** All targets exist.
- **Resource PDFs:** All linked files exist under `public/resources/`.
- **Optional:** Fix the “Minful” → “Mindful” typo in the PDF filename and in the link if you want the name to be correct (link will need updating after rename).

No broken internal or anchor links were found.
