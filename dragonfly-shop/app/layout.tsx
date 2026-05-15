import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import './globals.css'
import ShopNavigation from '@/components/ShopNavigation'
import ShopFooter from '@/components/ShopFooter'

const ShopCookieConsent = dynamic(() => import('@/components/ShopCookieConsent'), { ssr: false })

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dragonflyshop.co.uk'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Dragonfly Shop',
    template: '%s | Dragonfly Shop',
  },
  description:
    'Buy Dragonfly Psychotherapy handbooks and workbooks directly — RSD Handbook and Companion Workbook (eBook and paperback).',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Dragonfly Shop',
    title: 'Dragonfly Shop',
    description:
      'Buy Dragonfly Psychotherapy handbooks and workbooks directly — RSD Handbook and Companion Workbook (eBook and paperback).',
    url: baseUrl,
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <style
          dangerouslySetInnerHTML={{
            __html: 'body{margin:0;background:#b9d5d6}',
          }}
        />
      </head>
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <ShopNavigation />
        <main style={{ flex: 1 }}>{children}</main>
        <ShopFooter />
        <ShopCookieConsent />
      </body>
    </html>
  )
}
