import type { Metadata } from 'next'
import { Cross, BookOpen } from 'lucide-react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { SiteFooter as SiteFooterType } from '@/types/globals'
import { findGlobal } from '@/utilities/findGlobal'

import Navbar from '@/components/Navbar'
import FooterSection from '@/components/FooterSection'

export const metadata: Metadata = {
  title: 'What We Believe',
  description:
    'The 16 core doctrinal beliefs that guide Kolton Oxshire Ministries — rooted firmly in the Word of God, salvation through Jesus Christ, and the power of the Holy Spirit.',
}

const beliefs = [
  'In One God: Father, Son, and Holy Ghost.',
  'God Is Absolutely Good.',
  'That the entire Bible is The Inspired Word of God.',
  'That Jesus Christ, the first begotten Son of God, was conceived of the Holy Ghost, born of the virgin Mary, crucified, buried, and after three days and three nights, resurrected from dead. That He ascended to heaven, and is today at the right hand of the Father, making Intercession for you and I.',
  'In personal salvation (The New Birth) through the blood of Jesus Christ.',
  'In sanctification through the Word of God, and the Holy Ghost.',
  'In water baptism, and baptism in The Holy Ghost, a separate event from the new birth. With the evidence of speaking with other tongues as the Spirit gives utterance.',
  'In the nine gifts of the Holy Spirit and in the nine fruit of the spirit and that they are available to all believers.',
  'That divine healing is available through the name of Jesus and has been provided for all by the redemption Jesus provided.',
  'In the bodily resurrection of the dead with eternal life and happiness for the righteous, and eternal punishment for the wicked.',
  'In taking communion, and that it is HOLY and strengthens your relationship with God, and people can do it for healing or breakthrough.',
  'That Christians should keep a personal daily prayer life, living holy and consecrated to God.',
  'In speaking in tongues, and that it is your spirit praying to God, while it also edifies you.',
  'That every believer should be encouraged to see God as Abba father, as provider, as creator, as communicator, as redeemer, as teacher, and as righteous judge, and as a loving God that saves people through Jesus Christ.',
  'That the word of God is living and active and is for every generation.',
  'In the soon coming personal return of Jesus Christ.',
]

export default async function WhatWeBelievePage() {
  const payload = await getPayload({ config: configPromise })
  const footer = await findGlobal<SiteFooterType>(payload, 'site-footer', { depth: 1 })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero banner */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/lion-eagle-flag.jpg" alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-background/90" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center py-16">
          <p className="font-body text-sm font-semibold tracking-[0.3em] uppercase text-accent mb-3">
            Our Foundation
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4">
            What We <span className="text-accent">Believe</span>
          </h1>
          <p className="font-body text-foreground/70 text-lg max-w-2xl mx-auto">
            The core doctrines and beliefs that guide Kolton Oxshire Ministries, rooted firmly in the
            Word of God.
          </p>
        </div>
      </section>

      {/* Beliefs list */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6">
            {beliefs.map((belief, index) => (
              <div
                key={index}
                className="flex gap-4 bg-card border border-border rounded-lg p-6 hover:border-accent/40 transition-all duration-300"
              >
                <div className="flex-shrink-0 mt-1">
                  {index === 0 ? (
                    <Cross className="w-5 h-5 text-accent" />
                  ) : (
                    <BookOpen className="w-5 h-5 text-accent" />
                  )}
                </div>
                <p className="font-body text-foreground/90 leading-relaxed">
                  <span className="font-semibold text-accent">We believe </span>
                  {belief}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterSection data={footer} />
    </div>
  )
}
