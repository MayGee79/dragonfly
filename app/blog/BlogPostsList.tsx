'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './blog.module.css'
import type { BlogPost } from '@/lib/content'

const POSTS_PER_PAGE = 10

interface BlogPostsListProps {
  posts: BlogPost[]
}

export default function BlogPostsList({ posts }: BlogPostsListProps) {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)

  const visiblePosts = posts.slice(0, visibleCount)
  const hasMore = visibleCount < posts.length

  const handleSeeMore = () => {
    setVisibleCount((prev) => Math.min(prev + POSTS_PER_PAGE, posts.length))
  }

  return (
    <>
      <div className={styles.posts}>
        {visiblePosts.map((post) => (
          <article key={post.slug} className={styles.book}>
            <Link href={`/blog/${post.slug}`} className={styles.bookLink}>
              <div className={`${styles.cover} ${!post.featuredImage ? styles.coverNoImage : ''}`}>
                {post.featuredImage && (
                  <div className={styles.coverImageWrapper}>
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className={styles.coverImage}
                    />
                  </div>
                )}
                <h2 className={styles.coverTitle}>{post.title}</h2>
              </div>
              <div className={styles.inner}>
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
                <span className={styles.readMore}>Read more</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
      {hasMore && (
        <div className={styles.seeMoreWrapper}>
          <button
            type="button"
            onClick={handleSeeMore}
            className={styles.seeMoreBtn}
          >
            See more
          </button>
        </div>
      )}
    </>
  )
}
