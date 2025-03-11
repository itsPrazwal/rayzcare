import { RichText } from '~/components/RichText'
import { VimeoCard } from '~/components/VimeoCard'

export default function ModuleSubgroup({ data, key }) {
  const { title, description, pages } = data

  return (
    <div className="flex w-full flex-col gap-15" key={key}>
      {title && <div className="text-style-subtitle mb-10">{title}</div>}
      {description && (
        <div className="grid md:grid-cols-12">
          <div className="text-style-description md:col-span-5 md:col-start-2">
            <RichText value={description} />
          </div>
        </div>
      )}
      {pages.length > 0 && (
        <ul className="grid-items">
          {pages.map(page => {
            if (page._type === 'vimeo') return <VimeoCard key={page._id} vimeo={page} />
          })}
        </ul>
      )}
    </div>
  )
}
