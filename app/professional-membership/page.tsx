import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import styles from './professional-membership.module.css'

const qualifications = [
  'MA Integrative Counselling and Psychotherapy (Merit) Level 7',
  'Joint Professional Life Coaching and Counselling Diploma Level 5',
  'Counselling Children and Adolescents Diploma',
  'Journal Therapy Certificate',
  "Women's Stress Certificate",
  'Certificate in Postgraduate Education',
  'Diploma of Occupational Medicine',
  'Diploma of Child Health',
  'Diploma of Obstetrics and Gynaecology',
  'MB BS (Hons)',
  'BSc in Basic Medical Sciences (Hons)'
]

const cpd = [
  { date: 'December 2025', items: ['An Introduction to ACT', 'Contextual Counselling Online'] },
  { date: 'August 2025', items: ['OCD & Anxiety Course', 'online'] },
  { date: 'June 2025', items: ['Understanding Teens Who Find it Hard to Open Up', 'Online workshop'] },
  { date: 'May 2025', items: ['Health Anxiety Workshop', 'Online', 'Advances in CBT', 'Online'] },
  { date: 'April 2025', items: ['Single Session Therapy Training with Windy Dryden'] },
  { date: 'March 2025', items: ['Compassion and Self Harm in Teens Workshop', 'Face to Face', 'Talking Teens Course', 'Face to Face'] },
  { date: 'February 2025', items: ['Burnt out by Parenting Webinar', 'Online'] },
  { date: 'January 2025', items: ['Child Safeguarding Training', 'Facing the Storm', 'Contextual Counselling', 'Online'] },
  { date: 'October 2024', items: ['Burn Out Workshop'] }
]

export function generateStaticParams() {
  return []
}

export default function ProfessionalMembershipPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <h1 className={styles.title}>Professional Qualifications and Membership</h1>

            <div className={styles.content}>
              <div className={styles.qualificationsSection}>
                <div className={styles.sectionBlock}>
                  <h2 className={styles.heading}>Qualifications</h2>
                  <ul className={styles.qualificationsList}>
                    {qualifications.map((qual, index) => (
                      <li key={index} className={styles.qualificationItem}>{qual}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.imageContainer}>
                  <img src="/images/VF_003.png" alt="Victoria Froome" className={styles.image} />
                </div>
              </div>

              <div className={styles.cpdSection}>
                <div className={styles.cpdImageContainer}>
                  <img src="/images/VF_004.png" alt="Victoria Froome" className={styles.image} />
                </div>
                <div className={styles.sectionBlock}>
                  <h2 className={styles.heading}>Continuing Professional Development</h2>
                  <div className={styles.cpdList}>
                    {cpd.map((entry, index) => (
                      <div key={index} className={styles.cpdEntry}>
                        <h3 className={styles.cpdDate}>{entry.date}</h3>
                        <ul className={styles.cpdItems}>
                          {entry.items.map((item, itemIndex) => (
                            <li key={itemIndex} className={styles.cpdItem}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.membershipBlock}>
                <div className={styles.membershipImageContainer}>
                  <img src="/images/bacp.png" alt="BACP" className={styles.membershipImage} />
                </div>
                <div className={styles.membershipText}>
                  <p>
                    I am a registered member of the British Association of Counselling and Psychotherapy, member number 402603. So you can be reassured that I work to their standards, and within their ethical framework.
                  </p>
                  <p>
                    If you would like to know more please find them here:{' '}
                    <Link href="https://www.bacp.co.uk" target="_blank" rel="noopener noreferrer" className={styles.link}>
                      www.bacp.co.uk
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
