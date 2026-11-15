import { AUTHOR_URL, books } from '@/lib/books'

export default function Books() {
  if (books.length === 0) return null
  return (
    <section className="hb-sec" id="books" aria-labelledby="books-heading">
      <div className="hb-sec-head">
        <span className="hb-slug hb-no">No. 07</span>
        <h2 className="hb-cond" id="books-heading">
          Books <span className="hb-serif hb-red">by Kolton</span>
        </h2>
        <a className="hb-slug" href={AUTHOR_URL} target="_blank" rel="noopener noreferrer">
          On Amazon &rarr;
        </a>
      </div>
      <div className="hb-books">
        {books.map((book) => (
          <div className="hb-bk" key={book.slug}>
            <div className="hb-cover">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={book.coverUrl} alt={`${book.title} cover`} loading="lazy" />
            </div>
            <div className="hb-info">
              <div>
                <h3 className="hb-cond">{book.title}</h3>
                <span className="hb-slug hb-red" style={{ display: 'block', marginTop: 9 }}>
                  {book.format}
                </span>
              </div>
              <p>{book.shortDescription}</p>
              <a
                className="hb-btn"
                style={{ alignSelf: 'start' }}
                href={book.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get the book &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
