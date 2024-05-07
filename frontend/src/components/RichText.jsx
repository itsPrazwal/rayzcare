import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { toPath } from '~/utils/toPath'
// import { getImageDimensions } from '@sanity/asset-utils'
import { ResponsiveImage } from '~/components/ResponsiveImage'
import { VideoPlayer } from '~/components/VideoPlayer'

const PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="min-h-[1rem] [&>strong]:font-semibold">{children}</p>,
    h2: ({ children }) => <h2 className="text-style-title mb-12 mt-8 min-h-[1rem]">{children}</h2>,
    h4: ({ children }) => (
      <h4 className="text-style-subtitle mb-12 mt-8 min-h-[1rem]">{children}</h4>
    )
  },
  types: {
    figure: ({ value }) => {
      return (
        <div className="flex w-full flex-col [&:not(:last-child)]:mb-20">
          <ResponsiveImage src={value} alt={value.caption || ''} />
        </div>
      )
    },
    figureVideo: ({ value }) => {
      return (
        <div className="flex w-full flex-col [&:not(:last-child)]:mb-20">
          <VideoPlayer video={value} />
        </div>
      )
    }
  },

  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a href={value.href} rel={rel}>
          {children}
        </a>
      )
    },
    annotationLinkExternal: ({ children, value }) => {
      return (
        <a
          href={value.url}
          target="_blank"
          rel="noreferrer noopener"
          className="underline underline-offset-text hover:no-underline"
        >
          {children}
        </a>
      )
    },
    annotationLinkInternal: ({ children, value }) => {
      const { dataType, slug } = value
      return (
        <Link
          href={toPath(dataType, slug) ?? ''}
          className="underline underline-offset-text hover:no-underline"
        >
          {children}
        </Link>
      )
    }
  }
}

export function RichText({ value }) {
  return <PortableText value={value} components={PortableTextComponents} />
}
