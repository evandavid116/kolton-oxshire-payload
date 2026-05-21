'use client'

import { useEffect, useState } from 'react'

interface ParallaxDividerProps {
  imageUrl: string
  alt: string
  height?: string
  overlay?: string
  children?: React.ReactNode
}

export default function ParallaxDivider({
  imageUrl,
  alt,
  height = 'h-[50vh]',
  overlay = 'bg-black/65',
  children,
}: ParallaxDividerProps) {
  // bg-fixed (background-attachment: fixed) is broken/janky on most mobile
  // browsers (especially iOS Safari). Only enable on desktop with fine pointer.
  const [enableFixed, setEnableFixed] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)')
    const update = () => setEnableFixed(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return (
    <section className={`relative ${height} overflow-hidden`}>
      <div
        className={`absolute inset-0 bg-cover bg-center ${enableFixed ? 'bg-fixed' : ''}`}
        style={{ backgroundImage: `url(${imageUrl})` }}
        role="img"
        aria-label={alt}
      />
      <div className={`absolute inset-0 ${overlay}`} />
      {children && (
        <div className="relative z-10 h-full flex items-center justify-center px-6 bg-black/[0.52]">
          {children}
        </div>
      )}
    </section>
  )
}
