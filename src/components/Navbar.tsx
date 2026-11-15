'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Start Here', href: '/i-just-got-saved' },
  { label: 'Watch', href: '/#watch' },
  { label: 'Books', href: '/#books' },
  { label: 'About', href: '/#about' },
  { label: 'What We Believe', href: '/what-we-believe' },
  { label: 'Invite Kolton', href: '/book-to-speak' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // On the home page, anchor links scroll in place instead of reloading the route.
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false)
    if (href.startsWith('/#') && pathname === '/') {
      e.preventDefault()
      document.getElementById(href.slice(2))?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <div className="hb-strip hb-slug">
        <Link href="/i-just-got-saved">
          <b>Free</b> &nbsp;The New Believer&apos;s Guide &rarr;
        </Link>
        <span>Kolton Oxshire Ministries</span>
      </div>

      <nav className="hb-nav" aria-label="Main">
        <Link href="/" className="hb-mark hb-cond" onClick={() => setOpen(false)}>
          Kolton Oxshire<span aria-hidden="true">.</span>
        </Link>

        <ul>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={(e) => handleAnchorClick(e, link.href)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/partner" className="hb-btn hb-solid">
          Partner
        </Link>

        <button
          type="button"
          className="hb-burger"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        />

        <div id="mobile-menu" className={open ? 'hb-menu hb-open' : 'hb-menu'}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={(e) => handleAnchorClick(e, link.href)}>
              <span>{link.label}</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          ))}
          <Link href="/partner" className="hb-menu-cta" onClick={() => setOpen(false)}>
            <span>Partner</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
    </>
  )
}
