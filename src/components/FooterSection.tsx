import Link from 'next/link'
import type { SiteFooter as SiteFooterType } from '@/types/globals'
import Accent from '@/components/home/Accent'

type Props = {
  data: SiteFooterType
  /** Closing Scripture line; defaults to the verse the live site closes on. */
  quote?: string | null
  highlight?: string | null
}

const DEFAULT_QUOTE = 'The harvest is plentiful, but the workers are few.'
const DEFAULT_HIGHLIGHT = 'few'

const columns = [
  {
    title: 'Start',
    links: [
      { label: 'The Gospel', href: '/#gospel' },
      { label: 'I Just Got Saved', href: '/i-just-got-saved' },
      { label: 'What We Believe', href: '/what-we-believe' },
    ],
  },
  {
    title: 'Grow',
    links: [
      { label: 'Watch', href: '/#watch' },
      { label: 'Books', href: '/#books' },
      { label: 'About Kolton', href: '/#about' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Invite Kolton', href: '/book-to-speak' },
      { label: 'Partner', href: '/partner' },
    ],
  },
]

export default function FooterSection({ data, quote, highlight }: Props) {
  const ministryName = data?.ministryName || 'Kolton Oxshire Ministries'
  const email = data?.email || 'speakinggodsgraceandpower@gmail.com'
  const contactHeading = data?.contactHeading || 'Get in Touch'
  const contactSubtext =
    data?.contactSubtext ||
    "Have questions, prayer requests, or want to invite Kolton to speak?\nReach out — we'd love to hear from you."

  return (
    <footer id="contact" className="hb-footer">
      <div className="hb-f-top">
        <div>
          <p className="hb-serif">
            &ldquo;
            <Accent text={quote || DEFAULT_QUOTE} word={highlight || DEFAULT_HIGHLIGHT} />
            &rdquo;
          </p>
          <div className="hb-contact">
            <h2 className="hb-cond">{contactHeading}</h2>
            <p>{contactSubtext}</p>
            <a className="hb-btn" href={`mailto:${email}`}>
              Email us &rarr;
            </a>
          </div>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="hb-slug">{column.title}</h3>
            <ul>
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="hb-f-word hb-cond" aria-hidden="true">
        Kolton Oxshire<span className="hb-red">.</span>
      </div>
      <div className="hb-f-bot hb-slug">
        <span>
          © {new Date().getFullYear()} {ministryName}. All rights reserved.
        </span>
      </div>
    </footer>
  )
}
