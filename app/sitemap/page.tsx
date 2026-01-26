import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getAllBlogPosts } from '@/lib/content'
import styles from './sitemap.module.css'

export default function SitemapPage() {
  const blogPosts = getAllBlogPosts()

  const mainPages = [
    { title: 'Home', url: '/' },
    { title: 'Anxiety & Panic', url: '/anxiety' },
    { title: 'Depression', url: '/depression' },
    { title: 'Burnout', url: '/burnout' },
    { title: 'Life Transitions', url: '/transitions' },
    { title: 'Menopause', url: '/menopause' },
    { title: 'Health Anxiety', url: '/health-anxiety' },
    { title: 'Physical Health Issues', url: '/physical-health' },
    { title: 'Self-Esteem & Personal Growth', url: '/self-esteem' },
    { title: 'Young People 11+', url: '/young-people' },
    { title: 'Rejection Sensitive Dysphoria (RSD)', url: '/rejection-sensitive-dysphoria' },
  ]

  const servicesPages = [
    { title: 'Workshops and Talks', url: '/workshops-and-talks' },
    { title: 'Professional Membership', url: '/professional-membership' },
    { title: 'Shop', url: '/shop' },
  ]

  const resourcesPages = [
    { title: 'Support and Resources', url: '/support-and-resources' },
    { title: 'Activities and Tools', url: '/activities-and-tools' },
    { title: 'Book Reviews', url: '/book-reviews' },
    { title: 'Testimonials', url: '/testimonials' },
  ]

  const infoPages = [
    { title: 'Blog', url: '/blog' },
    { title: 'FAQs', url: '/faqs' },
    { title: 'Privacy Policy', url: '/privacy-policy' },
  ]

  return (
    <>
      <Navigation />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Sitemap</h1>
          <p className={styles.description}>
            Find all pages and content on our website below.
          </p>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Main Pages</h2>
            <ul className={styles.linkList}>
              {mainPages.map((page) => (
                <li key={page.url}>
                  <Link href={page.url} className={styles.link}>
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Services</h2>
            <ul className={styles.linkList}>
              {servicesPages.map((page) => (
                <li key={page.url}>
                  <Link href={page.url} className={styles.link}>
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Resources</h2>
            <ul className={styles.linkList}>
              {resourcesPages.map((page) => (
                <li key={page.url}>
                  <Link href={page.url} className={styles.link}>
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Blog Posts</h2>
            {blogPosts.length > 0 ? (
              <ul className={styles.linkList}>
                {blogPosts.map((post) => (
                  <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className={styles.link}>
                      {post.title}
                    </Link>
                    {post.date && (
                      <span className={styles.date}>
                        {' '}
                        ({new Date(post.date).toLocaleDateString('en-GB', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })})
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.noPosts}>No blog posts available yet.</p>
            )}
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Information</h2>
            <ul className={styles.linkList}>
              {infoPages.map((page) => (
                <li key={page.url}>
                  <Link href={page.url} className={styles.link}>
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
