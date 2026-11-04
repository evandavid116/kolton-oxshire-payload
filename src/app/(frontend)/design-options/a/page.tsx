import type { Metadata } from 'next'
import { ministry as m, navFor } from '../content'

export const metadata: Metadata = {
  title: 'Atelier',
  description: 'A quiet letter for the Kolton Oxshire Ministries home page. Proposal only.',
  robots: { index: false, follow: false },
}

const nav = navFor('/design-options/a')

export default function OptionA() {
  return (
    <div data-theme="a">
      <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=sentient@300,400&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400&display=swap" />
      <link rel="stylesheet" href="/design/a.css" />
      <div className="top">
        <header>
          <p className="banner">{m.banner}</p>
          <div className="bar">
            <a className="wordmark" href="/design-options/a">
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
          </div>
        </header>
        <section className="hero" id="home">
          <div className="stage">
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
            <figure className="portrait">
              <img src={m.portrait} alt={m.portraitAlt} fetchPriority="high" />
            </figure>
          </div>
        </section>
      </div>

      <section className="about" id="about">
        <div className="wrap">
          <h2>{m.aboutHeading}</h2>
          <p>{m.description}</p>
          <p>{m.about[0]}</p>
        </div>
        <figure className="mat">
          <div className="mat-inner">
            <img src={m.lion} alt={m.lionAlt} />
          </div>
          <figcaption className="wrap">{m.gospel}</figcaption>
        </figure>
        <div className="wrap after-mat">
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

      <section className="teaching" id="teaching">
        <div className="wrap">
          <h2>{m.teachingHeading}</h2>
          <p>{m.teachingLede}</p>
          <p className="harvest">{m.harvest}</p>
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
          <div className="card">
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
        </div>
      </section>

      <footer className="foot" id="contact">
        <div className="wrap">
          <h2>{m.contactHeading}</h2>
          <p className="statement">{m.contactSubtext}</p>
          <a className="mail" href={`mailto:${m.email}`}>
            {m.email}
          </a>
          <ul className="links foot-links">
            {nav.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <p className="colophon">
            {m.ministryName}. {new Date().getFullYear()}.
          </p>
        </div>
      </footer>
    </div>
  )
}
