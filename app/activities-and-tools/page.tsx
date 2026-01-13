import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import styles from './activities-and-tools.module.css'

const activities = [
  {
    title: 'Anxiety Self Help',
    description: 'Coming soon.'
  },
  {
    title: 'Mindfulness',
    description: 'Coming soon.'
  },
  {
    title: 'Confidence and Resilience',
    description: 'Coming soon.'
  },
  {
    title: 'More coming soon',
    description: 'Coming soon.'
  }
]

export function generateStaticParams() {
  return []
}

export default function ActivitiesAndToolsPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <h1 className={styles.title}>Activities and Tools</h1>

            <div className={styles.grid}>
              {activities.map((activity, index) => (
                <div key={index} className={styles.activityCard}>
                  <h2 className={styles.heading}>{activity.title}</h2>
                  <p className={styles.description}>{activity.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
