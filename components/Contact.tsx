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
    message: '',
    consent: false,
    marketing: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value
    const name = target.name
    
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Formspree endpoint – must be HTTPS in production
    const baseEndpoint = (process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || 'https://formspree.io/f/xaqqqyoa').replace(/^http:\/\//i, 'https://')
    const formspreeKey = process.env.NEXT_PUBLIC_FORMSPREE_KEY || ''

    // Validate required consent checkbox
    if (!formData.consent) {
      alert('Please consent to being contacted in response to your enquiry.')
      setIsSubmitting(false)
      return
    }

    // Use FormData format (Formspree prefers this over JSON)
    const formDataToSend = new FormData()
    formDataToSend.append('name', formData.name)
    formDataToSend.append('email', formData.email)
    formDataToSend.append('phone', formData.phone || '')
    formDataToSend.append('message', formData.message)
    formDataToSend.append('consent', formData.consent ? 'Yes' : 'No')
    formDataToSend.append('marketing_consent', formData.marketing ? 'Yes' : 'No')
    
    // Add custom key if provided (for AJAX submissions)
    // Note: The parameter name might be different - check Formspree docs
    if (formspreeKey) {
      formDataToSend.append('_access_key', formspreeKey)
    }
    
    try {
      const response = await fetch(baseEndpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formDataToSend,
      })

      let responseData
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json()
      } else {
        const text = await response.text()
        try {
          responseData = JSON.parse(text)
        } catch {
          responseData = { error: text }
        }
      }

      if (response.ok) {
        // Show success message
        setSubmitStatus('success')
        setIsSubmitting(false)
        // Clear form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          consent: false,
          marketing: false
        })
        // Redirect to thank you page after a short delay
        setTimeout(() => {
          router.push('/contact/thank-you')
        }, 2000)
      } else {
        // Handle Formspree errors
        if (responseData.errors) {
          alert(`Form submission failed: ${JSON.stringify(responseData.errors)}`)
        } else {
          alert(`Form submission failed: ${response.status} - ${JSON.stringify(responseData)}`)
        }
        setSubmitStatus('error')
        setIsSubmitting(false)
      }
    } catch (error) {
      alert(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`)
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
            <form 
              className={styles.contactForm} 
              onSubmit={handleSubmit}
              action="https://formspree.io/f/xaqqqyoa"
              method="POST"
            >
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
              
              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className={styles.checkbox}
                    required
                  />
                  <span>I consent to Dragonfly Psychotherapy contacting me in response to this enquiry <span className={styles.required}>*</span></span>
                </label>
              </div>
              
              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="marketing"
                    checked={formData.marketing}
                    onChange={handleChange}
                    className={styles.checkbox}
                  />
                  <span>I would like to receive occasional updates about workshops, resources and services (optional)</span>
                </label>
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
