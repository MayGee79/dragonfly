import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CATALOG } from '@/lib/catalog'
import FreeDownloadFlow from './FreeDownloadFlow'
import styles from './FreeGuide.module.css'

function freeItemBySlug(slug: string) {
  return CATALOG.find((item) => item.isFree && item.slug === slug)
}

export function generateStaticParams() {
  return CATALOG.filter((item) => item.isFree).map((item) => ({ slug: item.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = freeItemBySlug(params.slug)
  if (!item) return {}
  return {
    title: item.name,
    description: item.shortDescription,
  }
}

export default function FreeGuidePage({ params }: { params: { slug: string } }) {
  const item = freeItemBySlug(params.slug)
  if (!item) notFound()

  return (
    <div className={styles.wrap}>
      <Link href="/" className={styles.backLink}>
        &larr; Back to the shop
      </Link>

      <article className={styles.card}>
        <div className={styles.coverWrap}>
          <Image
            src={item.coverImage}
            alt={`Cover of ${item.name}`}
            width={220}
            height={293}
            className={styles.coverImg}
            priority
          />
        </div>

        <div className={styles.body}>
          <span className={styles.freeBadge}>FREE</span>
          <h1 className={styles.title}>{item.name}</h1>
          <p className={styles.desc}>{item.shortDescription}</p>
          <FreeDownloadFlow catalogId={item.id} />
        </div>
      </article>
    </div>
  )
}
