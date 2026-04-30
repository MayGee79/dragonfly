'use client'

import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react'
import { useCallback, useEffect, useState } from 'react'
import ResourceSignupModal from '@/components/ResourceSignupModal'

function triggerDownload(url: string) {
  const a = document.createElement('a')
  a.href = url
  a.setAttribute('download', '')
  document.body.appendChild(a)
  a.click()
  a.remove()
}

function isResourceDownloadLink(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute('href') || ''
  if (!href.startsWith('/resources/')) return false
  return /\.(pdf|docx|doc)$/i.test(href)
}

export default function ResourceDownloadGate(props: { children: ReactNode }) {
  const { children } = props

  const [pendingUrl, setPendingUrl] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const closeAndDownload = useCallback(() => {
    setIsOpen(false)
    const url = pendingUrl
    setPendingUrl(null)
    if (url) triggerDownload(url)
  }, [pendingUrl])

  const subscribedAndDownload = useCallback(() => {
    setIsOpen(false)
    const url = pendingUrl
    setPendingUrl(null)
    if (url) triggerDownload(url)
  }, [pendingUrl])

  useEffect(() => {
    if (!isOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen])

  const onClickCapture = (e: ReactMouseEvent) => {
    if (isOpen) return
    const target = e.target
    if (!(target instanceof Element)) return

    const anchor = target.closest('a')
    if (!(anchor instanceof HTMLAnchorElement)) return
    if (!isResourceDownloadLink(anchor)) return

    e.preventDefault()

    const href = anchor.getAttribute('href')
    if (!href) return

    setPendingUrl(href)
    setIsOpen(true)
  }

  return (
    <>
      <div onClickCapture={onClickCapture}>{children}</div>

      <ResourceSignupModal
        isOpen={isOpen}
        onCloseAndDownload={closeAndDownload}
        onSubscribedAndDownload={subscribedAndDownload}
      />
    </>
  )
}

