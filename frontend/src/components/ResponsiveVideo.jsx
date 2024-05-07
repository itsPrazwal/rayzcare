import { useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { useMediaQuery } from 'react-responsive'
import clsx from 'clsx'
import clamp from 'lodash/clamp'
import useVideoPlayer from '~/hooks/useVideoPlayer'

export function ResponsiveVideo({
  video,
  autoplay = true,
  muted = true,
  className,
  containerClassName,
  ...props
}) {
  const videoElement = useRef(null)
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' })
  const { playerState } = useVideoPlayer(videoElement)

  const mainThumbUrl = video.vimeo.pictures.length
    ? video.vimeo.pictures[1].link.replace('?r=pad', '').split('_').splice(0, 1)
    : null

  const thumbLowRes = mainThumbUrl ? mainThumbUrl + '?mw=600&q=80' : null
  const thumbHighRes = mainThumbUrl ? mainThumbUrl + '?mw=1600&q=80' : null
  const videoPoster = isMobile ? thumbLowRes : thumbHighRes

  const srcSet = [...video.vimeo.srcset].sort((a, b) => {
    return a.width - b.width
  })

  const hdFiles = srcSet.filter(el => el.quality === 'hd')
  const sdFiles = srcSet.filter(el => el.quality === 'sd')
  const hlsFile = srcSet.find(el => el.quality === 'hls')

  const videoSrc = isMobile
    ? sdFiles[sdFiles.length - 1].link
    : hdFiles[clamp(hdFiles.length - 2, 0, hdFiles.length - 1)].link

  useEffect(() => {
    const video = videoElement.current
    if (!video) return
    video.muted = true
    video.play()
  }, [videoElement])

  return (
    <div className={twMerge('responsive-video video-wrapper', containerClassName)}>
      <video
        ref={videoElement}
        className={className}
        src={videoSrc}
        playsInline
        autoPlay={autoplay}
        muted={muted}
        poster={videoPoster}
      />
    </div>
  )
}
