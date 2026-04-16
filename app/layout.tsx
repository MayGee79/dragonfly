import type { Metadata } from 'next'
import { headers } from 'next/headers'
import dynamic from 'next/dynamic'
import './globals.css'

// Load in separate chunk so cookie banner JS doesn't add to initial long task (Lighthouse TBT)
const CookieConsent = dynamic(() => import('@/components/CookieConsent'), { ssr: false })
const AnalyticsLoader = dynamic(() => import('@/components/AnalyticsLoader'), { ssr: false })

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dragonflypsychotherapy.co.uk'

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || '/'
  const pathNoSlash = pathname === '/' ? '' : pathname.replace(/\/$/, '') || ''
  const canonicalUrl = `${baseUrl}${pathNoSlash || '/'}`

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: 'Counselling and Psychotherapy in Surrey | Dragonfly Psychotherapy',
      template: '%s | Dragonfly Psychotherapy',
    },
    description: 'Psychotherapy and counselling in Guildford, East Horsley and Surrey – and online. Depression, anxiety, burnout, life transitions, neurodiversity, self-esteem. Dr Victoria Froome, BACP-registered.',
    authors: [{ name: 'Dragonfly Psychotherapy' }],
    icons: {
      icon: '/favicon.ico',
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      siteName: 'Dragonfly Psychotherapy',
      title: 'Counselling and Psychotherapy in Surrey | Dragonfly Psychotherapy',
      description: 'Psychotherapy and counselling in Guildford, East Horsley and Surrey – and online. Dr Victoria Froome, BACP-registered.',
      images: [{ url: '/images/dragonfly_logo_blue.png', width: 1200, height: 630, alt: 'Dragonfly Psychotherapy' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Counselling and Psychotherapy in Surrey | Dragonfly Psychotherapy',
      description: 'Psychotherapy and counselling in Guildford, East Horsley and Surrey – and online. Dr Victoria Froome, BACP-registered.',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB">
      <head>
        {/* Preconnect for blog images and GA (used on blog pages / after cookie consent); Lighthouse may flag "unused" on homepage only */}
        <link rel="preconnect" href="https://img1.wsimg.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        {/* Inline critical CSS so first paint shows correct colors before external CSS loads (reduces perceived LCP delay) */}
        <style
          dangerouslySetInnerHTML={{
            __html: 'body{margin:0;background:#eef5f6}[data-hero]{background:#2d3758}',
          }}
        />
      </head>
      <body>
        {children}
        <CookieConsent />
        {process.env.NODE_ENV === 'production' && <AnalyticsLoader />}
      </body>
    </html>
  )
}
