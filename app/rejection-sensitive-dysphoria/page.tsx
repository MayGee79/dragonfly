import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import styles from './rejection-sensitive-dysphoria.module.css'

export function generateStaticParams() {
  return []
}

export default function RejectionSensitiveDysphoriaPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <h1 className={styles.title}>Rejection Sensitive Dysphoria (RSD)</h1>
            <p className={styles.subtitle}>When Rejection Feels Unbearable</p>

            <div className={styles.content}>
              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>What you might be experiencing:</h2>
                <ul className={styles.list}>
                  <li>Intense emotional pain from criticism or perceived rejection</li>
                  <li>Avoiding opportunities to prevent possible disapproval</li>
                  <li>Replaying interactions, searching for hidden negative meanings</li>
                  <li>Physical sensations like chest tightness when triggered</li>
                </ul>
                <p>
                  RSD isn't simply being "sensitive" – it's experiencing rejection so intensely it can feel physical. Common alongside ADHD and autism, though many people experience it without any diagnosis. Your reactions aren't overreaction; your brain simply processes social feedback differently.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>Recognising hidden strengths:</h2>
                <p>
                  Your sensitivity also means deep empathy, strong awareness of others' needs, and genuine care about relationships. These are valuable qualities. We'll work on protecting yourself from the painful aspects while honouring what your sensitivity brings.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>How therapy can help:</h2>
                <p>
                  We'll map your specific triggers and build practical tools for those overwhelming moments – grounding techniques, reality-checking strategies, and self-compassion practices that actually work. Some clients need help separating perceived rejection from real feedback; others want to reduce the avoidance that's limiting their life. We work at your pace, validating your experience while building resilience.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>Realistic outcomes:</h2>
                <p>
                  Recovery doesn't mean never feeling rejection intensely – that sensitivity may always be part of you. Instead, you'll recover from triggers more quickly, take risks despite the fear, and build a sense of self-worth that isn't dependent on others' approval. You'll develop your own toolkit for the difficult moments.
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
