/**
 * migrate-from-sanity.ts
 *
 * One-time script to pull all content from Sanity and seed it into Payload.
 *
 * Prerequisites:
 *   1. Payload is running (pnpm dev) or deployed to Vercel
 *   2. You've created a Payload admin user at /admin
 *   3. Set PAYLOAD_API_URL and PAYLOAD_EMAIL + PAYLOAD_PASSWORD below (or via env)
 *
 * Run with:
 *   PAYLOAD_API_URL=http://localhost:3000 \
 *   PAYLOAD_EMAIL=you@email.com \
 *   PAYLOAD_PASSWORD=yourpassword \
 *   pnpm tsx scripts/migrate-from-sanity.ts
 */

const SANITY_PROJECT_ID = 'roz05b4r'
const SANITY_DATASET = 'production'
const SANITY_API_VERSION = '2024-01-01'

const PAYLOAD_API_URL = process.env.PAYLOAD_API_URL || 'http://localhost:3000'
const PAYLOAD_EMAIL = process.env.PAYLOAD_EMAIL || ''
const PAYLOAD_PASSWORD = process.env.PAYLOAD_PASSWORD || ''

// ── Sanity helpers ────────────────────────────────────────────────────────────

async function sanityQuery<T>(groq: string): Promise<T> {
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodeURIComponent(groq)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Sanity query failed: ${res.statusText}`)
  const json = (await res.json()) as { result: T }
  return json.result
}

async function downloadImage(url: string): Promise<Buffer> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to download image: ${url}`)
  const arrayBuffer = await res.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

// ── Payload helpers ───────────────────────────────────────────────────────────

let payloadToken: string | null = null

async function payloadLogin(): Promise<void> {
  console.log('🔑 Logging into Payload...')
  const res = await fetch(`${PAYLOAD_API_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: PAYLOAD_EMAIL, password: PAYLOAD_PASSWORD }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Payload login failed: ${text}`)
  }
  const json = (await res.json()) as { token: string }
  payloadToken = json.token
  console.log('✅ Logged in to Payload')
}

async function payloadRequest(path: string, options: RequestInit = {}): Promise<unknown> {
  const res = await fetch(`${PAYLOAD_API_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${payloadToken}`,
      ...(options.headers || {}),
    },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Payload request failed [${path}]: ${text}`)
  }
  return res.json()
}

async function uploadImageToPayload(imageUrl: string, altText: string): Promise<string> {
  console.log(`  📤 Uploading image: ${imageUrl.slice(0, 60)}...`)
  const buffer = await downloadImage(imageUrl)

  // Determine file extension from URL
  const ext = imageUrl.split('?')[0].split('.').pop() || 'jpg'
  const filename = `${altText.replace(/\s+/g, '-').toLowerCase()}.${ext}`

  const formData = new FormData()
  const blob = new Blob([buffer], { type: `image/${ext}` })
  formData.append('file', blob, filename)
  formData.append('alt', altText)

  const res = await fetch(`${PAYLOAD_API_URL}/api/media`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${payloadToken}` },
    body: formData,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Media upload failed: ${text}`)
  }
  const json = (await res.json()) as { doc: { id: string } }
  console.log(`  ✅ Uploaded → media ID: ${json.doc.id}`)
  return json.doc.id
}

async function updateGlobal(slug: string, data: Record<string, unknown>): Promise<void> {
  console.log(`  🌐 Updating global: ${slug}`)
  await payloadRequest(`/api/globals/${slug}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  console.log(`  ✅ Global updated: ${slug}`)
}

// ── Migration functions ───────────────────────────────────────────────────────

async function migrateHero(): Promise<void> {
  console.log('\n📄 Migrating hero section...')
  const hero = await sanityQuery<{
    eyebrow: string
    name: string
    quote: string
    description: string
    backgroundImageUrl: string
    buttons: Array<{ label: string; href: string; style: string }>
  }>(`*[_type == "hero"][0]{
    eyebrow, name, quote, description,
    "backgroundImageUrl": backgroundImage.asset->url,
    buttons
  }`)

  if (!hero) { console.log('  ⚠️  No hero data found'); return }

  let backgroundImageId: string | undefined
  if (hero.backgroundImageUrl) {
    backgroundImageId = await uploadImageToPayload(hero.backgroundImageUrl, 'hero-background')
  }

  await updateGlobal('hero-section', {
    eyebrow: hero.eyebrow,
    name: hero.name,
    quote: hero.quote,
    description: hero.description,
    ...(backgroundImageId ? { backgroundImage: backgroundImageId } : {}),
    buttons: hero.buttons,
  })
}

async function migrateAbout(): Promise<void> {
  console.log('\n📄 Migrating about section...')
  const about = await sanityQuery<{
    eyebrow: string
    heading: string
    portraitUrl: string
    body: unknown
  }>(`*[_type == "about"][0]{
    eyebrow, heading,
    "portraitUrl": portrait.asset->url,
    body
  }`)

  if (!about) { console.log('  ⚠️  No about data found'); return }

  let portraitId: string | undefined
  if (about.portraitUrl) {
    portraitId = await uploadImageToPayload(about.portraitUrl, 'kolton-portrait')
  }

  // Note: Portable Text (body) is migrated as-is. Payload's Lexical editor
  // uses a different format, so rich text will need manual re-entry in admin.
  await updateGlobal('about-section', {
    eyebrow: about.eyebrow,
    heading: about.heading,
    ...(portraitId ? { portrait: portraitId } : {}),
    // body: Omitted — needs manual entry in Payload admin (format differs from Portable Text)
  })
  console.log('  ℹ️  Note: About body text needs manual entry in Payload admin (/admin → Globals → About Section)')
}

async function migrateTeaching(): Promise<void> {
  console.log('\n📄 Migrating teaching section...')
  const teaching = await sanityQuery<{
    eyebrow: string
    heading: string
    subheading: string
    cards: Array<{ title: string; description: string }>
  }>(`*[_type == "teaching"][0]{ eyebrow, heading, subheading, cards }`)

  if (!teaching) { console.log('  ⚠️  No teaching data found'); return }
  await updateGlobal('teaching-section', teaching)
}

async function migratePreachingVideos(): Promise<void> {
  console.log('\n📄 Migrating preaching videos...')
  const videos = await sanityQuery<{
    eyebrow: string
    heading: string
    description: string
    videos: Array<{ title: string; embedId: string }>
  }>(`*[_type == "preachingVideos"][0]{
    eyebrow, heading, description,
    videos[]{ title, embedId }
  }`)

  if (!videos) { console.log('  ⚠️  No preaching videos data found'); return }
  await updateGlobal('preaching-videos', videos)
}

async function migrateGiving(): Promise<void> {
  console.log('\n📄 Migrating giving section...')
  const giving = await sanityQuery<{
    eyebrow: string
    heading: string
    subheading: string
    impactAreas: Array<{ title: string; description: string }>
    ctaLabel: string
    ctaHref: string
  }>(`*[_type == "giving"][0]{
    eyebrow, heading, subheading, impactAreas, ctaLabel, ctaHref
  }`)

  if (!giving) { console.log('  ⚠️  No giving data found'); return }
  await updateGlobal('giving-section', giving)
}

async function migrateParallaxDividers(): Promise<void> {
  console.log('\n📄 Migrating parallax dividers...')
  const parallax = await sanityQuery<{
    quote1: string
    quote1Highlight: string
    quote1ImageUrl: string
    quote2: string
    quote2Highlight: string
    quote2ImageUrl: string
    divider3ImageUrl: string
  }>(`*[_type == "parallaxDividers"][0]{
    quote1, quote1Highlight,
    "quote1ImageUrl": quote1Image.asset->url,
    quote2, quote2Highlight,
    "quote2ImageUrl": quote2Image.asset->url,
    "divider3ImageUrl": divider3Image.asset->url
  }`)

  if (!parallax) { console.log('  ⚠️  No parallax data found'); return }

  let q1ImgId: string | undefined
  let q2ImgId: string | undefined
  let d3ImgId: string | undefined

  if (parallax.quote1ImageUrl) q1ImgId = await uploadImageToPayload(parallax.quote1ImageUrl, 'parallax-divider-1')
  if (parallax.quote2ImageUrl) q2ImgId = await uploadImageToPayload(parallax.quote2ImageUrl, 'parallax-divider-2')
  if (parallax.divider3ImageUrl) d3ImgId = await uploadImageToPayload(parallax.divider3ImageUrl, 'parallax-divider-3')

  await updateGlobal('parallax-dividers', {
    quote1: parallax.quote1,
    quote1Highlight: parallax.quote1Highlight,
    ...(q1ImgId ? { quote1Image: q1ImgId } : {}),
    quote2: parallax.quote2,
    quote2Highlight: parallax.quote2Highlight,
    ...(q2ImgId ? { quote2Image: q2ImgId } : {}),
    ...(d3ImgId ? { divider3Image: d3ImgId } : {}),
  })
}

async function migrateBookingSection(): Promise<void> {
  console.log('\n📄 Migrating booking section text...')
  const booking = await sanityQuery<{
    eyebrow: string
    heading: string
    description: string
  }>(`*[_type == "bookingSection"][0]{ eyebrow, heading, description }`)

  if (!booking) { console.log('  ⚠️  No booking data found'); return }
  await updateGlobal('booking-section', booking)
}

async function migrateFooter(): Promise<void> {
  console.log('\n📄 Migrating footer...')
  const footer = await sanityQuery<{
    ministryName: string
    email: string
    contactHeading: string
    contactSubtext: string
  }>(`*[_type == "footer"][0]{
    ministryName, email, contactHeading, contactSubtext
  }`)

  if (!footer) { console.log('  ⚠️  No footer data found'); return }
  await updateGlobal('site-footer', footer)
}

async function migratePartnerPage(): Promise<void> {
  console.log('\n📄 Migrating partner page...')
  const partner = await sanityQuery<{
    heroHeadline: string
    heroSublines: string[]
    heroCtaLabel: string
    bibleQuote: string
    donorboxUrl: string
    venmoUrl: string
    additionalGivingLinks: Array<{ label: string; url: string }>
  }>(`*[_type == "partnerPage"][0]{
    heroHeadline, heroSublines, heroCtaLabel,
    bibleQuote,
    donorboxUrl, venmoUrl, additionalGivingLinks
  }`)

  if (!partner) { console.log('  ⚠️  No partner page data found'); return }

  await updateGlobal('partner-page', {
    heroHeadline: partner.heroHeadline,
    // heroSublines in Sanity is string[] — convert to Payload's array of objects
    heroSublines: (partner.heroSublines || []).map((line) => ({ line })),
    heroCtaLabel: partner.heroCtaLabel,
    bibleQuote: partner.bibleQuote,
    donorboxUrl: partner.donorboxUrl,
    venmoUrl: partner.venmoUrl,
    additionalGivingLinks: partner.additionalGivingLinks || [],
    // missionStatement: Omitted — needs manual entry (Portable Text → Lexical)
  })
  console.log('  ℹ️  Note: Mission Statement (rich text) needs manual entry in Payload admin')
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log('🚀 Starting Sanity → Payload migration')
  console.log(`   Sanity project: ${SANITY_PROJECT_ID}`)
  console.log(`   Payload URL:    ${PAYLOAD_API_URL}`)
  console.log('')

  if (!PAYLOAD_EMAIL || !PAYLOAD_PASSWORD) {
    throw new Error(
      'Set PAYLOAD_EMAIL and PAYLOAD_PASSWORD environment variables before running this script.',
    )
  }

  await payloadLogin()

  await migrateHero()
  await migrateAbout()
  await migrateTeaching()
  await migratePreachingVideos()
  await migrateGiving()
  await migrateParallaxDividers()
  await migrateBookingSection()
  await migrateFooter()
  await migratePartnerPage()

  console.log('\n✅ Migration complete!')
  console.log('\nManual steps still needed in Payload admin (/admin):')
  console.log('  1. About Section → Body Text (rich text body)')
  console.log('  2. Partner Page  → Mission Statement (rich text)')
  console.log('\nThese two fields use Lexical editor which has a different format')
  console.log('than Sanity\'s Portable Text — copy-paste the text from the old site.')
}

main().catch((err) => {
  console.error('❌ Migration failed:', err)
  process.exit(1)
})
