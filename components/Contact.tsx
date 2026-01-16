'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './Contact.module.css'

export default function Contact() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Formspree endpoint
    const baseEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || 'https://formspree.io/f/xaqqqyoa'
    const thankYouUrl = typeof window !== 'undefined' ? `${window.location.origin}/contact/thank-you` : '/contact/thank-you'
    
    // Use FormData format (Formspree prefers this over JSON)
    const formDataToSend = new FormData()
    formDataToSend.append('name', formData.name)
    formDataToSend.append('email', formData.email)
    formDataToSend.append('phone', formData.phone || '')
    formDataToSend.append('message', formData.message)
    formDataToSend.append('_next', thankYouUrl)
    
    try {
      const response = await fetch(baseEndpoint, {
        method: 'POST',
        body: formDataToSend,
      })

      if (response.ok) {
        // Redirect to thank you page
        router.push('/contact/thank-you')
      } else {
        const errorData = await response.text()
        console.error('Formspree error:', response.status, errorData)
        setSubmitStatus('error')
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setIsSubmitting(false)
    }
  }

  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        <h2 className={styles.title}>Contact</h2>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.textarea}
                  rows={6}
                  required
                />
              </div>
              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {submitStatus === 'success' && (
                <p className={styles.successMessage}>
                  Thank you! Your message has been sent.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className={styles.errorMessage}>
                  Sorry, there was an error sending your message. Please try again or email us directly.
                </p>
              )}
            </form>
          </div>
          <div className={styles.rightSection}>
            <h3 className={styles.subtitle}>Dragonfly Psychotherapy</h3>
            <div className={styles.address}>
              <div className={styles.addressItem}>
                <p>
                  Guildford Therapy Rooms, 3 Beaufort, Parklands, Guildford, GU2 9JX
                </p>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Guildford+Therapy+Rooms,+3+Beaufort,+Parklands,+Guildford,+GU2+9JX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.directionsLink}
                >
                  Get Directions →
                </a>
              </div>
              <p className={styles.addressSeparator}>-</p>
              <div className={styles.addressItem}>
                <p>
                  3 Norells Ride, East Horsley, KT24 5EH
                </p>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=3+Norells+Ride,+East+Horsley,+KT24+5EH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.directionsLink}
                >
                  Get Directions →
                </a>
              </div>
            </div>
            <div className={styles.contactDetails}>
              <p>
                <strong>Telephone:</strong>{' '}
                <a href="tel:07546431448">07546 431 448</a>
              </p>
              <p>
                <a href="mailto:victoria@dragonflypsychotherapy.co.uk">
                  victoria@dragonflypsychotherapy.co.uk
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
