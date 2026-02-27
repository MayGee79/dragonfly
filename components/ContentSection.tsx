import Image from 'next/image'
import { sanitizeForDisplay } from '@/lib/markdown'
import styles from './ContentSection.module.css'

interface ContentSectionProps {
  title?: string
  content: string
  image?: string
  layout?: 'text-only' | 'text-image' | 'image-text' | 'three-column'
}

export default function ContentSection({ 
  title, 
  content, 
  image, 
  layout = 'text-only' 
}: ContentSectionProps) {
  // Helper function to convert markdown to HTML
  const markdownToHtml = (text: string) => {
    const isHtml = text.trim().startsWith('<') || text.includes('<p>') || text.includes('<div>')
    if (isHtml) return text
    
    return text.split('\n').map(line => {
      if (line.trim() === '') return '<br />'
      if (line.startsWith('## ')) return `<h2>${line.substring(3)}</h2>`
      if (line.startsWith('### ')) return `<h3>${line.substring(4)}</h3>`
      if (line.startsWith('- ')) return `<li>${line.substring(2)}</li>`
      if (line.startsWith('* ')) return `<li>${line.substring(2)}</li>`
      // Convert **bold** markdown to <strong> tags
      const processedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      return `<p>${processedLine}</p>`
    }).join('')
  }

  // Handle three-column layout
  if (layout === 'three-column' && content.includes('---IMAGE---')) {
    const parts = content.split('---IMAGE---')
    const leftContent = sanitizeForDisplay(markdownToHtml(parts[0].trim()))
    const rightContent = sanitizeForDisplay(markdownToHtml(parts[1]?.trim() || ''))
    
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.threeColumn}>
            <div className={styles.column}>
              <div 
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: leftContent }}
              />
            </div>
            {image && (
              <div className={styles.column}>
                <Image src={image} alt={title || 'Content image'} className={styles.image} width={665} height={998} sizes="(max-width: 768px) 100vw, 665px" quality={65} />
              </div>
            )}
            <div className={styles.column}>
              <div 
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: rightContent }}
              />
            </div>
          </div>
        </div>
      </section>
    )
  }

  const htmlContent = sanitizeForDisplay(markdownToHtml(content))

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
        {layout === 'three-column' && !content.includes('---IMAGE---') && (
          <div className={styles.threeColumn}>
            <div className={styles.column}>
              {title && <h2 className={styles.title}>{title}</h2>}
              <div 
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>
            {image && (
              <div className={styles.column}>
                <Image src={image} alt={title || 'Content image'} className={styles.image} width={665} height={998} sizes="(max-width: 768px) 100vw, 665px" quality={65} />
              </div>
            )}
          </div>
        )}
        {(layout === 'text-image' || layout === 'image-text') && (
          <div className={layout === 'text-image' ? styles.textImage : styles.imageText}>
            {layout === 'image-text' && image && (
              <div className={styles.imageContainer}>
                <Image src={image} alt={title || 'Content image'} className={styles.image} width={665} height={998} sizes="(max-width: 768px) 100vw, 665px" quality={65} />
              </div>
            )}
            {(!content || content.trim() === '') && image ? (
              <div className={styles.imageOnly}>
                <Image src={image} alt={title || 'Content image'} className={styles.image} width={665} height={998} sizes="(max-width: 768px) 100vw, 665px" quality={65} />
              </div>
            ) : (
              <div className={styles.textContent}>
                {title && <h2 className={styles.title}>{title}</h2>}
                <div 
                  className={styles.content}
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </div>
            )}
            {layout === 'text-image' && image && content && content.trim() !== '' && (
              <div className={styles.imageContainer}>
                <Image src={image} alt={title || 'Content image'} className={styles.image} width={665} height={998} sizes="(max-width: 768px) 100vw, 665px" quality={65} />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

