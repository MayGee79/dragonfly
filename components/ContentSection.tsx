import styles from './ContentSection.module.css'

interface ContentSectionProps {
  title?: string
  content: string
  image?: string
  layout?: 'text-only' | 'text-image' | 'image-text'
}

export default function ContentSection({ 
  title, 
  content, 
  image, 
  layout = 'text-only' 
}: ContentSectionProps) {
  // Check if content is HTML or markdown
  const isHtml = content.trim().startsWith('<') || content.includes('<p>') || content.includes('<div>')
  const htmlContent = isHtml ? content : content.split('\n').map(line => {
    if (line.trim() === '') return '<br />'
    if (line.startsWith('- ')) return `<li>${line.substring(2)}</li>`
    if (line.startsWith('* ')) return `<li>${line.substring(2)}</li>`
    return `<p>${line}</p>`
  }).join('')

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {layout === 'text-only' && (
          <div className={styles.textOnly}>
            {title && <h2 className={styles.title}>{title}</h2>}
            <div 
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        )}
        {(layout === 'text-image' || layout === 'image-text') && (
          <div className={layout === 'text-image' ? styles.textImage : styles.imageText}>
            <div className={styles.textContent}>
              {title && <h2 className={styles.title}>{title}</h2>}
              <div 
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>
            {image && (
              <div className={styles.imageContainer}>
                <img src={image} alt={title || 'Content image'} className={styles.image} />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

