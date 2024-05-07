import clsx from 'clsx'
import { ResponsiveImage } from '~/components/ResponsiveImage'
import * as React from 'react'

export function ImageViewer({ images, fallbackImage }) {
  const [activeImageIndex, setActiveImageIndex] = React.useState(0)

  const fallBackPreventedImages = React.useMemo(
    () => (images?.length > 0 ? images : [fallbackImage]),
    [images, fallbackImage]
  )

  const refs = fallBackPreventedImages?.map(() => React.createRef()) || []

  const nextActive = React.useMemo(
    () => activeImageIndex < fallBackPreventedImages?.length - 1,
    [activeImageIndex, fallBackPreventedImages?.length]
  )

  const previousActive = React.useMemo(() => activeImageIndex > 0, [activeImageIndex])

  const handleAction = action => e => {
    e.preventDefault()
    if ((action === 'NEXT' && nextActive) || (action === 'PREVIOUS' && previousActive)) {
      const updatedIndex = action === 'NEXT' ? activeImageIndex + 1 : activeImageIndex - 1
      refs[updatedIndex]?.current?.scrollIntoView({
        behavior: 'smooth',
        inline: 'nearest',
        block: 'end'
      })
      setActiveImageIndex(updatedIndex)
    }
  }

  const handleImageSelection = ind => e => {
    e.preventDefault()
    setActiveImageIndex(ind)
    refs[ind]?.current?.scrollIntoView({
      behavior: 'smooth',
      inline: 'nearest',
      block: 'end'
    })
  }

  return (
    <div className="h-full w-full">
      <div className="flex h-[calc(100%_-_7rem)] w-full items-center justify-center overflow-hidden">
        <ResponsiveImage
          src={fallBackPreventedImages?.[activeImageIndex]}
          widthMobile={300}
          containerClassName="h-full"
          className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="mt-32 flex h-[5rem] select-none justify-between gap-16">
        <div
          className={clsx('flex h-full cursor-pointer items-center justify-center', {
            'cursor-not-allowed': !previousActive
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
        <div className="flex h-full gap-10 overflow-auto">
          {fallBackPreventedImages?.map((img, ind) => (
            <div
              ref={refs[ind]}
              key={img?.asset?._ref + ind}
              className={clsx('h-full cursor-pointer hover:border-2 hover:border-accent', {
                'border-2 border-accent': ind === activeImageIndex
              })}
              onClick={handleImageSelection(ind)}
            >
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
            'cursor-not-allowed': !nextActive
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
