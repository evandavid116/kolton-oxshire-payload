import type { Metadata } from 'next'
import { ministry as m, navFor } from '../content'

export const metadata: Metadata = {
  title: 'Broadside',
  description: 'A woodtype revival bill for the Kolton Oxshire Ministries home page. Proposal only.',
  robots: { index: false, follow: false },
}

const nav = navFor('/design-options/a')

export default function OptionA() {
  return (
    <div data-theme="a">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Six+Caps&family=Bevan&family=Archivo+Narrow:wght@400;500;600&display=swap" />
      <link rel="stylesheet" href="/design/a/page.css" />
      <div className="top">
        <header className="slab">
          <a className="wordmark" href="/design-options/a">Kolton</a>
          <details className="menu">
            <summary>Menu</summary>
            <ul className="links">
              {nav.map((item) => (
                <li key={item.href}><a href={item.href}>{item.label}</a></li>
              ))}
            </ul>
          </details>
        </header>
        <section className="hero" id="home">
          <div className="stage">
            <div className="nameblock">
              <h1>
                <span className="fit fit-k">Kolton</span>
                <span className="fit fit-o">Oxshire</span>
              </h1>
              <p className="shout">{m.quote}</p>
              <div className="actions">
                <a className="btn" href="/book-to-speak">Book Kolton</a>
                <a className="btn btn-frame" href="/partner">Partner with us</a>
              </div>
            </div>
            <figure className="plate">
              <img src={m.portrait} alt={m.portraitAlt} fetchPriority="high" />
            </figure>
          </div>
        </section>
      </div>

      <section className="about" id="about">
        <div className="wrap split">
          <figure className="plate">
            <img src={m.lion} alt={m.lionAlt} />
            <figcaption>Lion of Judah, bald eagle, and the flag.</figcaption>
          </figure>
          <div>
            <h2>{m.aboutHeading}</h2>
            <p>{m.description}</p>
          </div>
        </div>
        <div className="wrap flow">
            <p>{m.about[0]}</p>
            <p>{m.about[1]}</p>
            <p>{m.about[2]}</p>
        </div>
        <div className="wrap">
          <p className="gospel">{m.gospel}</p>
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
                <img className="still" src={`https://i.ytimg.com/vi/${video.embedId}/hqdefault.jpg`} alt="" />
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
          <p className="harvest">{m.harvest}</p>
          <ul className="bill">
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
          <ul className="bill">
            {m.giving.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
          <a className="btn" href="/partner">Give now</a>
        </div>
      </section>

      <footer className="foot" id="contact">
        <div className="wrap">
          <h2>{m.contactHeading}</h2>
          <p>{m.contactSubtext}</p>
          <a className="mail" href={`mailto:${m.email}`}>{m.email}</a>
          <ul className="links foot-links">
            {nav.map((item) => (
              <li key={item.label}><a href={item.href}>{item.label}</a></li>
            ))}
          </ul>
          <p className="colophon">{m.ministryName}. {new Date().getFullYear()}.</p>
        </div>
      </footer>
    </div>
  )
}
