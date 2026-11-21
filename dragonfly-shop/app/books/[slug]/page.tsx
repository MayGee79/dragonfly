import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BookPage from '@/components/BookPage'
import {
  bookSeoDescription,
  bookSeoTitle,
  clientBookBySlug,
  clientBooks,
  priceAmountFromLabel,
  showsComingSoon,
  type ClientBook,
} from '@/lib/catalog'

const FALLBACK_SITE_URL = 'https://dragonflyshop.co.uk'

function siteOrigin(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL).replace(/\/$/, '')
}

export function generateStaticParams() {
  return clientBooks().map((book) => ({ slug: book.bookSlug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const book = clientBookBySlug(params.slug)
  if (!book) return {}
  const title = bookSeoTitle(book)
  const description = bookSeoDescription(book)
  const path = `/books/${book.bookSlug}`
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      title,
      description,
      url: path,
      images: [{ url: book.coverImage, alt: `Cover of ${book.title}` }],
    },
  }
}

function productJsonLd(book: ClientBook) {
  const origin = siteOrigin()
  const url = `${origin}/books/${book.bookSlug}`
  const offers = book.editions
    .map((edition) => {
      const price = priceAmountFromLabel(edition.priceLabel)
      if (!price) return null
      const available = !showsComingSoon(edition)
      return {
        '@type': 'Offer',
        name: edition.formatLabel ?? edition.name,
        url,
        priceCurrency: 'GBP',
        price,
        availability: available
          ? 'https://schema.org/InStock'
          : 'https://schema.org/PreOrder',
        itemCondition: 'https://schema.org/NewCondition',
      }
    })
    .filter((offer): offer is NonNullable<typeof offer> => offer !== null)

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: book.title,
    description: book.teaser,
    image: [`${origin}${book.coverImage}`],
    url,
    brand: {
      '@type': 'Brand',
      name: 'Dragonfly Psychotherapy',
    },
    author: {
      '@type': 'Person',
      name: 'Dr Victoria Froome',
    },
    offers: offers.length === 1 ? offers[0] : offers,
  }
}

export default function BookDetailRoute({ params }: { params: { slug: string } }) {
  const book = clientBookBySlug(params.slug)
  if (!book) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(book)) }}
      />
      <BookPage book={book} />
    </>
  )
}
