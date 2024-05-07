import { useRouter } from 'next/router'
import { GoogleAnalytics } from 'nextjs-google-analytics'
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'
import '~/styles/globals.scss'
import '~/styles/embla.scss'
import '~/styles/video-player.css'
import { Footer } from '~/components/Footer'
import { SpotifyIframeProvider } from '~/lib/context/spotifyIframe'
import { SanityLivePreviewProvider, sanityPreviewEnabled } from '~/lib/sanity'
import { display, displaySC, condensed, chinese, displayInfant, displayLocal } from '~/lib/font'

export default function App({Component, pageProps}) {
  const router = useRouter()

  return (
    <>
      <style jsx global>{`
        :root {
          --display: ${display.style.fontFamily};
          --display-local: ${displayLocal.style.fontFamily};
          --display-sc: ${displaySC.style.fontFamily};
          --display-infant: ${displayInfant.style.fontFamily};
          --condensed: ${condensed.style.fontFamily};
          --chinese: ${chinese.style.fontFamily};
        }
      `}</style>

      <LazyMotion strict features={domAnimation}>
        <MotionConfig reducedMotion="user">
          <GoogleAnalytics trackPageViews/>
          <SpotifyIframeProvider>
            {sanityPreviewEnabled ? (
              <SanityLivePreviewProvider>
                <Component {...pageProps} key={router.asPath}/>
              </SanityLivePreviewProvider>
            ) : (
              <Component {...pageProps} key={router.asPath}/>
            )}
          </SpotifyIframeProvider>
          <Footer/>
        </MotionConfig>
      </LazyMotion>
    </>
  )
}
