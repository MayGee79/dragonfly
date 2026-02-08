import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import styles from './neurodiversity.module.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Neurodiversity (ADHD/Autism)',
  description: 'Support for neurodivergent individuals with integrative psychotherapy in Surrey and online. ADHD, autism, late diagnosis, masking, and celebrating neurodivergent strengths.',
  openGraph: {
    title: 'Neurodiversity (ADHD/Autism) | Dragonfly Psychotherapy',
    description: 'Support for neurodivergent individuals with integrative psychotherapy in Surrey and online.',
  },
}

export function generateStaticParams() {
  return []
}

export default function NeurodiversityPage() {
  return (
    <>
      <Navigation className="home-nav" />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <h1 className={styles.title}>Neurodiversity (ADHD/Autism)</h1>
            <p className={styles.subtitle}>Support for Neurodivergent Individuals</p>

            <div className={styles.content}>
              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>Common experiences include:</h2>
                <ul className={styles.list}>
                  <li>Feeling different without understanding why</li>
                  <li>Exhaustion from masking in social situations</li>
                  <li>Executive function challenges</li>
                  <li>Late diagnosis processing</li>
                </ul>
                <p>
                  Your neurodivergent brain brings unique strengths and faces specific challenges. Therapy provides understanding and practical strategies.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>Celebrating neurodivergent strengths:</h2>
                <p>
                  ADHD brings creativity, energy, and innovative thinking. Autism brings attention to detail, integrity, and deep focus. We'll identify your specific strengths and learn to leverage them effectively.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>How therapy can help:</h2>
                <p>
                  Neurodivergent clients often have specific needs and preferences. We might work on practical strategies for executive function, explore the impact of masking, or process the emotions of late diagnosis - guided entirely by your priorities. Some clients want structured skill-building, others need space to explore identity. Sessions can be adjusted to your sensory needs and communication style. There's no "right" way to do therapy - we'll find what works for your unique brain.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>What support achieves:</h2>
                <p>
                  You'll gain deeper self-understanding on your terms, develop strategies that actually work with your wiring, and build authentic connections. The shame of being "different" can transform into appreciation for your unique perspective.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer className="home-footer" />
    </>
  )
}
