import Link from 'next/link'
import { toPath } from '~/utils/toPath'
import { Tag } from '~/components/Tag'
import { RichText } from '~/components/RichText'
import { Card } from '~/components/Card'

export function Cards({
  items,
  tag,
  stickyTag = false,
  description = null,
  moreButton = null,
  className,
  ...props
}) {
  return (
    <div {...props} className={className}>
      {stickyTag ? (
        <div className="sticky top-20 z-10 mb-20 flex justify-center">
          <Tag isDashed>{tag}</Tag>
        </div>
      ) : (
        <Tag className="w-full justify-center" isDashed>
          {tag}
        </Tag>
      )}

      {description && (
        <div className="pt-text mt-20 rounded-xl border border-dashed border-black p-10 text-style-description">
          <RichText value={description} />
        </div>
      )}

      <ul className="grid grid-cols-2 gap-16 pt-20 pb-40">
        {items.map(activity => (
          <Card key={activity._id} item={activity} />
        ))}
      </ul>

      {moreButton && (
        <Link href={toPath(moreButton.type, moreButton.slug)} className="mb-40 -mt-20 block">
          <Tag className="space-between w-full">{moreButton.title}</Tag>
        </Link>
      )}
    </div>
  )
}
