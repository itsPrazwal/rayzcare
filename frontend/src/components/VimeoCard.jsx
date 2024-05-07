import * as React from 'react'
import Link from 'next/link'
import { ResponsiveImage } from '~/components/ResponsiveImage'
import { paths } from '~/utils/paths'
import { VideoPlayer } from '~/components/VideoPlayer'

export function VimeoCard({ vimeo }) {
  const { _id, title } = vimeo
  const dialog = React.useRef(null)
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const mainThumbUrl = vimeo.vimeo.pictures.length
    ? vimeo.vimeo.pictures[1].link.replace('?r=pad', '').split('_').splice(0, 1)
    : null

  const thumbLowRes = mainThumbUrl ? mainThumbUrl + '?mw=600&q=80' : null
  const thumbHighRes = mainThumbUrl ? mainThumbUrl + '?mw=1600&q=80' : null

  const onClick = () => {
    setDialogOpen(true)
  }

  const onDialogClick = e => {
    const dialog = e.currentTarget
    const dialogDimensions = dialog.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialog.close()
    }
  }

  const onDialogClose = () => {
    setDialogOpen(false)
  }

  React.useEffect(() => {
    if (dialogOpen) dialog?.current?.showModal()
  }, [dialog, dialogOpen])

  return (
    <li className="relative cursor-pointer" onClick={onClick}>
      {thumbLowRes ? (
        <div className="flex aspect-[1/1] items-center justify-center">
          <img src={thumbLowRes} className="h-full w-full object-cover" />
        </div>
      ) : (
        <div className="flex aspect-[1/1] items-center justify-center" />
      )}
      <ul className="text-style-caption mt-5 leading-12 text-accent">
        {title && <li className="italic tracking-normal">{title.replaceAll(' x ', ' × ')}</li>}
      </ul>
      {dialogOpen && (
        <dialog
          ref={dialog}
          onClick={onDialogClick}
          onClose={onDialogClose}
          className="overflow-hidden p-10 pb-0"
        >
          <div className="w-[80vw] overflow-hidden md:w-[70vw]">
            <VideoPlayer video={vimeo} />
          </div>
        </dialog>
      )}
    </li>
  )
}
