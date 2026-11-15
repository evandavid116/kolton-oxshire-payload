'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Accent from './Accent'

/**
 * Placeholder beats: the Romans verses (KJV) stand in until Kolton supplies his
 * own wording — see CONTENT-TODO.md.
 */
const BEATS = [
  {
    head: 'All have sinned.',
    accent: 'sinned',
    verse: 'For all have sinned, and come short of the glory of God.',
    reference: 'Romans 3:23',
  },
  {
    head: 'But the gift of God is eternal life.',
    accent: 'gift',
    verse:
      'For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord.',
    reference: 'Romans 6:23',
  },
  {
    head: 'Christ died for us.',
    accent: 'died',
    verse:
      'But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.',
    reference: 'Romans 5:8',
  },
  {
    head: 'Confess and believe.',
    accent: 'believe',
    verse:
      'That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved.',
    reference: 'Romans 10:9',
  },
]

// The four beats plus the closing invitation.
const STATES = BEATS.length + 1

/**
 * The Gospel as a pinned film. The section is several screens tall; its stage
 * sticks to the viewport and scroll position becomes the film's playhead, so the
 * clip is scrubbed rather than played. Each beat owns an equal slice of the scroll.
 *
 * With reduced motion (or no JavaScript) nothing pins: handbill.css lays the
 * beats out in order over a still frame.
 */
export default function GospelFilm() {
  const filmRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const film = filmRef.current
    const video = videoRef.current
    const bar = barRef.current
    if (!film || !video || !bar) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const beats = Array.from(film.querySelectorAll<HTMLElement>('[data-beat]'))
    const rail = Array.from(film.querySelectorAll<HTMLElement>('[data-rail]'))
    let current = 0
    let shown = -1
    let frame = 0

    const progress = () => {
      const rect = film.getBoundingClientRect()
      const span = rect.height - window.innerHeight
      return span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0
    }

    const tick = () => {
      const target = progress()
      // ease toward the scroll position so the film does not jitter on wheel steps
      current += (target - current) * 0.16
      if (Math.abs(target - current) < 0.0005) current = target

      bar.style.transform = `scaleX(${current})`
      if (video.duration && !video.seeking) {
        const time = current * (video.duration - 0.05)
        if (Math.abs(video.currentTime - time) > 0.03) video.currentTime = time
      }

      const index = Math.min(STATES - 1, Math.floor(target * STATES))
      if (index !== shown) {
        shown = index
        beats.forEach((beat, n) => beat.classList.toggle('hb-on', n === index))
        rail.forEach((segment, n) => segment.classList.toggle('hb-on', n <= index))
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <section
      className="hb-gospel hb-film"
      id="gospel"
      ref={filmRef}
      aria-label="The Gospel in sixty seconds"
    >
      <div className="hb-film-stage">
        <video
          ref={videoRef}
          src="/redesign/tent-film.mp4"
          poster="/redesign/tent-film-poster.jpg"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className="hb-film-shade" />
        <div className="hb-film-ui">
          <div className="hb-film-head">
            <span className="hb-slug">No. 03</span>
            <h2 className="hb-cond">
              The Gospel <span className="hb-serif hb-red">in sixty seconds</span>
            </h2>
            <span className="hb-slug hb-film-hint" aria-hidden="true">
              Keep scrolling &darr;
            </span>
          </div>
          <div className="hb-film-rail" aria-hidden="true">
            {BEATS.map((beat, i) => (
              <i data-rail className={i === 0 ? 'hb-on' : undefined} key={beat.reference} />
            ))}
          </div>
          <div className="hb-film-beats">
            {BEATS.map((beat, i) => (
              <div className={i === 0 ? 'hb-film-beat hb-on' : 'hb-film-beat'} data-beat key={beat.reference}>
                <p className="hb-cond hb-big">
                  <Accent text={beat.head} word={beat.accent} />
                </p>
                <p className="hb-serif hb-verse">&ldquo;{beat.verse}&rdquo;</p>
                <p className="hb-slug hb-ref">{beat.reference}</p>
              </div>
            ))}
            <div className="hb-film-beat hb-film-end" data-beat>
              <p className="hb-serif hb-film-ready">Ready to give your life to Jesus?</p>
              <Link className="hb-btn hb-solid" href="/i-just-got-saved">
                I just prayed that prayer &rarr;
              </Link>
            </div>
          </div>
        </div>
        <div className="hb-film-progress" ref={barRef} />
      </div>
    </section>
  )
}
