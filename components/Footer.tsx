import Link from 'next/link'
import styles from './Footer.module.css'

interface FooterProps {
  className?: string
}

export default function Footer({ className }: FooterProps = {}) {
  return (
    <footer className={`${styles.footer} ${className || ''}`}>
      <div className={styles.container}>
        <div className={styles.linksSection}>
          <ul className={styles.links}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/shop">Shop</Link></li>
            <li><Link href="/faqs">FAQs</Link></li>
            <li><Link href="/privacy-policy">Privacy Notice</Link></li>
          </ul>
        </div>
        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} Dragonfly Psychotherapy. All rights reserved.</p>
          <p className={styles.adminLink}>
            <Link href="/admin">Admin</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

