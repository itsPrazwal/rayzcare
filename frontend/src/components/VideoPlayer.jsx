import { useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { useMediaQuery } from 'react-responsive'
import clsx from 'clsx'
import clamp from 'lodash/clamp'
import useVideoPlayer from '~/hooks/useVideoPlayer'
import Hls from 'hls.js'

export function VideoPlayer({ video, className, containerClassName, playInView, ...props }) {
  const videoElement = useRef(null)
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' })

  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    // handleVideoSpeed,
    toggleMute,
    toggleFullscreen
  } = useVideoPlayer(videoElement)

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
      const defaultOptions = {}
      video.defaultMuted = playerState.isMuted
      video.muted = playerState.isMuted
      if (!isMobile && video.canPlayType('application/vnd.apple.mpegurl')) {
        // This will run in safari, where HLS is supported natively
        video.src = hlsFile.link
      } else if (!isMobile && Hls.isSupported()) {
        // This will run in all other modern browsers

        const hls = new Hls({ minAutoBitrate: 1700000, startLevel: -1 })
        hls.loadSource(hlsFile.link)
        hls.attachMedia(video)
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          play()
        })
      } else {
        console.error(
          'This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API'
        )
        video.addEventListener('canplay', (event) => {
          play()
        })
      }
    }, [video, videoSrc, hlsFile.link, isMobile])

  return (
    <div className={twMerge('video-wrapper', containerClassName)}>
      <div className="w-full">
        <video
          src={videoSrc}
          poster={videoPoster}
          ref={videoElement}
          className={className}
          onTimeUpdate={handleOnTimeUpdate}
          onClick={togglePlay}
        />
        {!playerState.isPlaying && (
          <span className="text-style-title z-1 pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white mix-blend-difference">
            {'Play'}
          </span>
        )}
        <div className="video-controls-container pointer-events-none absolute inset-0 flex flex-col">
          <div className="flex-1"></div>
          <div
            className={clsx('controls text-style-caption pointer-events-auto uppercase', {
              active: playerState.isPlaying
            })}
          >
            <div className="actions">
              <div className="cursor-pointer" onClick={togglePlay}>
                {!playerState.isPlaying ? <span>{'Play'}</span> : <span>{'Pause'}</span>}
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={playerState.progress || 0}
              className="cursor-pointer"
              onChange={e => handleVideoProgress(e)}
            />
            {/*
              <select className="velocity" value={playerState.speed} onChange={e => handleVideoSpeed(e)}>
                <option value="0.50">0.50x</option>
                <option value="1">1x</option>
                <option value="1.25">1.25x</option>
                <option value="2">2x</option>
              </select>
            */}
            <div className="mute-btn cursor-pointer" onClick={toggleMute}>
              {!playerState.isMuted ? <span>{'Mute'}</span> : <span>{'Unmute'}</span>}
            </div>
            <div className="cursor-pointer" onClick={toggleFullscreen}>
              {'Fullscreen'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
