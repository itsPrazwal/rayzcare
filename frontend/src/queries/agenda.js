import { client } from '~/lib/sanity'
import { TITLE_LOCALE } from './fragments'

//
// == Queries
//

export const AGENDA_BY_DATE = /* groq */ `
  *[_type == 'repertory' && defined(representations)] | order(dateStart desc) {
    representations[dateStart match $slug + '-' || dateEnd match $slug + '-']{
      _key,
      city,
      country,
      dateStart,
      dateEnd,
      location,
      ticketUrl,
      'title': ^.title,
      'slug': ^.slug,
      'authors': ^.authors[]->title,
      'repertoryCreationDate': ^.repertoryCreationDate,
      'repertoryType': ^.repertoryType[]->{
        _id,
        ${TITLE_LOCALE}
      }
    }
  }.representations[]
`

export const AGENDA_YEARS = /* groq */ `
  array::unique(*[_type == 'repertory' && defined(representations)].representations[]{
    'year': string::split(dateStart, '-')[0]
  }.year)
`

export const AGENDA_LOCATIONS = /* groq */ `
  array::unique(*[_type == 'repertory' && defined(representations)].representations[] | order(city asc).city)
`

export const AGENDA_REPERTORY_TYPES = /* groq */ `
  array::unique(*[_type == 'repertory' && defined(representations)] {
    representations[]{
      'repertoryType': ^.repertoryType[]->{
        ${TITLE_LOCALE}
      }.title
    }
  }.representations[].repertoryType[])
`

//
// == Query Runner
//

export const getAgendaByDate = async ({ slug, locale, defaultLocale }) => {
  const data = await client.fetch(AGENDA_BY_DATE, { slug, locale, defaultLocale })

  return data
}

export const getAgendaYears = async () => {
  const data = await client.fetch(AGENDA_YEARS)

  return data
}

export const getAgendaLocations = async () => {
  const data = await client.fetch(AGENDA_LOCATIONS)

  return data
}

export const getAgendaRepertoryTypes = async ({ locale, defaultLocale }) => {
  const data = await client.fetch(AGENDA_REPERTORY_TYPES, { locale, defaultLocale })

  return data
}
