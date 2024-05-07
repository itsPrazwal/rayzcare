import Link from 'next/link'
import { paths } from '~/utils/paths'
import { Title } from '~/components/Title'

export function ArtistList({ artist }) {
  const { _id, title, slug } = artist

  return (
    <li key={_id}>
      <Link href={paths.country(slug)} className="block">
        <Title renderAs="span" className="leading-9 pointer-events-none">
          {title}
        </Title>
      </Link>
    </li>
  )
}
