import { RichText } from '~/components/RichText'
import { Title } from '~/components/Title'

export default function ModuleText({ data, key }) {
  const { title, body } = data

  return (
    <div className="flex w-full flex-col gap-15" key={key}>
      {title && <Title>{title}</Title>}
      {body && (
        <div className="grid md:grid-cols-12">
          <div className="text-style-description md:col-span-10 md:col-start-2">
            <RichText value={body} />
          </div>
        </div>
      )}
    </div>
  )
}
