/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel hosting: API routes enabled for Decap CMS login
  // trailingSlash: false (default) – avoids 301 redirects so Google indexes pages directly
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

