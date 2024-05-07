import { client } from '~/lib/sanity'
import {
  TITLE_LOCALE,
  HERO_MODULES,
  IMAGE_LOCALE,
  SLUG,
  PAGE_META,
  DESCRIPTION_LOCALE
} from './fragments'

//
// == Queries
//
const LOCATION = /* groq */ `
*[ _type == 'locationPage' ][0] {
    ${TITLE_LOCALE},
    ${IMAGE_LOCALE},
    ${DESCRIPTION_LOCALE},
    ${HERO_MODULES},
    ${PAGE_META}
  }
`

export const LOCATIONS = /* groq */ `
  *[_type == 'location'] | order(orderRank asc) {
    _id,
    ${SLUG},
    ${IMAGE_LOCALE},
    title,
    city,
    country,
    ${DESCRIPTION_LOCALE},
  }
`

export const LOCATION_BY_SLUG = /* groq */ `
 *[_type == 'location' && slug.current == $slug][0] {
    _id,
    title,
    year,
    pageCount,
    price,
    composition,
    dimensions,
    isbn,
    publisher,
    artist,
    descriptionRaw,
    ${IMAGE_LOCALE},
    ${DESCRIPTION_LOCALE},
  }
`

export const LOCATION_PATHS = /* groq */ `
  *[_type == 'location' && defined(slug.current)].slug.current
`

//
// == Query Runner
//

export const getLocationPage = async ({ locale, defaultLocale }) => {
  const data = await client.fetch(LOCATION, { locale, defaultLocale })

  return data
}

export const getLocations = async ({ locale, defaultLocale }) => {
  return await client.fetch(LOCATIONS, { locale, defaultLocale })
}

export const getLocationBySlug = async ({ slug, locale, defaultLocale }) => {
  const data = await client.fetch(LOCATION_BY_SLUG, { slug, locale, defaultLocale })

  return data
}

export const getLocationPaths = async () => {
  const data = await client.fetch(LOCATION_PATHS)

  return data
}
