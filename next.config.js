/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  // Vercel hosting: API routes enabled for Decap CMS login
  // trailingSlash: false (default) – avoids 301 redirects so Google indexes pages directly
  trailingSlash: false,
  images: {
    unoptimized: true,
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

