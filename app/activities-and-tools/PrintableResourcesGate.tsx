'use client'

import { useCallback, useEffect, useState } from 'react'
import ResourceSignupModal from './ResourceSignupModal'

function triggerPdfDownload(url: string) {
  const a = document.createElement('a')
  a.href = url
  a.setAttribute('download', '')
  document.body.appendChild(a)
  a.click()
  a.remove()
}

function isPdfResourceLink(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute('href') || ''
  return href.startsWith('/resources/') && href.toLowerCase().endsWith('.pdf')
}

export default function PrintableResourcesGate(props: { children: React.ReactNode }) {
  const { children } = props

  const [pendingUrl, setPendingUrl] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const closeAndDownload = useCallback(() => {
    setIsOpen(false)
    const url = pendingUrl
    setPendingUrl(null)
    if (url) triggerPdfDownload(url)
  }, [pendingUrl])

  const subscribedAndDownload = useCallback(() => {
    setIsOpen(false)
    const url = pendingUrl
    setPendingUrl(null)
    if (url) triggerPdfDownload(url)
  }, [pendingUrl])

  useEffect(() => {
    if (!isOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen])

  const onClickCapture = (e: React.MouseEvent) => {
    if (isOpen) return
    const target = e.target
    if (!(target instanceof Element)) return

    const anchor = target.closest('a')
    if (!(anchor instanceof HTMLAnchorElement)) return
    if (!isPdfResourceLink(anchor)) return

    e.preventDefault()

    const href = anchor.getAttribute('href')
    if (!href) return

    setPendingUrl(href)
    setIsOpen(true)
  }

  return (
    <>
      <div onClickCapture={onClickCapture}>
        {children}
      </div>

      <ResourceSignupModal
        isOpen={isOpen}
        onCloseAndDownload={closeAndDownload}
        onSubscribedAndDownload={subscribedAndDownload}
      />
    </>
  )
}

