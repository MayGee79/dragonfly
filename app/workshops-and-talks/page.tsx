import Link from 'next/link'
import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getWorkshopsPage } from '@/lib/content'
import styles from './workshops-and-talks.module.css'
import type { Metadata } from 'next'
import { capMetaDescription } from '@/lib/seo'

// Load gallery in a separate chunk so it doesn't block the page; image loads only when this chunk is in view
const WorkshopGallery = dynamic(() => import('./WorkshopGallery'), {
  ssr: true,
  loading: () => <div className={styles.galleryPlaceholder} aria-hidden="true" />,
})

export function generateMetadata(): Metadata {
  const page = getWorkshopsPage()
  const description = capMetaDescription(
    page?.metaDescription ||
      'Workshops and talks on anxiety, resilience, burnout, and mental health for schools, parents, and organisations. Surrey and online.',
  )
  const title = 'Workshops & Talks on Mental Health in Surrey'
  return {
    title,
    description,
    openGraph: {
      title: `${title} | Dragonfly Psychotherapy`,
      description,
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
                { src: '/images/workshop-gallery-01.png', alt: 'Sunflower artworks from a workshop at the table' },
                { src: '/images/workshop-gallery-02.png', alt: 'Workshop table with strength cards, tree of life worksheets and materials' },
                { src: '/images/workshop-gallery-03.png', alt: 'Strength Cards for Adolescents and Tree of Life activity at Dragonfly Psychotherapy' },
                { src: '/images/workshop-gallery-04.png', alt: 'Workshop facilitator with strength cards and materials' },
                { src: '/images/workshop-gallery-05.png', alt: 'I feel and I have achieved whiteboard from a session at West Horsley Place' },
                { src: '/images/workshop-gallery-06.png', alt: 'Group discussion around the workshop table' },
                { src: '/images/workshop-gallery-07.png', alt: 'Creative workshop with paints and strength cards' },
                { src: '/images/workshop-gallery-08.png', alt: 'Painting and reflection activity at the workshop' },
                { src: '/images/workshop-gallery-09.png', alt: 'Values cards and workshop materials at the table' },
                { src: '/images/workshop-gallery-10.png', alt: 'Workshop space set up for sessions' },
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
