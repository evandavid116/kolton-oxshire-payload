import Link from 'next/link'
import type { HeroSection as HeroSectionType } from '@/types/globals'

type Props = {
  data: HeroSectionType
}

const DEFAULTS = {
  eyebrow: '— Ministry of the Gospel —',
  name: 'Kolton\nOxshire',
  quote: '"That\'s what I do — I talk about Jesus."',
  description: 'Boldly proclaiming the Gospel with the strength of a lion \nand the heart of a servant.',
  buttons: [
    { label: 'Learn More', href: '#about', style: 'primary' as const },
    { label: 'Partner With Us', href: '/partner', style: 'outline' as const },
  ],
}

export default function HeroSection({ data }: Props) {
  const eyebrow = data?.eyebrow || DEFAULTS.eyebrow
  const name = data?.name || DEFAULTS.name
  const quote = data?.quote || DEFAULTS.quote
  const description = data?.description || DEFAULTS.description
  const buttons = (data?.buttons as typeof DEFAULTS.buttons) || DEFAULTS.buttons

  // Background image: use Payload media URL or fall back to local asset
  const bgImage =
    data?.backgroundImage && typeof data.backgroundImage === 'object'
      ? (data.backgroundImage as { url?: string }).url
      : null

  const [firstName, lastName] = name.split('\n')

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        {bgImage ? (
          <img
            src={bgImage}
            alt="Lion of Judah, Bald Eagle and American Flag"
            className="w-full h-full object-cover"
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src="/assets/lion-eagle-flag.jpg"
            alt="Lion of Judah, Bald Eagle and American Flag"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-ink/75 opacity-85" style={{ backgroundColor: 'rgba(20,20,20,0.75)' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-28 pb-20 sm:pt-24 sm:pb-16 flex-col text-center flex items-center justify-start">
        <div className="max-w-5xl w-full">
          <p className="animate-fade-up eyebrow text-accent mb-8">{eyebrow}</p>
          <h1 className="animate-fade-up-delay-1 font-impact display-xl text-cream">
            {firstName}
            <br />
            <span className="text-accent">{lastName}</span>
          </h1>
          <div className="animate-fade-up-delay-2 mx-auto mt-10 max-w-xl">
            <div className="rule-divider mx-auto w-16 mb-6 bg-cream/30" />
            <p className="font-body text-xl sm:text-2xl text-cream font-medium leading-snug">
              {quote}
            </p>
            <p className="font-body text-cream/70 mt-4 tracking-wide text-sm whitespace-pre-line text-center">
              {description}
            </p>
          </div>
          <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-3 mt-12 justify-center">
            {buttons.map((btn) =>
              btn.href.startsWith('/') ? (
                <Link
                  key={btn.label}
                  href={btn.href}
                  className={
                    btn.style === 'primary'
                      ? 'inline-flex items-center justify-center px-10 py-4 bg-accent text-accent-foreground font-body font-bold text-xs uppercase tracking-[0.25em] hover:brightness-110 transition-all duration-300'
                      : 'inline-flex items-center justify-center px-10 py-4 border border-cream/40 text-cream font-body font-bold text-xs uppercase tracking-[0.25em] hover:bg-cream hover:text-ink transition-all duration-300'
                  }
                >
                  {btn.label}
                </Link>
              ) : (
                <a
                  key={btn.label}
                  href={btn.href}
                  className={
                    btn.style === 'primary'
                      ? 'inline-flex items-center justify-center px-10 py-4 bg-accent text-accent-foreground font-body font-bold text-xs uppercase tracking-[0.25em] hover:brightness-110 transition-all duration-300'
                      : 'inline-flex items-center justify-center px-10 py-4 border border-cream/40 text-cream font-body font-bold text-xs uppercase tracking-[0.25em] hover:bg-cream hover:text-ink transition-all duration-300'
                  }
                >
                  {btn.label}
                </a>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink to-transparent" style={{ background: 'linear-gradient(to top, rgba(20,20,20,1), transparent)' }} />
    </section>
  )
}
