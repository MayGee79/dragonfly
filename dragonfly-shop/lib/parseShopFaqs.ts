export type ShopFaqItem = {
  question: string
  answer: string
}

export type ShopFaqSection = {
  title: string
  items: ShopFaqItem[]
}

export type ParsedShopFaqs = {
  intro: string[]
  sections: ShopFaqSection[]
  footer: string[]
}

const SECTION_HEADERS = new Set([
  'Ordering and Payment',
  'Digital Downloads',
  'Delivery and Returns',
  'Problems and Suitability',
  'Using My Materials and Other Questions',
])

function isFooterLine(line: string): boolean {
  const trimmed = line.trim()
  return trimmed.startsWith('This page is provided') || trimmed.startsWith('© ')
}

function isQuestionLine(line: string): boolean {
  const trimmed = line.trim()
  if (!trimmed) return false
  if (trimmed.endsWith('?')) return true
  if (trimmed.startsWith('I am a professional')) return true
  return false
}

function isSectionHeader(line: string): boolean {
  return SECTION_HEADERS.has(line.trim())
}

function collectAnswer(lines: string[], startIndex: number): { answer: string; nextIndex: number } {
  const paragraphs: string[] = []
  let current = ''
  let i = startIndex

  while (i < lines.length) {
    const trimmed = lines[i].trim()

    if (isQuestionLine(trimmed) || isSectionHeader(trimmed) || isFooterLine(trimmed)) {
      break
    }

    if (trimmed === '') {
      if (current) {
        paragraphs.push(current.trim())
        current = ''
      }
      i++
      continue
    }

    current = current ? `${current}\n${lines[i]}` : lines[i]
    i++
  }

  if (current) {
    paragraphs.push(current.trim())
  }

  return { answer: paragraphs.join('\n\n'), nextIndex: i }
}

export function parseShopFaqs(text: string): ParsedShopFaqs {
  const lines = text.split('\n')
  const intro: string[] = []
  const sections: ShopFaqSection[] = []
  const footer: string[] = []

  let i = 0
  while (i < lines.length && !isSectionHeader(lines[i])) {
    intro.push(lines[i])
    i++
  }

  while (i < lines.length) {
    if (isFooterLine(lines[i])) {
      footer.push(...lines.slice(i))
      break
    }

    if (!isSectionHeader(lines[i])) {
      i++
      continue
    }

    const section: ShopFaqSection = { title: lines[i].trim(), items: [] }
    i++

    while (i < lines.length && !isSectionHeader(lines[i]) && !isFooterLine(lines[i])) {
      const trimmed = lines[i].trim()
      if (!trimmed) {
        i++
        continue
      }

      if (!isQuestionLine(trimmed)) {
        i++
        continue
      }

      const question = trimmed
      i++
      const { answer, nextIndex } = collectAnswer(lines, i)
      i = nextIndex

      if (answer) {
        section.items.push({ question, answer })
      }
    }

    if (section.items.length > 0) {
      sections.push(section)
    }
  }

  return { intro, sections, footer }
}
