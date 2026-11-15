'use client'

import { useState } from 'react'

type Props = {
  embedId: string
  alt?: string
  /** Class added when the wide 4:3 fallback frame is in use. */
  wideClass?: string
}

/**
 * YouTube frame for a message. Shorts expose a vertical frame at `oar2.jpg`;
 * regular videos answer that URL with a 120px placeholder, so we swap to the
 * standard `hqdefault.jpg` frame when we see it.
 */
export default function MessageThumb({ embedId, alt = '', wideClass = 'hb-wide-thumb' }: Props) {
  const [wide, setWide] = useState(false)
  const src = wide
    ? `https://i.ytimg.com/vi/${embedId}/hqdefault.jpg`
    : `https://i.ytimg.com/vi/${embedId}/oar2.jpg`

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={wide ? wideClass : undefined}
      onLoad={(e) => {
        if (!wide && e.currentTarget.naturalWidth <= 120) setWide(true)
      }}
      onError={() => {
        if (!wide) setWide(true)
      }}
    />
  )
}
