import Link from 'next/link'
import { clsx } from 'clsx'
import { Image } from '~/components/Image'
import { toPath } from '~/utils/toPath'
import { Title } from '~/components/Title'

export function Card({ item }) {
  const { _type, slug, title, featured, image } = item

  return (
    <li
      className={clsx('group relative', {
        'col-span-full': featured
      })}
    >
      <Link href={toPath(_type, slug)} className="block">
        {image?.asset._ref ? (
          <>
            {featured ? (
              <Image
                src={image}
                alt={title}
                width={1980}
                aspectRatio={8 / 5}
                sizes="100vw"
                className="h-full rounded-2xl"
              />
            ) : (
              <Image
                src={image}
                alt={title}
                layout="constrained"
                width={1600}
                aspectRatio={8 / 5}
                sizes={'(min-width: 768px) 50vw, 100vw'}
                className="h-full rounded-2xl"
              />
            )}
            <div className="sticky inset-x-0 bottom-0 hidden rounded-t-2xl bg-white p-10 group-hover:block">
              <h2 className="px-10 text-center text-14 uppercase">{title}</h2>
            </div>
          </>
        ) : (
          <div className="flex aspect-[8/5] items-center justify-center rounded-2xl border border-solid border-black p-20">
            <Title className="text-center text-[4rem] leading-10 md:text-[4rem]">{title}</Title>
          </div>
        )}
      </Link>
    </li>
  )
}
