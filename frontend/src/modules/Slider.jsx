import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import { Carousel } from '~/components/Carousel'
import { SliderModules } from '~/components/SliderModules'

export default function ModuleSlider({ data, key, className = '' }) {
  const { medias } = data

  if (!medias.length) return null

  return (
    <Carousel className={twMerge('slider page', className)} autoplay={true} key={key}>
      {medias?.map(module => (
        <React.Fragment key={module._key}>
          <SliderModules type={module._type} reactModule={module} />
        </React.Fragment>
      ))}
    </Carousel>
  )
}
