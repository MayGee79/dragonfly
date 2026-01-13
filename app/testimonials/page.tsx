import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import styles from './testimonials.module.css'

const testimonials = [
  {
    quote: "Many thanks for all your help. It has been really useful and I feel like I have the tools to keep going with it now",
    author: "AD"
  },
  {
    quote: "You have been an incredible support for me. I will never forget you Vicky",
    author: "AH"
  },
  {
    quote: "These sessions have been so helpful, I so appreciate it",
    author: "KK"
  }
]

export function generateStaticParams() {
  return []
}

export default function TestimonialsPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <h1 className={styles.title}>Testimonials</h1>

            <div className={styles.testimonialsGrid}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className={styles.testimonialCard}>
                  <p className={styles.quote}>"{testimonial.quote}"</p>
                  <p className={styles.author}>{testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
