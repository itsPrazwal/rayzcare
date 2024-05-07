import { client } from '~/lib/sanity'
import {
  TITLE_LOCALE,
  DESCRIPTION_LOCALE,
  QUOTE_LOCALE,
  IMAGE_LOCALE,
  SLUG,
  INFO_MODULE,
  SLIDER_MODULE,
  TEXT_MODULE,
  QUOTE_MODULE,
  IMAGE_MODULE,
  VIDEO_MODULE,
  IMAGE_META,
  CAPTION_LOCALE,
  PORTABLE_TEXT,
  HERO_MODULES,
  PRESS_MODULES,
  PAGE_META
} from './fragments'

//
// == Queries
//

export const FOUNDERS = /* groq */ `
  *[ _type == 'founder'] | order(orderRank){
    _id,
    title,
    ${SLUG},
    ${IMAGE_LOCALE},
    portrait{
      asset,
      copyright,
      ${IMAGE_META},
      ${CAPTION_LOCALE}
    }
  }
`


export const FOUNDERS_MODULES = /* groq */ `
  modules[]{
    _key,
    _type,
    ${TITLE_LOCALE},
    ${DESCRIPTION_LOCALE},
    founders[]->{
      _id,
      title,
      ${SLUG},
      ${IMAGE_LOCALE},
      portrait{
        asset,
        copyright,
        ${IMAGE_META},
        ${CAPTION_LOCALE}
      },
    }
  }
`

export const FOUNDER_PAGE = /* groq */ `
  *[_type == 'founderPage'][0]{
    ${TITLE_LOCALE},
    ${IMAGE_LOCALE},
    ${HERO_MODULES},
    ${DESCRIPTION_LOCALE},
    ${FOUNDERS_MODULES},
    ${PAGE_META}
  }
`

export const FOUNDER_PATHS = /* groq */ `
  *[_type == 'founder' && defined(slug.current)].slug.current
`

const FOUNDER_MODULES = /* groq */ `
  modules[] {
    ${INFO_MODULE},
    ${IMAGE_MODULE},
    ${VIDEO_MODULE},
    ${SLIDER_MODULE},
    ${TEXT_MODULE},
    ${QUOTE_MODULE}
  }
`

export const FOUNDER_BY_SLUG = /* groq */ `
  *[_type == 'founder' && slug.current == $slug][0]{
    title,
    portrait{
      asset,
      copyright,
      ${IMAGE_META},
      ${CAPTION_LOCALE}
    },
    artists[]->{
        _id,
        title,
        ${SLUG}
    },
    ${PRESS_MODULES},
    'awards':
      coalesce(
        awards[$locale][] {${PORTABLE_TEXT}},
        awards[$defaultLocale][] {${PORTABLE_TEXT}}
      )
    ,
    ${HERO_MODULES},
    ${QUOTE_LOCALE},
    ${DESCRIPTION_LOCALE},
    'details':
        coalesce(
            details[$locale][] {${PORTABLE_TEXT}},
            details[$defaultLocale][] {${PORTABLE_TEXT}}
        )
    ,
    'artistsExpertise':
        coalesce(
            artistsExpertise[$locale][] {${PORTABLE_TEXT}},
            artistsExpertise[$defaultLocale][] {${PORTABLE_TEXT}}
        )
    ,
    ${IMAGE_LOCALE},
    ${FOUNDER_MODULES},
    ${PAGE_META}
  }
`
//
// == Query Runner
//

export const getFounderPage = async ({ locale, defaultLocale }) => {
  const data = await client.fetch(FOUNDER_PAGE, { locale, defaultLocale })

  return data
}

export const getFounders = async ({ locale, defaultLocale }) => {
  const data = await client.fetch(FOUNDERS, { locale, defaultLocale })

  return data
}

export const getFounderModules = async ({ locale, defaultLocale }) => {
  const data = await client.fetch(FOUNDERS_MODULES, { locale, defaultLocale })

  return data
}

export const getFounderBySlug = async ({ slug, locale, defaultLocale }) => {
  const data = await client.fetch(FOUNDER_BY_SLUG, { slug, locale, defaultLocale })

  return data
}

export const getFounderPaths = async () => {
  const data = await client.fetch(FOUNDER_PATHS)

  return data
}
