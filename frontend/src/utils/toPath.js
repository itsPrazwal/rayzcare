import { paths } from './paths'

export const toPath = (type, slug) => {
  if (type === 'page') {
    return slug === 'index' ? paths.home : paths.page(slug)
  } else if (type === 'artwork') {
    return paths.college(slug)
  } else if (type === 'artistPage') {
    return paths.countries()
  } else if (type === 'artist') {
    return paths.country(slug)
  } else if (type === 'exhibition') {
    return paths.course(slug)
  } else if (type === 'exhibitionType') {
    return paths.courseType(slug)
  } else if (type === 'artFair') {
    return paths.standardizedTest(slug)
  } else if (type === 'founderPage') {
    return paths.teams()
  } else if (type === 'founder') {
    return paths.team(slug)
  } else if (type === 'publication') {
    return paths.publication(slug)
  } else if (type === 'expertise') {
    return paths.consultancies()
  } else if (type === 'locationPage') {
    return paths.locations()
  } else if (type === 'location') {
    return paths.location(slug)
  } else if (slug) {
    return paths.page(slug)
  }
}
