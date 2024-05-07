import { Image as UnpicImage } from '@unpic/react'
import { blurhashToCssGradientString } from '@unpic/placeholder'
import { urlFor } from '~/lib/sanity'
import { twMerge } from 'tailwind-merge'

/*
 * We use the @unpic/react to render images from Sanity
 * We also use the @unpic/placeholder to generate a placeholder based on blurHash
 * Image props are passed to the UnpicImage component
 *
 * https://github.com/ascorbic/unpic-img
 * https://github.com/ascorbic/unpic-placeholder
 */

export function Image({ src, aspectRatio, background = null, className, ...props }) {
  if (!src || !(src?.assets?._ref || src?.asset?._ref)) return

  const placeholderGradient =
    src.blurHash && src.blurHash.length >= 6 ? blurhashToCssGradientString(src.blurHash || '') : ''
  const placeholderUrl = urlFor(src).width(150).blur(70).quality(100).url()
  // const placeholderImage = blurhashToImageCssObject(src.blurHash)

  return (
    <UnpicImage
      {...props}
      aspectRatio={aspectRatio || src.dimensions.aspectRatio}
      src={urlFor(src)}
      background={
        background !== null
          ? background === 'url'
            ? placeholderUrl
            : background === false
            ? null
            : background
          : placeholderGradient
      }
      className={twMerge('text-transparent', className)}
    />
  )
}
