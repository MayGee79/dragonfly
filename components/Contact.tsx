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
    // Formspree custom key (if using AJAX, you need either this or disable reCAPTCHA)
    const formspreeKey = process.env.NEXT_PUBLIC_FORMSPREE_KEY || ''
    
    // Check if we're in development (localhost)
    const isDevelopment = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    
    // Use FormData format (Formspree prefers this over JSON)
    const formDataToSend = new FormData()
    formDataToSend.append('name', formData.name)
    formDataToSend.append('email', formData.email)
    formDataToSend.append('phone', formData.phone || '')
    formDataToSend.append('message', formData.message)
    
    // Add custom key if provided (for AJAX submissions)
    // Note: The parameter name might be different - check Formspree docs
    if (formspreeKey) {
      formDataToSend.append('_access_key', formspreeKey)
    }
    
    // For localhost, we might need to add the referer or use a different approach
    // Formspree may block localhost requests if domain restrictions are set
    
    // Debug logging
    console.log('Submitting form to:', baseEndpoint)
    console.log('Form data:', {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message
    })
    
    try {
      const response = await fetch(baseEndpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formDataToSend,
      })

      console.log('Response status:', response.status)
      console.log('Response headers:', Object.fromEntries(response.headers.entries()))

      let responseData
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json()
      } else {
        const text = await response.text()
        console.log('Response text:', text)
        try {
          responseData = JSON.parse(text)
        } catch {
          responseData = { error: text }
        }
      }

      console.log('Response data:', responseData)

      if (response.ok) {
        // Show success message
        setSubmitStatus('success')
        setIsSubmitting(false)
        // Clear form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        })
        // Redirect to thank you page after a short delay
        setTimeout(() => {
          router.push('/contact/thank-you')
        }, 2000)
      } else {
        // Handle Formspree errors
        if (responseData.errors) {
          console.error('Formspree validation errors:', responseData.errors)
          alert(`Form submission failed: ${JSON.stringify(responseData.errors)}`)
        } else {
          console.error('Formspree error:', response.status, responseData)
          alert(`Form submission failed: ${response.status} - ${JSON.stringify(responseData)}`)
        }
        setSubmitStatus('error')
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error('Form submission error:', error)
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
