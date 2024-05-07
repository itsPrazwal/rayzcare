import { RichText } from '~/components/RichText'
import { FounderCard } from '~/components/FounderCard'
import { Title } from '~/components/Title'

export default function ModuleFounders({ data, key}) {
  const { title, description, founders } = data

  return (
    <div className="flex w-full h-full flex-col gap-15" key={key}>
      {title && <Title>{title}</Title>}
      {description && (
        <div className="grid md:grid-cols-12">
          <div className="text-style-description md:col-span-5 md:col-start-2">
            <RichText value={description} />
          </div>
        </div>
      )}
      {founders.length > 0 && (
        <ul className="grid-items md:grid-cols-3">
          {founders.map(founder => (
            <FounderCard key={founder._id} founder={founder} />
          ))}
        </ul>
      )}
    </div>
  )
}
