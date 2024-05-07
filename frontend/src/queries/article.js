import { client } from '~/lib/sanity'
import {
  TITLE_LOCALE,
  IMAGE_LOCALE,
  SLUG,
  TEXT_MODULE,
  IMAGE_MODULE,
  VIDEO_MODULE,
  PAGE_META
} from './fragments'

const ARTICLE_MODULES = /* groq */ `
  modules[] {
    ${TEXT_MODULE},
    ${IMAGE_MODULE},
    ${VIDEO_MODULE}
  }
`

const ARTICLES_TAG = /* groq */ `
  _id,
  ${SLUG},
  ${TITLE_LOCALE}
`

//
// == Queries
//

export const ARTICLES = /* groq */ `
  *[ _type == 'article'] | order(featured desc, publishDate desc, _updatedAt desc) [$start...$end] {
    _type,
    _id,
    _updatedAt,
    publishDate,
    ${SLUG},
    tags[]->{
      ${ARTICLES_TAG}
    },
    ${TITLE_LOCALE},
    ${IMAGE_LOCALE}
  }
`

export const ARTICLE_TAGS = /* groq */ `
  *[_type == 'articleTag'] {
    ${ARTICLES_TAG}
  }
`

export const ARTICLE_PATHS = /* groq */ `
  *[_type == 'article' && defined(slug.current)].slug.current
`

export const ARTICLE_BY_SLUG = /* groq */ `
 *[_type == 'article' && slug.current == $slug][0] {
    publishDate,
    _updatedAt,
    tags[]->{
      ${ARTICLES_TAG}
    },
    ${ARTICLE_MODULES},
    ${PAGE_META}
  }
`

export const ARTICLE_TAG_PATHS = /* groq */ `
  *[_type == 'articleTag' && defined(slug.current)].slug.current
`

export const ARTICLES_BY_TAGS = /* groq */ `
  *[_type == 'article' && $slug in tags[]->slug.current] | order(publishDate desc) {
    _type,
    _id,
    ${SLUG},
    ${TITLE_LOCALE},
    ${IMAGE_LOCALE}
  }
`

//
// == Query Runner
//

export const getArticles = async ({ start, end, locale, defaultLocale }) => {
  const data = await client.fetch(ARTICLES, { start, end, locale, defaultLocale })

  return data
}

export const getMoreArticles = async ({ start, end, locale, defaultLocale }) => {
  const data = await client.fetch(ARTICLES, { start, end, locale, defaultLocale })

  return data
}

export const getArticlesTags = async ({ locale, defaultLocale }) => {
  const data = await client.fetch(ARTICLE_TAGS, { locale, defaultLocale })

  return data
}

export const getArticlesByTags = async ({ slug, locale, defaultLocale }) => {
  const data = await client.fetch(ARTICLES_BY_TAGS, { slug, locale, defaultLocale })

  return data
}

export const getArticleBySlug = async ({ slug, locale, defaultLocale }) => {
  const data = await client.fetch(ARTICLE_BY_SLUG, { slug, locale, defaultLocale })

  return data
}

export const getArticlePaths = async () => {
  const data = await client.fetch(ARTICLE_PATHS)

  return data
}

export const getArticleTagPaths = async () => {
  const data = await client.fetch(ARTICLE_TAG_PATHS)

  return data
}
