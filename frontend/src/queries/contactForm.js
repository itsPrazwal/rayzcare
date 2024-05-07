import { client } from '~/lib/sanity'
import { DESCRIPTION_LOCALE, PORTABLE_TEXT } from './fragments'

//
// == Queries
//

const CONTACT_FORM = /* groq */ `
  *[_type == 'contactForm'][0] {
    contactReceiveMail,
    ${DESCRIPTION_LOCALE},
    thankYouMailText
  }
`

//
// == Query Runner
//

export const getContactForm = async ({ locale, defaultLocale }) => {
  return client.fetch(CONTACT_FORM, { locale, defaultLocale })
}
