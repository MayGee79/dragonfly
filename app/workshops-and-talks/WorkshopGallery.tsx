'use client'

import { useState } from 'react'
import styles from './workshops-and-talks.module.css'

interface WorkshopGalleryProps {
  images: { src: string; alt: string }[]
}

export default function WorkshopGallery({ images }: WorkshopGalleryProps) {
  const [index, setIndex] = useState(0)
  const n = images.length
  const next = () => setIndex((i) => (i + 1) % n)
  const prev = () => setIndex((i) => (i - 1 + n) % n)

  if (n === 0) return null

  return (
    <div className={styles.galleryWrap}>
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
        <img
          key={index}
          src={images[index].src}
          alt={images[index].alt}
          className={styles.galleryImg}
        />
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
