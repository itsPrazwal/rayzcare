import { client } from '~/lib/sanity'
import {
  TITLE_LOCALE,
  INFO_MODULE,
  TEXT_MODULE,
  QUOTE_MODULE,
  IMAGE_MODULE,
  VIDEO_MODULE,
  PAGE_META,
  DESCRIPTION_LOCALE,
  HERO_MODULES,
  IMAGE_LOCALE
} from './fragments'

//
// == Queries
//
const EXPERTISE = /* groq */ `
*[ _type == 'expertise' ][0] {
    ${TITLE_LOCALE},
    ${DESCRIPTION_LOCALE},
    ${HERO_MODULES},
    modules[] {
      _key,
      ${INFO_MODULE},
      ${IMAGE_MODULE},
      ${VIDEO_MODULE},
      ${TEXT_MODULE},
      ${QUOTE_MODULE}
    },
    ${IMAGE_LOCALE},
    ${PAGE_META}
  }
`

//
// == Query Runner
//

export const getExpertise = async ({ locale, defaultLocale }) => {
  const data = await client.fetch(EXPERTISE, { locale, defaultLocale })

  return data
}
