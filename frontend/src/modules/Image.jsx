import { RichText } from '~/components/RichText'
import { ResponsiveImage } from '~/components/ResponsiveImage'
import { toRatio } from '~/utils/toRatio'

export default function ModuleImage({ data, key, responsiveImageProps }) {
  const { image, ratio } = data

  const moduleCaption = data.caption ? data.caption : null

  return (
    image && (
      <div className="flex w-full flex-col h-full" key={key}>
        <ResponsiveImage src={image} alt={image?.caption || ''} aspectRatio={toRatio(ratio)} {...responsiveImageProps} />
        {(image.caption || image.copyright) && (
          <div className="text-style-caption mt-4">
            {image.caption && <span>{image.caption}</span>}
            {image.copyright && <span>{image.copyright}</span>}
          </div>
        )}
        {moduleCaption && (
          <div className="text-style-caption mt-4 font-display-local">
            <RichText value={moduleCaption} />
          </div>
        )}
      </div>
    )
  )
}
