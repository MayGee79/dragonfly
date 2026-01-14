'use client'

import Link from 'next/link'
import { useState, useRef } from 'react'
import styles from './Navigation.module.css'

export default function Navigation() {
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
    <nav className={styles.nav}>
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
        <ul className={`${styles.navList} ${isMenuOpen ? styles.open : ''}`}>
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
      </div>
    </nav>
  )
}

