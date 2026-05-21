import type { GlobalConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const ParallaxDividers: GlobalConfig = {
  slug: 'parallax-dividers',
  label: 'Parallax Dividers (Home Page)',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    // ─── Divider 1 (between About & Preaching) ────────────────────────────
    {
      type: 'collapsible',
      label: 'Divider 1 — Between About & Preaching',
      fields: [
        {
          name: 'quote1',
          type: 'textarea',
          label: 'Quote 1',
          defaultValue: 'Go into all the world and preach the gospel to all creation.',
        },
        {
          name: 'quote1Highlight',
          type: 'text',
          label: 'Word to highlight in accent color',
          defaultValue: 'gospel',
        },
        {
          name: 'quote1Image',
          type: 'upload',
          label: 'Background Image',
          relationTo: 'media',
        },
      ],
    },
    // ─── Divider 2 (between Preaching & Teaching) ─────────────────────────
    {
      type: 'collapsible',
      label: 'Divider 2 — Between Preaching & Teaching',
      fields: [
        {
          name: 'quote2',
          type: 'textarea',
          label: 'Quote 2',
          defaultValue: 'The harvest is plentiful, but the workers are few.',
        },
        {
          name: 'quote2Highlight',
          type: 'text',
          label: 'Word to highlight in accent color',
          defaultValue: 'few',
        },
        {
          name: 'quote2Image',
          type: 'upload',
          label: 'Background Image',
          relationTo: 'media',
        },
      ],
    },
    // ─── Divider 3 (after Teaching — no quote, just image) ────────────────
    {
      type: 'collapsible',
      label: 'Divider 3 — After Teaching (image only)',
      fields: [
        {
          name: 'divider3Image',
          type: 'upload',
          label: 'Background Image',
          relationTo: 'media',
        },
      ],
    },
  ],
}
