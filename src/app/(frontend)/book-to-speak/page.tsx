import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { SiteFooter as SiteFooterType, BookingSection as BookingSectionType } from '@/types/globals'
import { findGlobal } from '@/utilities/findGlobal'

import Navbar from '@/components/Navbar'
import BookingForm from '@/components/BookingForm'
import FooterSection from '@/components/FooterSection'

export const metadata: Metadata = {
  title: 'Book to Speak',
  description:
    'Invite Kolton Oxshire to minister at your church. Submit a booking request — pastoral invitations only.',
}

export default async function BookToSpeakPage() {
  const payload = await getPayload({ config: configPromise })

  const [bookingSection, footer] = await Promise.all([
    findGlobal<BookingSectionType>(payload, 'booking-section'),
    findGlobal<SiteFooterType>(payload, 'site-footer', { depth: 1 }),
  ])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <BookingForm
          eyebrow={bookingSection?.eyebrow || 'Book Kolton'}
          heading={bookingSection?.heading || 'Interested in Having Kolton Oxshire Minister at Your Church?'}
          description={bookingSection?.description || ''}
        />
      </div>
      <FooterSection data={footer} />
    </div>
  )
}
