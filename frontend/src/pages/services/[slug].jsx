import * as React from 'react'
import { SERVICE_BY_SLUG, getServiceBySlug, getServicePaths } from '~/queries/services'
import { getGlobalMeta } from '~/queries/settings'
import { ServiceSlug } from '~/components/pages/services/Slug'
import { useLiveQuery } from '@sanity/preview-kit'
import { sanityPreviewEnabled } from '~/lib/sanity'
import { getInquireForm } from '~/queries/inquireForm'

function ServiceSlugPageLive({
                               globalMeta,
                               service: orgServices,
                               queryParams,
                               inquireForm
                             }) {
  const [service] = useLiveQuery(orgServices, SERVICE_BY_SLUG, queryParams)

  return (
    <ServiceSlug service={service} globalMeta={globalMeta} inquireForm={inquireForm}/>
  )
}

export default function ServiceSlugPage(props) {
  return sanityPreviewEnabled ? (
    <ServiceSlugPageLive {...props} />
  ) : (
    <ServiceSlug
      service={props.service}
      globalMeta={props.globalMeta}
      inquireForm={props.inquireForm}
    />
  )
}

export async function getStaticProps({params, locale, defaultLocale}) {
  const queryParams = {slug: params.slug, locale, defaultLocale}

  const [globalMeta, service, inquireForm] = await Promise.all([
    getGlobalMeta({locale, defaultLocale}),
    getServiceBySlug(queryParams),
    getInquireForm({ locale, defaultLocale })
  ])

  return {
    props: {
      globalMeta,
      service,
      queryParams,
      inquireForm
    }
  }
}

export async function getStaticPaths({locales}) {
  const data = await getServicePaths()

  const paths = []

  data.map(slug => {
    return locales.map(locale => {
      return paths.push({
        params: {slug},
        locale
      })
    })
  })

  return {
    paths,
    fallback: false
  }
}
