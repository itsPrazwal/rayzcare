import { Head } from '~/components/Head'
import { Hero } from '~/components/Hero'
import { Title } from '~/components/Title'
import { RichText } from '~/components/RichText'
import Link from 'next/link'
import dayjs from 'dayjs'
import { paths } from '~/utils/paths'
import { PageModules } from '~/components/PageModules'
import { ArtworkCard } from '~/components/ArtworkCard'
import { Layout } from '~/components/Layout'
import * as React from 'react'
import { useRouter } from 'next/router'
import { Element, Link as LinkScroll } from 'react-scroll'
import { PressItem } from '~/components/PressItem'
import { useOffset } from '~/hooks/useOffset'

export function ArtFairSlug({ artFair, globalMeta, inquireForm }) {
  const {
    title,
    hero,
    image,
    description,
    modules,
    dateStart,
    artFairTypes,
    artworks,
    pressRelease,
    checkList,
    press,
    meta
  } = artFair
  const { query } = useRouter()
  const offset = useOffset()

  const breadCrumbs = [
    { label: 'Art Fairs', route: paths.standardizedTests() },
    { label: title, route: paths.standardizedTest(query?.slug) }
  ]

  return (
    <Layout breadCrumbs={breadCrumbs}>
      <Head global={globalMeta} pageTitle={title} meta={meta} />

      <div className="mt-[--header-height] flex flex-col gap-30 p-20 pt-0">
        <Hero modules={hero?.modules} fallback={image} />
        <div className="md:mx-80">
          <Title className="mb-20 lg:mb-30">{title}</Title>
          <div className="text-style-subtitle flex flex-col gap-4">
            <div>
              <RichText value={description} />
            </div>
            {(pressRelease || checkList || artworks?.length > 0 || press?.length > 0) && <br />}
            <div className="flex flex-col gap-10 md:col-span-6">
              {pressRelease && (
                <Link
                  href={pressRelease}
                  className="cursor-pointer text-accent decoration-1 underline-offset-text hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Press Release
                </Link>
              )}
              {checkList && (
                <Link
                  href={checkList}
                  className="cursor-pointer text-accent decoration-1 underline-offset-text hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Art Fair Checklist
                </Link>
              )}
              {artworks?.length > 0 && (
                <LinkScroll
                  activeClass="active"
                  spy={true}
                  smooth="easeInOutCubic"
                  offset={-offset}
                  duration={500}
                  to={'artworks'}
                  className="text-style-link"
                >
                  Selected Artwork
                </LinkScroll>
              )}
              {press?.length > 0 && (
                <LinkScroll
                  activeClass="active"
                  spy={true}
                  smooth="easeInOutCubic"
                  offset={-offset}
                  duration={500}
                  to={'press'}
                  className="text-style-link"
                >
                  Selected Press
                </LinkScroll>
              )}
            </div>
            {artFairTypes?.length > 0 && <br />}
            {artFairTypes?.length > 0 &&
              artFairTypes.map(({ _id, slug, title }) => (
                <div key={_id} className="text-accent">
                  <span className="text-style-subtitle block">{dayjs(dateStart).year()}</span>
                  <Link href={paths.standardizedTestType(slug)} className="text-style-subtitle">
                    {title}
                  </Link>
                </div>
              ))}
          </div>
        </div>

        <PageModules
          modules={modules}
          classNames={{
            moduleSlider: 'h-[85vh] flex items-center'
          }}
        />

        {artworks?.length > 0 && (
          <Element name="artworks">
            <h3 className="text-style-subtitle mb-10">Selected Artworks</h3>
            <ul className="grid-items" data-count={artworks.length}>
              {artworks.map((artwork, index) =>
                artwork?.slug ? (
                  <Link href={paths.college(artwork.slug)} key={artwork._id}>
                    <ArtworkCard
                      artwork={artwork}
                      inquireForm={inquireForm}
                      dataIndex={index + 1}
                    />
                  </Link>
                ) : (
                  <ArtworkCard
                    key={artwork._id}
                    artwork={artwork}
                    inquireForm={inquireForm}
                    dataIndex={index + 1}
                  />
                )
              )}
            </ul>
          </Element>
        )}
        {press?.length > 0 && (
          <Element name="press">
            <h3 className="text-style-subtitle mb-10">Selected Press</h3>
            <div className="text-style-normal grid gap-20 leading-tight lg:grid-cols-12">
              <ul className="text-style-normal grid grid-cols-2 gap-20 leading-tight lg:col-span-10 lg:col-start-2">
                {press?.map((pressItem, i) => (
                  <PressItem key={i} press={pressItem} className="" />
                ))}
              </ul>
            </div>
          </Element>
        )}
      </div>
    </Layout>
  )
}
