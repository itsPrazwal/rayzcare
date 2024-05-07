import Information from '~/modules/Information'
import Text from '~/modules/Text'
import Image from '~/modules/Image'
import Video from '~/modules/Video'
import Slider from '~/modules/Slider'
import Quote from '~/modules/Quote'
import Subgroup from '~/modules/Subgroup'
// import Founders from '~/modules/Founders'

export function PageModules({ modules, classNames = {} }) {
  const moduleMap = {
    moduleInfo: Information,
    moduleText: Text,
    moduleQuote: Quote,
    moduleImage: Image,
    moduleVideo: Video,
    moduleSlider: Slider,
    moduleSubgroup: Subgroup,
    // moduleFounders: Founders
  }

  return (
    modules?.length > 0 &&
    modules.map(module =>
      moduleMap[module._type]
        ? moduleMap[module._type]({
            key: module._key,
            data: module,
            className: classNames[module._type] || ''
          })
        : null
    )
  )
}
