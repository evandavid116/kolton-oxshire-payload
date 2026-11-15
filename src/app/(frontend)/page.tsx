import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type {
  HeroSection as HeroSectionType,
  AboutSection as AboutSectionType,
  PreachingVideos as PreachingVideosType,
  PartnerPage as PartnerPageType,
  GivingSection as GivingSectionType,
  ParallaxDividers as ParallaxDividersType,
  SiteFooter as SiteFooterType,
} from '@/types/globals'
import { findGlobal } from '@/utilities/findGlobal'

import Navbar from '@/components/Navbar'
import FooterSection from '@/components/FooterSection'
import Hero from '@/components/home/Hero'
import PathCards from '@/components/home/PathCards'
import GospelChapter from '@/components/home/GospelChapter'
import MessageReel from '@/components/home/MessageReel'
import GuideOffer from '@/components/home/GuideOffer'
import ScriptureBreak from '@/components/home/ScriptureBreak'
import About from '@/components/home/About'
import Books from '@/components/home/Books'
import InvitePartner from '@/components/home/InvitePartner'

export const metadata: Metadata = {
  title: 'Kolton Oxshire Ministries — Boldly Proclaiming the Gospel',
  description:
    'Kolton Oxshire Ministries proclaims the Gospel of Jesus Christ with boldness — preaching, teaching, and revival across America.',
}

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const [hero, about, preaching, giving, parallax, footer, partner] = await Promise.all([
    findGlobal<HeroSectionType>(payload, 'hero-section', { depth: 1 }),
    findGlobal<AboutSectionType>(payload, 'about-section', { depth: 1 }),
    findGlobal<PreachingVideosType>(payload, 'preaching-videos', { depth: 1 }),
    findGlobal<GivingSectionType>(payload, 'giving-section', { depth: 1 }),
    findGlobal<ParallaxDividersType>(payload, 'parallax-dividers', { depth: 1 }),
    findGlobal<SiteFooterType>(payload, 'site-footer', { depth: 1 }),
    findGlobal<PartnerPageType>(payload, 'partner-page', { depth: 1 }),
  ])

  const portraitUrl =
    (about?.portrait && typeof about.portrait === 'object' && about.portrait.url) ||
    '/assets/kolton-portrait.jpg'

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero data={hero} portraitUrl={portraitUrl} />
        <PathCards />
        <GospelChapter />
        <MessageReel data={preaching} />
        <GuideOffer />
        <ScriptureBreak quote={parallax?.quote1} highlight={parallax?.quote1Highlight} />
        <About data={about} portraitUrl={portraitUrl} />
        <Books />
        <InvitePartner giving={giving} partner={partner} />
      </main>
      <FooterSection data={footer} quote={parallax?.quote2} highlight={parallax?.quote2Highlight} />
    </div>
  )
}
