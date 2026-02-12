import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { ContactFormConversion } from '@/components/ContactFormConversion'
import Link from 'next/link'
import styles from './thank-you.module.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Your message has been sent successfully. Dragonfly Psychotherapy will get back to you as soon as possible.',
  robots: { index: false, follow: true },
}

export function generateStaticParams() {
  return []
}

export default function ThankYouPage() {
  return (
    <>
      <ContactFormConversion />
      <Navigation className="home-nav" />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.content}>
              <h1 className={styles.title}>Thank You!</h1>
              <p className={styles.message}>
                Your message has been sent successfully. I'll get back to you as soon as possible. Please check your spam email if you do not hear from me within 24 hours.
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
      <Footer className="home-footer" />
    </>
  )
}
