import { client } from '~/lib/sanity'
import {
  TITLE_LOCALE,
  INFO_MODULE,
  TEXT_MODULE,
  QUOTE_MODULE,
  IMAGE_MODULE,
  VIDEO_MODULE,
  IMAGE_LOCALE,
  SLUG,
  DESCRIPTION_LOCALE,
  HERO_MODULES,
  PRESS_MODULES,
  PAGE_META,
  SLIDER_MODULE
} from './fragments'

//
// == Queries
//

export const ARTFAIR_PAGE = /* groq */ `
  *[_type == 'artFairPage'][0]{
    ${TITLE_LOCALE},
    ${DESCRIPTION_LOCALE},
    ${HERO_MODULES},
    ${IMAGE_LOCALE},
    ${PAGE_META}
  }
`

export const ARTFAIRS_YEARS = /* groq */ `
  array::unique(*[_type == 'artFair' && defined(dateStart)] | order(dateStart desc) {
    'year': string::split(dateStart, '-')[0]
  }.year)
`

export const ARTFAIRS = /* groq */ `
  *[_type == 'artFair' && archived != true] | order(dateStart desc) {
    _id,
    artists[]->{
      _id,
      title,
      ${SLUG}
    },
    ${SLUG},
    ${TITLE_LOCALE},
    dateStart,
    dateEnd,
    location,
    city,
    country,
    ${IMAGE_LOCALE}
  }
`

export const ARTFAIRS_BY_TYPE = /* groq */ `
 *[_type == 'artFair' && $slug in artFairTypes[]->slug.current] | order(dateStart desc) {
    _id,
    'artFairTypeTitle': artFairTypes[0]->title.en,
    artists[]->{
      _id,
      title,
      ${SLUG}
    },
    ${SLUG},
    ${TITLE_LOCALE},
    dateStart,
    dateEnd,
    location,
    city,
    country,
    ${IMAGE_LOCALE}
  }
`

export const ARTFAIR_BY_SLUG = /* groq */ `
 *[_type == 'artFair' && slug.current == $slug][0] {
    ${TITLE_LOCALE},
    ${DESCRIPTION_LOCALE},
    ${HERO_MODULES},
    ${IMAGE_LOCALE},
    dateStart,
    dateEnd,
    artFairTypes[]->{
      _id,
      ${SLUG},
      ${TITLE_LOCALE}
    },
    artists[]->{
      _id,
      title,
      ${SLUG}
    },
    artworks[]->{
      _id,
      title,
      dateCreation,
      dateDisplay,
      allowInquire,
      ${DESCRIPTION_LOCALE},
      artists[]->{
        _id,
        title,
        ${SLUG}
      },
      ${SLUG},
      ${IMAGE_LOCALE}
    },
    modules[] {
      ${INFO_MODULE},
      ${IMAGE_MODULE},
      ${VIDEO_MODULE},
      ${SLIDER_MODULE},
      ${TEXT_MODULE},
      ${QUOTE_MODULE}
    },
    ${PRESS_MODULES},
    "pressRelease": pressRelease.asset->url,
    "checkList": checkList.asset->url
  }
`

export const ARTFAIR_TYPE = /* groq */ `
  *[_type == 'artFairType' && slug.current == $slug][0] {
    ${TITLE_LOCALE},
    excludeFromMenu
  }
`

export const ARTFAIR_PATHS = /* groq */ `
  *[_type == 'artFair' && defined(slug.current)].slug.current
`

export const ARTFAIR_TYPE_PATHS = /* groq */ `
  *[_type == 'artFairType' && defined(slug.current)].slug.current
`

//
// == Query Runner
//

export const getArtFairPage = async ({ locale, defaultLocale }) => {
  return await client.fetch(ARTFAIR_PAGE, { locale, defaultLocale })
}

export const getArtFairsYears = async () => {
  return await client.fetch(ARTFAIRS_YEARS)
}

export const getArtFairs = async ({ locale, defaultLocale }) => {
  return await client.fetch(ARTFAIRS, { locale, defaultLocale })
}

export const getArtFairsByType = async ({ slug, locale, defaultLocale }) => {
  return await client.fetch(ARTFAIRS_BY_TYPE, { slug, locale, defaultLocale })
}

export const getArtFairBySlug = async ({ slug, locale, defaultLocale }) => {
  return await client.fetch(ARTFAIR_BY_SLUG, { slug, locale, defaultLocale })
}

export const getArtFairType = async ({ slug, locale, defaultLocale }) => {
  return await client.fetch(ARTFAIR_TYPE, { slug, locale, defaultLocale })
}

export const getArtFairPaths = async () => {
  return await client.fetch(ARTFAIR_PATHS)
}

export const getArtFairTypePaths = async () => {
  return await client.fetch(ARTFAIR_TYPE_PATHS)
}
