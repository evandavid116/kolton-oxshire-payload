import type { Metadata } from 'next';
import Link from 'next/link';
import configPromise from '@payload-config';
import { getPayload } from 'payload';
import type { SiteFooter as SiteFooterType } from '@/types/globals';
import { findGlobal } from '@/utilities/findGlobal';

import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';

const description =
  'Three historical facts behind the resurrection of Jesus: an early creed, hostile witnesses who changed, and the minimal facts scholars already grant.';

const pageTitle = 'The Resurrection of Jesus';

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
};

const minimalFacts = [
  'Jesus was crucified and died.',
  'The disciples had experiences they were convinced were appearances of the risen Jesus.',
  'Their lives were radically transformed (from fearful to bold public proclamation, willing to die).',
  'This message was proclaimed extremely early in Jerusalem (the 1 Corinthians 15 creed is the strongest single piece — dated by most scholars to within a few years of the events).',
];

function VideoFrame({
  id,
  title,
  portrait = false,
}: {
  id: string;
  title: string;
  portrait?: boolean;
}) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-lg border border-border bg-card"
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
  );
}

export default async function ResurrectionPage() {
  const payload = await getPayload({ config: configPromise });
  const footer = await findGlobal<SiteFooterType>(payload, 'site-footer', { depth: 1 });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/lion-eagle-flag.jpg"
            alt=""
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-background/90" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center py-16">
          <p className="font-body text-sm font-semibold tracking-[0.3em] uppercase text-accent mb-3">
            Three real facts
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] text-foreground mb-4">
            The Resurrection Is <span className="text-accent">Real</span>
          </h1>
          <p className="font-body text-foreground/70 text-lg max-w-2xl mx-auto">
            Three of many facts that the resurrection of Jesus is true.
          </p>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <p className="font-body text-sm font-semibold tracking-[0.3em] uppercase text-accent mb-3">
              Fact 01
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.08] text-foreground mb-8">
              An early creed, not a later <span className="text-accent">legend</span>
            </h2>
            <div className="font-body text-foreground/80 text-base sm:text-lg leading-relaxed space-y-6">
              <p>
                In 1 Corinthians 15:3–7, Paul quotes a pre-existing creed he “received” (standard
                rabbinic language for passing on established tradition). Scholars date this creed to
                within 2–5 years of the crucifixion (around AD 30–35). It lists specific named
                people and groups who claimed to have seen the risen Jesus: Peter, the Twelve, over
                500 at once (most still alive when Paul wrote), James (Jesus’ skeptical brother),
                and then Paul himself.
              </p>
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
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <p className="font-body text-sm font-semibold tracking-[0.3em] uppercase text-accent mb-3">
              Fact 02
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.08] text-foreground mb-8">
              The last people who should have <span className="text-accent">believed</span>
            </h2>
            <div className="font-body text-foreground/80 text-base sm:text-lg leading-relaxed space-y-6">
              <p>
                Here’s the part that actually shifted the needle for many historians and
                philosophers who started as skeptics. Two of the most important witnesses to the
                resurrection were the last people on earth who should have believed it.
              </p>
              <ul className="space-y-4">
                <li className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">James</h3>
                  <p>
                    James, Jesus’ own brother, was not a follower during the ministry (the Gospels
                    openly say the family thought Jesus was crazy). Yet after the crucifixion he
                    became a leader of the Jerusalem church and was martyred for his belief. The
                    only explanation given in the earliest sources is that he had a post-mortem
                    appearance of Jesus.
                  </p>
                </li>
                <li className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">Paul</h3>
                  <p>
                    Paul (Saul) was an active persecutor of Christians, arresting and approving
                    executions. He then had a dramatic reversal, claimed the risen Jesus appeared to
                    him, and spent the rest of his life suffering beatings, imprisonment, and
                    eventual execution for that claim.
                  </p>
                </li>
              </ul>
              <p>
                These aren’t later converts who heard a nice story. These are hostile or skeptical
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
            </div>

            <div className="mt-14">
              <h3 className="font-display text-2xl sm:text-3xl font-bold leading-[1.12] text-foreground mb-6">
                Non-believer philosopher turned Christian, and other expert historians, explain why
                they believe in the <span className="text-accent">resurrection</span>
              </h3>
              <VideoFrame
                id="8MwQ1TIHX64"
                title="Non-believer philosopher turned Christian and other expert historians explain why they believe in the resurrection"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <p className="font-body text-sm font-semibold tracking-[0.3em] uppercase text-accent mb-3">
              Fact 03
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.08] text-foreground mb-8">
              What scholars already <span className="text-accent">grant</span>
            </h2>
            <div className="font-body text-foreground/80 text-base sm:text-lg leading-relaxed space-y-6">
              <p>
                Instead of asking you to accept it as inspired, historians use a “minimal facts”
                method: only the data that the vast majority of credentialed scholars (across the
                spectrum — liberals, conservatives, atheists, Jews) accept as well-supported by the
                historical evidence.
              </p>
              <p>The four most widely accepted facts are:</p>
              <ol className="space-y-4 list-none">
                {minimalFacts.map((fact, index) => (
                  <li key={fact} className="flex gap-4 bg-card border border-border rounded-lg p-6">
                    <span
                      className="font-display text-accent text-xl leading-none mt-1"
                      aria-hidden="true"
                    >
                      {index + 1}
                    </span>
                    <p>{fact}</p>
                  </li>
                ))}
              </ol>
              <p>
                A strong majority of scholars also accept the empty tomb as historically probable
                (women as first witnesses is an “embarrassment” in those days. A detail no one would
                invent in that culture back then).
              </p>
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
            </div>

            <div className="mt-14 grid gap-10 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-xl font-bold leading-[1.15] text-foreground mb-4 sm:min-h-[6.75rem]">
                  Proof of Jesus in Josephus, Antiquities of the Jews, Book 18, Chapter 4, third
                  paragraph
                </h3>
                <VideoFrame
                  id="bp9b_Ds34n4"
                  title="Proof of Jesus in Josephus, Antiquities of the Jews, Book 18, Chapter 4, third paragraph"
                  portrait
                />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold leading-[1.15] text-foreground mb-4 sm:min-h-[6.75rem]">
                  Man discovers the actual blood of Jesus in 1982
                </h3>
                <VideoFrame
                  id="k211WYyRNQg"
                  title="Man discovers the actual blood of Jesus in 1982"
                  portrait
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-body text-sm font-semibold tracking-[0.3em] uppercase text-accent mb-3">
              Next step
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.08] text-foreground mb-6">
              Come to <span className="text-accent">Jesus</span>
            </h2>
            <p className="font-body text-foreground/70 text-lg leading-relaxed mb-10">
              The bodily resurrection hypothesis explains the facts above without special pleading.
              If you’re ready to respond, start here.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/i-just-got-saved"
                className="inline-flex items-center justify-center px-10 py-4 bg-accent text-accent-foreground font-body font-bold text-xs uppercase tracking-[0.25em] hover:brightness-110 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                I Just Got Saved
              </Link>
              <Link
                href="/what-we-believe"
                className="inline-flex items-center justify-center px-10 py-4 border border-accent/50 text-accent font-body font-bold text-xs uppercase tracking-[0.25em] hover:bg-accent hover:text-accent-foreground transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                What We Believe
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FooterSection data={footer} />
    </div>
  );
}
