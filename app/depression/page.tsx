import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import styles from './depression.module.css'

export function generateStaticParams() {
  return []
}

export default function DepressionPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <h1 className={styles.title}>Depression & Low Mood</h1>
            <p className={styles.subtitle}>Finding Your Path Through Depression</p>

            <div className={styles.content}>
              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>What you might be experiencing:</h2>
                <ul className={styles.list}>
                  <li>Persistent low mood or emptiness</li>
                  <li>Loss of interest in previously enjoyed activities</li>
                  <li>Fatigue that doesn't improve with rest</li>
                  <li>Difficulty concentrating or making decisions</li>
                </ul>
                <p>
                  Depression affects every aspect of life - physical, emotional, and social. However, it responds well to appropriate support.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>Recognising hidden strengths:</h2>
                <p>
                  Living with depression requires enormous resilience, even when you can't feel it. The fact you're seeking help shows determination. We'll reconnect with these strengths and build upon them.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>How therapy can help:</h2>
                <p>
                  Your therapy journey might include creating a sense of safety, gently rebuilding routine if that helps, or processing difficult emotions when you're ready. Some clients find cognitive work helpful, others need space to simply be heard and understood. There's no prescribed path - we work with your energy level and what feels manageable. Each session responds to where you are that day.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>Realistic outcomes:</h2>
                <p>
                  Recovery means regaining energy for what matters to you, experiencing genuine moments of pleasure again, and developing your own ways of managing low mood. You'll gain deeper understanding of your emotional patterns on your own terms.
                </p>
              </div>
            </div>

            <div className={styles.buttonContainer}>
              <Link href="/#contact" className={styles.button}>
                Start Your Recovery
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
