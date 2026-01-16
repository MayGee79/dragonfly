import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import styles from './thank-you.module.css'

export function generateStaticParams() {
  return []
}

export default function ThankYouPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.content}>
              <h1 className={styles.title}>Thank You!</h1>
              <p className={styles.message}>
                Your message has been sent successfully. I'll get back to you as soon as possible.
              </p>
              <div className={styles.actions}>
                <Link href="/" className={styles.button}>
                  Return to Home
                </Link>
                <Link href="/#contact" className={styles.buttonSecondary}>
                  Send Another Message
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
