import { getGlobalMeta } from '~/queries/settings'
import { getLocationPage, getLocations } from '~/queries/location'
import { Head } from '~/components/Head'
import { Layout } from '~/components/Layout'
import { Title } from '~/components/Title'
import { RichText } from '~/components/RichText'

export default function LocationPage({ globalMeta, locationPage, locations }) {
  const { title } = locationPage

  return (
    <Layout>
      <Head global={globalMeta} pageTitle={title} />

      <div className="mt-[--header-height] flex flex-col gap-30 p-20 pt-0">
        <Title>{title}</Title>
        <div className="grid md:grid-cols-12">
          <div className="grid gap-15 md:col-span-12 md:grid-cols-4 md:gap-30">
            {locations.map(({ _id, city, description }) => (
              <ul key={_id} className="text-style-description">
                <li className="uppercase">{city}</li>
                <li className="[&_a]:no-underline [&_p]:!mt-0">
                  <RichText value={description} />
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ locale, defaultLocale }) {
  const [globalMeta, locationPage, locations] = await Promise.all([
    getGlobalMeta(),
    getLocationPage({ locale, defaultLocale }),
    getLocations({ locale, defaultLocale })
  ])

  return {
    props: {
      globalMeta,
      locationPage,
      locations
    }
  }
}
