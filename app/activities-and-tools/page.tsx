import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import styles from './activities-and-tools.module.css'
import type { Metadata } from 'next'
import ResourceDownloadGate from '@/components/ResourceDownloadGate'

export const metadata: Metadata = {
  title: 'Activities and Tools',
  description: 'Self-help resources, mindfulness exercises, and printable tools from Dragonfly Psychotherapy. Anxiety, resilience, and wellbeing support.',
  openGraph: {
    title: 'Activities and Tools | Dragonfly Psychotherapy',
    description: 'Self-help resources, mindfulness exercises, and printable tools for anxiety and wellbeing.',
  },
}

export function generateStaticParams() {
  return []
}

export default function ActivitiesAndToolsPage() {
  return (
    <>
      <Navigation className="home-nav" />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <h1 className={styles.title}>Activities and Tools</h1>
          </div>
        </section>

        <section id="printable-resources" className={`${styles.contentSection} ${styles.contentSectionLight}`}>
          <div className={styles.contentSectionInner}>
            <h2 className={styles.contentTitle}>Printable Resources</h2>
            <p className={styles.contentIntro}>
              Downloads and worksheets to support your practice. Click a card to download.
            </p>

            <ResourceDownloadGate>
              <div className={styles.resourceCardsGrid}>
                <div className={styles.resourceCard} id="mindful-colouring">
                  <div className={styles.resourceCardDetails}>
                    <p className={styles.resourceCardTitle}>Mindful Colouring</p>
                    <p className={styles.resourceCardBody}>Mindful colouring sheets to support focus and relaxation.</p>
                  </div>
                  <a href="/resources/paint_splatter.pdf" target="_blank" rel="noopener noreferrer" className={styles.resourceCardButton} download>Download</a>
                </div>

                <div className={styles.resourceCard} id="dot-to-dot">
                  <div className={styles.resourceCardDetails}>
                    <p className={styles.resourceCardTitle}>Dot to Dot</p>
                    <p className={styles.resourceCardBody}>Printable dot-to-dot activities for focused, calming attention.</p>
                  </div>
                  <a href="/resources/Mindful-Dot-to-Dots.pdf" target="_blank" rel="noopener noreferrer" className={styles.resourceCardButton} download>Download</a>
                </div>

                <div className={styles.resourceCard} id="word-searches">
                  <div className={styles.resourceCardDetails}>
                    <p className={styles.resourceCardTitle}>Word Searches</p>
                    <p className={styles.resourceCardBody}>Therapeutic word searches to support reflection and relaxation.</p>
                  </div>
                  <a href="/resources/Therapeutic-Wordsearch-Collection.pdf" target="_blank" rel="noopener noreferrer" className={styles.resourceCardButton} download>Download</a>
                </div>

                <div className={styles.resourceCard} id="reflective-journal">
                  <div className={styles.resourceCardDetails}>
                    <p className={styles.resourceCardTitle}>Reflective Journal</p>
                    <p className={styles.resourceCardBody}>A printable journal to support reflection and self-awareness.</p>
                  </div>
                  <a href="/resources/Reflective-Journal.pdf" target="_blank" rel="noopener noreferrer" className={styles.resourceCardButton} download>Download</a>
                </div>
              </div>
            </ResourceDownloadGate>
          </div>
        </section>
      </main>
      <Footer className="home-footer" />
    </>
  )
}
