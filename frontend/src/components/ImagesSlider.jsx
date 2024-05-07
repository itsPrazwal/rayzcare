import clsx from 'clsx'
import * as React from 'react'
import { twMerge } from 'tailwind-merge'

import { ResponsiveImage } from '~/components/ResponsiveImage'

export function ImagesSlider({ images, containerClass }) {
  const [activeImageIndex, setActiveImageIndex] = React.useState(0)
  const refs = images?.map(() => React.createRef()) || []

  const nextActive = React.useMemo(
    () => activeImageIndex < images?.length - 1,
    [activeImageIndex, images?.length]
  )

  const previousActive = React.useMemo(() => activeImageIndex > 0, [activeImageIndex])

  const handleAction = action => e => {
    e.preventDefault()
    if ((action === 'NEXT' && nextActive) || (action === 'PREVIOUS' && previousActive)) {
      const updatedIndex = action === 'NEXT' ? activeImageIndex + 1 : activeImageIndex - 1
      refs[updatedIndex]?.current?.scrollIntoView({
        behavior: 'smooth',
        inline: 'nearest',
        block: 'nearest'
      })
      setActiveImageIndex(updatedIndex)
    }
  }

  return (
    <div className="h-full w-full">
      <div
        className={twMerge(
          'mt-32 flex h-[10rem] select-none justify-between gap-32',
          containerClass
        )}
      >
        <div
          className={clsx('flex h-full cursor-pointer items-center justify-center', {
            '!cursor-not-allowed': !previousActive
          })}
          onClick={handleAction('PREVIOUS')}
        >
          <svg
            width="14"
            height="25"
            viewBox="0 0 14 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.0103 24.6196L1.00003 12.6094L13.0103 0.599178"
              stroke={previousActive ? '#1946AD' : '#aaaaaa'}
            />
          </svg>
        </div>
        <div className="flex h-full gap-32 overflow-auto">
          {images?.map((img, ind) => (
            <div ref={refs[ind]} key={img?.asset?._ref + ind} className="h-full">
              <ResponsiveImage
                src={img}
                widthMobile={300}
                widthDesktop={500}
                containerClassName="h-full"
              />
            </div>
          ))}
        </div>
        <div
          className={clsx('flex h-full cursor-pointer items-center justify-center', {
            '!cursor-not-allowed': !nextActive
          })}
          onClick={handleAction('NEXT')}
        >
          <svg
            width="14"
            height="25"
            viewBox="0 0 14 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.01025 0.599121L13.0205 12.6093L1.01025 24.6196"
              stroke={nextActive ? '#1946AD' : '#aaaaaa'}
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
