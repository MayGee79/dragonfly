import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getWorkshopsPage } from '@/lib/content'
import WorkshopGallery from './WorkshopGallery'
import styles from './workshops-and-talks.module.css'
import type { Metadata } from 'next'

export function generateMetadata(): Metadata {
  const page = getWorkshopsPage()
  return {
    title: page?.title || 'Workshops and Talks',
    description: page?.metaDescription || 'Workshops and talks on anxiety, resilience, burnout, and mental health for schools, parents, and organisations. Surrey and online.',
    openGraph: {
      title: `${page?.title || 'Workshops and Talks'} | Dragonfly Psychotherapy`,
      description: page?.metaDescription || 'Workshops and talks on mental health for schools, parents, and organisations.',
    },
  }
}

export function generateStaticParams() {
  return []
}

export default function WorkshopsAndTalksPage() {
  const page = getWorkshopsPage()
  const workshops = page?.workshops ?? []
  const heroImage = page?.heroImage || '/images/Workshops_001.png'

  return (
    <>
      <Navigation className="home-nav" />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <h1 className={styles.title}>{page?.title || 'Workshops and Talks'}</h1>

            <WorkshopGallery
              images={[
                { src: heroImage.startsWith('/') ? heroImage : `/${heroImage}`, alt: 'Workshops and talks' },
                { src: '/images/Workshops_002.png', alt: 'Workshop with worry cards and activities' },
                { src: '/images/Workshops_003.png', alt: 'Workshop group at the table' },
                { src: '/images/Workshops_004.png', alt: 'Workshop materials and feeling wheel' },
              ]}
            />

            <div className={styles.grid}>
              {workshops.map((workshop, index) => (
                <Link key={index} href="/#contact" className={styles.workshopCard}>
                  <h2 className={styles.cardTitle}>{workshop.title}</h2>
                  <p className={styles.cardQuote}>{workshop.description || '\u00A0'}</p>
                  <span className={styles.cardLink}>{workshop.linkText}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer className="home-footer" />
    </>
  )
}
