import NextHead from 'next/head'
import { useRouter } from 'next/router'
import { urlFor } from '~/lib/sanity'
import { mergeMeta } from '~/utils/mergeMeta'
import { SITE_TITLE, SITE_URL } from '~/utils/constants'

export function Head({ global, pageTitle, meta }) {
  const { domain, favicon } = global
  const { title, description, keywords, image } = mergeMeta(meta, global)

  const { asPath, locale } = useRouter()

  const META_TITLE =
    pageTitle && title === SITE_TITLE
      ? pageTitle + ' | ' + SITE_TITLE
      : title !== SITE_TITLE
      ? title + ' | ' + SITE_TITLE
      : SITE_TITLE
  const META_URL = (domain || SITE_URL) + (locale === 'en' ? '/en' + asPath : asPath)
  const META_IMAGE = image && urlFor(image).width(1200).height(630).url()

  return (
    <NextHead>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
      <meta name="pinterest" content="nopin" />

      {/** Primary Meta Tags */}
      <title>{META_TITLE}</title>
      <meta name="description" content={description} />
      <meta name="description" content={keywords} />

      {/** Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={META_URL} />
      <meta property="og:title" content={META_TITLE} />
      {image && <meta property="og:image" content={META_IMAGE} />}
      {description && <meta property="og:description" content={description} />}

      {/** Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={META_URL} />
      <meta name="twitter:title" content={META_TITLE} />
      {image && <meta name="twitter:image" content={META_IMAGE} />}
      {description && <meta name="twitter:description" content={description} />}

      {/** Favicons */}
      {favicon && (
        <>
          <link
            sizes="16x16"
            type="image/png"
            rel="icon"
            href={urlFor(favicon).width(16).height(16).url()}
          />
          <link
            sizes="32x32"
            type="image/png"
            rel="icon"
            href={urlFor(favicon).width(32).height(32).url()}
          />
          <link
            sizes="96x96"
            type="image/png"
            rel="icon"
            href={urlFor(favicon).width(96).height(96).url()}
          />
          <link
            sizes="192x192"
            type="image/png"
            rel="icon"
            href={urlFor(favicon).width(192).height(192).url()}
          />
        </>
      )}
    </NextHead>
  )
}
