import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import styles from './health-anxiety.module.css'

export function generateStaticParams() {
  return []
}

export default function HealthAnxietyPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <h1 className={styles.title}>Health Anxiety</h1>
            <p className={styles.subtitle}>Breaking Free from Health Anxiety</p>

            <div className={styles.content}>
              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>The health anxiety cycle:</h2>
                <ul className={styles.list}>
                  <li>Constant body monitoring</li>
                  <li>Excessive medical information seeking</li>
                  <li>Repeated reassurance seeking</li>
                  <li>Avoidance of health-related triggers</li>
                </ul>
                <p>
                  Health anxiety creates a prison of worry about physical symptoms and potential illness.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>Reframing your awareness:</h2>
                <p>
                  Your attention to health shows you value life and wellbeing. We'll redirect this awareness from fear-based checking to health-promoting behaviours.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>How therapy can help:</h2>
                <p>
                  Breaking free from health anxiety happens differently for everyone. We might explore understanding your particular triggers, developing ways to tolerate uncertainty, or working on reducing checking behaviours - always at your pace. Some clients benefit from understanding the anxiety cycle, others need support sitting with uncomfortable sensations. There's no rushed agenda - we'll work with your readiness for change while respecting your very real fears.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>Breaking free means:</h2>
                <p>
                  You'll develop your own ways of managing health worries and build a relationship with your body based on trust rather than fear. The grip of anxiety loosens as you find your own balance.
                </p>
              </div>
            </div>

            <div className={styles.buttonContainer}>
              <Link href="/#contact" className={styles.button}>
                Start Recovery
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
