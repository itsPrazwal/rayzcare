import * as React from 'react'
import { getGlobalMeta } from '~/queries/settings'
import {
  getExhibitionType,
  getExhibitionsByType,
  getExhibitionTypePaths
} from '~/queries/exhibitions'
import { Head } from '~/components/Head'
import { Layout } from '~/components/Layout'
import { Title } from '~/components/Title'
import { ServiceCard } from '~/components/ServiceCard'

export default function ExhibitionTypePage({ globalMeta, exhibitionType, exhibitions }) {
  const { title } = exhibitionType

  return (
    <Layout>
      <Head global={globalMeta} pageTitle={`Exhibitions (${title})`} />

      <div className="mt-[--breadcrumb-height] flex flex-col gap-30 p-20">
        <div className="grid gap-20 md:grid-cols-2">
          <Title className="md:whitespace-nowrap">
            Exhibitions <span className="text-accent">{title}</span>
          </Title>
        </div>

        {exhibitions?.length > 0 && (
          <div>
            <ul className="grid-items">
              {exhibitions.map(exhibition => (
                <ServiceCard key={exhibition._id} exhibition={exhibition} exhibitionsLength={exhibitions.length} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params, locale, defaultLocale }) {
  const [globalMeta, exhibitionType, exhibitions] = await Promise.all([
    getGlobalMeta(),
    getExhibitionType({ slug: params.slug, locale, defaultLocale }),
    getExhibitionsByType({ slug: params.slug, locale, defaultLocale })
  ])

  return {
    props: {
      globalMeta,
      exhibitionType,
      exhibitions
    }
  }
}

export async function getStaticPaths({ locales }) {
  const data = await getExhibitionTypePaths()

  const paths = []

  data.map(slug => {
    return locales.map(locale => {
      return paths.push({
        params: { slug },
        locale
      })
    })
  })

  return {
    paths,
    fallback: false
  }
}
