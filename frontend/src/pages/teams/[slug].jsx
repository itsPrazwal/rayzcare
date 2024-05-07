import * as React from 'react'
import { useRouter } from 'next/router'
import { Link, Element } from 'react-scroll'
import { getFounderPaths, getFounderBySlug } from '~/queries/founder'
import { getGlobalMeta } from '~/queries/settings'
import { useOffset } from '~/hooks/useOffset'
import { Layout } from '~/components/Layout'
import { ResponsiveImage } from '~/components/ResponsiveImage'
import { Head } from '~/components/Head'
import { Title } from '~/components/Title'
import { Hero } from '~/components/Hero'
import { PressItem } from '~/components/PressItem'
import { RichText } from '~/components/RichText'
import { ServiceCard, ExhibitionCardSingle } from '~/components/ServiceCard'
import { PageModules } from '~/components/PageModules'
import { paths } from '~/utils/paths'

export default function FounderSlugPage({ globalMeta, artist }) {
  const offset = useOffset()
  const {
    title,
    hero,
    description,
    details,
    image,
    portrait,
    quote,
    artistsExpertise,
    exhibitions,
    modules,
    press,
    meta
  } = artist

  const { query } = useRouter()

  const breadCrumbs = [
    { label: 'Founders', route: paths.teams() },
    { label: title, route: paths.team(query?.slug) }
  ]

  const navList = [
    { title: 'Biography', to: 'biography', visible: !!description },
    { title: 'Expertise', to: 'artists-expertise', visible: !!artistsExpertise },
    { title: 'Exhibitions', to: 'exhibitions', visible: exhibitions?.length > 0 },
    { title: 'Press', to: 'press', visible: press?.length > 0 }
  ]

  return (
    <Layout breadCrumbs={breadCrumbs}>
      <Head global={globalMeta} pageTitle={title} meta={meta} />

      <div className="mt-[--header-height] flex w-full flex-col gap-30 p-20 pt-0">
        <Hero modules={hero?.modules} fallback={image} />
        <div className="md:mx-80">
          <Title>{title}</Title>
          <div className="sm:mt-20 sm:gap-20 md:mt-50 md:grid md:grid-cols-12 md:gap-40">
            <div className="sm:mb-20 md:col-span-4">
              {(portrait || image) && (
                <ResponsiveImage
                  src={portrait || image}
                  alt={title}
                  layout="constrained"
                  width={800}
                  aspectRatio={4 / 5}
                  sizes={'(min-width: 768px) 33.33vw, 100vw'}
                  containerClassName="mb-20"
                />
              )}
              <div className="flex flex-col gap-4">
                {navList.map(
                  item =>
                    item.visible && (
                      <Link
                        key={item.to}
                        activeClass="active"
                        spy={true}
                        smooth="easeInOutCubic"
                        offset={-offset}
                        duration={500}
                        to={item.to}
                        className="text-style-link"
                      >
                        {item.title}
                      </Link>
                    )
                )}
              </div>
            </div>
            <div className="md:col-span-8">
              {quote && (
                <div className="pb-40 md:m-0">
                  <div className="text-style-quote">
                    <RichText value={quote} />
                  </div>
                  <div className="text-style-quote-writer">—{title}</div>
                </div>
              )}
              {description && (
                <Element name="biography" className="text-style-description -mt-5 md:col-span-5">
                  <RichText value={description} />
                  {details && (
                    <Element name="details" className="text-style-description mt-20">
                      <RichText value={details} />
                    </Element>
                  )}
                </Element>
              )}
            </div>
          </div>
        </div>

        {artistsExpertise && (
          <Element name="artists-expertise">
            <h3 className="text-style-subtitle mb-10">Expertise</h3>
            <div className="grid md:grid-cols-12">
              <div className="text-style-normal md:col-span-11 md:col-start-2">
                <RichText value={artistsExpertise} />
              </div>
            </div>
          </Element>
        )}

        {exhibitions?.length > 0 && (
          <Element name="exhibitions">
            <h3 className="text-style-subtitle mb-10">Exhibitions</h3>
            <ul className="grid-items">
              {exhibitions.length === 1 ? (
                <ExhibitionCardSingle exhibition={exhibitions[0]} />
              ) : (
                exhibitions
                  .sort((a, b) => new Date(b.dateStart) - new Date(a.dateStart))
                  .map(exhibition => (
                    <ServiceCard
                      key={exhibition._id}
                      exhibition={exhibition}
                      exhibitionsLength={exhibitions.length}
                    />
                  ))
              )}
            </ul>
          </Element>
        )}

        <PageModules modules={modules} />

        {press?.length > 0 && (
          <Element name="press">
            <h3 className="text-style-subtitle mb-10">Selected Press</h3>
            <div className="text-style-normal grid gap-20 leading-tight md:grid-cols-12">
              <ul className="text-style-normal grid grid-cols-2 gap-20 leading-tight md:col-span-10 md:col-start-2">
                {press.map((pressItem, i) => (
                  <PressItem key={i} press={pressItem} />
                ))}
              </ul>
            </div>
          </Element>
        )}
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params, locale, defaultLocale }) {
  const [globalMeta, artist] = await Promise.all([
    getGlobalMeta({ locale, defaultLocale }),
    getFounderBySlug({ slug: params.slug, locale, defaultLocale })
  ])

  return {
    props: {
      globalMeta,
      artist
    }
  }
}

export async function getStaticPaths({ locales }) {
  const data = await getFounderPaths()

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
    fallback: false // TODO: Regenerate on demand
  }
}
