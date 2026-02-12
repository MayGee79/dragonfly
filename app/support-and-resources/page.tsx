import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import styles from './support-and-resources.module.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Support and Resources',
  description: 'National and local mental health resources from Dragonfly Psychotherapy. Hub of Hope, Surrey Children & Young People guide, and more.',
  openGraph: {
    title: 'Support and Resources | Dragonfly Psychotherapy',
    description: 'National and local mental health resources and support links.',
  },
}

export function generateStaticParams() {
  return []
}

export default function SupportAndResourcesPage() {
  return (
    <>
      <Navigation className="home-nav" />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <h1 className={styles.title}>Support and Resources</h1>

            <div className={styles.grid}>
              <Link
                href="https://hubofhope.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
              >
                <h2 className={styles.cardTitle}>Hub of Hope</h2>
                <p className={styles.cardQuote}>
                  A national resource list with NHS, charitable and private organisations. Search by area or service type.
                </p>
                <span className={styles.cardLink}>Visit hubofhope.co.uk →</span>
              </Link>

              <Link
                href="/resources/Surrey-Children-Young-People-Resources-Guide-January-2026.pdf"
                className={styles.card}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className={styles.cardTitle}>Local Resource List</h2>
                <p className={styles.cardQuote}>
                  Surrey Children &amp; Young People Resources Guide (January 2026) - support and services for children and young people.
                </p>
                <span className={styles.cardLink}>Download guide →</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer className="home-footer" />
    </>
  )
}
