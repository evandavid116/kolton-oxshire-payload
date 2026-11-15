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

import Navbar from '@/components/redesign/Navbar'
import FooterSection from '@/components/redesign/FooterSection'
import Hero from '@/components/redesign/home/Hero'
import PathCards from '@/components/redesign/home/PathCards'
import GospelFilm from '@/components/redesign/home/GospelFilm'
import MessageReel from '@/components/redesign/home/MessageReel'
import GuideOffer from '@/components/redesign/home/GuideOffer'
import ScriptureBreak from '@/components/redesign/home/ScriptureBreak'
import About from '@/components/redesign/home/About'
import Books from '@/components/redesign/home/Books'
import InvitePartner from '@/components/redesign/home/InvitePartner'

export const metadata: Metadata = {
  title: 'Kolton Oxshire Ministries — Redesign preview',
}

export default async function RedesignHomePage() {
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
        <GospelFilm />
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
