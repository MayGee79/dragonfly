import Link from 'next/link'
import styles from './Workshops.module.css'

const facilitateFor = [
  'Schools',
  'Parents',
  'Organisations',
  'Community Groups'
]

const workshopTopics = [
  'Managing Teen Anxiety',
  'Building Confidence & Resilience',
  'Understanding Neurodiversity',
  'Young people sports team building',
  'Menopause in the Workplace',
  'Burnout',
  'Maintaining Good Mental Health'
]

const onDemandTopics = [
  'Menopause',
  'Rejection Sensitivity Dysphoria'
]

export default function Workshops() {
  return (
    <section className={styles.section} id="workshops">
      <div className={styles.container}>
        <h2 className={styles.mainTitle}>Education, Workshops and Talks</h2>
        <p className={styles.subtitle}>Awareness, Support and Learning</p>
        
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>I Facilitate Workshops For:</h3>
            <ul className={styles.list}>
              {facilitateFor.map((item, index) => (
                <li key={index} className={styles.listItem}>
                  <span className={styles.highlight}>{item}</span>
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

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Example On Demand Topics:</h3>
            <ul className={styles.topicsList}>
              {onDemandTopics.map((topic, index) => (
                <li key={index} className={styles.topicItem}>{topic}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <Link href="/#contact" className={styles.button}>
            Enquire Here
          </Link>
        </div>
      </div>
    </section>
  )
}
