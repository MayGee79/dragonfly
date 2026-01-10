import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import styles from './menopause.module.css'

export function generateStaticParams() {
  return []
}

export default function MenopausePage() {
  return (
    <>
      <Navigation />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <h1 className={styles.title}>Menopause & Women's Health</h1>
            <p className={styles.subtitle}>Comprehensive Menopause Support</p>

            <div className={styles.content}>
              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>What you might experience:</h2>
                <ul className={styles.list}>
                  <li>Physical symptoms (hot flushes, sleep disruption, brain fog)</li>
                  <li>Mood changes and anxiety</li>
                  <li>Identity and confidence shifts</li>
                  <li>Workplace challenges</li>
                </ul>
                <p>
                  Menopause is a significant life transition requiring both medical understanding and emotional support.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>Recognising transition strengths:</h2>
                <p>
                  This challenging transition often brings clarity about priorities, freedom from others' expectations, and newfound assertiveness. We'll identify and embrace these emerging strengths.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>How therapy can help:</h2>
                <p>
                  Menopause affects every woman differently. We might focus on practical symptom management, explore identity changes, or address relationship impacts - following what matters most to you. Some clients want medical information and coping strategies, others need space to process the emotional impact. Your therapy might involve problem-solving workplace challenges one session and exploring deeper questions about aging the next. We work with what you bring.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>Supporting your journey:</h2>
                <p>
                  You'll develop your own toolkit for managing symptoms and create a narrative about this life stage that feels authentic to you. The chaos of menopause becomes a transition you navigate on your own terms.
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
