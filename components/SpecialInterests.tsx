import Link from 'next/link'
import styles from './SpecialInterests.module.css'

interface Card {
  title: string
  quote: string
  link: string
}

const cards: Card[] = [
  {
    title: 'Anxiety & Panic',
    quote: "I can't stop worrying",
    link: '/therapy-and-interests#anxiety'
  },
  {
    title: 'Depression',
    quote: "I feel empty and stuck",
    link: '/therapy-and-interests#depression'
  },
  {
    title: 'Burnout',
    quote: "I'm running on empty",
    link: '/therapy-and-interests#burnout'
  },
  {
    title: 'Life Transitions',
    quote: "Everything's changing",
    link: '/therapy-and-interests#transitions'
  },
  {
    title: 'Neurodiversity',
    quote: "I don't fit in",
    link: '/therapy-and-interests#neurodiversity'
  },
  {
    title: 'Menopause',
    quote: "My body's betraying me",
    link: '/therapy-and-interests#menopause'
  },
  {
    title: 'Health Anxiety',
    quote: "I'm scared I'm ill",
    link: '/therapy-and-interests#health-anxiety'
  },
  {
    title: 'Physical Health Issues',
    quote: "What is going to happen to me",
    link: '/therapy-and-interests#physical-health'
  },
  {
    title: 'Self-Esteem & Personal Growth',
    quote: "I can't do this",
    link: '/therapy-and-interests#self-esteem'
  },
  {
    title: 'Young People 11+',
    quote: "I need someone who gets it",
    link: '/therapy-and-interests#young-people'
  }
]

export default function SpecialInterests() {
  return (
    <section className={styles.section} id="special-interests">
      <div className={styles.container}>
        <h2 className={styles.mainTitle}>Special Interest</h2>
        <h3 className={styles.title}>Click what resonates with you</h3>
        <div className={styles.grid}>
          {cards.map((card, index) => (
            <Link key={index} href={card.link} className={styles.card}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardQuote}>{card.quote}</p>
              <span className={styles.cardLink}>Learn More →</span>
            </Link>
          ))}
        </div>
        <div className={styles.contactLink}>
          <Link href="/#contact" className={styles.contactText}>
            Not sure where you fit?<br />
            Contact me →
          </Link>
        </div>
      </div>
    </section>
  )
}
