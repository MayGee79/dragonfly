import Link from 'next/link'
import { getFeaturedBlogPosts } from '@/lib/content'
import styles from './BlogPreview.module.css'

const PREVIEW_COUNT = 4

export default function BlogPreview() {
  const posts = getFeaturedBlogPosts(PREVIEW_COUNT)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dragonflypsychotherapy.co.uk'

  return (
    <section className={styles.section} id="blog-preview">
      <div className={styles.container}>
        <h2 className={styles.title}>From the blog</h2>
        {posts.length === 0 ? (
          <p className={styles.empty}>No blog posts yet. Check back soon!</p>
        ) : (
          <>
            <div className={styles.posts}>
              {posts.map((post) => {
                const imageUrl = post.featuredImage
                  ? post.featuredImage.startsWith('http')
                    ? post.featuredImage
                    : `${baseUrl}${post.featuredImage!.startsWith('/') ? post.featuredImage : '/' + post.featuredImage}`
                  : undefined
                return (
                  <article key={post.slug} className={styles.post}>
                    <Link href={`/blog/${post.slug}`}>
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt=""
                          className={styles.image}
                        />
                      )}
                      <h3 className={styles.postTitle}>{post.title}</h3>
                      {post.excerpt && (
                        <p className={styles.excerpt}>{post.excerpt}</p>
                      )}
                      <time className={styles.date}>
                        {new Date(post.date).toLocaleDateString('en-GB', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </Link>
                  </article>
                )
              })}
            </div>
            <div className={styles.linkWrap}>
              <Link href="/blog" className={styles.link}>
                View all posts
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
