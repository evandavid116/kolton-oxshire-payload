import Link from 'next/link'

export default function GuideOffer() {
  return (
    <section className="hb-guide" id="guide" aria-labelledby="guide-heading">
      <div className="hb-stamp" aria-hidden="true">
        <span>
          100%
          <br />
          Free
        </span>
      </div>
      <div className="hb-guide-l" aria-hidden="true">
        <div className="hb-book">
          <p className="hb-cond hb-book-title">
            New
            <br />
            Believer&apos;s
            <br />
            <span className="hb-red">Guide</span>
          </p>
          <div>
            <span className="hb-serif">Your first steps with Jesus.</span>
            <span className="hb-slug" style={{ display: 'block', marginTop: 10 }}>
              Kolton Oxshire Ministries
            </span>
          </div>
        </div>
      </div>
      <div className="hb-guide-r">
        <span className="hb-slug">No. 05 &mdash; Free resource</span>
        <h2 className="hb-cond" id="guide-heading">
          Just gave your life to Jesus?
        </h2>
        <p>
          Welcome to the family. Get the New Believers Guide &mdash; a free resource to help you
          grow in your walk with Christ.
        </p>
        <div className="hb-guide-actions">
          <Link className="hb-btn hb-ink" href="/i-just-got-saved">
            Get the free guide &rarr;
          </Link>
          <a className="hb-btn" href="/new-believers-guide.pdf" download>
            Download it instantly <i aria-hidden="true">&darr;</i>
          </a>
        </div>
      </div>
    </section>
  )
}
