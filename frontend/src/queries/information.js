import { client } from '~/lib/sanity'
import { TITLE_LOCALE, BODY_LOCALE, PAGE_META } from './fragments'

//
// == Queries
//

const INFORMATION = /* groq */ `
  *[ _type == 'information' ][0] {
    modules[] {
      _key,
      ${BODY_LOCALE},
      ${TITLE_LOCALE},
      gridWidth
    },
    ${PAGE_META}
  }
`

//
// == Query Runner
//

export const getInformation = async ({ locale, defaultLocale }) => {
  const data = await client.fetch(INFORMATION, { locale, defaultLocale })

  return data
}
