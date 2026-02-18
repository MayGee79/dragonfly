'use client'

import Image from 'next/image'

interface BlogFeaturedImageProps {
  /** URL: full external URL or local path (e.g. /images/foo.png) */
  src: string
  alt: string
  /** For card/thumb: smaller sizes. For post: larger. */
  variant: 'card' | 'post'
  className?: string
  /** Wrapper className for fill layout (must have position: relative and dimensions) */
  wrapperClassName?: string
  priority?: boolean
}

/**
 * Renders blog featured images with next/image so they are optimized and served from our origin
 * (reduces third-party requests and payload size). Supports both local paths and remote URLs
 * (img1.wsimg.com, shop.charliemackesy.com) via next.config.js remotePatterns.
 */
export default function BlogFeaturedImage({
  src,
  alt,
  variant,
  className = '',
  wrapperClassName = '',
  priority = false,
}: BlogFeaturedImageProps) {
  const imageSrc = src.startsWith('http') ? src : src.startsWith('/') ? src : `/${src}`

  if (variant === 'post') {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        width={800}
        height={600}
        className={className}
        sizes="(max-width: 767px) 100vw, 200px"
        quality={75}
        priority={priority}
      />
    )
  }

  // card: use fill so we don't need known dimensions for external images
  return (
    <div className={wrapperClassName}>
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className={className}
        sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 25vw"
        quality={75}
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  )
}
