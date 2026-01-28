import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import styles from './professional-membership.module.css'

const qualifications = [
  'Masters in Integrative Counselling and Psychotherapy (Merit)',
  'Joint Diploma in Counselling & Coaching (Level 5)',
  'Journal Therapy Certificate',
  'Counselling in Children and Adolesecents Certificate',
  "Womens' Stress Certificate",
  'Certificate in PostGraduate Education (Teaching the Teachers)',
  'Diploma in Occupational Medicine',
  'Diploma in Child Health',
  'Diploma in Obstetrics and Gynaecology',
  'M.R.C.G.P. (Merit)',
  'MB BS (Honours)',
  'B.Sc. Chemical Pathology (1st Class Honours)'
]

const cpd = [
  'CBT for insomnia (ongoing)',
  'Menopause coach certificate (ongoing)',
  'Positive parenting certificate (ongoing)',
  'Neurodiversity coach certificate',
  'Understanding teens',
  'OCD and anxiety',
  'Advances in CBT',
  'Single session therapy',
  'Compassion and self harm in teen',
  'Talking teens',
  'Facing the storm — decision making during uncertainty',
  'Burnout'
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
                <div className={styles.qualificationColumn}>
                  <h2 className={styles.heading}>Qualifications</h2>
                  <ul className={styles.qualificationsList}>
                    {qualifications.map((qual, index) => (
                      <li key={index} className={styles.qualificationItem}>{qual}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.qualificationImageContainer}>
                  <img src="/images/VF_003.png" alt="Victoria Froome" className={styles.image} />
                </div>
              </div>

              <div className={styles.cpdSection}>
                <div className={styles.cpdColumn}>
                  <h2 className={styles.heading}>Recent Continuing Professional Development</h2>
                  <ul className={styles.cpdList}>
                    {cpd.slice(0, 6).map((item, index) => (
                      <li key={index} className={styles.cpdItem}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.cpdImageContainer}>
                  <img src="/images/VF_004.png" alt="Victoria Froome" className={styles.image} />
                </div>
                <div className={styles.cpdColumn}>
                  <ul className={styles.cpdList}>
                    {cpd.slice(6).map((item, index) => (
                      <li key={index} className={styles.cpdItem}>{item}</li>
                    ))}
                  </ul>
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
