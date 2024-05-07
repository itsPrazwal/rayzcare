import { RichText } from '~/components/RichText'
import { Title } from '~/components/Title'

export default function ModuleChronologyText({ data, key }) {
  const { title, body } = data

  return (
    <div className="module-chronology-text flex w-full flex-col gap-10" key={key}>
      {title && <Title className="text-style-title">{title}</Title>}
      {body && (
        <div className="grid">
          <div className="text-style-description">
            <RichText value={body} />
          </div>
        </div>
      )}
    </div>
  )
}
