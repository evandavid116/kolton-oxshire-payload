import type { SiteFooter as SiteFooterType } from '@/types/globals'

type Props = { data: SiteFooterType }

export default function FooterSection({ data }: Props) {
  const ministryName = data?.ministryName || 'Kolton Oxshire Ministries'
  const email = data?.email || 'speakinggodsgraceandpower@gmail.com'
  const contactHeading = data?.contactHeading || 'Get in Touch'
  const contactSubtext =
    data?.contactSubtext ||
    "Have questions, prayer requests, or want to invite Kolton to speak?\nReach out — we'd love to hear from you."

  const touchWord = contactHeading.replace('Get in ', '')

  return (
    <footer id="contact" className="relative py-16 overflow-hidden">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/lion-eagle-flag.jpg"
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-background/95" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Get in <span className="text-accent">{touchWord}</span>
          </h2>
          <p className="font-body text-foreground/70 max-w-xl mx-auto whitespace-pre-line">
            {contactSubtext}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center justify-center px-8 py-3 border border-accent/50 text-accent font-body text-sm uppercase tracking-wider rounded-sm hover:bg-accent hover:text-accent-foreground transition-all duration-300"
          >
            Email Us
          </a>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="font-display text-lg font-bold text-accent tracking-wider mb-2">
            {ministryName}
          </p>
          <p className="font-body text-foreground/50 text-sm">
            © {new Date().getFullYear()} {ministryName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
