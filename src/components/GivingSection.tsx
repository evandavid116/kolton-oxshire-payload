import { Heart, Users, Globe } from 'lucide-react'
import type { GivingSection as GivingSectionType } from '@/types/globals'

type Props = { data: GivingSectionType }
type Area = { title?: string | null; description?: string | null; id?: string | null }

const AREA_ICONS = [Globe, Users, Heart]

const DEFAULT_AREAS: Area[] = [
  {
    title: 'Gospel Outreach',
    description: 'Funding evangelism efforts to reach the lost across the nation and beyond.',
  },
  {
    title: 'Community Impact',
    description: 'Supporting local communities with practical love and the message of Christ.',
  },
  {
    title: 'Ministry Growth',
    description:
      'Investing in content creation, events, and resources to expand the reach of the Gospel.',
  },
]

export default function GivingSection({ data }: Props) {
  const eyebrow = data?.eyebrow || 'Partner With Us'
  const heading = data?.heading || 'Support the Mission'
  const subheading =
    data?.subheading ||
    'Your generous giving fuels the spread of the Gospel. Every dollar sown is a seed planted for the Kingdom.'
  const impactAreas: Area[] =
    data?.impactAreas && (data.impactAreas as Area[]).length > 0
      ? (data.impactAreas as Area[])
      : DEFAULT_AREAS
  const ctaLabel = data?.ctaLabel || 'Give Now'
  const ctaHref = data?.ctaHref || '/partner'

  const [headingMain, headingAccent] = heading.includes(' the ')
    ? [heading.replace(/the .+/, 'the').trimEnd(), heading.replace(/.+ the /, '')]
    : [heading, '']

  return (
    <section id="giving" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/lion-eagle-flag.jpg"
          alt=""
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-background/90" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <p className="font-body text-sm font-semibold tracking-[0.3em] uppercase text-accent mb-3">
          {eyebrow}
        </p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
          {headingMain} <span className="text-accent">{headingAccent}</span>
        </h2>
        <p className="font-body text-foreground/70 max-w-2xl mx-auto mb-16 text-base sm:text-lg">
          {subheading}
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {impactAreas.map((area, i) => {
            const Icon = AREA_ICONS[i % AREA_ICONS.length]
            return (
              <div
                key={area.id || area.title}
                className="bg-card border-2 border-accent/30 rounded-lg p-8 hover:border-accent/60 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{area.title}</h3>
                <p className="font-body text-foreground/70 leading-relaxed text-sm">
                  {area.description}
                </p>
              </div>
            )
          })}
        </div>

        <a
          href={ctaHref}
          className="inline-flex items-center justify-center px-10 py-4 bg-accent text-accent-foreground font-body font-bold text-sm uppercase tracking-wider rounded-sm hover:brightness-110 transition-all duration-300 gold-glow"
        >
          {ctaLabel}
        </a>
      </div>
    </section>
  )
}
