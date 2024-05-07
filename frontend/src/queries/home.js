import { client } from '~/lib/sanity'
import { PAGE_META, SLIDER_IMAGE_MODULE, SLIDER_VIDEO_MODULE } from './fragments'

//
// == Queries
//

const HOMEPAGE_MODULES = /* groq */ `
  modules[] {
    ${SLIDER_IMAGE_MODULE},
    ${SLIDER_VIDEO_MODULE}
  }
`

const HOMEPAGE = /* groq */ `
  *[ _type == 'home' ][0] {
    ${HOMEPAGE_MODULES},
    ${PAGE_META}
  }
`

//
// == Query Runner
//

export const getHomepage = async ({ locale, defaultLocale }) => {
  const data = await client.fetch(HOMEPAGE, { locale, defaultLocale })

  return data
}
