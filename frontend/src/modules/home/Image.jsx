import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

import { RichText } from '~/components/RichText'
import { ResponsiveImage } from '~/components/ResponsiveImage'

import { toPath } from '~/utils/toPath'

const useMediaQueryPortrait = () => {
  const [targetReached, setTargetReached] = useState(false)

  const updateTarget = useCallback(e => {
    setTargetReached(e.matches)
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(orientation: portrait)')
    media.addEventListener('*', updateTarget)

    if (media.matches) {
      setTargetReached(true)
    }

    return () => media.removeEventListener('*', updateTarget)
  }, [])

  return targetReached
}

export default function HomeModuleImage({ data }) {
  const isPortrait = useMediaQueryPortrait()

  const { image, imagePortrait, color, caption, linkInternal, linkExternal, ratio } = data
  const srcImage = image || linkInternal?.image

  return (
    <div className="absolute h-full w-full">
      <div className="relative h-full p-20 pt-0">
        <div className="relative h-full w-full">
          {(srcImage || (isPortrait && imagePortrait)) && (
            <ResponsiveImage
              src={isPortrait && imagePortrait ? imagePortrait : srcImage}
              alt={srcImage.caption || ''}
              sizes={ratio && '100vw'}
              containerClassName="h-full w-full"
              className="h-full w-full object-cover"
              aspectRatio={isPortrait && imagePortrait ? 0.574 : ratio || 2.2}
              visibleByDefault={true}
            />
          )}
          {caption && (
            <h3
              className="text-style-condensed_title bg-black/25 absolute inset-x-0 bottom-0 z-10 flex flex-wrap justify-center gap-x-10 p-20 text-center"
              style={{ color: color?.hex || image.paletteDominant.title }}
            >
              <RichText value={caption} />
            </h3>
          )}
          {linkInternal ? (
            <Link
              href={toPath(linkInternal._type, linkInternal.slug?.current)}
              className="absolute inset-0 z-30"
            />
          ) : (
            linkExternal && (
              <a
                href={linkExternal}
                className="absolute inset-0 z-30"
                target="_blank"
                rel="noopener"
              />
            )
          )}
        </div>
      </div>
    </div>
  )
}
