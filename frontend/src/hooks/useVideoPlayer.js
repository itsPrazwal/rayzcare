import { useEffect, useState } from 'react'
import { useInViewport } from 'react-in-viewport'

const useVideoPlayer = (videoElement) => {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    isMuted: false
  })

  const { inViewport } = useInViewport(
    videoElement,
    {},
    {
      disconnectOnLeave: false
    }
  )

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying
    })
  }

  const play = () => {
    setPlayerState({
      ...playerState,
      isPlaying: true
    })
  }

  const pause = () => {
    setPlayerState({
      ...playerState,
      isPlaying: false
    })
  }

  useEffect(() => {
    if (playerState.isPlaying) {
      const playPromise = videoElement.current.play()
      playPromise
        .then(() => {
          // playing
        })
        .catch((error) => {
          setPlayerState({
            ...playerState,
            isMuted: true
          })
          videoElement.current.defaultMuted = true
          videoElement.current.muted = true
          videoElement.current.play()
        })
    } else {
      videoElement.current.pause()
    }
  }, [playerState, videoElement])

  const handleOnTimeUpdate = () => {
    const progress = (videoElement.current.currentTime / videoElement.current.duration) * 100
    setPlayerState({
      ...playerState,
      progress
    })
  }

  const handleVideoProgress = (event) => {
    const manualChange = Number(event.target.value)
    videoElement.current.currentTime = (videoElement.current.duration / 100) * manualChange
    setPlayerState({
      ...playerState,
      progress: manualChange
    })
  }

  const handleVideoSpeed = (event) => {
    const speed = Number(event.target.value)
    videoElement.current.playbackRate = speed
    setPlayerState({
      ...playerState,
      speed
    })
  }

  const toggleMute = () => {
    setPlayerState({
      ...playerState,
      isMuted: !playerState.isMuted
    })
  }

  const toggleFullscreen = () => {
    videoElement.current.webkitEnterFullscreen()
  }

  useEffect(() => {
    playerState.isMuted ? (videoElement.current.muted = true) : (videoElement.current.muted = false)
  }, [playerState, videoElement])

  useEffect(() => {
    if (!videoElement.current) {
      return
    }

    if (inViewport) {
      play()
    } else {
      pause()
    }
  }, [inViewport])

  return {
    playerState,
    togglePlay,
    play,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
    toggleFullscreen
  }
}

export default useVideoPlayer
