import Link from 'next/link'
import styles from './Footer.module.css'

interface FooterProps {
  className?: string
}

export default function Footer({ className }: FooterProps = {}) {
  return (
    <footer className={`${styles.footer} ${className || ''}`}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.title}>Dragonfly Psychotherapy</h3>
            <p className={styles.description}>
              Compassionate Psychotherapy in Surrey & Online
            </p>
          </div>
          <div className={styles.section}>
            <h4 className={styles.subtitle}>Contact</h4>
            <p>
              <a href="mailto:victoria@dragonflypsychotherapy.co.uk">
                victoria@dragonflypsychotherapy.co.uk
              </a>
            </p>
          </div>
          <div className={styles.section}>
            <h4 className={styles.subtitle}>Links</h4>
            <ul className={styles.links}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/shop">Shop</Link></li>
              <li><Link href="/faqs">FAQs</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} Dragonfly Psychotherapy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

