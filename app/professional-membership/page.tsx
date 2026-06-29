import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getProfessionalMembershipPage } from '@/lib/content'
import { markdownToHtml } from '@/lib/markdown'
import styles from './professional-membership.module.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Professional Qualifications & BACP Membership',
  description:
    'Dr Victoria Froome is a BACP-registered integrative psychotherapist in Surrey. View qualifications, continuing professional development, and professional membership.',
  openGraph: {
    title: 'Professional Qualifications & BACP Membership | Dragonfly Psychotherapy',
    description:
      'BACP-registered integrative psychotherapist. Qualifications, CPD, and professional profile.',
  },
}

const fallbackQualifications = [
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
  'B.Sc. Chemical Pathology (1st Class Honours)',
]

const fallbackCpd = [
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
  'Facing the storm - decision making during uncertainty',
  'Burnout',
]

export function generateStaticParams() {
  return []
}

export default async function ProfessionalMembershipPage() {
  const cmsPage = getProfessionalMembershipPage()
  const qualifications = cmsPage?.qualifications?.length ? cmsPage.qualifications : fallbackQualifications
  const cpd = cmsPage?.cpd?.length ? cmsPage.cpd : fallbackCpd
  const membershipHtml = cmsPage?.membershipText
    ? await markdownToHtml(cmsPage.membershipText)
    : null
  return (
    <>
      <Navigation className="home-nav" />
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
                  <Image src="/images/VF_003.png" alt="Victoria Froome" className={styles.image} width={400} height={600} sizes="(max-width: 768px) 100vw, 400px" quality={65} />
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
                  <Image src="/images/VF_004.png" alt="Victoria Froome" className={styles.image} width={400} height={600} sizes="(max-width: 768px) 100vw, 400px" quality={65} />
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
                  <Image src="/images/bacp.png" alt="BACP" className={styles.membershipImage} width={200} height={80} sizes="200px" quality={65} />
                </div>
                <div className={styles.membershipText}>
                  {membershipHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: membershipHtml }} />
                  ) : (
                    <>
                      <p>
                        I am a registered member of the British Association of Counselling and Psychotherapy, member number 402603. So you can be reassured that I work to their standards, and within their ethical framework.
                      </p>
                      <p>
                        If you would like to know more please find them here:{' '}
                        <Link href="https://www.bacp.co.uk" target="_blank" rel="noopener noreferrer" className={styles.link}>
                          www.bacp.co.uk
                        </Link>
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer className="home-footer" />
    </>
  )
}
