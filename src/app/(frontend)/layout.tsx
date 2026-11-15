import type { Metadata } from 'next'
import React from 'react'

import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://koltonoxshire.com'),
  title: {
    default: 'Kolton Oxshire Ministries — Boldly Proclaiming the Gospel',
    template: '%s | Kolton Oxshire Ministries',
  },
  description:
    'Kolton Oxshire Ministries proclaims the Gospel of Jesus Christ with boldness — preaching, teaching, and revival across America.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://koltonoxshire.com',
    siteName: 'Kolton Oxshire Ministries',
    images: [{ url: '/og-image.jpg' }],
  },
  twitter: { card: 'summary_large_image' },
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
      </head>
      <body>{children}</body>
    </html>
  )
}
