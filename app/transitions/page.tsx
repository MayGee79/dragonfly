import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import styles from './transitions.module.css'

export function generateStaticParams() {
  return []
}

export default function TransitionsPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <h1 className={styles.title}>Life Transitions</h1>
            <p className={styles.subtitle}>Navigating Significant Change</p>

            <div className={styles.content}>
              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>Common transitions include:</h2>
                <ul className={styles.list}>
                  <li>Relationship changes (divorce, marriage, loss)</li>
                  <li>Career shifts or retirement</li>
                  <li>Health diagnoses</li>
                  <li>Family dynamics changes</li>
                </ul>
                <p>
                  Major life transitions can destabilise your sense of identity and direction. Professional support helps navigate these challenging periods.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>Finding strength in change:</h2>
                <p>
                  Transitions, while difficult, reveal adaptability and resilience you may not have known you possessed. We'll identify and build upon these emerging capabilities.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>How therapy can help:</h2>
                <p>
                  Transitions affect everyone differently. We might explore the grief that comes with endings, work through practical decisions, or focus on identity questions - whatever feels most pressing for you. Some clients need help making sense of changes, others need support tolerating uncertainty. Your therapy might involve processing emotions one week and problem-solving the next. We'll adapt to what each stage of transition brings up for you.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>Moving through transition:</h2>
                <p>
                  You'll develop your own ways of managing uncertainty and build confidence for your next chapter at a pace that feels right. The overwhelming nature of change becomes more manageable as you find your footing.
                </p>
              </div>
            </div>

            <div className={styles.buttonContainer}>
              <Link href="/#contact" className={styles.button}>
                Get Support
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
