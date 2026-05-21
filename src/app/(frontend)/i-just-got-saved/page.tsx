import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { SiteFooter as SiteFooterType } from '@/types/globals'
import { findGlobal } from '@/utilities/findGlobal'

import Navbar from '@/components/Navbar'
import FooterSection from '@/components/FooterSection'
import NewBelieverForm from '@/components/NewBelieverForm'

export const metadata: Metadata = {
  title: "I Just Got Saved",
  description:
    "Just gave your life to Jesus? Welcome to the family. Get the free New Believers Guide and resources to help you grow in your walk with Christ.",
}

export default async function IJustGotSavedPage() {
  const payload = await getPayload({ config: configPromise })
  const footer = await findGlobal<SiteFooterType>(payload, 'site-footer', { depth: 1 })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-24">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="font-body text-sm font-semibold tracking-[0.3em] uppercase text-accent mb-3">
              Welcome to the Family
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
              I Just Got <span className="text-accent">Saved!</span>
            </h1>
            <p className="font-body text-foreground/80 text-lg leading-relaxed">
              Congratulations on making the most important decision of your life! Jesus Christ is
              now your Lord and Savior. Here are some resources to help you grow in your new walk
              with God.
            </p>
          </div>

          {/* Video */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-6 text-center">
              Watch This <span className="text-accent">First</span>
            </h2>
            <div
              className="relative w-full rounded-lg overflow-hidden border border-border"
              style={{ paddingBottom: '56.25%' }}
            >
              <iframe
                src="https://www.youtube.com/embed/mRovCJ8PVaU"
                title="New Believers Guide"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                loading="lazy"
              />
            </div>
          </div>

          {/* Newsletter + Download (client component) */}
          <div className="max-w-2xl mx-auto">
            <NewBelieverForm />
          </div>
        </div>
      </div>
      <FooterSection data={footer} />
    </div>
  )
}
