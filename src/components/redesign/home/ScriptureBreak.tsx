import Accent from './Accent'

type Props = {
  quote?: string | null
  highlight?: string | null
}

const DEFAULT_QUOTE = 'Go into all the world and preach the gospel to all creation.'
const DEFAULT_HIGHLIGHT = 'gospel'

export default function ScriptureBreak({ quote, highlight }: Props) {
  const text = quote || DEFAULT_QUOTE
  return (
    <section className="hb-verse-break">
      <p className="hb-serif">
        &ldquo;
        <Accent text={text} word={highlight || DEFAULT_HIGHLIGHT} />
        &rdquo;
      </p>
      {/* The reference is only known for the built-in verse; the CMS field has no reference yet. */}
      {text === DEFAULT_QUOTE && <span className="hb-slug">Mark 16:15</span>}
    </section>
  )
}
