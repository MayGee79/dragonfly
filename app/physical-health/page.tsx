import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import styles from './physical-health.module.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Therapy for Physical Health Issues in Surrey',
  description: 'Support when living with physical illness or health concerns with integrative psychotherapy in Surrey and online. Mind and body together.',
  alternates: { canonical: 'https://www.dragonflypsychotherapy.co.uk/physical-health' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Therapy for Physical Health Issues in Surrey | Dragonfly Psychotherapy',
    description: 'Support when living with physical illness with integrative psychotherapy in Surrey and online.',
  },
}

export function generateStaticParams() {
  return []
}

export default function PhysicalHealthPage() {
  return (
    <>
      <Navigation className="home-nav" />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <h1 className={styles.title}>Physical Health Conditions</h1>
            <p className={styles.subtitle}>Living Well with Chronic Illness</p>

            <div className={styles.content}>
              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>Supporting people with:</h2>
                <ul className={styles.list}>
                  <li>Chronic pain conditions</li>
                  <li>Autoimmune conditions</li>
                  <li>Long-term health challenges</li>
                  <li>Cancer journey</li>
                </ul>
                <p>
                  Chronic illness affects far more than physical health - it impacts identity, relationships, and life goals.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>Strengths through adversity:</h2>
                <p>
                  Living with chronic illness develops remarkable resilience, clarity about priorities, and deep appreciation for good moments. We'll acknowledge and build upon these strengths.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>How therapy can help:</h2>
                <p>
                  Living with chronic illness brings different challenges at different times. We might focus on processing diagnosis grief, developing coping strategies for bad days, or exploring identity beyond illness - led by what you need. Some sessions might be about practical symptom management, others about existential questions illness raises. Your energy levels and symptoms guide our work. There's no pressure to be positive or accepting before you're ready.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>Quality of life focus:</h2>
                <p>
                  You'll develop your own ways of living meaningfully within limitations and find what quality of life means for you. Life becomes more than illness management, even when illness remains present.
                </p>
              </div>
            </div>

            <div className={styles.buttonContainer}>
              <Link href="/#contact" className={styles.button}>
                Find Support
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer className="home-footer" />
    </>
  )
}
