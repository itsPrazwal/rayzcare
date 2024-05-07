import { client } from '~/lib/sanity'
import {
  DESCRIPTION_LOCALE,
  IMAGE_LOCALE,
  IMAGE_MODULE,
  INFO_MODULE,
  SLUG,
  VIDEO_MODULE,
  SLIDER_MODULE,
  TEXT_MODULE,
  QUOTE_MODULE,
  PORTABLE_TEXT
} from '~/queries/fragments'

export const ARTWORK_BY_SLUG = /* groq */ `
  *[_type == 'artwork' && slug.current == $slug][0]{
    _id,
    ${SLUG},
    title,
    dateCreation,
    dateDisplay,
    allowInquire,
    ${DESCRIPTION_LOCALE},
    'artworkDetails':
      coalesce(
        artworkDetails[$locale][] {${PORTABLE_TEXT}},
        artworkDetails[$defaultLocale][] {${PORTABLE_TEXT}}
      ),
    referenceImages[]{
      ${IMAGE_MODULE}
    },
    artists[]->{
      _id,
      title,
      ${SLUG}
    },
    ${SLUG},
    ${IMAGE_LOCALE},
    modules[]{
      ${IMAGE_MODULE}
    },
    details[] {
      ${INFO_MODULE},
      ${IMAGE_MODULE},
      ${VIDEO_MODULE},
      ${SLIDER_MODULE},
      ${TEXT_MODULE},
      ${QUOTE_MODULE}
    }
  }
`

export const ARTWORK_PATHS = /* groq */ `
  *[_type == 'artwork' && defined(slug.current)].slug.current
`

export const getArtworkBySlug = async ({ slug, locale, defaultLocale }) => {
  return await client.fetch(ARTWORK_BY_SLUG, { slug, locale, defaultLocale })
}

export const getArtworkPaths = async () => {
  return await client.fetch(ARTWORK_PATHS)
}
