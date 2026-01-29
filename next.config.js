/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel hosting: API routes enabled for Decap CMS login
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

