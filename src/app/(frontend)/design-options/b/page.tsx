import type { Metadata } from 'next'
import { ministry as m, navFor } from '../content'

export const metadata: Metadata = {
  title: 'Formwork',
  description: 'A cast, heavy home page for Kolton Oxshire Ministries. Proposal only.',
  robots: { index: false, follow: false },
}

const nav = navFor('/design-options/b')

export default function OptionB() {
  return (
    <div data-theme="b">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Archivo:wght@400;500&display=swap" />
      <link rel="stylesheet" href="/design/b.css" />
      <div className="top">
        <header className="mast">
          <a className="wordmark" href="/design-options/b">
            {m.name}
          </a>
          <div className="mast-row">
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
          </div>
        </header>
        <section className="hero" id="home">
          <div className="stage">
            <figure className="portrait">
              <img src={m.portrait} alt={m.portraitAlt} fetchPriority="high" />
            </figure>
            <div className="intro">
              <h1>
                Kolton
                <br />
                Oxshire
              </h1>
              <p className="lede">{m.quote}</p>
              <div className="actions">
                <a className="btn" href="/book-to-speak">
                  Book Kolton
                </a>
                <a className="quiet" href="/partner">
                  Partner with us
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="stack wrap" id="about">
        <div className="pin">
          <h2>{m.aboutHeading}</h2>
        </div>
        <div className="flow">
          <p>{m.description}</p>
          <p>{m.about[0]}</p>
          <figure className="frame">
            <img src={m.portrait} alt={m.portraitAlt} />
            <figcaption>{m.name}</figcaption>
          </figure>
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

      <section className="ink" aria-label={m.gospel}>
        <div className="wrap">
          <p className="statement-lede">{m.gospel}</p>
        </div>
      </section>

      <section className="teaching" id="teaching">
        <div className="wrap">
          <h2>{m.teachingHeading}</h2>
          <p>{m.teachingLede}</p>
          <ol className="pour">
            {m.teaching.map((item, i) => (
              <li key={item.title}>
                <h3>
                  {i + 1}. {item.title}
                </h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="giving" id="giving">
        <div className="wrap">
          <div className="plate">
            <h2>{m.givingHeading}</h2>
            <p>{m.givingLede}</p>
            <ul className="lines">
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
          <p className="harvest">{m.harvest}</p>
        </div>
      </section>

      <footer className="foot" id="contact">
        <div className="wrap">
          <h2>{m.contactHeading}</h2>
          <p>{m.contactSubtext}</p>
          <a className="mail" href={`mailto:${m.email}`}>
            {m.email}
          </a>
          <p className="signoff">{m.ministryName}</p>
          <p className="colophon">{new Date().getFullYear()}</p>
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
