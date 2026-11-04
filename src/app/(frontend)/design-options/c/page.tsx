import type { Metadata } from 'next'
import { ministry as m, navFor } from '../content'

export const metadata: Metadata = {
  title: 'Grid',
  description: 'A Swiss sheet for the Kolton Oxshire Ministries home page. Proposal only.',
  robots: { index: false, follow: false },
}

const nav = navFor('/design-options/c')

const index = [
  { href: '#about', label: m.aboutHeading },
  { href: '#preaching', label: m.preachingHeading },
  { href: '#teaching', label: m.teachingHeading },
  { href: '#giving', label: m.givingHeading },
]

export default function OptionC() {
  return (
    <div data-theme="c">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Radio+Canada+Big:wght@400;700&family=Radio+Canada:wght@400;500&display=swap"
      />
      <link rel="stylesheet" href="/design/c.css" />
      <div className="top">
        <header className="float">
          <a className="wordmark" href="/design-options/c">
            {m.name}
          </a>
          <details className="menu">
            <summary>Menu</summary>
            <ul className="links">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </details>
        </header>
        <section className="hero" id="home">
          <div className="wrap">
            <h1>{m.name}</h1>
            <p className="lede">{m.quote}</p>
            <div className="actions">
              <a className="btn" href="/book-to-speak">
                Book Kolton
              </a>
              <a className="quiet" href="/partner">
                Partner with us
              </a>
            </div>
            <ol className="index">
              {index.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>

      <section className="about" id="about">
        <div className="wrap about-grid">
          <figure className="photo">
            <img src={m.portrait} alt={m.portraitAlt} />
          </figure>
          <div>
            <h2>{m.aboutHeading}</h2>
            <p>{m.description}</p>
            <p>{m.about[0]}</p>
          </div>
        </div>
        <div className="wrap later">
          <p>{m.about[1]}</p>
          <p>{m.about[2]}</p>
        </div>
      </section>

      <section className="preaching" id="preaching">
        <div className="wrap">
          <h2>{m.preachingHeading}</h2>
          <p>{m.preachingLede}</p>
          <div className="videos">
            {m.videos.map((video) => (
              <article key={video.embedId}>
                <iframe
                  src={`https://www.youtube.com/embed/${video.embedId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
                <h3>{video.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="field">
        <div className="wrap">
          <p className="statement-lede">{m.gospel}</p>
        </div>
      </section>

      <section className="teaching" id="teaching">
        <div className="wrap">
          <h2>{m.teachingHeading}</h2>
          <p>{m.teachingLede}</p>
          <p className="note">{m.harvest}</p>
          <ul className="rows">
            {m.teaching.map((item) => (
              <li key={item.title}>
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
          <ul className="rows">
            {m.giving.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
          <a className="btn" href="/partner">
            Give now
          </a>
        </div>
      </section>

      <footer className="foot" id="contact">
        <div className="wrap">
          <p className="colophon">
            {m.contactHeading}. {m.contactSubtext}{' '}
            <a href={`mailto:${m.email}`}>{m.email}</a>. {m.ministryName}. {new Date().getFullYear()}.
          </p>
          <ul className="links foot-links">
            {nav.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  )
}
