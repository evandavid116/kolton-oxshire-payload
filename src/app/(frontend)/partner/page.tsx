import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { SiteFooter as SiteFooterType, PartnerPage as PartnerPageType } from '@/types/globals'
import { findGlobal } from '@/utilities/findGlobal'

import Navbar from '@/components/Navbar'
import ParallaxDivider from '@/components/ParallaxDivider'
import FooterSection from '@/components/FooterSection'
import { stockPhotos } from '@/lib/stockPhotos'

export const metadata: Metadata = {
  title: 'Partner With Us',
  description:
    'Partner with Kolton Oxshire Ministries to take the Gospel across America. Give securely and help win souls for Jesus Christ.',
}

export default async function PartnerPage() {
  const payload = await getPayload({ config: configPromise })

  const [partnerData, footer] = await Promise.all([
    findGlobal<PartnerPageType>(payload, 'partner-page', { depth: 1 }),
    findGlobal<SiteFooterType>(payload, 'site-footer', { depth: 1 }),
  ])

  const heroHeadline = partnerData?.heroHeadline || 'Partner With Us'
  const heroSublines = (partnerData?.heroSublines as Array<{ line: string }> | null) || [
    { line: "It's More Than a Transaction." },
    { line: 'You Are Family.' },
  ]
  const heroCtaLabel = partnerData?.heroCtaLabel || 'Join the Family'
  const bibleQuote =
    partnerData?.bibleQuote ||
    '"Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."'
  const donorboxUrl =
    partnerData?.donorboxUrl ||
    'https://donorbox.org/embed/thank-you-for-financially-blessing-my-ministry?default_interval=o&enable_auto_scroll=true'
  const venmoUrl = partnerData?.venmoUrl || 'https://venmo.com/u/Kolton-Oxshire'
  const additionalLinks =
    (partnerData?.additionalGivingLinks as Array<{ label: string; url: string }> | null) || []

  const DEFAULT_MISSION =
    'Every life changed through Kolton Oxshire Ministries is the result of obedience, prayer, and faithful partners who believe in the power of the gospel. Your generosity helps carry the message of Jesus to millions online and into churches, schools, and cities across the nation. As God continues to open doors for revival, your partnership is what makes it possible to walk through them. Together, we\'re not just sharing the gospel — we\'re watching God transform lives, one soul at a time.'

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 overflow-hidden">
        <div className="relative min-h-[85vh] flex items-center justify-center">
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/lion-eagle-flag.jpg"
              alt="Lion of Judah, Bald Eagle and American Flag"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'rgba(20,20,20,0.73)' }} />
          </div>

          <div className="relative z-10 px-6 py-20 text-center max-w-3xl mx-auto">
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-accent mb-6 leading-tight text-shadow-hero">
              {heroHeadline}
            </h1>
            {heroSublines.map((item, i) => (
              <p
                key={i}
                className="font-display text-xl sm:text-2xl font-bold text-cream mb-2 uppercase tracking-wide text-shadow-hero"
              >
                {i === heroSublines.length - 1 ? (
                  <>
                    You Are <span className="text-accent">Family.</span>
                  </>
                ) : (
                  item.line
                )}
              </p>
            ))}
            <a
              href="#give"
              className="inline-flex items-center justify-center px-10 py-4 bg-accent text-accent-foreground font-body font-bold text-sm uppercase tracking-wider rounded-sm hover:brightness-110 transition-all duration-300 gold-glow mt-8"
            >
              {heroCtaLabel}
            </a>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="font-body text-foreground/80 text-lg leading-relaxed">
            <p>{DEFAULT_MISSION}</p>
          </div>
        </div>
      </section>

      {/* Parallax divider — open Bible */}
      <ParallaxDivider
        imageUrl={stockPhotos.openBible}
        alt="Open Bible on a table"
        height="h-[50vh]"
        overlay="bg-black/60"
      >
        <p className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-cream text-center text-shadow-hero leading-tight max-w-2xl">
          {bibleQuote}
        </p>
      </ParallaxDivider>

      {/* Giving Section */}
      <section id="give" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-body text-sm font-semibold tracking-[0.3em] uppercase text-accent mb-3">
              Give
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Make a <span className="text-accent">Difference</span>
            </h2>
            <p className="font-body text-foreground/70 max-w-2xl mx-auto text-base sm:text-lg">
              Your partnership helps us take the Gospel across America and win souls for Jesus Christ.
            </p>
          </div>

          <div className="w-full max-w-md mx-auto mb-16 px-0">
            <iframe
              src={donorboxUrl}
              name="donorbox"
              title="Donate via DonorBox"
              allow="payment"
              seamless
              frameBorder={0}
              scrolling="no"
              className="block w-full mx-auto h-[760px] sm:h-[700px]"
              style={{ maxWidth: '500px', minWidth: '0' }}
            />
          </div>

          <div className="border-t border-border max-w-4xl mx-auto pt-12">
            <h3 className="font-display text-2xl font-bold text-foreground text-center mb-8">
              Other Ways to <span className="text-accent">Give</span>
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={venmoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border-2 border-accent/50 text-accent font-body font-bold text-sm uppercase tracking-wider rounded-sm hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                Venmo
              </a>
              {additionalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 border-2 border-accent/50 text-accent font-body font-bold text-sm uppercase tracking-wider rounded-sm hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ParallaxDivider
        imageUrl={stockPhotos.mountainPeak}
        alt="Mountain peak at sunrise"
        height="h-[45vh]"
        overlay="bg-black/45"
      />

      <FooterSection data={footer} />
    </div>
  )
}
