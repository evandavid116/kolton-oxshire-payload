import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Design options',
  description: 'Three proposed home pages for Kolton Oxshire Ministries. The live site is unchanged.',
  robots: { index: false, follow: false },
}

const options = [
  {
    href: '/design-options/a',
    name: 'Broadside',
    line: 'A woodtype sale bill. Buff paper, tall capitals, one vermilion line, his portrait in a printer’s frame.',
  },
  {
    href: '/design-options/b',
    name: 'Manifesto',
    line: 'A night crusade sheet. Black ground, the name enormous, the surname in the one red.',
  },
  {
    href: '/design-options/c',
    name: 'Paste-up',
    line: 'A kraft street flyer. Photocopied portrait on a white sheet, and a fluorescent button to book him.',
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
