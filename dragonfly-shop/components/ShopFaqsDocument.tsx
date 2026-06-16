import { parseShopFaqs } from '@/lib/parseShopFaqs'
import styles from './ShopFaqsDocument.module.css'

function paragraphize(lines: string[]) {
  const chunks: string[] = []
  let current: string[] = []

  for (const line of lines) {
    if (line.trim() === '') {
      if (current.length > 0) {
        chunks.push(current.join('\n'))
        current = []
      }
      continue
    }
    current.push(line)
  }

  if (current.length > 0) {
    chunks.push(current.join('\n'))
  }

  return chunks
}

export default function ShopFaqsDocument({ text }: { text: string }) {
  const { intro, sections, footer } = parseShopFaqs(text)
  const introParagraphs = paragraphize(intro)
  const footerParagraphs = paragraphize(footer)

  return (
    <article className={styles.wrap}>
      <div className={styles.panel}>
        {introParagraphs.length > 0 && (
          <div className={styles.intro}>
            {introParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        )}

        {sections.map((section) => (
          <section key={section.title} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            <ol className={styles.faqList}>
              {section.items.map((item) => (
                <li key={item.question} className={styles.faqItem}>
                  <h3 className={styles.question}>{item.question}</h3>
                  <p className={styles.answer}>{item.answer}</p>
                </li>
              ))}
            </ol>
          </section>
        ))}

        {footerParagraphs.length > 0 && (
          <div className={styles.footer}>
            {footerParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
