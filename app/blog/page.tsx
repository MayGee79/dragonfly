import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getAllBlogPosts } from '@/lib/content'
import styles from './blog.module.css'

export default function BlogPage() {
  const posts = getAllBlogPosts()

  return (
    <>
      <Navigation />
      <main>
        <section className={styles.blogSection}>
          <div className={styles.container}>
            <h1 className={styles.title}>Blog</h1>
            {posts.length === 0 ? (
              <p className={styles.empty}>No blog posts yet. Check back soon!</p>
            ) : (
              <div className={styles.posts}>
                {posts.map((post) => (
                  <article key={post.slug} className={styles.post}>
                    <Link href={`/blog/${post.slug}`}>
                      {post.featuredImage && (
                        <img 
                          src={post.featuredImage} 
                          alt={post.title}
                          className={styles.image}
                        />
                      )}
                      <h2 className={styles.postTitle}>{post.title}</h2>
                      {post.excerpt && (
                        <p className={styles.excerpt}>{post.excerpt}</p>
                      )}
                      <time className={styles.date}>
                        {new Date(post.date).toLocaleDateString('en-GB', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

