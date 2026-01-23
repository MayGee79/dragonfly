/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to allow API routes for admin authentication
  // Vercel will handle static optimization automatically
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

