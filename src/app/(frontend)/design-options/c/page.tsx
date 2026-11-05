import type { Metadata } from 'next'
import Link from 'next/link'
import { ministry as m, navFor } from '../content'

export const metadata: Metadata = {
  title: 'Paste-up',
  description: 'A kraft street flyer for the Kolton Oxshire Ministries home page. Proposal only.',
  robots: { index: false, follow: false },
}

const nav = navFor('/design-options/c')

export default function OptionC() {
  return (
    <div data-theme="c">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=League+Gothic&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&display=swap" />
      <link rel="stylesheet" href="/design/c/page.css" />
      <div className="top">
        <header className="edge">
          <Link className="wordmark" href="/design-options/c">Kolton Oxshire</Link>
          <details className="menu">
            <summary>Menu</summary>
          </details>
          <ul className="links">
            {nav.map((item) => (
              <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
            ))}
          </ul>
          <Link className="btn btn-primary bar-book" href="/book-to-speak">Book Kolton</Link>
        </header>
        <section className="hero" id="home">
          <div className="stage">
            <div>
              <h1>
                <span className="fit">Kolton</span>
                <span className="fit">Oxshire</span>
              </h1>
              <p className="lede">{m.quote}</p>
              <div className="actions">
                <Link className="btn btn-primary" href="/book-to-speak">Book Kolton</Link>
                <Link className="btn btn-paper" href="/partner">Partner with us</Link>
              </div>
            </div>
            <figure className="sheet">
              <img src={m.portrait} alt={m.portraitAlt} fetchPriority="high" />
              <Link className="slip" href="/book-to-speak">Book Kolton</Link>
            </figure>
          </div>
        </section>
      </div>

      <section className="about" id="about">
        <div className="wrap about-grid">
          <figure className="sheet lion">
            <img src={m.lion} alt={m.lionAlt} />
          </figure>
          <div>
            <h2>{m.aboutHeading}</h2>
            <p>{m.description}</p>
          </div>
        </div>
        <div className="wrap later">
          <p>{m.about[0]}</p>
          <p>{m.about[1]}</p>
          <p>{m.about[2]}</p>
        </div>
      </section>

      <section className="gospel">
        <div className="wrap">
          <p>{m.gospel}</p>
        </div>
      </section>

      <section className="preaching" id="preaching">
        <div className="wrap">
          <h2>{m.preachingHeading}</h2>
          <p>{m.preachingLede}</p>
          <div className="videos">
            {m.videos.map((video) => (
              <article key={video.embedId} className="sheet video-sheet">
                <h3>{video.title}</h3>
                <img className="still" src={`https://i.ytimg.com/vi/${video.embedId}/hqdefault.jpg`} alt={`Still from ${video.title}`} />
                <iframe
                  src={`https://www.youtube.com/embed/${video.embedId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="teaching" id="teaching">
        <div className="wrap">
          <h2>{m.teachingHeading}</h2>
          <p>{m.teachingLede}</p>
          <p className="lede">{m.harvest}</p>
          <ul className="wall">
            {m.teaching.map((item) => (
              <li key={item.title} className="sheet">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="giving" id="giving">
        <div className="wrap">
          <h2>{m.givingHeading}</h2>
          <p>{m.givingLede}</p>
          <ul className="wall">
            {m.giving.map((item) => (
              <li key={item.title} className="sheet">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
          <Link className="btn btn-primary" href="/partner">Give now</Link>
        </div>
      </section>

      <footer className="foot" id="contact">
        <div className="wrap">
          <p className="colophon">
            {m.contactHeading}. {m.contactSubtext} <a href={`mailto:${m.email}`}>{m.email}</a>. {m.ministryName}. {new Date().getFullYear()}.
          </p>
          <div className="actions">
            <Link className="btn btn-primary" href="/book-to-speak">Book Kolton</Link>
          </div>
          <ul className="links foot-links">
            {nav.map((item) => (
              <li key={item.label}><Link href={item.href}>{item.label}</Link></li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  )
}
