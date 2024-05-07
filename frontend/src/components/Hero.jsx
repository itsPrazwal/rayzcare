import * as React from 'react'
import dynamic from 'next/dynamic'
import { twMerge } from 'tailwind-merge'
import { Carousel } from './Carousel'
import { SliderModules } from './SliderModules'
import { useMediaQuery } from 'react-responsive'
import { DEFAULT_IMAGE_RATIO } from '~/utils/constants'

const Figure = dynamic(() => import('~/modules/Image'))
const Video = dynamic(() => import('~/modules/Video'))

const responsiveImageProps = {
  imageWrapperClassName: '!flex',
  className: 'relative'
}

export function Hero({ modules, fallback, className }) {
  return modules?.length > 0 ? (
    modules?.length === 1 ? (
      <div
        className={twMerge(
          'hero flex w-full flex-col items-center gap-10 overflow-hidden md:flex-row md:gap-0',
          className
        )}
      >
        {modules.map(module => {
          if (module._type === 'moduleImage') {
            return (
              <Figure
                data={{ ...module, ratio: module.ratio || DEFAULT_IMAGE_RATIO }}
                key={module._key}
                responsiveImageProps={responsiveImageProps}
              />
            )
          }
          if (module._type === 'moduleVideo') {
            return <Video data={module} key={module._key} />
          }
        })}
      </div>
    ) : (
      <Carousel className="slider hero flex items-center" autoplay={true}>
        {modules?.map(module => (
          <React.Fragment key={module._key}>
            <SliderModules type={module._type} reactModule={module} />
          </React.Fragment>
        ))}
      </Carousel>
    )
  ) : (
    fallback && (
      <div
        className={twMerge(
          'hero flex w-full flex-col items-center overflow-hidden md:flex-row',
          className
        )}
      >
        <Figure data={{ image: fallback }} responsiveImageProps={responsiveImageProps} />
      </div>
    )
  )
}

export function HeroSlider({ modules, fallback, className }) {
  return modules?.length > 0 ? (
    modules?.length === 1 ? (
      <div
        className={twMerge(
          'hero flex w-full flex-col items-center gap-10 overflow-hidden md:flex-row md:gap-0',
          className
        )}
      >
        {modules.map(module => {
          if (module._type === 'moduleImage') {
            return (
              <Figure data={module} key={module._key} responsiveImageProps={responsiveImageProps} />
            )
          }
          if (module._type === 'moduleVideo') {
            return <Video data={module} key={module._key} />
          }
        })}
      </div>
    ) : (
      <Carousel className="slider" autoplay={true}>
        {modules?.map(module => (
          <React.Fragment key={module._key}>
            <SliderModules type={module._type} reactModule={module} />
          </React.Fragment>
        ))}
      </Carousel>
    )
  ) : (
    fallback && (
      <div
        className={twMerge(
          'hero flex w-full flex-col items-center overflow-hidden md:flex-row',
          className
        )}
      >
        <Figure data={{ image: fallback }} responsiveImageProps={responsiveImageProps} />
      </div>
    )
  )
}
