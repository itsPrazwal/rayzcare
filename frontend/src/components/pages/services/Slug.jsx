import Link from 'next/link'
import * as React from 'react'
import { useRouter } from 'next/router'
import { Element } from 'react-scroll'

import { Head } from '~/components/Head'
import { Hero } from '~/components/Hero'
import { Title } from '~/components/Title'
import { Layout } from '~/components/Layout'
import { RichText } from '~/components/RichText'
import { PageModules } from '~/components/PageModules'

import { paths } from '~/utils/paths'
import { Breadcrumb } from "~/components/Breadcrumb";

export function ServiceSlug({ service, globalMeta }) {
  const { query } = useRouter()

  const {
    title,
    hero,
    image,
    description,
    modules,
    meta,
    location,
    links: additionalLinks,
  } = service

  const breadCrumbs = [
    { label: 'Services', route: paths.services() },
    { label: title, route: paths.service(query?.slug) }
  ]

  return (
    <Layout breadCrumbs={breadCrumbs}>
      <Head global={globalMeta} pageTitle={title} meta={meta} />

      <div className="flex flex-col sm:gap-30 md:gap-40">
        <div>
          <Breadcrumb/>
          {hero?.modules && <Hero modules={hero?.modules} fallback={image}/>}
        </div>
        <div className="md:mx-80">
          <Title>{title}</Title>
          <div className="sm:mt-30 sm:gap-30 md:mt-40 md:grid md:grid-cols-12 md:gap-40">
            <div className="text-style-subtitle flex flex-col gap-4 sm:mb-20 md:col-span-4">
              <p>{location}</p>
              <br />
              {additionalLinks &&
                additionalLinks.map(link => (
                  <Link
                    key={link.label}
                    href={link.url}
                    className="text-style-link"
                    target={link.newTab ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </Link>
                ))}
              <br />
            </div>
            <div className="md:col-span-8">
              <Element name="biography" className="text-style-description">
                <RichText value={description} />
              </Element>
            </div>
          </div>
        </div>

        <PageModules
          modules={modules}
          classNames={{
            moduleSlider: 'lg:h-[85vh] flex items-center'
          }}
        />
      </div>
    </Layout>
  )
}
