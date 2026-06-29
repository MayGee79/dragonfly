/** Max characters for meta descriptions (Google typically shows ~155). */
export const META_DESCRIPTION_MAX = 155

/** Max characters for the unique part of a blog post title (before site suffix). */
export const BLOG_SEO_TITLE_MAX = 55

export function truncateAtWord(text: string, maxLength: number): string {
  const trimmed = text.trim()
  if (trimmed.length <= maxLength) {
    return trimmed
  }

  const truncated = trimmed.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')
  const cut = lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated
  return `${cut.trimEnd()}...`
}

/** Trim a string to a meta-description-safe length, ending at a word boundary. */
export function capMetaDescription(
  description: string,
  maxLength: number = META_DESCRIPTION_MAX,
): string {
  const trimmed = description.trim()
  if (trimmed.length <= maxLength) {
    return trimmed
  }

  return truncateAtWord(trimmed, maxLength)
}

/** Truncate a blog post title for the HTML <title> (site template adds the suffix). */
export function truncateBlogSeoTitle(title: string): string {
  const trimmed = title.trim()
  if (trimmed.length <= BLOG_SEO_TITLE_MAX) {
    return trimmed
  }

  const truncated = trimmed.substring(0, BLOG_SEO_TITLE_MAX)
  const lastSpace = truncated.lastIndexOf(' ')
  return (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated).trimEnd()
}
