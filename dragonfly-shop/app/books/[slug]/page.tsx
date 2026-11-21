import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BookPage from '@/components/BookPage'
import { clientBookBySlug, clientBooks } from '@/lib/catalog'

export function generateStaticParams() {
  return clientBooks().map((book) => ({ slug: book.bookSlug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const book = clientBookBySlug(params.slug)
  if (!book) return {}
  return {
    title: book.title,
    description: book.teaser,
    openGraph: {
      title: book.title,
      description: book.teaser,
      images: [{ url: book.coverImage }],
    },
  }
}

export default function BookDetailRoute({ params }: { params: { slug: string } }) {
  const book = clientBookBySlug(params.slug)
  if (!book) notFound()
  return <BookPage book={book} />
}
