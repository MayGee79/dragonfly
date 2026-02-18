import Link from 'next/link'
import { getFeaturedBlogPosts } from '@/lib/content'
import BlogFeaturedImage from '@/components/BlogFeaturedImage'
import styles from './BlogPreview.module.css'

const PREVIEW_COUNT = 4

export default function BlogPreview() {
  const posts = getFeaturedBlogPosts(PREVIEW_COUNT)

  return (
    <section className={styles.section} id="blog-preview">
      <div className={styles.container}>
        <h2 className={styles.title}>From the blog</h2>
        {posts.length === 0 ? (
          <p className={styles.empty}>No blog posts yet. Check back soon!</p>
        ) : (
          <>
            <div className={styles.posts}>
              {posts.map((post) => (
                  <article key={post.slug} className={styles.post}>
                    <Link href={`/blog/${post.slug}`}>
                      {post.featuredImage && (
                        <BlogFeaturedImage
                          src={post.featuredImage}
                          alt=""
                          variant="card"
                          wrapperClassName={styles.imageWrapper}
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
              ))}
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
