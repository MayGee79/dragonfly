/** @type {import('next').NextConfig} */
const path = require('path')

// Content-Security-Policy for the public site only (NOT /admin or /api).
// Decap CMS (/admin) loads scripts from unpkg and relies on window.opener for
// GitHub OAuth, so it is intentionally excluded to avoid breaking login.
const publicContentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  // 'unsafe-inline' is required for Next.js hydration/inline bootstrap scripts.
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
  "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  'upgrade-insecure-requests',
].join('; ')

const nextConfig = {
  // Vercel hosting: API routes enabled for Decap CMS login
  // trailingSlash: false (default) – avoids 301 redirects so Google indexes pages directly
  trailingSlash: false,
  // Don't advertise the framework to scanners/attackers.
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: '/shop',
        destination: 'https://dragonflyshop.co.uk/',
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
        // Safe headers for every path, including /admin and /api.
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()' },
          // OWASP-recommended value: disable the legacy, buggy XSS auditor.
          { key: 'X-XSS-Protection', value: '0' },
        ],
      },
      {
        // CSP + cross-origin isolation for the public site only. Excludes
        // /admin (Decap CMS) and /api (OAuth popup) so login keeps working.
        source: '/((?!admin|api).*)',
        headers: [
          { key: 'Content-Security-Policy', value: publicContentSecurityPolicy },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
        ],
      },
    ]
  },
}

module.exports = nextConfig

