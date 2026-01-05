# Quick Start Guide - View Your Website

## Step 1: Install Dependencies

Open your terminal and run:

```bash
cd /Users/martagiardina/Dragonfly
npm install
```

If you get npm log errors, you can ignore them or try:
```bash
npm install --no-audit --no-fund
```

## Step 2: Start Development Server

Once dependencies are installed, run:

```bash
npm run dev
```

You should see output like:
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Ready in X seconds
```

## Step 3: View Your Website

1. Open your web browser
2. Go to: **http://localhost:3000**
3. You should see your Dragonfly Psychotherapy website!

## Step 4: View CMS Admin Panel

1. In your browser, go to: **http://localhost:3000/admin**
2. You'll see the Decap CMS login interface
3. Note: Full CMS functionality requires GitHub OAuth setup (see GITHUB_OAUTH_SETUP.md)

## Available Pages

- **Homepage**: http://localhost:3000/
- **Shop**: http://localhost:3000/shop
- **FAQs**: http://localhost:3000/faqs
- **Privacy Policy**: http://localhost:3000/privacy-policy
- **Blog**: http://localhost:3000/blog
- **CMS Admin**: http://localhost:3000/admin

## Troubleshooting

### npm install fails
- Make sure you have Node.js installed (version 18 or higher)
- Check: `node --version`
- If needed, install Node.js from https://nodejs.org/

### Port 3000 already in use
- The dev server will automatically try the next available port (3001, 3002, etc.)
- Or stop the process using port 3000 and try again

### "Cannot find module" errors
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again

### Website looks broken
- Check the browser console for errors (F12 → Console tab)
- Make sure all dependencies installed correctly
- Try stopping the server (Ctrl+C) and restarting with `npm run dev`

## Building for Production

To create a production build:

```bash
npm run build
```

This creates a static site in the `out/` directory that can be deployed to any web host.

