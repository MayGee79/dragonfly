import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import styles from './anxiety.module.css'

export function generateStaticParams() {
  return []
}

export default function AnxietyPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <h1 className={styles.title}>Anxiety & Panic</h1>
            <p className={styles.subtitle}>Understanding and Managing Anxiety</p>

            <div className={styles.content}>
              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>What you might be experiencing:</h2>
                <ul className={styles.list}>
                  <li>Persistent worry and racing thoughts</li>
                  <li>Physical symptoms (rapid heartbeat, sweating, shaky hands)</li>
                  <li>Avoidance of situations or places</li>
                  <li>Sleep disruption from overthinking</li>
                </ul>
                <p>
                  Anxiety can feel overwhelming and limiting. With the right support and techniques, you can learn to manage these symptoms and get back to enjoying your life.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>Your strengths within anxiety:</h2>
                <p>
                  Your heightened awareness shows conscientiousness and care. These qualities, when properly directed, become assets rather than sources of distress. We'll work to transform overwhelming vigilance into helpful awareness.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>How therapy can help:</h2>
                <p>
                  Together, we might explore your specific anxiety patterns, develop coping strategies that fit your life, or work on gradually facing feared situations. The pace and focus is always led by you - some sessions might involve learning practical techniques like breathing exercises, others might explore deeper patterns or simply provide space to process your experiences. You bring what you need to bring, and we work with that.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>What progress looks like:</h2>
                <p>
                  You'll develop your own toolkit for managing anxiety. Your world will expand as you feel ready to engage more fully. You'll understand your patterns better and trust your ability to cope with life's challenges.
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
