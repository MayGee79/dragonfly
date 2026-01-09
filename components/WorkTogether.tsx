import Link from 'next/link'
import styles from './WorkTogether.module.css'

const steps = [
  {
    number: '1',
    title: 'Free 15-Minute Chat',
    subtitle: "No pressure. Let's see if we're a good fit.",
    description: "We can talk through the difficulties you are experiencing and whether there is something you are hoping to achieve. It's okay if there isn't something specific, sometimes it feels too complicated to untangle everything at first. We can talk through how we might be able to work together."
  },
  {
    number: '2',
    title: 'Your First Session',
    subtitle: "We'll explore what's bringing you here and create a plan together.",
    description: "If you decide that you would like to work together with me on your difficulties, we will arrange an initial assessment appointment. This and subsequent sessions are 50 minutes in length.\n\nIn the initial assessment, I am seeking to get a much more in depth understanding of your difficulties, in order for us to be able to make a plan for working jointly towards your goals.\n\nOur sessions would be collaborative and tailored to your specific aims - whether you're looking for immediate relief from stress, seeking to understand and repair from past experiences, or working towards long-term personal growth."
  },
  {
    number: '3',
    title: 'Your Pace, Your Way',
    subtitle: 'Weekly, fortnightly, or single sessions. In-person or online.',
    description: "It can be helpful to have a weekly therapy slot booked to keep the momentum of therapy going, but I always try to work around peoples' various circumstances, eg shift work, exams, childcare commitments or preferences, so please talk to me."
  }
]

const alsoAvailable = [
  'Single Session Therapy for focused support on single issues',
  'Workshops for Schools on anxiety, resilience, and wellbeing',
  'Bespoke Talks for organisations'
]

export default function WorkTogether() {
  return (
    <section className={styles.section} id="work-together">
      <div className={styles.container}>
        <h2 className={styles.mainTitle}>OUR WORK TOGETHER</h2>
        <p className={styles.subtitle}>Simple, Flexible, Tailored to You</p>
        
        <div className={styles.intro}>
          <p>
            I'm an integrative therapist - which means I draw from a range of different skills - including CBT, psychodynamic, person-centred and mindfulness approaches. This blend will depend on any specific issues or goals that we have identified for you and may well adjust over the course of our work, creating a plan unique for you. There are no generic one-size-fits-all solutions.
          </p>
          <p>
            Central to my approach is helping you recognise strengths you may have forgotten you have. Often when life is difficult, we lose sight of our capabilities. Together, we'll uncover and build upon the strengths that have carried you this far - even if you can't see them right now.
          </p>
        </div>

        <div className={styles.stepsGrid}>
          {steps.map((step, index) => (
            <div key={index} className={styles.stepCard}>
              <div className={styles.stepNumber}>{step.number}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepSubtitle}>{step.subtitle}</p>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.alsoAvailable}>
          <h3 className={styles.alsoTitle}>Also Available:</h3>
          <ul className={styles.alsoList}>
            {alsoAvailable.map((item, index) => (
              <li key={index} className={styles.alsoItem}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={styles.closing}>
          <p>
            If this resonates with you please get in touch. And you can head down to my pages with resources and sources of support, activities and tools, book reviews and blogs to see if there is something to help you get started.
          </p>
        </div>

        <div className={styles.contactButton}>
          <Link href="/#contact" className={styles.button}>
            Contact
          </Link>
        </div>
      </div>
    </section>
  )
}
