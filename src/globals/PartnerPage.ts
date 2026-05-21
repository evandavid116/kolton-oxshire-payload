import type { GlobalConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { defaultLexical } from '@/fields/defaultLexical'

export const PartnerPageGlobal: GlobalConfig = {
  slug: 'partner-page',
  label: 'Partner Page',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'heroHeadline',
      type: 'text',
      label: 'Hero Headline',
      defaultValue: 'Partner With Us',
    },
    {
      name: 'heroSublines',
      type: 'array',
      label: 'Hero Sub-lines (bold lines below headline)',
      fields: [
        {
          name: 'line',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'heroCtaLabel',
      type: 'text',
      label: 'Hero Button Label',
      defaultValue: 'Join the Family',
    },
    {
      name: 'missionStatement',
      type: 'richText',
      label: 'Mission Statement (rich text)',
      editor: defaultLexical,
    },
    {
      name: 'bibleQuote',
      type: 'textarea',
      label: 'Bible Quote (shown in parallax divider)',
      defaultValue:
        '"Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."',
    },
    {
      name: 'donorboxUrl',
      type: 'text',
      label: 'DonorBox Embed URL',
      defaultValue:
        'https://donorbox.org/embed/thank-you-for-financially-blessing-my-ministry?default_interval=o&enable_auto_scroll=true',
    },
    {
      name: 'venmoUrl',
      type: 'text',
      label: 'Venmo URL',
      defaultValue: 'https://venmo.com/u/Kolton-Oxshire',
    },
    {
      name: 'additionalGivingLinks',
      type: 'array',
      label: 'Additional Giving Links',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
