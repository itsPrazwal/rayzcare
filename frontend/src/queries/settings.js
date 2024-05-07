import { client } from '~/lib/sanity'
import { PORTABLE_TEXT } from './fragments'

//
// == Queries
//

const SETTINGS = /* groq */ `
  *[_type == 'settings'][0] {
    ...,
    'privacyPolicy': coalesce(
      privacyPolicy[$locale][] {${PORTABLE_TEXT}},
      privacyPolicy[$defaultLocale][] {${PORTABLE_TEXT}}
    ),
    'accessibility': coalesce(
      accessibility[$locale][] {${PORTABLE_TEXT}},
      accessibility[$defaultLocale][] {${PORTABLE_TEXT}}
    ),
    'termsConditions': coalesce(
      termsConditions[$locale][] {${PORTABLE_TEXT}},
      termsConditions[$defaultLocale][] {${PORTABLE_TEXT}}
    )
  }
`

const GLOBAL_META = /* groq */ `
  *[_type == 'settingsSeo'][0] {
    title,
    description,
    domain,
    keywords,
    image,
    favicon
  }
`

//
// == Query Runner
//

export const getSettings = async ({ locale, defaultLocale }) => {
  return client.fetch(SETTINGS, { locale, defaultLocale })
}

export const getGlobalMeta = async () => {
  return client.fetch(GLOBAL_META)
}
