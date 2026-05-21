'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Preaching', href: '/#preaching' },
  { label: 'What We Believe', href: '/what-we-believe' },
  { label: 'I Just Got Saved', href: '/i-just-got-saved' },
  { label: 'Book Kolton', href: '/book-to-speak' },
  { label: 'Partner', href: '/partner' },
  { label: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') && pathname === '/') {
      e.preventDefault()
      const hash = href.slice(2)
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
      setOpen(false)
    }
  }

  const linkClass =
    'font-body text-[11px] font-semibold text-foreground/70 hover:text-accent transition-colors duration-300 tracking-[0.2em] uppercase'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/60">
      <div className="container mx-auto flex items-center justify-between py-5 px-4">
        <Link
          href="/"
          className="font-impact text-2xl text-foreground tracking-tight hover:text-accent transition-colors"
        >
          Kolton <span className="italic text-accent">Oxshire</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className={linkClass}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="lg:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-md border-b border-border">
          <ul className="flex flex-col items-center gap-6 py-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => {
                    handleAnchorClick(e, link.href)
                    setOpen(false)
                  }}
                  className={linkClass}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
