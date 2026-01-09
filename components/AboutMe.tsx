import styles from './AboutMe.module.css'

const qualifications = [
  'MA Integrative Counselling & Psychotherapy (Merit) - Roehampton University',
  'BACP Registered (402603)',
  '25 years NHS clinical experience'
]

export default function AboutMe() {
  return (
    <section className={styles.section} id="about-me">
      <div className={styles.container}>
        <h2 className={styles.mainTitle}>About me</h2>
        <p className={styles.subtitle}>Your Therapist & Ally</p>
        
        <div className={styles.threeColumn}>
          <div className={styles.column}>
            <p>
              My journey from NHS GP to psychotherapist wasn't just a career change - it was recognition that lasting change happens when we understand both the emotional and physical sides of our struggles.
            </p>
            <p>
              This rich background gives me a broad and deep understanding of both the emotional and physical aspects of health, allowing me to bring a truly integrative perspective to my practice, and combine therapeutic skills and medical knowledge to offer something unique.
            </p>
          </div>
          <div className={styles.columnImage}>
            <img src="/images/VF_002.png" alt="Victoria Froome" className={styles.image} />
          </div>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Why Dragonfly?</h3>
            <p>
              If you're wondering why Dragonfly Psychotherapy? Like the dragonfly that symbolises transformation and adaption, I believe in your capacity for change and self-realisation. Together, we'll navigate your journey with empathy and purpose.
            </p>
          </div>
        </div>

        <div className={styles.qualifications}>
          <h3 className={styles.sectionTitle}>Qualifications:</h3>
          <ul className={styles.qualificationsList}>
            {qualifications.map((qual, index) => (
              <li key={index} className={styles.qualificationItem}>{qual}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
