import Link from 'next/link'
import styles from './Workshops.module.css'

const facilitateFor = [
  { name: 'Schools', description: 'Student anxiety, exam stress, resilience' },
  { name: 'Parents', description: 'Supporting anxious teens' },
  { name: 'Organizations', description: 'Workplace wellbeing, menopause awareness' },
  { name: 'Community Groups', description: 'Bespoke topics' }
]

const workshopTopics = [
  'Managing Teen Anxiety',
  'Building Confidence & Resilience',
  'Understanding Neurodiversity',
  'Menopause in the Workplace',
  'Burnout',
  'Maintaining good mental health'
]

export default function Workshops() {
  return (
    <section className={styles.section} id="workshops">
      <div className={styles.container}>
        <h2 className={styles.mainTitle}>Workshops & Speaking</h2>
        <p className={styles.subtitle}>Group Support & Educational Talks</p>
        
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>I facilitate workshops for:</h3>
            <ul className={styles.list}>
              {facilitateFor.map((item, index) => (
                <li key={index} className={styles.listItem}>
                  <span className={styles.highlight}>{item.name}</span>
                  <span className={styles.description}>{item.description}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Example Workshop Topics:</h3>
            <ul className={styles.topicsList}>
              {workshopTopics.map((topic, index) => (
                <li key={index} className={styles.topicItem}>{topic}</li>
              ))}
            </ul>
            <p className={styles.note}>Custom workshops available on request</p>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <Link href="/#contact" className={styles.button}>
            Enquire About Workshops
          </Link>
        </div>
      </div>
    </section>
  )
}
