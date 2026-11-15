import Link from 'next/link'
import Accent from './Accent'

/**
 * Placeholder beats: the Romans verses (KJV) stand in until Kolton supplies his
 * own wording — see CONTENT-TODO.md. Rendered as plain stacked beats for now;
 * Stage 3 of PLAN.md pins this section and advances the beats on scroll, and
 * this stacked form stays as the reduced-motion / no-JS version.
 */
const BEATS = [
  {
    head: 'All have sinned.',
    accent: 'sinned',
    verse: 'For all have sinned, and come short of the glory of God.',
    reference: 'Romans 3:23',
  },
  {
    head: 'But the gift of God is eternal life.',
    accent: 'gift',
    verse:
      'For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord.',
    reference: 'Romans 6:23',
  },
  {
    head: 'Christ died for us.',
    accent: 'died',
    verse:
      'But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.',
    reference: 'Romans 5:8',
  },
  {
    head: 'Confess and believe.',
    accent: 'believe',
    verse:
      'That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved.',
    reference: 'Romans 10:9',
  },
]

export default function GospelChapter() {
  return (
    <section className="hb-gospel" id="gospel" aria-labelledby="gospel-heading">
      <div className="hb-sec-head">
        <span className="hb-slug hb-no">No. 03</span>
        <h2 className="hb-cond" id="gospel-heading">
          The Gospel <span className="hb-serif hb-red">in sixty seconds</span>
        </h2>
        <span className="hb-slug" aria-hidden="true">
          Scroll &darr;
        </span>
      </div>

      <ol className="hb-g-beats">
        {BEATS.map((beat, i) => (
          <li className="hb-g-beat" key={beat.reference}>
            <span className="hb-cond hb-g-num" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <p className="hb-cond hb-big">
                <Accent text={beat.head} word={beat.accent} />
              </p>
              <p className="hb-serif hb-verse">&ldquo;{beat.verse}&rdquo;</p>
              <p className="hb-slug hb-ref">{beat.reference}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="hb-g-end">
        <span className="hb-serif">Ready to give your life to Jesus?</span>
        <Link className="hb-btn hb-solid" href="/i-just-got-saved">
          I just prayed that prayer &rarr;
        </Link>
      </div>
    </section>
  )
}
