/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for 123.reg FTP deploy: build produces out/ for upload to dragonflypsychotherapy.co.uk
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

