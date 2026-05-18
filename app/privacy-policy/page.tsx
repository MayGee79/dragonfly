import fs from 'fs'
import path from 'path'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import styles from './privacy-policy.module.css'
import { parsePrivacyNotice, privacySectionId } from '@/lib/parsePrivacyNotice'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Notice',
  description:
    'Privacy notice for Dragonfly Psychotherapy. How we collect, use, and protect your personal information. UK GDPR compliant. Last updated May 2026.',
  openGraph: {
    title: 'Privacy Notice | Dragonfly Psychotherapy',
    description: 'Privacy notice for Dragonfly Psychotherapy. UK GDPR compliant. Last updated May 2026.',
  },
  robots: { index: true, follow: true },
}

export default function PrivacyPolicyPage() {
  const text = fs.readFileSync(path.join(process.cwd(), 'content', 'privacy.txt'), 'utf8')
  const { lastUpdated, sections } = parsePrivacyNotice(text)

  return (
    <>
      <Navigation className="home-nav" />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <h1 className={styles.title}>Privacy Notice</h1>
            <p className={styles.lastUpdated}>Last updated: {lastUpdated}</p>

            <div className={styles.content}>
              {sections.map((section) => (
                <section
                  key={section.title}
                  id={privacySectionId(section.title)}
                  className={styles.sectionContent}
                >
                  <h2 className={styles.heading}>{section.title}</h2>
                  {section.blocks.map((block, index) =>
                    block.type === 'subheading' ? (
                      <h3 key={`${section.title}-sub-${index}`} className={styles.subheading}>
                        {block.text}
                      </h3>
                    ) : (
                      <p key={`${section.title}-p-${index}`}>{block.text}</p>
                    ),
                  )}
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer className="home-footer" />
    </>
  )
}
