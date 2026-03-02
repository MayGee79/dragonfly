import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getAllBlogPosts } from '@/lib/content'
import BlogPostsList from './BlogPostsList'
import styles from './blog.module.css'
import type { Metadata } from 'next'

// Always fetch latest post list (no static snapshot)
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog posts from Dragonfly Psychotherapy on mental health, wellbeing, and integrative psychotherapy. Surrey and online.',
  openGraph: {
    title: 'Blog | Dragonfly Psychotherapy',
    description: 'Blog posts on mental health and integrative psychotherapy.',
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

