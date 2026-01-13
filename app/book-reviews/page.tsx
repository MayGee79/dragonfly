import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import styles from './book-reviews.module.css'

export function generateStaticParams() {
  return []
}

export default function BookReviewsPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <h1 className={styles.title}>Book Reviews</h1>

            <div className={styles.content}>
              <p>
                I love books and much prefer them on paper to online versions, and I keep buying more! I will post reviews of books I have found useful that I think may be helpful to others. For now there are a couple of book reviews on my blog page, but come back here for more soon.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
