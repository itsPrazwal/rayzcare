import { client } from '~/lib/sanity'
import {
  TITLE_LOCALE,
  INFO_MODULE,
  TEXT_MODULE,
  QUOTE_MODULE,
  IMAGE_MODULE,
  SLIDER_MODULE,
  VIDEO_MODULE,
  IMAGE_LOCALE,
  SLUG,
  DESCRIPTION_LOCALE,
  HERO_MODULES,
  PRESS_MODULES,
  PAGE_META,
  LINK_MODULES
} from './fragments'

//
// == Queries
//

export const SERVICE_PAGE = /* groq */ `
  *[_type == 'servicePage'][0]{
    ${TITLE_LOCALE},
    ${DESCRIPTION_LOCALE},
    ${HERO_MODULES},
    ${IMAGE_LOCALE},
    ${PAGE_META}
  }
`

export const SERVICE_BY_SLUG = /* groq */ `
 *[_type == 'service' && slug.current == $slug][0] {
    ${TITLE_LOCALE},
    ${HERO_MODULES},
    ${DESCRIPTION_LOCALE},
    ${IMAGE_LOCALE},
    modules[] {
      ${INFO_MODULE},
      ${IMAGE_MODULE},
      ${VIDEO_MODULE},
      ${SLIDER_MODULE},
      ${TEXT_MODULE},
      ${QUOTE_MODULE}
    },
    featured,
    ${LINK_MODULES},
    location
  }
`

export const SERVICES = /* groq */ `
  *[_type == 'service' && archived != true] | order(dateStart desc) {
    _id,
    ${SLUG},
    ${TITLE_LOCALE},
    location,
    ${DESCRIPTION_LOCALE},
    ${IMAGE_LOCALE}
  }
`

export const SERVICE_PATHS = /* groq */ `
  *[_type == 'service' && defined(slug.current)].slug.current
`

//
// == Query Runner
//

export const getServicePage = async ({ locale, defaultLocale }) => {
  return await client.fetch(SERVICE_PAGE, { locale, defaultLocale })
}

export const getServices = async ({ locale, defaultLocale }) => {
  return await client.fetch(SERVICES, { locale, defaultLocale })
}

export const getServiceBySlug = async ({ slug, locale, defaultLocale }) => {
  return await client.fetch(SERVICE_BY_SLUG, { slug, locale, defaultLocale })
}

export const getServicePaths = async () => {
  return await client.fetch(SERVICE_PATHS)
}
