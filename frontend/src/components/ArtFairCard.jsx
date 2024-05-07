import Link from 'next/link'
import { ResponsiveImage } from '~/components/ResponsiveImage'
import { paths } from '~/utils/paths'
import { formatDate } from '~/utils/formatDate'

export function ArtFairCard({ artFair, aspectRatio = 1 / 1 }) {
  const { title, slug, image, dateStart, dateEnd, location, artists } = artFair || {}

  return (
    <li className="group">
      <Link href={paths.standardizedTest(slug)}>
        {image?.asset._ref ? (
          <ResponsiveImage
            src={image}
            alt={title}
            widthDesktop={aspectRatio !== 1 ? null : 500}
            widthMobile={300}
            aspectRatio={aspectRatio}
          />
        ) : (
          <div className="flex aspect-[1/1] items-center justify-center bg-accent/20" />
        )}
        <ul className="text-style-caption mt-5 leading-12 group-hover:text-accent">
          {artists?.length > 0 && <li>{artists.map(artist => artist.title).join(', ')}</li>}
          {title && <li className="italic tracking-normal">{title}</li>}
          {location && <li>{location}</li>}
          {dateStart && <li>{formatDate(dateStart, dateEnd)}</li>}
        </ul>
      </Link>
    </li>
  )
}

export function ArtFairCardSingle({ artFair }) {
  const { title, slug, image, dateStart, dateEnd, location, artists } = artFair || {}

  return (
    <div className="flex h-full w-full flex-col md:flex-row md:gap-40">
      <Link href={paths.standardizedTest(slug)} className="h-full w-full md:w-[41.5%]">
        {image?.asset._ref ? (
          <ResponsiveImage
            src={image}
            alt={title}
            widthDesktop={760}
            widthMobile={760}
            aspectRatio={1}
          />
        ) : (
          <div className="flex aspect-[1/1] items-center justify-center bg-accent/20" />
        )}
      </Link>
      <div className="w-full md:w-[58.5%]">
        <ul className="mt-5 leading-12 md:pr-[calc(25%_-_2.5rem)]">
          {title && (
            <li className="text-style-title leading-10 hover:text-accent">
              <Link href={paths.standardizedTest(slug)}>{title}</Link>
            </li>
          )}
          {artists?.length > 0 && (
            <li className="text-style-subtitle">
              {artists.map(artist => artist.title).join(', ')}
            </li>
          )}
          {location && <li className="text-style-subtitle">{location}</li>}
          {dateStart && <li className="text-style-subtitle">{formatDate(dateStart, dateEnd)}</li>}
        </ul>
      </div>
    </div>
  )
}
