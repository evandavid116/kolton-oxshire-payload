import type { GlobalConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const BookingSection: GlobalConfig = {
  slug: 'booking-section',
  label: 'Book to Speak — Page Text',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      defaultValue: 'Book Kolton',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'Interested in Having Kolton Oxshire Minister at Your Church?',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue:
        'To request that Kolton Oxshire come to your church, we require a head pastoral invitation. Please fill out the form below with all required information to be considered.',
    },
  ],
}
