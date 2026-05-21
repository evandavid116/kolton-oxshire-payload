import type { GlobalConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { defaultLexical } from '@/fields/defaultLexical'

export const AboutSection: GlobalConfig = {
  slug: 'about-section',
  label: 'About Section',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      defaultValue: 'About Kolton',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'Called to Boldly Proclaim',
    },
    {
      name: 'portrait',
      type: 'upload',
      label: 'Portrait Photo',
      relationTo: 'media',
    },
    {
      name: 'body',
      type: 'richText',
      label: 'Body Text',
      editor: defaultLexical,
    },
  ],
}
