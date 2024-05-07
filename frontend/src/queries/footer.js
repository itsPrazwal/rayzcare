import { client } from '~/lib/sanity'
import { DESCRIPTION_LOCALE } from '~/queries/fragments'

//
// == Queries
//

export const SOCIAL_MEDIA = /* groq */ `
  _type == 'socialMedia' => {
    _type,
    _key,
    title,
    link,
    'icon': icon.asset->url
  }
`

export const FOOTER_CONTENT = /* groq */ `
  *[_type == 'footerContent'][0]{
    _id,
    locations[]->{
      _id,
      title,
      city,
      country,
      ${DESCRIPTION_LOCALE},
    },
    socialLinks[]{
      ${SOCIAL_MEDIA}
    }
  }
`

//
// == Query Runner
//

export const getFooterContent = async ({ locale, defaultLocale }) => {
  return await client.fetch(FOOTER_CONTENT, { locale, defaultLocale })
}
