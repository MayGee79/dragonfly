import type { MetadataRoute } from 'next'
import { clientBooks } from '@/lib/catalog'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://dragonflyshop.co.uk').replace(/\/$/, '')
  const now = new Date()
  const bookPages = clientBooks().map((book) => ({
    url: `${base}/books/${book.bookSlug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ...bookPages,
    { url: `${base}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${base}/faqs`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/cancellation`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
  ]
}
