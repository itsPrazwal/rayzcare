import Link from 'next/link'
import * as React from 'react'
import { useMediaQuery } from 'react-responsive'

import { ResponsiveImage } from '~/components/ResponsiveImage'

import { paths } from '~/utils/paths'

export function PublicationCard({ publication, publicationsLength }) {
  const { title, slug, image, year, publisher } = publication
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' })

  const aspectRatio = !isMobile && publicationsLength < 3 ? 16 / 9 : 1 / 1

  return (
    <li className="group relative">
      <Link href={paths.publication(slug)} className={'block'}>
        {image?.asset._ref ? (
          <ResponsiveImage src={image} alt={title} aspectRatio={aspectRatio} />
        ) : (
          <div className="flex aspect-[1/1] items-center justify-center bg-publication" />
        )}
        <ul className="text-style-caption mt-5 flex flex-col group-hover:text-accent">
          <li className="italic">{title}</li>
          {(publisher || year) && (
            <li>
              {publisher}
              {publisher && year && ', '} {year}
            </li>
          )}
        </ul>
      </Link>
    </li>
  )
}

export function PublicationCardSingle({ publication }) {
  const { slug, image, title, year } = publication || {}

  return (
    <div className="flex h-full w-full flex-col md:flex-row md:gap-40">
      <Link href={paths.publication(slug)} className="h-full w-full md:w-[41.5%]">
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
        <Link
          href={paths.publication(slug)}
          className="text-style-title leading-10 hover:text-accent"
        >
          <ul className="my-5 leading-12 md:pr-[calc(25%_-_2.5rem)]">
            {title && <li>{title}</li>}
            {year && <li>{year}</li>}
          </ul>
        </Link>
      </div>
    </div>
  )
}
