import fs from 'fs'
import path from 'path'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import styles from '../privacy-policy/privacy-policy.module.css'
import { parseAiTransparency } from '@/lib/parseAiTransparency'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI and Transparency',
  description:
    'How Dragonfly Psychotherapy uses AI tools in practice — and what we never use AI for. Transparency about written resources, administration, and client confidentiality.',
  openGraph: {
    title: 'AI and Transparency | Dragonfly Psychotherapy',
    description:
      'How AI tools support written resources and administration at Dragonfly Psychotherapy — never therapy sessions or clinical decisions.',
  },
  robots: { index: true, follow: true },
}

export default function AiAndTransparencyPage() {
  const text = fs.readFileSync(path.join(process.cwd(), 'content', 'ai-and-transparency.txt'), 'utf8')
  const { lastUpdated, sections } = parseAiTransparency(text)

  return (
    <>
      <Navigation className="home-nav" />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <h1 className={styles.title}>AI and Transparency</h1>
            <p className={styles.lastUpdated}>Last updated: {lastUpdated}</p>

            <div className={styles.content}>
              {sections.map((section) => (
                <section key={section.title} className={styles.sectionContent}>
                  <h2 className={styles.heading}>{section.title}</h2>
                  {section.blocks.map((block, index) =>
                    block.type === 'ul' ? (
                      <ul key={`${section.title}-ul-${index}`} className={styles.list}>
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
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
