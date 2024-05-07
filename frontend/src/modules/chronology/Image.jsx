import { RichText } from '~/components/RichText'
import { ResponsiveImage } from '~/components/ResponsiveImage'
import { toRatio } from '~/utils/toRatio'
import { ToggleIcon } from '~/components/Icons'
import { useEffect, useState } from 'react'
import { PageModules } from '~/components/PageModules'
import { formatFraction } from "~/utils/formatFraction";

export default function ModuleChronologyImage({ data, key }) {
  const { image, ratio } = data

  const [isOpen, setIsOpen] = useState(false)

  const onToggle = () => {
    setIsOpen(!isOpen)
  }

  const moduleCaption = data.caption ? data.caption : null

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    image && (
      <div className="flex w-full flex-col" key={key}>
        <div className="relative">
          <ResponsiveImage src={image} alt={image?.caption || ''} aspectRatio={toRatio(ratio)} />
          {data.modules?.length > 0 && (
            <div
              className="border-1 absolute right-5 top-5 z-10 cursor-pointer rounded-full border fill-white p-[0.3rem] text-white"
              onClick={onToggle}
            >
              <ToggleIcon className="block w-[0.6rem]" />
            </div>
          )}
        </div>
        {(image.caption || image.copyright) && (
          <div className="text-style-caption mt-4">
            {image.caption && <div className="font-display-local">{formatFraction(image.caption)}</div>}
            {image.copyright && <div>{image.copyright}</div>}
          </div>
        )}
        {moduleCaption && (
          <div className="text-style-caption mt-4">
            <RichText value={moduleCaption} />
          </div>
        )}
        {data.modules?.length > 0 && isOpen && (
          <div className="fixed inset-0 z-[200] flex flex-col gap-30 overflow-y-scroll bg-white px-20 pb-60 pt-60 md:px-200 md:pt-20">
            <div className="fixed right-10 top-10 z-10 cursor-pointer" onClick={onToggle}>
              <ToggleIcon className="fixed right-20 top-20 z-30 w-[1.3rem] rotate-45 text-black md:top-[1.13rem] md:w-[1.6rem]" />
            </div>
            <PageModules modules={data.modules} />
          </div>
        )}
      </div>
    )
  )
}
