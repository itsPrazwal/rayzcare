import { client } from '~/lib/sanity'
import {
  TITLE_LOCALE,
  DESCRIPTION_LOCALE,
  QUOTE_LOCALE,
  IMAGE_LOCALE,
  SLUG,
  INFO_MODULE,
  TEXT_MODULE,
  QUOTE_MODULE,
  IMAGE_MODULE,
  VIDEO_MODULE,
  IMAGE_META,
  CAPTION_LOCALE,
  PORTABLE_TEXT,
  HERO_MODULES,
  PRESS_MODULES,
  CHRONOLOGY,
  PAGE_META
} from './fragments'

//
// == Queries
//

export const ARTISTS = /* groq */ `
  *[ _type == 'artist' && featured == true] | order(orderRank){
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

export const ARTIST_PAGE = /* groq */ `
  *[_type == 'artistPage'][0]{
    ${TITLE_LOCALE},
    ${DESCRIPTION_LOCALE},
    ${HERO_MODULES},
    ${IMAGE_LOCALE},
    ${PAGE_META}
  }
`

export const ARTISTS_MODULES = /* groq */ `
  *[_type == 'artistPage'][0]{
    modules[]{
      _key,
      ${TITLE_LOCALE},
      layout,
      artists[]->{
        _id,
        title,
        ${SLUG},
        ${IMAGE_LOCALE}
      },
      artistType->{
        ${SLUG},
        ${TITLE_LOCALE}
      }
    },
    ${PAGE_META}
  }
`

export const ARTIST_PATHS = /* groq */ `
  *[_type == 'artist' && defined(slug.current)].slug.current
`

export const ARTIST_CHRONOLOGY_PATHS = /* groq */ `
  *[_type == 'artist' && defined(slug.current) && count(chronology) > 0].slug.current
`

const ARTIST_MODULES = /* groq */ `
  modules[] {
    ${INFO_MODULE},
    ${IMAGE_MODULE},
    ${VIDEO_MODULE},
    ${TEXT_MODULE},
    ${QUOTE_MODULE}
  }
`

export const ARTIST_BY_SLUG = /* groq */ `
  *[_type == 'artist' && slug.current == $slug][0]{
    title,
    'slug': slug.current,
    dateBirth,
    dateDeath,
    artistTypes[]->{
     _id,
     ${SLUG},
     ${TITLE_LOCALE}
    },
    collectiveArtists[]->{
     _id,
     ${SLUG},
     title
    },
    portrait{
      asset,
      copyright,
      ${IMAGE_META},
      ${CAPTION_LOCALE}
    },
    'exhibitions' : *[_type == 'exhibition' && references(^._id)]{
      _id,
      ${TITLE_LOCALE},
      date,
      dateStart,
      dateEnd,
      ${DESCRIPTION_LOCALE},
      location,
      artists[]->{
        _id,
        title,
        ${SLUG}
      },
      ${SLUG},
      ${IMAGE_LOCALE},
      ${PRESS_MODULES}
    },
    selectedWorks[]->{
      _id,
      title,
      dateCreation,
      dateDisplay,
      artists[]->{
        _id,
        title,
        ${SLUG}
      },
      allowInquire,
      ${DESCRIPTION_LOCALE},
      ${SLUG},
      ${IMAGE_LOCALE}
    },
    'publications' : *[_type == 'publication' && references(^._id)] | order(year desc) {
      _id,
      ${SLUG},
      title,
      year,
      publisher,
      ${IMAGE_LOCALE}
    },
    ${PRESS_MODULES},
    'awards':
      coalesce(
        awards[$locale][] {${PORTABLE_TEXT}},
        awards[$defaultLocale][] {${PORTABLE_TEXT}}
      )
    ,
    'cv' : {
      'fileUrl': cv.asset->url
    },
    ${HERO_MODULES},
    ${QUOTE_LOCALE},
    ${DESCRIPTION_LOCALE},
    ${IMAGE_LOCALE},
    ${ARTIST_MODULES},
    'chronologyTitle': coalesce(chronologyTitle[$locale], chronologyTitle[$defaultLocale]),
    chronologyVisible,
    ${PAGE_META}
  }
`

export const ARTIST_BY_SLUG_CHRONOLOGY = /* groq */ `
  *[_type == 'artist' && slug.current == $slug][0]{
    title,
    'slug': slug.current,
    ${DESCRIPTION_LOCALE},
    ${IMAGE_LOCALE},
    ${CHRONOLOGY},
    ${PAGE_META}
  }
`
//
// == Query Runner
//

export const getArtistPage = async ({ locale, defaultLocale }) => {
  const data = await client.fetch(ARTIST_PAGE, { locale, defaultLocale })

  return data
}

export const getArtists = async ({ locale, defaultLocale }) => {
  const data = await client.fetch(ARTISTS, { locale, defaultLocale })

  return data
}

export const getArtistModules = async ({ locale, defaultLocale }) => {
  const data = await client.fetch(ARTISTS_MODULES, { locale, defaultLocale })

  return data
}

export const getArtistBySlug = async ({ slug, locale, defaultLocale }) => {
  const data = await client.fetch(ARTIST_BY_SLUG, { slug, locale, defaultLocale })

  return data
}

export const getArtistBySlugChronology = async ({ slug, locale, defaultLocale }) => {
  const data = await client.fetch(ARTIST_BY_SLUG_CHRONOLOGY, { slug, locale, defaultLocale })

  return data
}

export const getArtistPaths = async () => {
  const data = await client.fetch(ARTIST_PATHS)

  return data
}

export const getArtistChronologyPaths = async () => {
  const data = await client.fetch(ARTIST_CHRONOLOGY_PATHS)

  return data
}
