import { RichText } from '~/components/RichText'

export default function ModuleQuote({ data, key }) {
  const { author, body } = data

  return (
    <div className="flex w-full flex-col gap-15" key={key}>
      {body && (
        <div className="grid md:grid-cols-12">
          <div className="md:col-span-5 md:col-start-2">
            <div className="text-style-title leading-[0.9] indent-[-0.25em]">
              <RichText value={body} />
            </div>
            {author && <div className="mt-5 normal-case italic tracking-caption">—{author}</div>}
          </div>
        </div>
      )}
    </div>
  )
}
