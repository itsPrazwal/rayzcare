/*
 * This file contains fragments that are used in multiple queries
 * We use GROQ $params, not to be confused with string interpolation ${expression}
 */

export const TITLE_LOCALE = /* groq */ `
  'title': coalesce(title[$locale], title[$defaultLocale])
`

export const SLUG = /* groq */ `
  'slug': slug.current
`

export const CAPTION_LOCALE = /* groq */ `
  'caption': coalesce(caption[$locale], caption[$defaultLocale])
`

export const VIMEO_VIDEO = /* groq */ `
  vimeo->{
    aspectRatio,
    'paddingRatio': (height/width) * 100,
    srcset[] | order(width asc){
        width,
        rendition,
        quality,
        link
    },
    pictures[] | order(width asc){
        width,
        height,
        link
    },
    duration
  }
`

export const IMAGE_META = /* groq */ `
  'dimensions': asset->metadata.dimensions,
  'blurHash': asset->metadata.blurHash,
  'lqip': asset->metadata.lqip,
  'paletteDominant': asset->metadata.palette.dominant,
  hotspot
`

export const IMAGE_LOCALE = /* groq */ `
  image{
    asset,
    copyright,
    ${IMAGE_META},
    ${CAPTION_LOCALE}
  }
`

export const VIDEO_LOCALE = /* groq */ `
  video{
    copyright,
    ${VIMEO_VIDEO},
    ${CAPTION_LOCALE}
  }
`

export const PORTABLE_TEXT = /* groq */ `
  ...,
  'markDefs': markDefs[]{
    ...,
    _type == 'annotationLinkInternal' => {
      'slug': @.reference->slug.current,
      'dataType': @.reference->_type
    }
  },
  _type == 'figure' => {
    asset,
    copyright,
    ${IMAGE_META},
    ${CAPTION_LOCALE}
  },
  _type == 'figureVideo' => {
    ${VIMEO_VIDEO}
  }
`

export const DESCRIPTION_LOCALE = /* groq */ `
  'description':
    coalesce(
      description[$locale][] {${PORTABLE_TEXT}},
      description[$defaultLocale][] {${PORTABLE_TEXT}}
    )
`

export const QUOTE_LOCALE = /* groq */ `
  'quote':
    coalesce(
      quote[$locale][] {${PORTABLE_TEXT}},
      quote[$defaultLocale][] {${PORTABLE_TEXT}}
    )
`

export const BODY_LOCALE = /* groq */ `
  'body': coalesce(
    body[$locale][] {${PORTABLE_TEXT}},
    body[$defaultLocale][] {${PORTABLE_TEXT}}
  )
`

export const CAPTION_LOCALE_PT = /* groq */ `
  'caption': coalesce(
    caption[$locale][] {${PORTABLE_TEXT}},
    caption[$defaultLocale][] {${PORTABLE_TEXT}}
  )
`

export const TEXT_MODULE = /* groq */ `
  _type == 'moduleText' => {
    _type,
    _key,
    ${TITLE_LOCALE},
    ${BODY_LOCALE}
  }
`

export const QUOTE_MODULE = /* groq */ `
  _type == 'moduleQuote' => {
    _type,
    _key,
    author,
    ${BODY_LOCALE}
  }
`

export const IMAGE_MODULE = /* groq */ `
  _type == 'moduleImage' => {
    _type,
    _key,
    ${IMAGE_LOCALE},
    ${CAPTION_LOCALE_PT},
    ratio
  }
  `

export const VIDEO_MODULE = /* groq */ `
  _type == 'moduleVideo' => {
    _type,
    _key,
    ${VIDEO_LOCALE},
    ${CAPTION_LOCALE_PT}
  }
`

export const SLIDER_MODULE = /* groq */ `
  _type == 'moduleSlider' => {
    _type,
    _key,
    medias[]{
      ${IMAGE_MODULE},
      ${VIDEO_MODULE},
    }
  }
`

export const INFO_MODULE = /* groq */ `
  _type == 'moduleInfo' => {
    _type,
    _key,
    ${TITLE_LOCALE},
    modules[]{
      _key,
      ${BODY_LOCALE},
      ${TITLE_LOCALE},
      modules[]{
        _type == 'localeBody' => {
          "_type": "moduleText",
          _key,
          'body': en[] {${PORTABLE_TEXT}}
        },
        ${SLIDER_MODULE}
      }
    }
  }
`

export const IMAGE_CHRONOLOGY_MODULE = /* groq */ `
  _type == 'moduleChronologyImage' => {
    _type,
    _key,
    ${IMAGE_LOCALE},
    ${CAPTION_LOCALE_PT},
    ratio,
    modules[] {
      ${INFO_MODULE},
      ${IMAGE_MODULE},
      ${VIDEO_MODULE},
      ${SLIDER_MODULE},
      ${TEXT_MODULE},
      ${QUOTE_MODULE}
    }
  }
  `

export const VIDEO_CHRONOLOGY_MODULE = /* groq */ `
  _type == 'moduleChronologyVideo' => {
    _type,
    _key,
    ${VIDEO_LOCALE},
    ${CAPTION_LOCALE_PT},
    modules[] {
      ${INFO_MODULE},
      ${IMAGE_MODULE},
      ${VIDEO_MODULE},
      ${SLIDER_MODULE},
      ${TEXT_MODULE},
      ${QUOTE_MODULE}
    }
  }
`

export const SUBGROUP_MODULE = /* groq */ `
  _type == 'moduleSubgroup' => {
    _key,
    _type,
    ${TITLE_LOCALE},
    ${DESCRIPTION_LOCALE},
    pages[]->{
      _type == 'publication' => {
        _id,
        _type,
        title,
        year,
        ${SLUG},
        ${IMAGE_LOCALE}
      },
      _type == 'vimeo' => {
        _id,
        _type,
        "title": name,
        "vimeo": {
          aspectRatio,
          'paddingRatio': (height/width) * 100,
          srcset[] | order(width asc){
              width,
              rendition,
              quality,
              link
          },
          pictures[] | order(width asc){
              width,
              height,
              link
          },
          duration
        }
      }
    }
  }
`

export const SLIDER_IMAGE_MODULE = /* groq */ `
  _type == 'moduleSliderImage' => {
    _type,
    _key,
    ${IMAGE_LOCALE},
    imagePortrait{
      asset,
      copyright,
      ${IMAGE_META},
      ${CAPTION_LOCALE}
    },
    ${CAPTION_LOCALE_PT},
    color,
    linkInternal->{
      _type,
      slug,
      ${IMAGE_LOCALE}
    },
    linkExternal
  }
`

export const SLIDER_VIDEO_MODULE = /* groq */ `
  _type == 'moduleSliderVideo' => {
    _type,
    _key,
    ${VIDEO_LOCALE},
    ${CAPTION_LOCALE_PT},
    color,
    linkInternal->{
      ...
    },
    linkExternal
  }
`

export const HERO_MODULES = /* groq */ `
  hero {
    'modules': modules[] {
      ${IMAGE_MODULE},
      ${VIDEO_MODULE}
    }
  }
`

export const PRESS_MODULES = /* groq */ `
  press[] {
    ${TITLE_LOCALE},
    publisher,
    date,
    url,
    "file": file.asset->url
  }
`

export const CHRONOLOGY = /* groq */ `
  'chronologyTitle': coalesce(chronologyTitle[$locale], chronologyTitle[$defaultLocale]),
  'chronologyCredits': coalesce(chronologyCredits[$locale], chronologyCredits[$defaultLocale]),
  chronologyVisible,
  chronology[] {
    _type,
    _key,
    ${TITLE_LOCALE},
    dateStart,
    dateEnd,
    modules[] {
      ${IMAGE_CHRONOLOGY_MODULE},
      ${VIDEO_CHRONOLOGY_MODULE},
      ${QUOTE_MODULE},
      ${TEXT_MODULE}
    },
    modulesSecondary[] {
      ${IMAGE_CHRONOLOGY_MODULE},
      ${VIDEO_CHRONOLOGY_MODULE},
      ${QUOTE_MODULE},
      ${TEXT_MODULE}
    }
  }
`

export const PAGE_META = /* groq */ `
  'meta': seo {
    title,
    description,
    keywords,
    image
  }
`

export const LINK_MODULES = /* groq */ `
  'links': links[] {
    label,
    url,
    newTab
  }
`
