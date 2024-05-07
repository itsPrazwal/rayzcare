import * as React from 'react'
import Script from 'next/script'

const SpotifyIframeContext = React.createContext({})

export const SpotifyIframeProvider = ({ children }) => {
  const [spotifyUri, setSpotifyUri] = React.useState({ type: '', id: '' })
  const [iFrameAPI, setIFrameAPI] = React.useState(null)
  const elementRef = React.useRef(null)

  React.useEffect(() => {
    window.onSpotifyIframeApiReady = IFrameAPI => {
      setIFrameAPI(IFrameAPI)
    }
  }, [])

  React.useEffect(() => {
    if (spotifyUri.type && spotifyUri.id && iFrameAPI && elementRef.current) {
      iFrameAPI.createController(
        elementRef.current,
        {
          height: 400,
          width: '100%',
          uri: `spotify:${spotifyUri.type}:${spotifyUri.id}`,
          loading: 'lazy'
        },
        EmbedController => {
          EmbedController.addListener('ready', () => {
            console.log('The Spotify playlist has initialized.')
          })
        }
      )
    }
  }, [spotifyUri.type, spotifyUri.id, iFrameAPI, elementRef.current])

  const setSpotifyUrl = url => {
    try {
      if (url && Boolean(new URL(url))) {
        const [_, type, id] = new URL(url)?.pathname?.split('/')
        if (type && id) {
          setSpotifyUri({ type, id })
        }
      } else {
        setSpotifyUri({ type: '', id: '' })
      }
    } catch (_) {
      console.error('PROVIDED INVALID URL: ')
    }
  }

  return (
    <SpotifyIframeContext.Provider value={{ setSpotifyUrl, elementRef }}>
      <Script src="https://open.spotify.com/embed/iframe-api/v1" async></Script>
      {children}
    </SpotifyIframeContext.Provider>
  )
}

export const useSpotifyIFrame = () => React.useContext(SpotifyIframeContext)
