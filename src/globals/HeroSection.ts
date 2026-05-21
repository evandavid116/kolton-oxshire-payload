import type { GlobalConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const HeroSection: GlobalConfig = {
  slug: 'hero-section',
  label: 'Hero Section',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Text (small text above name)',
      defaultValue: '— Ministry of the Gospel —',
    },
    {
      name: 'name',
      type: 'text',
      label: 'Name (use \\n to split into two lines)',
      defaultValue: 'Kolton\nOxshire',
    },
    {
      name: 'quote',
      type: 'text',
      label: 'Quote',
      defaultValue: '"That\'s what I do — I talk about Jesus."',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue:
        'Boldly proclaiming the Gospel with the strength of a lion \nand the heart of a servant.',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      label: 'Background Image',
      relationTo: 'media',
    },
    {
      name: 'buttons',
      type: 'array',
      label: 'Buttons',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          label: 'Link (e.g. /partner or #about)',
          required: true,
        },
        {
          name: 'style',
          type: 'select',
          options: [
            { label: 'Primary (filled)', value: 'primary' },
            { label: 'Outline', value: 'outline' },
          ],
          defaultValue: 'primary',
        },
      ],
    },
  ],
}
