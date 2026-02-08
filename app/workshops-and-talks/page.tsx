import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import styles from './workshops-and-talks.module.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Workshops and Talks',
  description: 'Workshops and talks on anxiety, resilience, burnout, and mental health for schools, parents, and organisations. Surrey and online.',
  openGraph: {
    title: 'Workshops and Talks | Dragonfly Psychotherapy',
    description: 'Workshops and talks on mental health for schools, parents, and organisations.',
  },
}

const workshops = [
  { title: 'Anxiety In Teens Workshop', description: '', linkText: 'Please enquire →' },
  { title: 'Resilience and Confidence in Teens Workshop', description: '', linkText: 'Please enquire →' },
  { title: 'Burnout', description: '', linkText: 'Please enquire →' },
  { title: 'Maintaining Good Mental Health', description: '', linkText: 'Please enquire →' },
  { title: 'For bespoke workshops, get in touch.', description: 'Please feel free to contact me about your requirement as I am able to make a bespoke workshop.', linkText: 'Get in touch →' }
]

export function generateStaticParams() {
  return []
}

export default function WorkshopsAndTalksPage() {
  return (
    <>
      <Navigation className="home-nav" />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <h1 className={styles.title}>Workshops and Talks</h1>

            <div className={styles.heroImage}>
              <img src="/images/Workshops_001.png" alt="Workshops and talks illustration" className={styles.heroImg} />
            </div>

            <div className={styles.grid}>
              {workshops.map((workshop, index) => (
                <Link key={index} href="/#contact" className={styles.workshopCard}>
                  <h2 className={styles.cardTitle}>{workshop.title}</h2>
                  <p className={styles.cardQuote}>{workshop.description || '\u00A0'}</p>
                  <span className={styles.cardLink}>{workshop.linkText}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer className="home-footer" />
    </>
  )
}
