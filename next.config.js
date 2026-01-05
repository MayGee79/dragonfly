/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Disable static optimization for dynamic routes if needed
  // But for static export, all pages must be statically generated
}

module.exports = nextConfig

