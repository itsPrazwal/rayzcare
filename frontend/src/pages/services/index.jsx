import * as React from 'react'
import { getGlobalMeta } from '~/queries/settings'
import { Head } from '~/components/Head'
import { Layout } from '~/components/Layout'
import { Title } from '~/components/Title'
import { HeroSlider } from '~/components/Hero'
import { getServicePage, getServices } from '~/queries/services'
import { ServiceCard, ServiceCardSingle } from '~/components/ServiceCard'
import { Breadcrumb } from "~/components/Breadcrumb";

export default function ServicePage({
                                      globalMeta,
                                      servicePage,
                                      services
                                    }) {

  const {hero, meta, image} = servicePage || {}

  return (
    <Layout>
      <Head global={globalMeta} meta={meta}/>
      <div className="h-full w-full">
        {(hero || image) && <HeroSlider modules={hero?.modules} fallback={image}/>}
        <div className="flex flex-col gap-30">
          <div>
            <Breadcrumb/>
          </div>
          <div className={services.length === 1 ? 'md:flex md:flex-row' : ''}>
            {services.length === 1 ? (
              <ServiceCardSingle service={services[0]}/>
            ) : (
              <ul className="grid-items" data-count={services.length}>
                {services.map(service => (
                  <ServiceCard
                    key={service._id}
                    service={service}
                    servicesLength={services.length}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({locale, defaultLocale}) {
  const [globalMeta, servicePage, services] = await Promise.all([
    getGlobalMeta(),
    getServicePage({locale, defaultLocale}),
    getServices({locale, defaultLocale}),
  ])

  return {
    props: {
      globalMeta,
      servicePage,
      services,
    }
  }
}
