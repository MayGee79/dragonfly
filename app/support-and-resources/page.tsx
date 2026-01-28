import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import styles from './support-and-resources.module.css'

export function generateStaticParams() {
  return []
}

export default function SupportAndResourcesPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <h1 className={styles.title}>Support and Resources</h1>

            <div className={styles.content}>
              <div className={styles.resourceCard}>
                <h2 className={styles.heading}>Hub of Hope</h2>
                <p className={styles.description}>
                  The hub of hope is a fantastic national resource list which has details of NHS, charitable and private organisations that you may find useful. You can search it by area or service type.
                </p>
                <Link 
                  href="https://hubofhope.co.uk" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.link}
                >
                  https://hubofhope.co.uk
                </Link>
              </div>

              <div className={styles.resourceCard}>
                <h2 className={styles.heading}>Local Resource List</h2>
                <p className={styles.description}>
                  Surrey Children &amp; Young People Resources Guide (January 2026) — a local guide to support and services for children and young people.
                </p>
                <Link 
                  href="/resources/Surrey-Children-Young-People-Resources-Guide-January-2026.docx" 
                  className={styles.link}
                  download
                >
                  Download Surrey Children &amp; Young People Resources Guide (January 2026)
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
