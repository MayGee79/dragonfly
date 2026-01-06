import styles from './Hero.module.css'

interface HeroProps {
  title: string
  subtitle?: string
  image?: string
  layout?: 'text-only' | 'text-image' | 'image-text' | 'logo-header'
}

export default function Hero({ title, subtitle, image, layout = 'text-only' }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {layout === 'logo-header' && (
          <div className={styles.logoHeader}>
            <div className={styles.logoContainer}>
              <img src="/images/logo.png" alt="Dragonfly Psychotherapy" className={styles.heroLogo} />
            </div>
            <div className={styles.heroTextContent}>
              <p className={styles.tagline}>Compassionate Psychotherapy in Surrey &amp; Online</p>
              <h1 className={styles.heroName}>Dr Victoria Froome</h1>
              <p className={styles.heroRole}>Integrative Psychotherapist and Former NHS GP</p>
            </div>
          </div>
        )}
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

