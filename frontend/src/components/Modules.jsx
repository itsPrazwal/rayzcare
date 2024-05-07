import dynamic from 'next/dynamic'

const Text = dynamic(() => import('~/modules/Text'))
const Figure = dynamic(() => import('~/modules/Image'))
const Video = dynamic(() => import('~/modules/Video'))
const Media = dynamic(() => import('~/modules/Media'))

export function Modules({ type, reactModule }) {
  switch (type) {
    case 'moduleText':
      return <Text data={reactModule} />
    case 'moduleImage':
      return <Figure data={reactModule} />
    case 'moduleVideo':
      return <Video data={reactModule} />
    case 'moduleSlider':
      return <Media data={reactModule} />
    default:
      throw new Error(`Unknown module type: ${type}`)
  }
}
