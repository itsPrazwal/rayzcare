import Link from 'next/link'
import * as React from 'react'
import { useMediaQuery } from 'react-responsive'

import { RichText } from '~/components/RichText'
import { ResponsiveImage } from '~/components/ResponsiveImage'

import { paths } from '~/utils/paths'
import { limitBlockText } from '~/utils/limitBlockText'

const TEXT_LIMIT = 578

export function ServiceCard({ service, servicesLength }) {
  const { title, slug, image, location } = service || {}
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' })

  const aspectRatio = !isMobile && servicesLength < 3 ? 16 / 9 : 1 / 1

  return (
    <li className="group">
      <Link href={paths.service(slug)}>
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
        <ul className="text-style-caption mt-5 group-hover:text-accent">
          {title && <li className="italic">{title}</li>}
          {location && <li>{location}</li>}
        </ul>
      </Link>
    </li>
  )
}

export function ServiceCardSingle({ service }) {
  const { title, slug, image, location, description } =
    service || {}

  return (
    <div className="flex h-full w-full flex-col md:flex-row md:gap-40">
      <Link href={paths.service(slug)} className="h-full w-full md:w-[41.5%]">
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
              <Link href={paths.service(slug)}>{title}</Link>
            </li>
          )}
          {location && (
            <li className="text-style-subtitle my-10 md:my-20">
              {location}
            </li>
          )}
          {description && (
            <li>
              <span className="text-style-description">
                <RichText value={limitBlockText(description, TEXT_LIMIT)} />
              </span>
              <span className="text-style-subtitle leading-[1.5rem] hover:text-accent">
                <Link href={paths.service(slug)}>Read More</Link>
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
