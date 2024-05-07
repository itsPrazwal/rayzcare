import Image from '~/modules/chronology/Image'
import Video from '~/modules/Video'
import Quote from '~/modules/chronology/Quote'
import Text from '~/modules/chronology/Text'
// import Information from '~/modules/Information'
// import Slider from '~/modules/Slider'
// import Subgroup from '~/modules/Subgroup'
// import Founders from '~/modules/Founders'

export function ChronologyModules({ modules }) {
  const moduleMap = {
    // moduleInfo: Information,
    moduleText: Text,
    moduleQuote: Quote,
    moduleChronologyImage: Image,
    moduleChronologyVideo: Video
    // moduleSlider: Slider,
    // moduleSubgroup: Subgroup,
    // moduleFounders: Founders
  }

  return (
    modules?.length > 0 &&
    modules.map(module =>
      moduleMap[module._type]
        ? moduleMap[module._type]({
            key: module._key,
            data: module
          })
        : null
    )
  )
}
