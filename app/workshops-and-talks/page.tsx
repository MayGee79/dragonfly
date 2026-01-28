import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import styles from './workshops-and-talks.module.css'

const workshops = [
  { title: 'Anxiety In Teens Workshop', description: 'Please enquire.' },
  { title: 'Resilience and Confidence in Teens Workshop', description: 'Please enquire.' },
  { title: 'Burnout', description: 'Please enquire.' },
  { title: 'Maintaining good mental health', description: 'Please enquire.' },
  { title: 'For bespoke workshops, get in touch.', description: 'Please feel free to contact me about your requirement as I am able to make a bespoke workshop.' }
]

export function generateStaticParams() {
  return []
}

export default function WorkshopsAndTalksPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <h1 className={styles.title}>Workshops and Talks</h1>

            <div className={styles.grid}>
              {workshops.map((workshop, index) => (
                <Link key={index} href="/#contact" className={styles.workshopCard}>
                  <h2 className={styles.cardTitle}>{workshop.title}</h2>
                  <p className={styles.cardQuote}>{workshop.description}</p>
                  <span className={styles.cardLink}>Get in touch →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
