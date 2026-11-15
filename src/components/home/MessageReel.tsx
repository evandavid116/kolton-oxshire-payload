import type { PreachingVideos as PreachingVideosType } from '@/types/globals'
import MessageThumb from './MessageThumb'

type Props = { data: PreachingVideosType }

// Same fallback videos the live site ships with.
const DEFAULT_VIDEOS = [
  { title: 'Preaching Short #1', embedId: 'yQ2ISH7yqss' },
  { title: 'Preaching Short #2', embedId: '23gsPRcLwqE' },
]

const COLUMNS = 5

export default function MessageReel({ data }: Props) {
  const all = data?.videos && data.videos.length > 0 ? data.videos : DEFAULT_VIDEOS
  const videos = all
    .filter((v): v is { title?: string | null; embedId: string } => Boolean(v.embedId))
    .slice(0, COLUMNS - 1)
  if (videos.length === 0) return null

  return (
    <section className="hb-sec" id="watch" aria-labelledby="watch-heading">
      <div className="hb-sec-head">
        <span className="hb-slug hb-no">No. 04</span>
        <h2 className="hb-cond" id="watch-heading">
          Watch <span className="hb-serif hb-red">&amp; listen</span>
        </h2>
        <span className="hb-slug">On YouTube</span>
      </div>
      <div className="hb-reel" style={{ '--more-span': COLUMNS - videos.length } as React.CSSProperties}>
        {videos.map((video, i) => (
          <a
            className="hb-card"
            href={`https://www.youtube.com/watch?v=${video.embedId}`}
            target="_blank"
            rel="noopener noreferrer"
            key={video.embedId}
          >
            <div className={i % 2 === 1 ? 'hb-duo hb-red-bg' : 'hb-duo'}>
              <MessageThumb embedId={video.embedId} />
              <span
                className="hb-play"
                style={i % 2 === 1 ? { background: 'var(--ink)' } : undefined}
                aria-hidden="true"
              />
            </div>
            <div className="hb-body">
              <span className="hb-slug hb-red">Watch</span>
              <h3 className="hb-cond">{video.title || 'Watch this message'}</h3>
            </div>
          </a>
        ))}
        <a
          className="hb-card hb-more"
          href={`https://www.youtube.com/watch?v=${videos[0].embedId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="hb-slug">YouTube</span>
          <h3 className="hb-cond">
            More
            <br />
            messages
            <br />
            <span className="hb-red" aria-hidden="true">
              &rarr;
            </span>
          </h3>
          <span className="hb-slug">Subscribe</span>
        </a>
      </div>
    </section>
  )
}
