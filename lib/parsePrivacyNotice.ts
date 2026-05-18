export type PrivacyBlock =
  | { type: 'p'; text: string }
  | { type: 'subheading'; text: string }

export type PrivacySection = {
  title: string
  blocks: PrivacyBlock[]
}

const SERVICE_SUBHEADINGS = new Set([
  'Therapy Clients',
  'Wellness Walk Participants',
  'Resource Purchasers',
  'Online CPD Participants',
  'In-Person Workshop Participants',
  'Website Visitors',
  'General Enquiries',
])

function isNumberedSection(line: string): boolean {
  return /^\d+\.\s/.test(line)
}

function isServiceSubheading(line: string): boolean {
  return SERVICE_SUBHEADINGS.has(line.trim())
}

export function parsePrivacyNotice(raw: string): { lastUpdated: string; sections: PrivacySection[] } {
  const lines = raw.split(/\r?\n/)
  let i = 0

  while (i < lines.length && !/^Last updated:/i.test(lines[i].trim())) {
    i++
  }
  const lastUpdated = (lines[i]?.replace(/^Last updated:\s*/i, '') ?? 'May 2026').trim()
  i++

  while (i < lines.length && !lines[i].trim()) {
    i++
  }

  const sections: PrivacySection[] = []
  let currentTitle = 'Introduction'
  let blocks: PrivacyBlock[] = []
  let paragraphBuf: string[] = []

  const flushParagraph = () => {
    const text = paragraphBuf.join(' ').trim()
    if (text) blocks.push({ type: 'p', text })
    paragraphBuf = []
  }

  const flushSection = () => {
    flushParagraph()
    if (blocks.length > 0) {
      sections.push({ title: currentTitle, blocks })
      blocks = []
    }
  }

  for (; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) {
      flushParagraph()
      continue
    }
    if (isNumberedSection(line)) {
      flushSection()
      currentTitle = line
      continue
    }
    if (isServiceSubheading(line)) {
      flushParagraph()
      blocks.push({ type: 'subheading', text: line })
      continue
    }
    paragraphBuf.push(line)
  }

  flushSection()

  return { lastUpdated, sections }
}
