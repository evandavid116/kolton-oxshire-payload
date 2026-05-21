import type { GlobalConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const PreachingVideos: GlobalConfig = {
  slug: 'preaching-videos',
  label: 'Preaching Videos Section',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      defaultValue: 'Watch & Listen',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'Preaching Highlights',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue:
        'Watch Kolton boldly proclaiming the Gospel. Subscribe on YouTube for more.',
    },
    {
      name: 'videos',
      type: 'array',
      label: 'Videos',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Video Title',
          required: true,
        },
        {
          name: 'embedId',
          type: 'text',
          label: 'YouTube Video ID (e.g. yQ2ISH7yqss)',
          required: true,
        },
      ],
    },
  ],
}
