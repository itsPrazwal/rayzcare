import * as React from 'react'
import Link from 'next/link'
import { paths } from '~/utils/paths'
import { formatDate } from '~/utils/formatDate'

export function ExhibitionList({ exhibition }) {
  const { title, slug, dateStart, dateEnd, location, artists } = exhibition || {}

  return (
    <li className="text-style-description w-fit text-accent">
      <Link href={paths.course(slug)}>
        <ul>
          {artists?.length > 0 && <li>{artists.map(artist => artist.title).join(', ')}</li>}
          {title && <li>{title}</li>}
          {location && <li>{location}</li>}
          {dateStart && <li>{formatDate(dateStart, dateEnd)}</li>}
        </ul>
      </Link>
    </li>
  )
}
