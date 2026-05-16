/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  // Vercel hosting: API routes enabled for Decap CMS login
  // trailingSlash: false (default) – avoids 301 redirects so Google indexes pages directly
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/shop',
        destination: 'https://dragonflybooks.co.uk/',
        permanent: true,
      },
    ]
  },
  experimental: {
    optimizeCss: true, // inline critical CSS, may only apply to Pages Router / static export
  },
  images: {
    unoptimized: false,
    // Match display sizes so PageSpeed gets smaller files (hero 260px, About Me 525px)
    deviceSizes: [260, 384, 512, 525, 640, 665, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Allow blog featured images from external CDNs (Next optimizes & serves from our origin → fewer third-party requests, smaller payloads)
    remotePatterns: [
      { protocol: 'https', hostname: 'img1.wsimg.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'shop.charliemackesy.com', port: '', pathname: '/**' },
    ],
  },
  webpack(config) {
    // Reduce "Legacy JavaScript" warnings by removing Next's legacy polyfill bundle.
    // WARNING: This drops support for older browsers that rely on these polyfills.
    const emptyPolyfills = path.resolve(__dirname, 'lib/modern-polyfill.js')
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '../build/polyfills/polyfill-module': emptyPolyfills,
      '../build/polyfills/polyfill-module.js': emptyPolyfills,
      'next/dist/build/polyfills/polyfill-module': emptyPolyfills,
      'next/dist/build/polyfills/polyfill-module.js': emptyPolyfills,
    }
    return config
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
        ],
      },
    ]
  },
}

module.exports = nextConfig

