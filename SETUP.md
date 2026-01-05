# Dragonfly Psychotherapy Website - Setup Guide

## What's Been Set Up

### ✅ Project Structure
- Next.js 14 with TypeScript
- Static site export configuration
- App Router structure
- Component-based architecture

### ✅ Pages Created
- Homepage (`/`)
- Shop (`/shop`)
- FAQs (`/faqs`)
- Privacy Policy (`/privacy-policy`)
- Blog listing (`/blog`)
- Blog post pages (`/blog/[slug]`)

### ✅ Content Management System
- Decap CMS configuration
- Content collections for:
  - Pages (with sections)
  - Blog posts
  - Reusable sections
- Section-based editing (Hero, Content sections)
- Layout options (text-only, text-image, image-text)
- Enable/disable sections

### ✅ Components
- Navigation (responsive with mobile menu)
- Hero section (multiple layouts)
- Content sections (multiple layouts)
- Footer

### ✅ Deployment
- GitHub Actions workflow for automated FTP deployment
- Configuration for 123.reg hosting

## Next Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Authentication for Decap CMS

**Option A: GitHub Backend (Recommended for 123.reg)**
- Update `public/admin/config.yml` to use `github` backend
- Requires GitHub OAuth app setup
- Users authenticate via GitHub

**Option B: Git Gateway (Requires Netlify)**
- Only works if you use Netlify for hosting
- Not suitable for 123.reg direct hosting

**Option C: Custom Authentication**
- Implement custom auth solution
- More complex but fully customizable

### 3. Configure GitHub Secrets (for deployment)
Add to GitHub repository secrets:
- `FTP_SERVER`
- `FTP_USERNAME`
- `FTP_PASSWORD`

### 4. Add Content
- Create content files in `content/pages/`
- Add blog posts to `content/blog/`
- Upload images to `public/images/`

### 5. Test Locally
```bash
npm run dev
```
Visit `http://localhost:3000` and `http://localhost:3000/admin`

### 6. Build and Deploy
```bash
npm run build
```
The `out/` directory contains the static site ready for deployment.

## Content Structure

### Pages
Pages are stored in `content/pages/` as Markdown files with frontmatter:
```yaml
---
title: Page Title
slug: page-slug
sections:
  - type: hero
    title: Hero Title
    layout: text-only
    enabled: true
  - type: content
    title: Section Title
    content: Markdown content here
    layout: text-image
    enabled: true
---
```

### Blog Posts
Blog posts are in `content/blog/`:
```yaml
---
title: Post Title
slug: post-slug
date: 2024-01-01
published: true
excerpt: Short description
---
Post content in markdown
```

## CMS Features

### Section Management
- **Reorder**: Drag and drop sections in the CMS
- **Toggle**: Enable/disable sections
- **Layouts**: Choose text-only, text-image, or image-text
- **Move between pages**: Copy sections between pages (manual process)

### Hero Layouts
- `text-only`: Centered text
- `text-image`: Text on left, image on right
- `image-text`: Image on left, text on right

### Content Layouts
- Same options as Hero layouts
- Supports markdown content
- Optional images

## Important Notes

1. **Static Export**: The site is configured for static export. All pages must be statically generated.

2. **Images**: Upload images through the CMS. They're stored in `public/images/` and referenced as `/images/filename.jpg`.

3. **Markdown**: Blog posts and content sections support markdown formatting.

4. **Authentication**: Currently configured for git-gateway. You'll need to set up authentication based on your hosting solution.

5. **Deployment**: Automated deployment via GitHub Actions requires FTP credentials in GitHub Secrets.

## Customization

### Styling
- Global styles: `app/globals.css`
- Component styles: `components/*.module.css`
- Color variables defined in `:root` in `globals.css`

### Adding New Sections
1. Create component in `components/`
2. Add to Decap CMS config in `public/admin/config.yml`
3. Update page rendering logic in `app/page.tsx`

## Support

For issues or questions:
1. Check the README.md
2. Review DEPLOYMENT.md for deployment help
3. Check Next.js and Decap CMS documentation

