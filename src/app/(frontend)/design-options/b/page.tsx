import type { Metadata } from 'next'
import Link from 'next/link'
import { ministry as m, navFor } from '../content'

export const metadata: Metadata = {
  title: 'Manifesto',
  description: 'A night crusade poster for the Kolton Oxshire Ministries home page. Proposal only.',
  robots: { index: false, follow: false },
}

const nav = navFor('/design-options/b')

export default function OptionB() {
  return (
    <div data-theme="b">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Public+Sans:wght@400;500;600&display=swap" />
      <link rel="stylesheet" href="/design/b/page.css" />
      <div className="top">
        <header>
          <p className="banner">{m.gospel}</p>
          <div className="bar">
            <Link className="wordmark" href="/design-options/b">Kolton</Link>
            <details className="menu">
              <summary>Menu</summary>
            </details>
            <ul className="links">
              {nav.map((item) => (
                <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
              ))}
            </ul>
          </div>
        </header>
        <section className="hero" id="home">
          <div className="hero-copy">
            <h1>
              <span className="fit">Kolton</span>
              <span className="fit hot">Oxshire</span>
            </h1>
            <p className="lede">{m.quote}</p>
            <div className="actions">
              <Link className="btn btn-primary" href="/book-to-speak">Book Kolton</Link>
              <Link className="btn btn-line" href="/partner">Partner with us</Link>
            </div>
          </div>
          <figure className="plate hero-plate">
            <img src={m.portrait} alt={m.portraitAlt} fetchPriority="high" />
          </figure>
        </section>
      </div>

      <section className="about" id="about">
        <div className="wrap split">
          <figure className="plate">
            <img src={m.lion} alt={m.lionAlt} />
          </figure>
          <div>
            <h2>{m.aboutHeading}</h2>
            <p>{m.description}</p>
            <p>{m.about[0]}</p>
            <p>{m.about[1]}</p>
            <p>{m.about[2]}</p>
          </div>
        </div>
        <div className="wrap">
          <p className="gospel">{m.harvest}</p>
        </div>
      </section>

      <section className="preaching" id="preaching">
        <div className="wrap">
          <h2>{m.preachingHeading}</h2>
          <p>{m.preachingLede}</p>
          <div className="videos">
            {m.videos.map((video) => (
              <article key={video.embedId}>
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
          <ul className="record">
            {m.teaching.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band" id="giving">
        <div className="wrap">
          <h2>{m.givingHeading}</h2>
          <p>{m.givingLede}</p>
          <ul className="pledge">
            {m.giving.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
          <div className="actions">
            <Link className="btn btn-primary" href="/partner">Give now</Link>
            <Link className="btn btn-line" href="/book-to-speak">Book Kolton</Link>
          </div>
        </div>
      </section>

      <footer className="foot" id="contact">
        <div className="wrap">
          <p className="colophon">
            {m.contactHeading}. {m.contactSubtext} <a className="mail" href={`mailto:${m.email}`}>{m.email}</a>. {m.ministryName}. {new Date().getFullYear()}.
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
