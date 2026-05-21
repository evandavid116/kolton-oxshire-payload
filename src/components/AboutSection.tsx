import type { AboutSection as AboutSectionType } from '@/types/globals'

type Props = {
  data: AboutSectionType
}

export default function AboutSection({ data }: Props) {
  const eyebrow = data?.eyebrow || 'About Kolton'
  const heading = data?.heading || 'Called to Boldly Proclaim'

  const portraitUrl =
    data?.portrait && typeof data.portrait === 'object'
      ? (data.portrait as { url?: string }).url
      : null

  const [headingMain, headingAccent] = heading.includes('Boldly')
    ? [heading.replace('Boldly Proclaim', '').trim(), 'Boldly Proclaim']
    : [heading, '']

  return (
    <section id="about" className="relative py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-shrink-0">
            <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-lg overflow-hidden border-2 border-accent/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={portraitUrl || '/assets/kolton-portrait.jpg'}
                alt="Kolton Oxshire portrait"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>
          </div>

          <div className="flex-1 text-center lg:text-left">
            <p className="font-body text-sm font-semibold tracking-[0.3em] uppercase text-accent mb-3">
              {eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              {headingMain} <span className="text-accent">{headingAccent}</span>
            </h2>
            <div className="space-y-4 font-body text-foreground/80 leading-relaxed text-base sm:text-lg max-w-2xl">
              {data?.body ? (
                // Rich text rendered as plain paragraphs for now
                // (full Lexical rendering can be added once @payloadcms/richtext-lexical/react is set up)
                <p className="whitespace-pre-line">{String(data.body)}</p>
              ) : (
                <>
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
                    mission is simple:{' '}
                    <span className="text-accent font-semibold">talk about Jesus</span> and watch God
                    move.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
