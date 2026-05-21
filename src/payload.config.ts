import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

// Collections
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { FormSubmissions } from './collections/FormSubmissions'

// Globals — Kolton Oxshire site sections
import { HeroSection } from './globals/HeroSection'
import { AboutSection } from './globals/AboutSection'
import { TeachingSection } from './globals/TeachingSection'
import { PreachingVideos } from './globals/PreachingVideos'
import { GivingSection } from './globals/GivingSection'
import { ParallaxDividers } from './globals/ParallaxDividers'
import { BookingSection } from './globals/BookingSection'
import { SiteFooter } from './globals/SiteFooter'
import { PartnerPageGlobal } from './globals/PartnerPage'

import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — Kolton Oxshire Admin',
      description: 'Kolton Oxshire Ministries — content management',
    },
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },

  // Shared rich-text editor config
  editor: defaultLexical,

  // Database — Vercel Postgres (Neon)
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),

  collections: [
    Media,
    Users,
    FormSubmissions,
  ],

  globals: [
    HeroSection,
    AboutSection,
    PreachingVideos,
    TeachingSection,
    GivingSection,
    ParallaxDividers,
    BookingSection,
    SiteFooter,
    PartnerPageGlobal,
  ],

  cors: [getServerSideURL()].filter(Boolean),

  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],

  secret: process.env.PAYLOAD_SECRET,
  sharp,

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true
        const secret = process.env.CRON_SECRET
        if (!secret) return false
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
