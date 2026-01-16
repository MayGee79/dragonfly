import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import styles from './shop.module.css'

export function generateStaticParams() {
  return []
}

export default function ShopPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <h1 className={styles.title}>DRAGONFLY SHOP</h1>

            <div className={styles.content}>
              <section className={styles.categorySection}>
                <h2 className={styles.categoryTitle}>HANDBOOKS</h2>
                <p className={styles.categoryDescription}>
                  These handbooks offer practical information, support and resources for use in life's many transitions
                </p>

                <div className={styles.productCard}>
                  <h3 className={styles.productTitle}>STARTING UNIVERSITY? A GUIDE FOR STUDENTS: WHAT YOUR MENTAL HEALTH NEEDS YOU TO KNOW</h3>
                  <Link 
                    href="https://www.etsy.com/uk/listing/4364741398/starting-university-the-mental-health?ls=r&external=1&rec_type=ss&ref=landingpage_similar_listing_top-1&dd=1&content_source=69f9fc52f8e61ad225f4a34a030fd612%253ALT91c2924fbdaabae40f5f77dfe227541428a40697&logging_key=69f9fc52f8e61ad225f4a34a030fd612%3ALT91c2924fbdaabae40f5f77dfe227541428a40697"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.productLink}
                  >
                    Download from Etsy
                  </Link>
                </div>
              </section>

              <section className={styles.categorySection}>
                <h2 className={styles.categoryTitle}>RESOURCES</h2>
                <p className={styles.categoryDescription}>
                  These items are useful for grounding.
                </p>

                <div className={styles.productCard}>
                  <h3 className={styles.productTitle}>AFFIRMATION PEBBLES</h3>
                  <p className={styles.productQuantity}>12</p>
                  <Link 
                    href="https://www.etsy.com/uk/listing/4364706213/natural-affirmation-pebbles-therapeutic?ls=r&ref=related-1&content_source=62f2145c14f7dbc6f93d2790a92bfab2%253A22d26ef3ac72c6f43e8de5e54b98627504aba461&logging_key=62f2145c14f7dbc6f93d2790a92bfab2%3A22d26ef3ac72c6f43e8de5e54b98627504aba461"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.productLink}
                  >
                    Order on Etsy
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
