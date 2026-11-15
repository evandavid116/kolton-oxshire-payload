/** Renders `text` with the first occurrence of `word` set in the accent red. */
export default function Accent({ text, word }: { text: string; word?: string | null }) {
  if (!word || !text.includes(word)) return <>{text}</>
  const i = text.indexOf(word)
  return (
    <>
      {text.slice(0, i)}
      <span className="hb-red">{word}</span>
      {text.slice(i + word.length)}
    </>
  )
}
