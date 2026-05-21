import type { GlobalConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const SiteFooter: GlobalConfig = {
  slug: 'site-footer',
  label: 'Footer & Contact',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'ministryName',
      type: 'text',
      label: 'Ministry Name',
      defaultValue: 'Kolton Oxshire Ministries',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Contact Email',
      defaultValue: 'speakinggodsgraceandpower@gmail.com',
    },
    {
      name: 'contactHeading',
      type: 'text',
      label: 'Contact Heading',
      defaultValue: 'Get in Touch',
    },
    {
      name: 'contactSubtext',
      type: 'textarea',
      label: 'Contact Subtext',
      defaultValue:
        'Have questions, prayer requests, or want to invite Kolton to speak?\nReach out — we\'d love to hear from you.',
    },
  ],
}
