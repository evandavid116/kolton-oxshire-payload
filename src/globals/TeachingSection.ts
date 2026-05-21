import type { GlobalConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const TeachingSection: GlobalConfig = {
  slug: 'teaching-section',
  label: 'Teaching & Ministry Section',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      defaultValue: 'The Word',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'Teaching & Ministry',
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Subheading',
      defaultValue:
        'Equipping the saints with the uncompromised truth of Scripture through every platform available.',
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Teaching Cards',
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
  ],
}
