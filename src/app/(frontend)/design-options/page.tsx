import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Design options',
  description: 'Three proposed home pages for Kolton Oxshire Ministries. The live site is unchanged.',
  robots: { index: false, follow: false },
}

const options = [
  {
    href: '/design-options/a',
    name: 'Atelier',
    line: 'A quiet letter. Warm paper, a light serif, and Kolton’s portrait above his own sentence.',
  },
  {
    href: '/design-options/b',
    name: 'Formwork',
    line: 'A heavy site board. Concrete grey, condensed capitals, one orange button, photographs in black and white.',
  },
  {
    href: '/design-options/c',
    name: 'Grid',
    line: 'A Swiss sheet. White paper, a plain grotesk, an ultramarine field for the gospel line, and one red mark.',
  },
]

export default function DesignOptionsIndex() {
  return (
    <div data-theme="index">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700&display=swap" />
      <link rel="stylesheet" href="/design/index.css" />
      <main className="wrap">
        <h1>Three directions for the home page</h1>
        <p>
          The live site is unchanged. These use the ministry’s own words and photographs. Pick one
          and a later pass can apply it.
        </p>
        <ul className="options">
          {options.map((option) => (
            <li key={option.href}>
              <a href={option.href}>{option.name}</a>
              <p>{option.line}</p>
            </li>
          ))}
        </ul>
        <a className="back" href="/">
          Current home page
        </a>
      </main>
    </div>
  )
}
