import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type {
  HeroSection as HeroSectionType,
  AboutSection as AboutSectionType,
  PreachingVideos as PreachingVideosType,
  TeachingSection as TeachingSectionType,
  GivingSection as GivingSectionType,
  ParallaxDividers as ParallaxDividersType,
  SiteFooter as SiteFooterType,
} from '@/types/globals'
import { findGlobal } from '@/utilities/findGlobal'

import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ParallaxDivider from '@/components/ParallaxDivider'
import PreachingVideos from '@/components/PreachingVideos'
import TeachingSection from '@/components/TeachingSection'
import GivingSection from '@/components/GivingSection'
import FooterSection from '@/components/FooterSection'
import { stockPhotos } from '@/lib/stockPhotos'

export const metadata: Metadata = {
  title: 'Kolton Oxshire Ministries — Boldly Proclaiming the Gospel',
  description:
    'Kolton Oxshire Ministries proclaims the Gospel of Jesus Christ with boldness — preaching, teaching, and revival across America.',
}

function QuoteText({ quote, highlight }: { quote: string; highlight?: string | null }) {
  if (!highlight || !quote.includes(highlight)) return <>{quote}</>
  const [before, after] = quote.split(highlight)
  return (
    <>
      {before}
      <span className="text-accent">{highlight}</span>
      {after}
    </>
  )
}

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const [hero, about, preaching, teaching, giving, parallax, footer] = await Promise.all([
    findGlobal<HeroSectionType>(payload, 'hero-section', { depth: 1 }),
    findGlobal<AboutSectionType>(payload, 'about-section', { depth: 1 }),
    findGlobal<PreachingVideosType>(payload, 'preaching-videos', { depth: 1 }),
    findGlobal<TeachingSectionType>(payload, 'teaching-section', { depth: 1 }),
    findGlobal<GivingSectionType>(payload, 'giving-section', { depth: 1 }),
    findGlobal<ParallaxDividersType>(payload, 'parallax-dividers', { depth: 1 }),
    findGlobal<SiteFooterType>(payload, 'site-footer', { depth: 1 }),
  ])

  // Parallax images: use Payload media or fall back to Unsplash stock
  const q1img =
    parallax?.quote1Image && typeof parallax.quote1Image === 'object'
      ? (parallax.quote1Image as { url?: string }).url || stockPhotos.worshipHands
      : stockPhotos.worshipHands

  const q2img =
    parallax?.quote2Image && typeof parallax.quote2Image === 'object'
      ? (parallax.quote2Image as { url?: string }).url || stockPhotos.goldenWheatField
      : stockPhotos.goldenWheatField

  const d3img =
    parallax?.divider3Image && typeof parallax.divider3Image === 'object'
      ? (parallax.divider3Image as { url?: string }).url || stockPhotos.baldEagleFlying
      : stockPhotos.baldEagleFlying

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection data={hero} />

      <AboutSection data={about} />

      {/* Parallax divider 1 — worship hands */}
      <ParallaxDivider imageUrl={q1img} alt="Hands raised in worship" height="h-[60vh]" overlay="bg-black/65">
        <p className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-cream text-center text-shadow-hero leading-tight max-w-3xl">
          &ldquo;
          <QuoteText
            quote={parallax?.quote1 || 'Go into all the world and preach the gospel to all creation.'}
            highlight={parallax?.quote1Highlight || 'gospel'}
          />
          &rdquo;
        </p>
      </ParallaxDivider>

      <PreachingVideos data={preaching} />

      {/* Parallax divider 2 — golden wheat field */}
      <ParallaxDivider imageUrl={q2img} alt="Golden wheat field at sunset" height="h-[50vh]" overlay="bg-black/55">
        <p className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-cream text-center text-shadow-hero leading-tight max-w-2xl">
          &ldquo;
          <QuoteText
            quote={parallax?.quote2 || 'The harvest is plentiful, but the workers are few.'}
            highlight={parallax?.quote2Highlight || 'few'}
          />
          &rdquo;
        </p>
      </ParallaxDivider>

      <TeachingSection data={teaching} />

      {/* Parallax divider 3 — bald eagle (no quote) */}
      <ParallaxDivider imageUrl={d3img} alt="Bald eagle flying" height="h-[45vh]" overlay="bg-black/45" />

      <GivingSection data={giving} />

      <FooterSection data={footer} />
    </div>
  )
}
