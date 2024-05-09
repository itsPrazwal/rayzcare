import * as React from 'react'
import Div100vh from 'react-div-100vh'
import {Carousel} from '~/components/Carousel'
import {SliderModules} from '~/components/SliderModules'
import {getGlobalMeta} from '~/queries/settings'
import {Head} from '~/components/Head'
import {Layout} from '~/components/Layout'
import {getHomepage} from '~/queries/home'

export default function HomePage({globalMeta, home}) {
  const {modules} = home || {}

  return (
    <Layout>
      <Head global={globalMeta}/>
      <Div100vh>
        <Carousel
          className="slider home fade fixed inset-0 z-0 h-full"
          autoplay={true}
        >
          {modules?.map(module => (
            <React.Fragment key={module._key}>
              <SliderModules type={module._type} reactModule={module}/>
            </React.Fragment>
          ))}
        </Carousel>
      </Div100vh>
    </Layout>
  )
}

export async function getStaticProps({locale, defaultLocale}) {
  const [globalMeta, home] = await Promise.all([
    getGlobalMeta(),
    getHomepage({locale, defaultLocale})
  ])

  return {
    props: {
      globalMeta,
      home
    }
  }
}
