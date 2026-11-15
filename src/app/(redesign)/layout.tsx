import type { Metadata } from 'next'
import { Archivo, Instrument_Serif } from 'next/font/google'
import React from 'react'

import './redesign.css'
import './handbill.css'

// Display + text: Archivo variable, with the width axis so headlines can run condensed or wide.
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  style: ['normal', 'italic'],
  variable: '--font-archivo',
  display: 'swap',
})

// Voice: Scripture and Kolton's quotes.
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
})

// The redesign lives beside the current build until it is approved, so search engines are kept out.
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://koltonoxshire.com'),
  title: {
    default: 'Kolton Oxshire Ministries — Redesign preview',
    template: '%s | Kolton Oxshire Ministries (redesign preview)',
  },
  description:
    'Kolton Oxshire Ministries proclaims the Gospel of Jesus Christ with boldness — preaching, teaching, and revival across America.',
  robots: { index: false, follow: false },
}

export default function RedesignLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${instrumentSerif.variable}`}>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
      </head>
      <body>{children}</body>
    </html>
  )
}
