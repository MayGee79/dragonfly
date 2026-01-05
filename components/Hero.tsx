import styles from './Hero.module.css'

interface HeroProps {
  title: string
  subtitle?: string
  image?: string
  layout?: 'text-only' | 'text-image' | 'image-text'
}

export default function Hero({ title, subtitle, image, layout = 'text-only' }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {layout === 'text-only' && (
          <div className={styles.textOnly}>
            <h1 className={styles.title}>{title}</h1>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        )}
        {(layout === 'text-image' || layout === 'image-text') && (
          <div className={layout === 'text-image' ? styles.textImage : styles.imageText}>
            <div className={styles.textContent}>
              <h1 className={styles.title}>{title}</h1>
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
            {image && (
              <div className={styles.imageContainer}>
                <img src={image} alt={title} className={styles.image} />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

