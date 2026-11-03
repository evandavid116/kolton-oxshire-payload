import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { SiteFooter as SiteFooterType } from '@/types/globals'
import { findGlobal } from '@/utilities/findGlobal'

import Navbar from '@/components/Navbar'
import FooterSection from '@/components/FooterSection'

const description =
  'Three historical facts behind the resurrection of Jesus: an early creed, hostile witnesses who changed, and the minimal facts scholars already grant.'

const pageTitle = 'The Resurrection of Jesus'

export const metadata: Metadata = {
  title: pageTitle,
  description,
  alternates: {
    canonical: '/resurrection',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/resurrection',
    siteName: 'Kolton Oxshire Ministries',
    title: `${pageTitle} | Kolton Oxshire Ministries`,
    description,
    images: [
      {
        url: '/assets/lion-eagle-flag.jpg',
        alt: 'Lion of Judah, bald eagle, and the American flag',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${pageTitle} | Kolton Oxshire Ministries`,
    description,
    images: ['/assets/lion-eagle-flag.jpg'],
  },
}

const witnesses = [
  'Peter',
  'The Twelve',
  'Over 500 at once, most still alive',
  'James, Jesus’ skeptical brother',
  'Paul',
]

const minimalFacts = [
  'Jesus was crucified and died.',
  'The disciples had experiences they were convinced were appearances of the risen Jesus.',
  'Their lives were radically transformed (from fearful to bold public proclamation, willing to die).',
  'This message was proclaimed extremely early in Jerusalem (the 1 Corinthians 15 creed is the strongest single piece — dated by most scholars to within a few years of the events).',
]

function VideoFrame({
  id,
  title,
  portrait = false,
}: {
  id: string
  title: string
  portrait?: boolean
}) {
  return (
    <div
      className="relative w-full overflow-hidden border border-border bg-card"
      style={{ paddingBottom: portrait ? '177.78%' : '56.25%' }}
    >
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  )
}

function ReadMore({ children }: { children: ReactNode }) {
  return (
    <details className="mt-8 border border-border bg-card">
      <summary className="cursor-pointer px-5 py-4 font-body text-xs font-bold uppercase tracking-[0.22em] text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent">
        Read more
      </summary>
      <div className="space-y-4 border-t border-border px-5 py-5 font-body text-base leading-relaxed text-foreground/80 sm:text-lg">
        {children}
      </div>
    </details>
  )
}

function ArtFigure({
  src,
  alt,
  width,
  height,
  artist,
  title,
  source,
}: {
  src: string
  alt: string
  width: number
  height: number
  artist: string
  title: string
  source: string
}) {
  return (
    <figure className="mt-10">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={100}
        sizes="(max-width: 768px) 92vw, 640px"
        className="mx-auto h-auto max-h-[70vh] w-auto max-w-full border border-border"
      />
      <figcaption className="mt-3 text-center font-body text-sm text-foreground/60">
        {artist}, <cite className="not-italic">{title}</cite>. Public domain.{' '}
        <a
          href={source}
          className="underline decoration-foreground/30 underline-offset-2 hover:text-accent"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wikimedia Commons
        </a>
      </figcaption>
    </figure>
  )
}

export default async function ResurrectionPage() {
  const payload = await getPayload({ config: configPromise })
  const footer = await findGlobal<SiteFooterType>(payload, 'site-footer', { depth: 1 })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/lion-eagle-flag.jpg"
            alt=""
            className="h-full w-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-background/90" />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-16 text-center">
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            Three real facts
          </p>
          <h1 className="mb-4 font-display text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl md:text-6xl">
            The Resurrection Is <span className="text-accent">Real</span>
          </h1>
          <p className="mx-auto max-w-2xl font-body text-lg text-foreground/70">
            Three of many facts that the resurrection of Jesus is true.
          </p>
        </div>
      </section>

      <section className="bg-secondary py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <p className="font-display text-5xl font-bold leading-none text-accent sm:text-6xl">
              01
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.08] text-foreground sm:text-4xl md:text-5xl">
              An early creed, not a later <span className="text-accent">legend</span>
            </h2>
            <p className="mt-5 font-body text-base leading-relaxed text-foreground/80 sm:text-lg">
              In 1 Corinthians 15:3–7, Paul quotes a pre-existing creed he “received” (standard
              rabbinic language for passing on established tradition). Scholars date this creed to
              within 2–5 years of the crucifixion (around AD 30–35).
            </p>

            <blockquote className="mt-8 border border-border bg-card p-6 sm:p-8">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                1 Corinthians 15:3–7
              </p>
              <p className="mt-4 font-display text-2xl font-bold leading-[1.15] text-foreground sm:text-3xl">
                “This is not a later legend.”
              </p>
              <p className="mt-4 font-body text-base leading-relaxed text-foreground/80 sm:text-lg">
                It lists specific named people and groups who claimed to have seen the risen Jesus.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {witnesses.map((name) => (
                  <li
                    key={name}
                    className="border border-border bg-background px-3 py-2 font-body text-sm font-semibold text-foreground"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </blockquote>

            <ArtFigure
              src="/assets/resurrection/bloch-resurrection.jpg"
              alt="The risen Jesus stands in a tomb doorway with arms raised and a halo of light, while two kneeling angels look up at him. Lilies and a fallen helmet rest on the stone."
              width={1000}
              height={1400}
              artist="Carl Heinrich Bloch"
              title="The Resurrection"
              source="https://commons.wikimedia.org/wiki/File:Carl_Heinrich_Bloch_-_The_Resurrection.jpg"
            />

            <ReadMore>
              <p>
                This is not a later legend. It’s a summary of eyewitness testimony that was already
                formalized and circulating in the Aramaic-speaking Jerusalem church before Paul’s
                letters. No other ancient religion has a comparable, multiply-attested,
                named-witness claim this close to the events. The creed doesn’t ask you to feel
                something; it reports what these people publicly claimed happened and were willing
                to die for.
              </p>
              <p>
                If you’ve studied other religions, you’ll notice almost none of them even attempt
                this kind of early, public, verifiable testimony structure. That’s what makes this
                one stand out historically.
              </p>
            </ReadMore>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <p className="font-display text-5xl font-bold leading-none text-accent sm:text-6xl">
              02
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.08] text-foreground sm:text-4xl md:text-5xl">
              The last people who should have <span className="text-accent">believed</span>
            </h2>
            <p className="mt-5 font-body text-base leading-relaxed text-foreground/80 sm:text-lg">
              Here’s the part that actually shifted the needle for many historians and philosophers
              who started as skeptics. Two of the most important witnesses to the resurrection were
              the last people on earth who should have believed it.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <article className="border border-border bg-card p-6">
                <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                  The skeptic brother
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-foreground">James</h3>
                <p className="mt-3 font-body text-base leading-relaxed text-foreground/80">
                  James, Jesus’ own brother, was not a follower during the ministry (the Gospels
                  openly say the family thought Jesus was crazy). Yet after the crucifixion he
                  became a leader of the Jerusalem church and was martyred for his belief. The only
                  explanation given in the earliest sources is that he had a post-mortem appearance
                  of Jesus.
                </p>
              </article>
              <article className="border border-border bg-card p-6">
                <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                  The persecutor
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-foreground">Paul</h3>
                <p className="mt-3 font-body text-base leading-relaxed text-foreground/80">
                  Paul (Saul) was an active persecutor of Christians, arresting and approving
                  executions. He then had a dramatic reversal, claimed the risen Jesus appeared to
                  him, and spent the rest of his life suffering beatings, imprisonment, and eventual
                  execution for that claim.
                </p>
              </article>
            </div>

            <p className="mt-6 border-l-2 border-accent pl-4 font-body text-base leading-relaxed text-foreground/80 sm:text-lg">
              The first disciples went from hiding in fear to publicly proclaiming the resurrection
              in Jerusalem, right where it could be falsified.
            </p>

            <ArtFigure
              src="/assets/resurrection/caravaggio-conversion.jpg"
              alt="Paul lies on his back beneath a horse, arms thrown upward, while an older man holds the reins in a dark stable-like space."
              width={1218}
              height={1600}
              artist="Caravaggio"
              title="The Conversion on the Way to Damascus"
              source="https://commons.wikimedia.org/wiki/File:Caravaggio-The_Conversion_on_the_Way_to_Damascus.jpg"
            />

            <div className="mt-10">
              <h3 className="mb-4 font-display text-2xl font-bold leading-[1.12] text-foreground sm:text-3xl">
                Non-believer philosopher turned Christian, and other expert historians, explain why
                they believe in the <span className="text-accent">resurrection</span>
              </h3>
              <VideoFrame
                id="8MwQ1TIHX64"
                title="Non-believer philosopher turned Christian and other expert historians explain why they believe in the resurrection"
              />
            </div>

            <ReadMore>
              <p>
                These aren’t later converts who heard a nice story. These are hostile/skeptical
                insiders who had every social, religious, and personal reason to reject the
                resurrection — yet they flipped and paid the highest price. Combined with the fact
                that the first disciples went from hiding in fear to publicly proclaiming the
                resurrection in Jerusalem (right where it could be falsified), the transformation is
                historically unusual.
              </p>
              <p>
                Historians who study ancient movements say this level of rapid, costly conviction
                from the original skeptics and enemies is extremely rare without something
                extraordinary happening to them. It’s not feelings — it’s documented behavioral
                change that requires an explanation.
              </p>
            </ReadMore>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <p className="font-display text-5xl font-bold leading-none text-accent sm:text-6xl">
              03
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.08] text-foreground sm:text-4xl md:text-5xl">
              What scholars already <span className="text-accent">grant</span>
            </h2>
            <p className="mt-5 font-body text-base leading-relaxed text-foreground/80 sm:text-lg">
              Instead of asking you to accept it as inspired, historians use a “minimal facts”
              method: only the data that the vast majority of credentialed scholars (across the
              spectrum — liberals, conservatives, atheists, Jews) accept as well-supported by the
              historical evidence.
            </p>

            <ol className="mt-8 grid list-none gap-4 sm:grid-cols-2">
              {minimalFacts.map((fact, index) => (
                <li key={fact} className="border border-border bg-card p-6">
                  <span
                    className="font-display text-2xl font-bold leading-none text-accent"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <p className="mt-3 font-body text-base leading-relaxed text-foreground/80">
                    {fact}
                  </p>
                </li>
              ))}
            </ol>

            <aside className="mt-4 border-l-2 border-accent bg-card px-6 py-5">
              <h3 className="font-display text-xl font-bold text-foreground">The empty tomb</h3>
              <p className="mt-2 font-body text-base leading-relaxed text-foreground/80">
                A strong majority of scholars also accept the empty tomb as historically probable
                (women as first witnesses is an “embarrassment” in those days. A detail no one would
                invent in that culture back then).
              </p>
            </aside>

            <ArtFigure
              src="/assets/resurrection/carracci-women-at-tomb.jpg"
              alt="Three women at Christ’s tomb turn toward an angel seated on the stone. One lifts her hands, another carries a jar, and the angel points outward."
              width={1400}
              height={1162}
              artist="Annibale Carracci"
              title="Holy Women at Christ’s Tomb"
              source="https://commons.wikimedia.org/wiki/File:Annibale_Carracci_-_Holy_Women_at_Christ%27_s_Tomb_-_WGA4454.jpg"
            />

            <div className="mx-auto mt-10 max-w-sm">
              <h3 className="mb-4 font-display text-xl font-bold leading-[1.15] text-foreground sm:text-2xl">
                Proof of Jesus in Josephus, Antiquities of the Jews, Book 18, Chapter 4, third
                paragraph
              </h3>
              <VideoFrame
                id="bp9b_Ds34n4"
                title="Proof of Jesus in Josephus, Antiquities of the Jews, Book 18, Chapter 4, third paragraph"
                portrait
              />
            </div>

            <ReadMore>
              <p>
                These facts are not taken on faith. They come from multiple independent sources,
                early dating, the criterion of embarrassment, and enemy attestation. Even scholars
                who don’t believe the resurrection happened agree these facts need explaining.
              </p>
              <p>
                The question then becomes: what best explains all of them together? The bodily
                resurrection hypothesis explains them without special pleading. Naturalistic
                alternatives (hallucinations, theft, swoon, legend) each fail to account for the
                full set of data that scholars already grant.
              </p>
            </ReadMore>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.3em] text-accent">
              Next step
            </p>
            <h2 className="mb-6 font-display text-3xl font-bold leading-[1.08] text-foreground sm:text-4xl md:text-5xl">
              Come to <span className="text-accent">Jesus</span>
            </h2>
            <p className="mb-10 font-body text-lg leading-relaxed text-foreground/70">
              The bodily resurrection hypothesis explains the facts above without special pleading.
              If you’re ready to respond, start here.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/i-just-got-saved"
                className="inline-flex items-center justify-center bg-accent px-10 py-4 font-body text-xs font-bold uppercase tracking-[0.25em] text-accent-foreground transition-all duration-300 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                I Just Got Saved
              </Link>
              <Link
                href="/what-we-believe"
                className="inline-flex items-center justify-center border border-accent/50 px-10 py-4 font-body text-xs font-bold uppercase tracking-[0.25em] text-accent transition-all duration-300 hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                What We Believe
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FooterSection data={footer} />
    </div>
  )
}
