import { getGlobalMeta } from '~/queries/settings'
import { getPagePaths, getPage } from '~/queries/pages'
import { Layout } from '~/components/Layout'
import { Head } from '~/components/Head'
import { Title } from '~/components/Title'
import { Hero } from '~/components/Hero'
import { RichText } from '~/components/RichText'
import Information from '~/modules/Information'
import Text from '~/modules/Text'
import Image from '~/modules/Image'

export default function Page({globalMeta, page}) {
  const {title, description, hero, image, modules, meta} = page

  const moduleMap = {
    moduleInfo: Information,
    moduleText: Text,
    moduleImage: Image
  }

  return (
    <Layout>
      <Head global={globalMeta} pageTitle={title} meta={meta}/>

      <Hero modules={hero?.modules} fallback={image} className=""/>
      <div className={`flex flex-col gap-30`}>
        <Title>{title}</Title>

        <div className="grid md:grid-cols-12">
          <div className="text-style-description md:col-span-10 md:col-start-2">
            <RichText value={description}/>
          </div>
        </div>

        {modules?.length > 0 &&
          modules.map(module =>
            moduleMap[module._type]
              ? moduleMap[module._type]({
                key: module._key,
                data: module
              })
              : null
          )}
      </div>
    </Layout>
  )
}

export async function getStaticProps({params, locale, defaultLocale}) {
  const [globalMeta, page] = await Promise.all([
    getGlobalMeta({locale, defaultLocale}),
    getPage({slug: params.slug, locale, defaultLocale})
  ])

  return {
    props: {
      globalMeta,
      page
    }
  }
}

export async function getStaticPaths({locales}) {
  const data = await getPagePaths()

  const paths = []

  data.map(slug => {
    return locales.map(locale => {
      return paths.push({
        params: {slug},
        locale
      })
    })
  })

  return {
    paths,
    fallback: false
  }
}
