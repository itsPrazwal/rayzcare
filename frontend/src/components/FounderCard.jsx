import Link from 'next/link'
import { ResponsiveImage } from '~/components/ResponsiveImage'
import { paths } from '~/utils/paths'
import { Title } from '~/components/Title'

export function FounderCard({ founder }) {
  const { title, slug, image, portrait } = founder

  return (
    <li className="group relative">
      <Link href={paths.team(slug)} className="block">
        {portrait?.asset._ref || image?.asset._ref ? (
          <>
            <ResponsiveImage
              src={portrait || image}
              alt={title}
              widthDesktop={500}
              widthMobile={300}
              aspectRatio={4 / 5}
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
