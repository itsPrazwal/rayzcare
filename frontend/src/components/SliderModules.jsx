import * as React from 'react'
import dynamic from 'next/dynamic'

const HomeModuleImage = dynamic(() => import('~/modules/home/Image'))
const HomeModuleVideo = dynamic(() => import('~/modules/home/Video'))
const Figure = dynamic(() => import('~/modules/Image'))
const Video = dynamic(() => import('~/modules/Video'))

export function SliderModules({ type, reactModule }) {
  switch (type) {
    case 'moduleSliderImage':
      return <HomeModuleImage data={reactModule} />
    case 'moduleSliderVideo':
      return <HomeModuleVideo data={reactModule} />
    case 'moduleImage':
      return <Figure data={reactModule} />
    case 'moduleVideo':
      return <Video data={reactModule} />
    default:
      throw new Error(`Unknown module type: ${type}`)
  }
}
