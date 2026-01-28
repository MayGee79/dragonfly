import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import './globals.css'

const quicksand = Quicksand({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-quicksand',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://dragonflypreview.vercel.app'),
  title: 'Counselling and Psychotherapy in Surrey | Dragonfly Psychotherapy',
  description: 'Psychotherapy and counselling services in Surrey - Depression, Anxiety, Burn Out, Life Transitions, Impact of Physical Ill Health, Neurodiversity, Self Esteem',
  authors: [{ name: 'Dragonfly Psychotherapy' }],
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

