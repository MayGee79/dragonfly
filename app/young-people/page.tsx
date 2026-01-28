import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import styles from './young-people.module.css'

export function generateStaticParams() {
  return []
}

export default function YoungPeoplePage() {
  return (
    <>
      <Navigation />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <h1 className={styles.title}>Young People (11+)</h1>
            <p className={styles.subtitle}>Supportive Therapy for Young People</p>

            <div className={styles.content}>
              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>Young peoples&apos; struggles that steal your spark.</h2>
                <ul className={styles.list}>
                  <li>Academic pressure and exam stress</li>
                  <li>Anxiety and mood difficulties</li>
                  <li>Identity and self-esteem issues</li>
                  <li>Family and peer relationships</li>
                  <li>Neurodiversity</li>
                </ul>
                <p>
                  Being young today involves unique pressures. Professional support provides tools and understanding during these crucial years.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>Recognising young people's strengths:</h2>
                <p>
                  Intensity shows passion. Questioning shows intelligence. Struggle shows courage. We'll identify and build upon individual strengths.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>How therapy can help:</h2>
                <p>
                  Young people lead their own therapy. We might work on managing school stress, exploring identity questions, or improving family relationships - whatever feels important to you. Some sessions might involve learning coping skills, others might just be having someone who listens without judgment. You choose what we talk about and how we work. There's no adult agenda - this is your space to figure things out at your own pace.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>Supporting growth:</h2>
                <p>
                  You'll develop confidence in managing whatever life throws at you and build a stronger sense of who you are. The overwhelming parts of being young become more manageable when you have support that actually helps.
                </p>
              </div>
            </div>

            <div className={styles.buttonContainer}>
              <Link href="/#contact" className={styles.button}>
                Book a Consultation
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
