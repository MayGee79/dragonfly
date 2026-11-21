import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import './globals.css'
import ShopNavigation from '@/components/ShopNavigation'
import ShopFooter from '@/components/ShopFooter'
import { META_PIXEL_ID, metaPixelHeadBootstrapScript } from '@/lib/metaPixel'

const ShopCookieConsent = dynamic(() => import('@/components/ShopCookieConsent'), { ssr: false, loading: () => null })

const FALLBACK_SITE_URL = 'https://dragonflyshop.co.uk'

function metadataBaseUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (!raw) return new URL(FALLBACK_SITE_URL)
  try {
    if (/^https?:\/\//i.test(raw)) {
      return new URL(raw)
    }
    return new URL(`http://${raw}`)
  } catch {
    console.warn('[dragonfly-shop] Invalid NEXT_PUBLIC_SITE_URL — using fallback. Value was:', JSON.stringify(raw))
    return new URL(FALLBACK_SITE_URL)
  }
}

const metadataBaseResolved = metadataBaseUrl()

const SITE_DESCRIPTION =
  'Buy handbooks and workbooks by Dr Victoria Froome — Strength Beneath®, RSD Handbook, Starting University, and more. eBook and print editions from Dragonfly Shop (UK).'

export const metadata: Metadata = {
  metadataBase: metadataBaseResolved,
  title: {
    default: 'Dragonfly Shop | Books & Workbooks by Dr Victoria Froome',
    template: '%s | Dragonfly Shop',
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Dragonfly Shop',
    title: 'Dragonfly Shop | Books & Workbooks by Dr Victoria Froome',
    description: SITE_DESCRIPTION,
    url: metadataBaseResolved.href,
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="anonymous" />
        <script
          id="meta-pixel-bootstrap"
          dangerouslySetInnerHTML={{ __html: metaPixelHeadBootstrapScript(META_PIXEL_ID) }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: 'body{margin:0;background:#b9d5d6}',
          }}
        />
      </head>
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <ShopNavigation />
        <main style={{ flex: 1, width: '100%' }}>{children}</main>
        <ShopFooter />
        <ShopCookieConsent />
      </body>
    </html>
  )
}
