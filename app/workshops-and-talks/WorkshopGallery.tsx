'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from './workshops-and-talks.module.css'

interface WorkshopGalleryProps {
  images: { src: string; alt: string }[]
}

export default function WorkshopGallery({ images }: WorkshopGalleryProps) {
  const [index, setIndex] = useState(0)
  const [inView, setInView] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { rootMargin: '100px', threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const n = images.length
  const next = () => setIndex((i) => (i + 1) % n)
  const prev = () => setIndex((i) => (i - 1 + n) % n)

  if (n === 0) return null

  const current = images[index]

  return (
    <div className={styles.galleryWrap} ref={wrapRef}>
      <button
        type="button"
        onClick={prev}
        className={styles.galleryBtn}
        aria-label="Previous image"
      >
        ←
      </button>
      <button
        type="button"
        className={styles.galleryImageBtn}
        onClick={next}
        aria-label="Next image (click to change)"
      >
        {inView ? (
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            width={480}
            height={360}
            sizes="(max-width: 768px) 100vw, 480px"
            quality={65}
            className={styles.galleryImg}
          />
        ) : (
          <span className={styles.galleryImgPlaceholder} />
        )}
      </button>
      <button
        type="button"
        onClick={next}
        className={styles.galleryBtn}
        aria-label="Next image"
      >
        →
      </button>
      <p className={styles.galleryHint}>Click the image or arrows to change</p>
    </div>
  )
}
