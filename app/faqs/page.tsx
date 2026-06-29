import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import { getPageBySlug } from '@/lib/content'
import styles from './faqs.module.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Therapy FAQs for Clients in Surrey',
  description: 'Frequently asked questions about therapy, sessions, fees, and how to get started with Dragonfly Psychotherapy in Surrey and online.',
  openGraph: {
    title: 'Therapy FAQs for Clients in Surrey | Dragonfly Psychotherapy',
    description: 'Frequently asked questions about therapy, sessions, fees, and how to get started with Dragonfly Psychotherapy in Surrey and online.',
  },
}

function parseFaqs(content: string): { question: string; answer: string[] }[] {
  if (!content?.trim()) return []
  const blocks = content.split(/\n\s*## \d+\.\s*/).filter(Boolean)
  return blocks.map((block) => {
    const trimmed = block.trim()
    const firstNewline = trimmed.indexOf('\n')
    let question = firstNewline === -1 ? trimmed : trimmed.slice(0, firstNewline).trim()
    question = question.replace(/^## \d+\.\s*/, '')
    const answerRaw = firstNewline === -1 ? '' : trimmed.slice(firstNewline).trim()
    const answer = answerRaw
      .split(/\n\n+/)
      .map((p) => p.trim().replace(/\n/g, ' '))
      .filter(Boolean)
    return { question, answer }
  })
}

export default function FAQsPage() {
  const page = getPageBySlug('faqs') || {
    slug: 'faqs',
    title: 'FAQs',
    sections: [
      { type: 'hero' as const, title: 'FAQs', subtitle: 'Frequently Asked Questions', layout: 'text-only' as const, enabled: true },
      { type: 'content' as const, content: '', layout: 'text-only' as const, enabled: true },
    ],
  }

  const heroSection = page.sections?.find((s) => s.type === 'hero' && s.enabled !== false)
  const contentSection = page.sections?.find((s) => s.type === 'content' && s.enabled !== false)
  const faqs = contentSection?.content ? parseFaqs(contentSection.content) : []

  return (
    <>
      <Navigation className="home-nav" />
      <main>
        {heroSection && (
          <Hero
            title={heroSection.title || 'FAQs'}
            subtitle={heroSection.subtitle}
            layout={heroSection.layout || 'text-only'}
          />
        )}
        {faqs.length > 0 && (
          <>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'FAQPage',
                  mainEntity: faqs.map((faq) => ({
                    '@type': 'Question',
                    name: faq.question,
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: faq.answer.join(' '),
                    },
                  })),
                }),
              }}
            />
            <section className={styles.section}>
            <div className={styles.container}>
              <div className={styles.grid}>
                {faqs.map((faq, index) => (
                  <article key={index} className={styles.card}>
                    <h2 className={styles.cardTitle}>{faq.question}</h2>
                    <div className={styles.cardAnswer}>
                      {faq.answer.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
          </>
        )}
      </main>
      <Footer className="home-footer" />
    </>
  )
}
