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
    link: '/anxiety'
  },
  {
    title: 'Depression',
    quote: "I feel empty and stuck",
    link: '/depression'
  },
  {
    title: 'Burnout',
    quote: "I'm running on empty",
    link: '/burnout'
  },
  {
    title: 'Life Transitions',
    quote: "Everything's changing",
    link: '/transitions'
  },
  {
    title: 'Neurodiversity',
    quote: "I don't fit in",
    link: '/therapy-and-interests#neurodiversity'
  },
  {
    title: 'Menopause',
    quote: "My body's betraying me",
    link: '/menopause'
  },
  {
    title: 'Health Anxiety',
    quote: "I'm scared I'm ill",
    link: '/health-anxiety'
  },
  {
    title: 'Physical Health Issues',
    quote: "What is going to happen to me",
    link: '/physical-health'
  },
  {
    title: 'Self-Esteem & Personal Growth',
    quote: "I can't do this",
    link: '/self-esteem'
  },
  {
    title: 'Young People 11+',
    quote: "I need someone who gets it",
    link: '/young-people'
  },
  {
    title: 'Rejection Sensitive Dysphoria (RSD)',
    quote: "When Rejection Feels Unbearable",
    link: '/rejection-sensitive-dysphoria'
  },
  {
    title: '',
    quote: '',
    link: ''
  }
]

export default function SpecialInterests() {
  return (
    <section className={styles.section} id="special-interests">
      <div className={styles.container}>
        <h2 className={styles.mainTitle}>Special Interest</h2>
        <h3 className={styles.title}>Click what resonates with you</h3>
        <div className={styles.grid}>
          {cards.map((card, index) => {
            // Handle blank placeholder card
            if (!card.title && !card.quote) {
              return (
                <div key={index} className={`${styles.card} ${styles.blankCard}`}>
                  <h3 className={styles.cardTitle}>&nbsp;</h3>
                  <p className={styles.cardQuote}>&nbsp;</p>
                  <span className={styles.cardLink}>&nbsp;</span>
                </div>
              )
            }
            return (
              <Link key={index} href={card.link} className={styles.card}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardQuote}>{card.quote}</p>
                <span className={styles.cardLink}>Learn More →</span>
              </Link>
            )
          })}
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
