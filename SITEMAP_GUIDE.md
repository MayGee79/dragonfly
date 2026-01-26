# Sitemap Implementation Guide

## Overview

This document explains the sitemap implementation for the Dragonfly Psychotherapy website. Sitemaps are essential for SEO (Search Engine Optimization) as they help search engines discover, crawl, and index all pages on your website.

## What Are Sitemaps?

Sitemaps are files that list all the pages on your website. There are two types:

1. **XML Sitemap** - For search engines (Google, Bing, etc.)
2. **HTML Sitemap** - For users to navigate your site

## What Has Been Implemented

### 1. XML Sitemap (`app/sitemap.ts`)

**Location:** `app/sitemap.ts`

**What it does:**
- Automatically generates an XML sitemap at `/sitemap.xml`
- Includes all static pages on your website
- Dynamically includes all published blog posts
- Sets appropriate priorities and change frequencies for each page

**How it works:**
- Next.js 14 automatically detects the `sitemap.ts` file
- When a search engine requests `/sitemap.xml`, Next.js generates it on-the-fly
- The sitemap includes:
  - URL of each page
  - Last modified date
  - Change frequency (how often the page is updated)
  - Priority (importance relative to other pages)

**Priority Levels:**
- **1.0** - Homepage (most important)
- **0.9** - Blog listing page
- **0.8** - Main therapy pages (Anxiety, Depression, etc.)
- **0.7** - Services, Shop, FAQs
- **0.6** - Resources, Activities, Book Reviews
- **0.3** - Privacy Policy, Sitemap page

**Change Frequencies:**
- **Weekly** - Homepage, Blog, Shop (frequently updated)
- **Monthly** - Most content pages
- **Yearly** - Privacy Policy (rarely changes)

### 2. HTML Sitemap (`app/sitemap/page.tsx`)

**Location:** `app/sitemap/page.tsx`

**What it does:**
- Creates a user-friendly sitemap page at `/sitemap`
- Organizes all pages into logical sections
- Helps users navigate your website
- Also helps with SEO by providing internal linking

**Sections:**
1. **Main Pages** - All therapy topic pages
2. **Services** - Workshops, Professional Membership, Shop
3. **Resources** - Support resources, Activities, Book Reviews, Testimonials
4. **Blog Posts** - All published blog posts with dates
5. **Information** - Blog listing, FAQs, Privacy Policy

## How to Access

### XML Sitemap (for search engines)
- **URL:** `https://dragonflypreview.vercel.app/sitemap.xml`
- **Production URL:** `https://yourdomain.com/sitemap.xml` (when live)
- This is automatically generated - no manual updates needed

### HTML Sitemap (for users)
- **URL:** `https://dragonflypreview.vercel.app/sitemap`
- **Production URL:** `https://yourdomain.com/sitemap` (when live)
- Users can visit this page to see all available content

## Submitting to Search Engines

### Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (website URL)
3. Navigate to **Sitemaps** in the left menu
4. Enter: `sitemap.xml`
5. Click **Submit**

Google will automatically discover and use your sitemap, but submitting it manually ensures it's processed quickly.

### Bing Webmaster Tools

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your website
3. Navigate to **Sitemaps**
4. Submit: `https://yourdomain.com/sitemap.xml`

## Automatic Updates

### Blog Posts
- New blog posts are **automatically added** to the sitemap when published
- The sitemap reads from your `content/blog/` directory
- Only published posts (with `published: true` in frontmatter) are included

### Static Pages
- Static pages are hardcoded in `app/sitemap.ts`
- If you add a new page route, you'll need to add it to the sitemap manually

## Adding New Pages to the Sitemap

If you add a new page route to your website, update `app/sitemap.ts`:

1. Open `app/sitemap.ts`
2. Add a new entry to the `staticPages` array:

```typescript
{
  url: `${baseUrl}/your-new-page`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.7, // Adjust based on importance
}
```

3. Save the file - the sitemap will update automatically

## Base URL Configuration

The sitemap uses an environment variable for the base URL:

- **Environment Variable:** `NEXT_PUBLIC_SITE_URL`
- **Default:** `https://dragonflypreview.vercel.app`
- **Production:** Set this to your actual domain when going live

### Setting the Production URL

When your site goes live on the final domain:

1. Add to your Vercel environment variables:
   - Variable: `NEXT_PUBLIC_SITE_URL`
   - Value: `https://yourdomain.com`

2. Or update the default in `app/sitemap.ts`:
   ```typescript
   const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'
   ```

## Testing

### Test XML Sitemap Locally
1. Start your dev server: `npm run dev`
2. Visit: `http://localhost:3000/sitemap.xml`
3. You should see the XML sitemap

### Test HTML Sitemap Locally
1. Start your dev server: `npm run dev`
2. Visit: `http://localhost:3000/sitemap`
3. You should see the HTML sitemap page

## Best Practices

1. **Keep it updated** - The sitemap automatically includes blog posts, but remember to add new static pages
2. **Submit to search engines** - Submit your sitemap to Google Search Console and Bing Webmaster Tools
3. **Monitor in Search Console** - Check Google Search Console regularly to see if there are any sitemap errors
4. **Don't include admin pages** - Admin pages (`/admin`) are intentionally excluded from the sitemap

## Troubleshooting

### Sitemap not showing up?
- Make sure the file is named exactly `sitemap.ts` (not `sitemap.tsx`)
- Restart your dev server after creating the file
- Check that the file exports a default function

### Blog posts not appearing?
- Verify blog posts have `published: true` in their frontmatter
- Check that blog posts are in the `content/blog/` directory
- Ensure blog post files have `.md` extension

### Wrong URLs in sitemap?
- Update the `baseUrl` variable in `app/sitemap.ts`
- Or set the `NEXT_PUBLIC_SITE_URL` environment variable

## Files Created

- `app/sitemap.ts` - XML sitemap generator
- `app/sitemap/page.tsx` - HTML sitemap page component
- `app/sitemap/sitemap.module.css` - Styling for HTML sitemap

## Additional Resources

- [Next.js Sitemap Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Google Sitemap Guidelines](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [XML Sitemap Format](https://www.sitemaps.org/protocol.html)

---

**Last Updated:** January 2025
**Maintained by:** Development Team
