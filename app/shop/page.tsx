import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getShopPage } from '@/lib/content'
import styles from './shop.module.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Dragonfly Psychotherapy shop. Therapeutic resources and materials.',
  openGraph: {
    title: 'Shop | Dragonfly Psychotherapy',
    description: 'Therapeutic resources and materials from Dragonfly Psychotherapy.',
  },
}

const fallbackCategories = [
  {
    categoryTitle: 'HANDBOOKS',
    categoryDescription: "These handbooks offer practical information, support and resources for use in life's many transitions",
    products: [
      {
        productTitle: "STARTING UNIVERSITY? A GUIDE FOR STUDENTS: WHAT YOUR MENTAL HEALTH NEEDS YOU TO KNOW",
        productQuantity: undefined,
        productLink: 'https://www.etsy.com/uk/listing/4364741398/starting-university-the-mental-health?ls=r&external=1&rec_type=ss&ref=landingpage_similar_listing_top-1&dd=1&content_source=69f9fc52f8e61ad225f4a34a030fd612%253ALT91c2924fbdaabae40f5f77dfe227541428a40697&logging_key=69f9fc52f8e61ad225f4a34a030fd612%3ALT91c2924fbdaabae40f5f77dfe227541428a40697',
        linkText: 'Download from Etsy',
      },
    ],
  },
  {
    categoryTitle: 'RESOURCES',
    categoryDescription: 'These items are useful for grounding.',
    products: [
      {
        productTitle: 'AFFIRMATION PEBBLES',
        productQuantity: '12',
        productLink: 'https://www.etsy.com/uk/listing/4364706213/natural-affirmation-pebbles-therapeutic?ls=r&ref=related-1&content_source=62f2145c14f7dbc6f93d2790a92bfab2%253A22d26ef3ac72c6f43e8de5e54b98627504aba461&logging_key=62f2145c14f7dbc6f93d2790a92bfab2%3A22d26ef3ac72c6f43e8de5e54b98627504aba461',
        linkText: 'Order on Etsy',
      },
    ],
  },
]

export function generateStaticParams() {
  return []
}

export default function ShopPage() {
  const cmsPage = getShopPage()
  const categories = cmsPage?.categories?.length ? cmsPage.categories : fallbackCategories
  const pageTitle = cmsPage?.title ?? 'DRAGONFLY SHOP'

  return (
    <>
      <Navigation />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <h1 className={styles.title}>{pageTitle.toUpperCase()}</h1>

            <div className={styles.content}>
              {categories.map((category, catIndex) => (
                <section key={catIndex} className={styles.categorySection}>
                  <h2 className={styles.categoryTitle}>{category.categoryTitle}</h2>
                  <p className={styles.categoryDescription}>{category.categoryDescription}</p>

                  {category.products.map((product, prodIndex) => (
                    <div key={prodIndex} className={styles.productCard}>
                      <h3 className={styles.productTitle}>{product.productTitle}</h3>
                      {product.productQuantity && (
                        <p className={styles.productQuantity}>{product.productQuantity}</p>
                      )}
                      <Link
                        href={product.productLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.productLink}
                      >
                        {product.linkText}
                      </Link>
                    </div>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
