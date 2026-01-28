import Link from 'next/link'
import styles from './PracticalInfo.module.css'

const fees = [
  { price: 'Free', description: '15-minute consultation' },
  { price: '£95', description: 'Standard 50-minute session' },
  { price: '£150', description: 'Extended 75-minute session' },
  { price: 'POA', description: 'Workshops & talks' }
]

const locations = [
  { name: 'Guildford', address: 'Beaufort Parklands GU2 9JX' },
  { name: 'East Horsley', address: '3 Norells Ride KT24 5EH' },
  { name: 'Online', address: 'Secure video platform' }
]

export default function PracticalInfo() {
  return (
    <section className={styles.section} id="practical-info">
      <div className={styles.container}>
        <h2 className={styles.mainTitle}>Practical information</h2>
        
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Fees</h3>
            <ul className={styles.list}>
              {fees.map((fee, index) => (
                <li key={index} className={styles.listItem}>
                  <span className={styles.highlight}>{fee.price}</span>
                  <span className={styles.description}>{fee.description}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Locations</h3>
            <ul className={styles.list}>
              {locations.map((location, index) => (
                <li key={index} className={styles.listItem}>
                  <span className={styles.highlight}>{location.name}</span>
                  <span className={styles.description}>{location.address}</span>
                </li>
              ))}
            </ul>
            <p className={styles.note}>
              Easily accessible from Cobham, Godalming, Leatherhead, Dorking and surrounding villages
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Availability</h3>
            <p className={styles.availabilityText}>
              I have slots across the week, and can often offer short-notice or same-week appointments when needed.
            </p>
          </div>
        </div>

        <div className={styles.buttons}>
          <Link href="/#contact" className={styles.button}>
            Check Availability
          </Link>
          <Link href="/#contact" className={styles.button}>
            Book Now
          </Link>
        </div>
      </div>
    </section>
  )
}
