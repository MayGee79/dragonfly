import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import styles from './workshops-and-talks.module.css'

export function generateStaticParams() {
  return []
}

export default function WorkshopsAndTalksPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <h1 className={styles.title}>Workshops and Talks</h1>

            <div className={styles.content}>
              <div className={styles.workshopCard}>
                <h2 className={styles.heading}>Anxiety In Teens Workshop</h2>
                <p className={styles.description}>Please enquire.</p>
              </div>

              <div className={styles.workshopCard}>
                <h2 className={styles.heading}>Resilience and Confidence in Teens Workshop</h2>
                <p className={styles.description}>Please enquire.</p>
              </div>

              <div className={styles.workshopCard}>
                <h2 className={styles.heading}>More Coming Soon</h2>
                <p className={styles.description}>
                  Please feel free to contact me about your requirement as I am able to make a bespoke workshop.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
