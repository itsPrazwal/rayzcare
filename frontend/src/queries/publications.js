import { client } from '~/lib/sanity'
import {
  TITLE_LOCALE,
  HERO_MODULES,
  INFO_MODULE,
  TEXT_MODULE,
  QUOTE_MODULE,
  IMAGE_MODULE,
  VIDEO_MODULE,
  SUBGROUP_MODULE,
  IMAGE_LOCALE,
  SLUG,
  PAGE_META,
  DESCRIPTION_LOCALE
} from './fragments'

//
// == Queries
//
const PUBLICATION = /* groq */ `
*[ _type == 'publicationPage' ][0] {
    ${TITLE_LOCALE},
    ${DESCRIPTION_LOCALE},
    ${HERO_MODULES},
    modules[]{
      ${SUBGROUP_MODULE}
    },
    ${PAGE_META}
  }
`

export const PUBLICATIONS = /* groq */ `
  *[_type == 'publication'] | order(year desc) {
    _id,
    ${SLUG},
    title,
    year,
    publisher,
    artist,
    ${IMAGE_LOCALE}
  }
`

export const PUBLICATION_BY_SLUG = /* groq */ `
 *[_type == 'publication' && slug.current == $slug][0] {
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
    modules[]{
      ${INFO_MODULE},
      ${IMAGE_MODULE},
      ${VIDEO_MODULE},
      ${TEXT_MODULE},
      ${QUOTE_MODULE}
    }
  }
`

export const PUBLICATION_PATHS = /* groq */ `
  *[_type == 'publication' && defined(slug.current)].slug.current
`

//
// == Query Runner
//

export const getPublicationPage = async ({ locale, defaultLocale }) => {
  const data = await client.fetch(PUBLICATION, { locale, defaultLocale })

  return data
}

export const getPublications = async ({ locale, defaultLocale }) => {
  return await client.fetch(PUBLICATIONS, { locale, defaultLocale })
}

export const getPublicationBySlug = async ({ slug, locale, defaultLocale }) => {
  const data = await client.fetch(PUBLICATION_BY_SLUG, { slug, locale, defaultLocale })

  return data
}

export const getPublicationPaths = async () => {
  const data = await client.fetch(PUBLICATION_PATHS)

  return data
}
