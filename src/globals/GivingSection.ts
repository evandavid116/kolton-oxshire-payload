import type { GlobalConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const GivingSection: GlobalConfig = {
  slug: 'giving-section',
  label: 'Giving / Support Section',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      defaultValue: 'Partner With Us',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'Support the Mission',
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Subheading',
      defaultValue:
        'Your generous giving fuels the spread of the Gospel. Every dollar sown is a seed planted for the Kingdom.',
    },
    {
      name: 'impactAreas',
      type: 'array',
      label: 'Impact Areas',
      maxRows: 3,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'Button Label',
      defaultValue: 'Give Now',
    },
    {
      name: 'ctaHref',
      type: 'text',
      label: 'Button Link (e.g. /partner or #contact)',
      defaultValue: '/partner',
    },
  ],
}
