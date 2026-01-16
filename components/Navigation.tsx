'use client'

import Link from 'next/link'
import { useState, useRef } from 'react'
import styles from './Navigation.module.css'

interface NavigationProps {
  className?: string
}

export default function Navigation({ className }: NavigationProps = {}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    if (!isMenuOpen) {
      setIsDropdownOpen(true)
    }
  }

  const handleMouseLeave = () => {
    if (!isMenuOpen) {
      closeTimeoutRef.current = setTimeout(() => {
        setIsDropdownOpen(false)
      }, 300)
    }
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'SHOP' },
    { href: '/faqs', label: 'FAQs' },
  ]

  const menuItems = [
    { href: '/#work-together', label: 'Working Together' },
    { href: '/#special-interests', label: 'Therapy And Interests' },
    { href: '/fees-and-availability', label: 'Fees and Availability' },
    { href: '/professional-membership', label: 'Professional Profile' },
    { href: '/testimonials', label: 'Testimonials' },
    { href: '/support-and-resources', label: 'Support and Resources' },
    { href: '/activities-and-tools', label: 'Activities and Tools' },
    { href: '/workshops-and-talks', label: 'Workshops and Talks' },
    { href: '/book-reviews', label: 'Book Reviews' },
    { href: '/blog', label: 'Blogs' },
  ]

  return (
    <nav className={`${styles.nav} ${className || ''}`}>
      <div className={styles.container}>
        <button 
          className={styles.menuToggle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={styles.contactInfoLeft}>
          <a href="tel:07546431448" className={styles.contactLink}>
            <svg className={styles.contactIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>07546 431 448</span>
          </a>
        </div>
        <ul className={`${styles.navList} ${isMenuOpen ? styles.open : ''} ${className || ''}`}>
          <li>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li 
            className={styles.menuItem}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button 
              className={styles.menuButton}
              onClick={() => {
                if (isMenuOpen) {
                  setIsDropdownOpen(!isDropdownOpen)
                } else {
                  setIsDropdownOpen(!isDropdownOpen)
                }
              }}
            >
              Menu
            </button>
            {(isDropdownOpen || isMenuOpen) && (
              <ul className={`${styles.dropdown} ${isMenuOpen ? styles.mobileDropdown : ''}`}>
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link 
                      href={item.href} 
                      className={styles.dropdownLink}
                      onClick={() => {
                        setIsDropdownOpen(false)
                        setIsMenuOpen(false)
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          {navLinks.filter(link => link.href !== '/').map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.contactInfoRight}>
          <a href="mailto:victoria@dragonflypsychotherapy.co.uk" className={styles.contactLink}>
            <svg className={styles.contactIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span>victoria@dragonflypsychotherapy.co.uk</span>
          </a>
        </div>
      </div>
    </nav>
  )
}

