import { RichText } from '~/components/RichText'

export default function ModuleChronologyQuote({ data, key }) {
  const { author, body } = data

  return (
    <div className="flex w-full flex-col gap-15" key={key}>
      {body && (
        <div className="grid grid-cols-1">
          <div className="text-style-quote -mt-[0.12em]">
            <RichText value={body} />
          </div>
          {author && <div className="text-style-quote-writer">—{author}</div>}
        </div>
      )}
    </div>
  )
}
