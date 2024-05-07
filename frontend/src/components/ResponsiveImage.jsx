import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useMediaQuery } from 'react-responsive'
import { urlFor } from '~/lib/sanity'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'

export function ResponsiveImage({
  src,
  aspectRatio,
  placeholder = true,
  widthDesktop,
  widthMobile,
  quality,
  // blurAmount,
  sizes,
  alt,
  visibleByDefault,
  containerClassName,
  className,
  imageWrapperClassName
}) {
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' })

  // const placeholderGradient = blurhashToCssGradientString(src?.blurHash)
  // const placeholderUrl = urlFor(src).width(150).blur(70).quality(100).url()
  // const placeholderImage = blurhashToImageCssObject(src?.blurHash)
  const deviceSizes = {
    desktop: [180, 320, 640, 750, 828, 1080, 1200, 1920, 2400],
    mobile: [180, 320, 640, 750, 828, 1080]
  }

  const imageRatio = aspectRatio ? aspectRatio : src?.dimensions?.aspectRatio

  const crop = width => {
    const url = urlFor(src)
    return !!url
      ? url
          .width(width || deviceSizes.desktop[0])
          .height(Math.floor((width || deviceSizes.desktop[0]) / aspectRatio))
          .quality(quality || 100)
          .fit('crop')
          // .crop('entropy')
          .auto('format')
      : null
  }

  const thumb = width => {
    const url = urlFor(src)
    return !!url
      ? url
          .width(width || deviceSizes.desktop[0])
          .quality(quality || 100)
          .auto('format')
      : null
  }

  const placeholderUrl = (width = 100) => {
    return src?.lqip
    // if (aspectRatio) {
    //   return crop(width)
    //     .blur(blurAmount || 10)
    //     ?.url()
    // } else {
    //   return thumb(width)
    //     .blur(blurAmount || 10)
    //     .url()
    // }
  }

  // Get src
  const srcAttribute = aspectRatio
    ? crop((isMobile ? widthMobile : widthDesktop) || deviceSizes.desktop[0])?.url()
    : thumb((isMobile ? widthMobile : widthDesktop) || deviceSizes.desktop[0])?.url()

  // Get srcset
  let srcSetAttribute
  if ((!isMobile && widthDesktop != null) || (isMobile && widthMobile != null)) {
    srcSetAttribute = null
  } else {
    srcSetAttribute = (isMobile ? deviceSizes.mobile : deviceSizes.desktop)
      .map(s => (aspectRatio ? `${crop(s)?.url()} ${s}w` : `${thumb(s)?.url()} ${s}w`))
      .join(', ')
  }

  return (
    <div
      style={{ aspectRatio: imageRatio }}
      className={twMerge(
        clsx('responsive-image animate-opacity relative overflow-hidden text-transparent', {
          preload: visibleByDefault
        }),
        containerClassName
      )}
    >
      <LazyLoadImage
        className={twMerge('lazy-image absolute inset-0 w-full', className)}
        alt={alt || ''}
        effect="opacity"
        src={srcAttribute || ''}
        srcSet={srcSetAttribute}
        sizes={sizes}
        threshold={1000}
        placeholderSrc={placeholderUrl()}
        visibleByDefault={visibleByDefault}
        wrapperClassName={twMerge('!block', imageWrapperClassName)}
      />
      {placeholder && (
        <img
          src={placeholderUrl()}
          className="placeholder scale-103 pointer-events-none absolute z-[3] h-full object-cover blur-[0.5rem]"
          alt=""
        />
      )}
    </div>
  )
}
