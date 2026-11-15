import Link from 'next/link'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { AboutSection as AboutSectionType } from '@/types/globals'
import RichText from '@/components/RichText'
import MessageThumb from './MessageThumb'

type Props = {
  data: AboutSectionType
  portraitUrl: string
  /** A message frame gives this section a different photo from the hero. */
  frameEmbedId?: string | null
}

const ACCENT_WORD = 'Proclaim'

export default function About({ data, portraitUrl, frameEmbedId }: Props) {
  const heading = data?.heading || 'Called to Boldly Proclaim'
  const body = data?.body && typeof data.body === 'object' ? (data.body as DefaultTypedEditorState) : null

  return (
    <section className="hb-about" id="about" aria-labelledby="about-heading">
      <div className="hb-duo hb-red-bg">
        {frameEmbedId ? (
          <MessageThumb embedId={frameEmbedId} alt="Kolton Oxshire preaching" wideClass="hb-portrait" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="hb-portrait" src={portraitUrl} alt="Kolton Oxshire" loading="lazy" />
        )}
      </div>
      <div className="hb-about-r">
        <span className="hb-slug">No. 06 &mdash; {data?.eyebrow || 'About Kolton'}</span>
        <h2 className="hb-cond" id="about-heading">
          {heading.includes(ACCENT_WORD) ? (
            <>
              {heading.replace(ACCENT_WORD, '')}
              <span className="hb-red">{ACCENT_WORD}</span>
            </>
          ) : (
            heading
          )}
        </h2>
        {body ? (
          <RichText className="hb-cols" data={body} enableGutter={false} enableProse={false} />
        ) : (
          <div className="hb-cols">
            <p>
              Kolton Oxshire is a passionate evangelist and minister of the Gospel, driven by an
              unwavering calling to share the love and power of Jesus Christ. With a heart on fire
              for revival, Kolton reaches people across the nation through bold, uncompromising
              preaching and genuine compassion.
            </p>
            <p>
              Rooted in the Word of God and fueled by the Holy Spirit, his ministry stands at the
              intersection of faith and patriotism — believing that true national strength comes
              from returning to the foundations of Scripture.
            </p>
            <p>
              Whether through social media, live events, or one-on-one conversations, Kolton&apos;s
              mission is simple: <b>talk about Jesus</b> and watch God move.
            </p>
          </div>
        )}
        <div className="hb-cta">
          <Link className="hb-btn hb-ink" href="/what-we-believe">
            What we believe
          </Link>
          <Link className="hb-btn" href="/book-to-speak">
            Invite Kolton
          </Link>
        </div>
      </div>
    </section>
  )
}
