import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import styles from './burnout.module.css'

export function generateStaticParams() {
  return []
}

export default function BurnoutPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <h1 className={styles.title}>Burnout & Exhaustion</h1>
            <p className={styles.subtitle}>Recovering from Burnout</p>

            <div className={styles.content}>
              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>Signs you might be burned out:</h2>
                <ul className={styles.list}>
                  <li>Physical and emotional exhaustion</li>
                  <li>Cynicism and detachment</li>
                  <li>Reduced sense of accomplishment</li>
                  <li>Inability to recover with rest</li>
                </ul>
                <p>
                  Burnout develops when demands consistently exceed your resources. It particularly affects those who care deeply about their work and others.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>Understanding your situation:</h2>
                <p>
                  Burnout often affects high achievers and caregivers - your exhaustion reflects dedication, not weakness. It is a depletion not a failure. We'll honour these qualities while developing sustainable practices.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>How therapy can help:</h2>
                <p>
                  Together, we might focus on creating immediate breathing space, understanding what led here (if you want to explore that), or developing boundaries that feel right for you. Some clients need practical strategies for managing workload, others want to explore deeper patterns of over stretching. Some sessions might be crisis management, others might be planning sustainable change. We'll follow your needs and energy levels.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.heading}>What recovery involves:</h2>
                <p>
                  You'll learn to recognise your early warning signs and develop your own ways of protecting your energy. Recovery happens at your pace - gradually rediscovering enthusiasm and finding sustainable ways to engage with what matters to you.
                </p>
              </div>
            </div>

            <div className={styles.buttonContainer}>
              <Link href="/#contact" className={styles.button}>
                Begin Recovery
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
