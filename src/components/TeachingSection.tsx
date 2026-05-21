import { BookOpen, Video, Mic } from 'lucide-react'
import type { TeachingSection as TeachingSectionType } from '@/types/globals'

type Props = { data: TeachingSectionType }
type Card = { title?: string | null; description?: string | null; id?: string | null }

const CARD_ICONS = [Video, Mic, BookOpen]

const DEFAULT_CARDS: Card[] = [
  {
    title: 'Video Teachings',
    description:
      'Weekly video messages breaking down Scripture with boldness and clarity. Follow along as Kolton dives deep into the Word.',
  },
  {
    title: 'Live Events',
    description:
      'Join Kolton at live speaking engagements and revival meetings across the country. Experience the power of God in person.',
  },
  {
    title: 'Bible Studies',
    description:
      'In-depth Bible study series designed to equip believers and ignite a passion for the truth of the Gospel.',
  },
]

export default function TeachingSection({ data }: Props) {
  const eyebrow = data?.eyebrow || 'The Word'
  const heading = data?.heading || 'Teaching & Ministry'
  const subheading =
    data?.subheading ||
    'Equipping the saints with the uncompromised truth of Scripture through every platform available.'
  const cards: Card[] =
    data?.cards && (data.cards as Card[]).length > 0 ? (data.cards as Card[]) : DEFAULT_CARDS

  const [headingMain, headingAccent] = heading.includes('&')
    ? [heading.split('&')[0].trim() + ' &', heading.split('&')[1]?.trim() || '']
    : [heading, '']

  return (
    <section id="teaching" className="py-24 bg-background">
      <div className="container mx-auto px-4 text-center">
        <p className="font-body text-sm font-semibold tracking-[0.3em] uppercase text-accent mb-3">
          {eyebrow}
        </p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
          {headingMain} <span className="text-accent">{headingAccent}</span>
        </h2>
        <p className="font-body text-foreground/70 max-w-2xl mx-auto mb-16 text-base sm:text-lg">
          {subheading}
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {cards.map((item, i) => {
            const Icon = CARD_ICONS[i % CARD_ICONS.length]
            return (
              <div
                key={item.id || item.title}
                className="group bg-card border border-border rounded-lg p-8 hover:border-accent/50 transition-all duration-500 hover:gold-glow"
              >
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="font-body text-foreground/70 leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
