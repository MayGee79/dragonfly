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
              <img src="/images/dragonfly_logo_white.png" alt="Dragonfly Psychotherapy" className={styles.heroLogo} />
            </div>
            <div className={styles.heroTextContent}>
              <h1 className={styles.headline}>Compassionate Psychotherapy in Surrey &amp; Online</h1>
              <p className={styles.tagline}>Supporting adults and young people through life's challenges, changes and choices</p>
              <p className={styles.heroName}>Dr Victoria Froome</p>
              <p className={styles.heroRole}>Integrative Psychotherapist and Former NHS GP</p>
            </div>
          </div>
        )}
        {layout === 'text-only' && (
          <div className={styles.textOnly}>
            <h1 className={styles.title}>{title}</h1>
            {subtitle && (
              <div className={styles.subtitle}>
                {subtitle.split('\n').map((line, i) => 
                  line.trim() ? (
                    <p key={i} className={line.includes('@') ? styles.emailText : ''}>
                      {line.trim()}
                    </p>
                  ) : (
                    <br key={i} />
                  )
                )}
              </div>
            )}
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

