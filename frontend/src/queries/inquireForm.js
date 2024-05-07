import { client } from '~/lib/sanity'
import { DESCRIPTION_LOCALE, PORTABLE_TEXT } from './fragments'

//
// == Queries
//

const INQUIRE_FORM = /* groq */ `
  *[_type == 'inquireForm'][0] {
    inquireReceiveMail,
    ${DESCRIPTION_LOCALE},
    thankYouMailText
  }
`

//
// == Query Runner
//

export const getInquireForm = async ({ locale, defaultLocale }) => {
  return client.fetch(INQUIRE_FORM, { locale, defaultLocale })
}
