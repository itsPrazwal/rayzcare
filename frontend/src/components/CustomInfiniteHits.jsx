import { useInfiniteHits } from 'react-instantsearch-hooks-web'
import { groupBy } from 'lodash'
import { clsx } from 'clsx'
import { useTranslation } from '~/hooks/useTranslation'
import { Tag } from '~/components/Tag'
import { ArtistCard } from '~/components/ArtistCard'
import { Cards } from '~/components/Cards'

export function CustomInfiniteHits(props) {
  const { hits, isLastPage, showMore } = useInfiniteHits(props)
  const t = useTranslation()

  const firstType = hits.length ? hits[0].type : null

  const showMoreItems = () => {
    showMore()
  }

  const transformItems = items => {
    return groupBy(
      items.map(item => ({
        ...item,
        title: typeof item.title === 'object' ? item.title[props.locale] : item.title
      })),
      'type'
    )
  }

  let transformedItems = transformItems(hits)

  return (
    <>
      <div className="-mt-30 flex flex-col">
        {transformedItems.artist?.length && (
          <div className={clsx('mt-50 block', firstType === 'artist' ? 'order-1' : 'order-2')}>
            <div className="sticky top-20 z-10 mb-20 flex justify-center">
              <Tag isDashed>
                {transformedItems.artist.length > 1 ? t.artist.many : t.artist.one}
              </Tag>
            </div>

            <ul className="grid grid-cols-3 gap-20 pt-20 pb-40">
              {transformedItems.artist.map(artist => (
                <ArtistCard key={artist._id} artist={artist} />
              ))}
            </ul>
          </div>
        )}

        {transformedItems.repertory?.length && (
          <Cards
            stickyTag
            items={transformedItems.repertory}
            tag={transformedItems.repertory.length > 1 ? t.activity.many : t.activity.one}
            className={clsx('block mt-50', firstType === 'repertory' ? 'order-1' : 'order-2')}
          />
        )}

        {transformedItems.article?.length && (
          <Cards
            stickyTag
            items={transformedItems.article}
            tag={transformedItems.article.length > 1 ? t.article.many : t.article.one}
            className={clsx('block mt-50', firstType === 'article' ? 'order-1' : 'order-2')}
          />
        )}
      </div>

      {!isLastPage && (
        <Tag className="w-full cursor-pointer justify-center text-center" onClick={showMoreItems}>
          {t.loadMore}
        </Tag>
      )}
    </>
  )
}
