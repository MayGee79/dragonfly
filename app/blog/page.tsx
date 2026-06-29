import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getAllBlogPosts } from '@/lib/content'
import BlogPostsList from './BlogPostsList'
import styles from './blog.module.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mental Health Blog & Articles',
  description:
    'Articles on mental health, wellbeing, and integrative psychotherapy from Dr Victoria Froome in Surrey. Anxiety, burnout, neurodiversity, young people, and more.',
  openGraph: {
    title: 'Mental Health Blog & Articles | Dragonfly Psychotherapy',
    description:
      'Articles on mental health, wellbeing, and integrative psychotherapy from Dragonfly Psychotherapy in Surrey and online.',
  },
}

export default function BlogPage() {
  const posts = getAllBlogPosts()

  return (
    <>
      <Navigation className="home-nav" />
      <main>
        <section className={styles.blogSection}>
          <div className={styles.container}>
            <h1 className={styles.title}>Blog</h1>
            {posts.length === 0 ? (
              <p className={styles.empty}>No blog posts yet. Check back soon!</p>
            ) : (
              <BlogPostsList posts={posts} />
            )}
          </div>
        </section>
      </main>
      <Footer className="home-footer" />
    </>
  )
}

