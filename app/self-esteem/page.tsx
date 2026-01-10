import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import styles from './self-esteem.module.css'

export function generateStaticParams() {
  return []
}

export default function SelfEsteemPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <h1 className={styles.title}>Self-Esteem & Personal Growth</h1>
            <p className={styles.subtitle}>Building Authentic Confidence</p>

            <div className={styles.content}>
              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>Growth areas include:</h2>
                <ul className={styles.list}>
                  <li>Overcoming self-doubt</li>
                  <li>Developing self-compassion</li>
                  <li>Setting healthy boundaries</li>
                  <li>Finding authentic voice</li>
                </ul>
                <p>
                  Sometimes we seek therapy not for crisis, but for growth - to become more fully ourselves.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>Recognising existing strengths:</h2>
                <p>
                  Self-reflection shows wisdom. Desire for growth shows courage. Sensitivity to others shows emotional intelligence. We'll build upon these existing strengths.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>How therapy can help:</h2>
                <p>
                  Personal growth work is deeply individual. We might explore limiting beliefs, work on boundary-setting, or develop self-compassion practices - following your interests and readiness. Some clients want structured skill-building, others prefer open exploration of possibilities. Your therapy might be focused on specific goals or broadly exploring who you're becoming. There's no blueprint for growth - we'll discover your unique path together.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>Personal growth outcomes:</h2>
                <p>
                  You'll develop genuine self-acceptance in ways that feel authentic to you and make decisions increasingly aligned with your values. Inner wisdom strengthens as you learn to trust yourself.
                </p>
              </div>
            </div>

            <div className={styles.buttonContainer}>
              <Link href="/#contact" className={styles.button}>
                Begin Growing
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
