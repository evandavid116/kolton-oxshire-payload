import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: { singular: 'Booking Submission', plural: 'Booking Form Submissions' },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'churchWebsite', 'createdAt'],
    group: 'Ministry',
  },
  access: {
    // Anyone can create (submit the form), only admins can read/edit/delete
    create: () => true,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      label: 'Full Name',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone',
    },
    {
      name: 'churchWebsite',
      type: 'text',
      label: 'Church Website',
    },
    {
      name: 'churchAddress',
      type: 'text',
      label: 'Church Address',
    },
    {
      name: 'denomination',
      type: 'text',
      label: 'Denomination',
    },
    {
      name: 'serviceType',
      type: 'text',
      label: 'Service Type',
    },
    {
      name: 'seatCount',
      type: 'text',
      label: 'Seat Count',
    },
    {
      name: 'pastorInviteConfirm',
      type: 'checkbox',
      label: 'Confirmed Pastoral Invitation',
      defaultValue: false,
    },
    {
      name: 'twoChurches',
      type: 'textarea',
      label: '2 Churches with Similar Beliefs',
    },
    {
      name: 'liveStreamDetails',
      type: 'textarea',
      label: 'Live-Streaming Details',
    },
    {
      name: 'additionalInfo',
      type: 'textarea',
      label: 'Additional Information',
    },
  ],
  timestamps: true,
}
