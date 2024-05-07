import { client } from '~/lib/sanity'
import {
  TITLE_LOCALE,
  DESCRIPTION_LOCALE,
  INFO_MODULE,
  TEXT_MODULE,
  IMAGE_MODULE,
  HERO_MODULES,
  PAGE_META
} from './fragments'

//
// == Queries
//

export const PAGE_BY_SLUG = /* groq */ `
  *[_type == 'page' && slug.current == $slug][0]{
    ${TITLE_LOCALE},
    ${DESCRIPTION_LOCALE},
    ${HERO_MODULES},
    modules[]{
      _key,
      ${INFO_MODULE},
      ${IMAGE_MODULE},
      ${TEXT_MODULE}
    },
    ${PAGE_META}
  }
`

export const PAGE_PATHS = /* groq */ `
  *[_type == 'page' && defined(slug.current)].slug.current
`

//
// == Query Runner
//

export const getPage = async ({ slug, locale, defaultLocale }) => {
  const data = await client.fetch(PAGE_BY_SLUG, { slug, locale, defaultLocale })

  return data
}

export const getPagePaths = async () => {
  const data = await client.fetch(PAGE_PATHS)

  return data
}
