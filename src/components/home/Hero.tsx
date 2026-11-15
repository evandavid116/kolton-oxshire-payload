import Link from 'next/link'
import type { HeroSection as HeroSectionType } from '@/types/globals'

type Props = {
  data: HeroSectionType
  portraitUrl: string
}

const DEFAULT_QUOTE = "That's what I do — I talk about Jesus."
const DEFAULT_DESCRIPTION =
  'Boldly proclaiming the Gospel with the strength of a lion and the heart of a servant.'

/**
 * Splits Kolton's line into the three headline rows:
 * "That's what I do —" / "I talk about" / "Jesus."
 * Without a dash, everything but the last word goes on the main row.
 */
function splitQuote(raw: string) {
  const quote = raw.replace(/^["“”]+|["“”]+$/g, '').trim()
  const dash = quote.indexOf('—')
  const pre = dash === -1 ? '' : `${quote.slice(0, dash).trim()} —`
  const rest = (dash === -1 ? quote : quote.slice(dash + 1)).trim()
  const words = rest.split(/\s+/)
  const accent = words.pop() ?? ''
  return { pre, main: words.join(' '), accent }
}

export default function Hero({ data, portraitUrl }: Props) {
  const { pre, main, accent } = splitQuote(data?.quote || DEFAULT_QUOTE)
  const description = (data?.description || DEFAULT_DESCRIPTION).replace(/\s*\n\s*/g, ' ')

  return (
    <>
      <section className="hb-hero" id="home">
        <div className="hb-hero-l">
          <div className="hb-hero-meta hb-slug">
            <span>No. 01 &mdash; The Message</span>
            <span>Preaching &middot; Teaching &middot; Revival across America</span>
          </div>
          <h1>
            {pre && <div className="hb-cond hb-h-pre">{pre}</div>}
            {main && <div className="hb-cond hb-h-main">{main}</div>}
            <div className="hb-wide hb-h-jesus">{accent}</div>
          </h1>
          <div className="hb-hero-foot">
            <p className="hb-serif">{description}</p>
            <div className="hb-cta">
              <Link className="hb-btn hb-solid" href="/#gospel">
                Hear the Gospel <i aria-hidden="true">&darr;</i>
              </Link>
              <Link className="hb-btn" href="/#watch">
                Watch Messages
              </Link>
            </div>
          </div>
        </div>
        <div className="hb-hero-r">
          <div className="hb-duo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={portraitUrl} alt="Kolton Oxshire" fetchPriority="high" />
          </div>
          <Link className="hb-stamp" href="/i-just-got-saved">
            <span>
              New
              <br />
              Believer&apos;s
              <br />
              Guide
              <br />
              Free
            </span>
          </Link>
          <div className="hb-tag">
            <span className="hb-slug">Kolton Oxshire, evangelist</span>
            <span className="hb-serif">&ldquo;Talk about Jesus and watch God move.&rdquo;</span>
          </div>
        </div>
      </section>

      <div className="hb-ticker hb-cond" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i}>
            <span>Talk about Jesus</span>
            <span>
              <em>and watch God move</em>
            </span>
            <span>✚</span>
          </span>
        ))}
      </div>
    </>
  )
}
