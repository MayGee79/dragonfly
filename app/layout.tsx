import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import './globals.css'

const quicksand = Quicksand({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-quicksand',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://dragonflypsychotherapy.co.uk'),
  title: {
    default: 'Counselling and Psychotherapy in Surrey | Dragonfly Psychotherapy',
    template: '%s | Dragonfly Psychotherapy',
  },
  description: 'Psychotherapy and counselling in Guildford, East Horsley and Surrey – and online. Depression, anxiety, burnout, life transitions, neurodiversity, self-esteem. Dr Victoria Froome, BACP-registered.',
  authors: [{ name: 'Dragonfly Psychotherapy' }],
  icons: {
    icon: '/favicon.ico',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB">
      <body className={quicksand.variable}>{children}</body>
    </html>
  )
}
