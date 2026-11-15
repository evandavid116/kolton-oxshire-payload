import Link from 'next/link'
import { home } from '@/components/redesign/paths'

// New copy for this section is listed in CONTENT-TODO.md for Kolton's approval.
const PATHS = [
  {
    lines: ['I need', 'Jesus'],
    body: 'Hear the Gospel, start to finish, in about a minute.',
    label: 'The Gospel',
    href: home('gospel'),
  },
  {
    lines: ['I just', 'got saved'],
    accent: 'saved',
    body: "Welcome to the family. Get the free New Believer's Guide.",
    label: 'Start here',
    href: '/i-just-got-saved',
  },
  {
    lines: ['I want', 'to grow'],
    body: 'Messages, Bible studies and free resources.',
    label: 'Watch & read',
    href: home('watch'),
  },
  {
    lines: ['Invite', 'Kolton'],
    body: 'Bring Kolton to your church, event or revival meeting.',
    label: 'Book to speak',
    href: '/book-to-speak',
  },
]

export default function PathCards() {
  return (
    <section className="hb-sec" aria-labelledby="paths-heading">
      <div className="hb-sec-head">
        <span className="hb-slug hb-no">No. 02</span>
        <h2 className="hb-cond" id="paths-heading">
          Where are you <span className="hb-serif hb-red">today?</span>
        </h2>
        <span className="hb-slug">Pick one</span>
      </div>
      <div className="hb-paths">
        {PATHS.map((path, i) => (
          <Link className="hb-path" href={path.href} key={path.href}>
            <span className="hb-slug">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="hb-cond">
              {path.lines[0]}
              <br />
              {path.accent ? (
                <>
                  {path.lines[1].replace(path.accent, '')}
                  <span className="hb-red">{path.accent}</span>
                </>
              ) : (
                path.lines[1]
              )}
            </h3>
            <p>{path.body}</p>
            <span className="hb-go">
              <span>{path.label}</span>
              <span aria-hidden="true">&rarr;</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
