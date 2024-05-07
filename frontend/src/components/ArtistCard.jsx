import Link from 'next/link'
import { ResponsiveImage } from '~/components/ResponsiveImage'
import { paths } from '~/utils/paths'

export function ArtistCard({ artist }) {
  const { title, slug, image, portrait } = artist

  return (
    <li className="group relative">
      <Link href={paths.country(slug)} className="block">
        {image?.asset?._ref ? (
          <>
            <ResponsiveImage
              src={image || portrait}
              alt={title}
              widthDesktop={500}
              widthMobile={300}
              aspectRatio={1 / 1}
              className="h-full"
            />
            <h2 className="text-style-caption mt-5 group-hover:text-accent">{title}</h2>
          </>
        ) : (
          <div>
            <div className="flex aspect-[1/1] items-center justify-center bg-accent/20" />
            <h2 className="text-style-caption mt-5 group-hover:text-accent">{title}</h2>
          </div>
        )}
      </Link>
    </li>
  )
}
