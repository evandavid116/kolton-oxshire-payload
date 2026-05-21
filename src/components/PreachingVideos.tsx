import type { PreachingVideos as PreachingVideosType } from '@/types/globals'

type Props = { data: PreachingVideosType }

const DEFAULTS = {
  eyebrow: 'Watch & Listen',
  heading: 'Preaching Highlights',
  description: 'Watch Kolton boldly proclaiming the Gospel. Subscribe on YouTube for more.',
  videos: [
    { title: 'Preaching Short #1', embedId: 'yQ2ISH7yqss' },
    { title: 'Preaching Short #2', embedId: '23gsPRcLwqE' },
  ],
}

type Video = { title?: string | null; embedId?: string | null; id?: string | null }

export default function PreachingVideos({ data }: Props) {
  const eyebrow = data?.eyebrow || DEFAULTS.eyebrow
  const heading = data?.heading || DEFAULTS.heading
  const description = data?.description || DEFAULTS.description
  const videos: Video[] =
    data?.videos && data.videos.length > 0 ? (data.videos as Video[]) : DEFAULTS.videos

  const headingWords = heading.split(' ')
  const headingMain = headingWords.slice(0, -1).join(' ')
  const headingAccent = headingWords.slice(-1)[0]

  return (
    <section id="preaching" className="py-24 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <p className="font-body text-sm font-semibold tracking-[0.3em] uppercase text-accent mb-3">
          {eyebrow}
        </p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
          {headingMain} <span className="text-accent">{headingAccent}</span>
        </h2>
        <p className="font-body text-foreground/70 max-w-2xl mx-auto mb-16 text-base sm:text-lg">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 max-w-4xl mx-auto">
          {videos.map((video) => (
            <div
              key={video.embedId || video.id}
              className="w-full max-w-[360px] bg-card border border-border rounded-lg overflow-hidden hover:border-accent/50 transition-all duration-500"
            >
              <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${video.embedId}`}
                  title={video.title || 'Preaching Video'}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg font-bold text-foreground">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
