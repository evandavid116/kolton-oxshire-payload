/**
 * Manually-maintained types for the Kolton Oxshire Payload globals.
 * These mirror what Payload will generate after running `pnpm payload generate:types`.
 *
 * Once you have a database connected and run `pnpm payload generate:types`,
 * you can import directly from '@/payload-types' instead.
 */

export type MediaDoc = {
  id: string
  url?: string | null
  filename?: string | null
  alt?: string | null
  width?: number | null
  height?: number | null
}

// ── Hero Section ─────────────────────────────────────────────────────────────
export type HeroButton = {
  label: string
  href: string
  style: 'primary' | 'outline'
  id?: string | null
}

export type HeroSection = {
  id: string
  eyebrow?: string | null
  name?: string | null
  quote?: string | null
  description?: string | null
  backgroundImage?: MediaDoc | string | null
  buttons?: HeroButton[] | null
  updatedAt?: string
  createdAt?: string
}

// ── About Section ─────────────────────────────────────────────────────────────
export type AboutSection = {
  id: string
  eyebrow?: string | null
  heading?: string | null
  portrait?: MediaDoc | string | null
  body?: unknown
  updatedAt?: string
  createdAt?: string
}

// ── Teaching Section ──────────────────────────────────────────────────────────
export type TeachingCard = {
  title?: string | null
  description?: string | null
  id?: string | null
}

export type TeachingSection = {
  id: string
  eyebrow?: string | null
  heading?: string | null
  subheading?: string | null
  cards?: TeachingCard[] | null
  updatedAt?: string
  createdAt?: string
}

// ── Preaching Videos ─────────────────────────────────────────────────────────
export type VideoItem = {
  title?: string | null
  embedId?: string | null
  id?: string | null
}

export type PreachingVideos = {
  id: string
  eyebrow?: string | null
  heading?: string | null
  description?: string | null
  videos?: VideoItem[] | null
  updatedAt?: string
  createdAt?: string
}

// ── Giving Section ────────────────────────────────────────────────────────────
export type ImpactArea = {
  title?: string | null
  description?: string | null
  id?: string | null
}

export type GivingSection = {
  id: string
  eyebrow?: string | null
  heading?: string | null
  subheading?: string | null
  impactAreas?: ImpactArea[] | null
  ctaLabel?: string | null
  ctaHref?: string | null
  updatedAt?: string
  createdAt?: string
}

// ── Parallax Dividers ─────────────────────────────────────────────────────────
export type ParallaxDividers = {
  id: string
  quote1?: string | null
  quote1Highlight?: string | null
  quote1Image?: MediaDoc | string | null
  quote2?: string | null
  quote2Highlight?: string | null
  quote2Image?: MediaDoc | string | null
  divider3Image?: MediaDoc | string | null
  updatedAt?: string
  createdAt?: string
}

// ── Booking Section ───────────────────────────────────────────────────────────
export type BookingSection = {
  id: string
  eyebrow?: string | null
  heading?: string | null
  description?: string | null
  updatedAt?: string
  createdAt?: string
}

// ── Site Footer ───────────────────────────────────────────────────────────────
export type SiteFooter = {
  id: string
  ministryName?: string | null
  email?: string | null
  contactHeading?: string | null
  contactSubtext?: string | null
  updatedAt?: string
  createdAt?: string
}

// ── Partner Page ──────────────────────────────────────────────────────────────
export type HeroSubline = {
  line: string
  id?: string | null
}

export type GivingLink = {
  label: string
  url: string
  id?: string | null
}

export type PartnerPage = {
  id: string
  heroHeadline?: string | null
  heroSublines?: HeroSubline[] | null
  heroCtaLabel?: string | null
  missionStatement?: unknown
  bibleQuote?: string | null
  donorboxUrl?: string | null
  venmoUrl?: string | null
  additionalGivingLinks?: GivingLink[] | null
  updatedAt?: string
  createdAt?: string
}
