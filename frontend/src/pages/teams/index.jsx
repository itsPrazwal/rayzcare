import { getGlobalMeta } from '~/queries/settings'
import { getFounderPage, getFounders } from '~/queries/founder'
import { Layout } from '~/components/Layout'
import { Head } from '~/components/Head'
import { Hero } from '~/components/Hero'
import { RichText } from '~/components/RichText'
import Founders from '~/modules/Founders'
import {Title} from "~/components/Title";

export default function FoundersPage({ globalMeta, founderPage, founders }) {
  const { title, description, hero, image, modules, meta } = founderPage

  const moduleMap = {
    moduleFounders: Founders
  }

  return (
    <Layout>
      <Head global={globalMeta} pageTitle={title} meta={meta} />

      <div className="flex flex-col gap-30 p-20 pt-0 mt-[--header-height]">
        <Hero modules={hero?.modules} fallback={image} />

        <div className="-mt-25 grid md:grid-cols-12">
          <div className="text-style-description md:col-span-5 md:col-start-2">
            <RichText value={description} />
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-12 gap-4 h-full">
          <Title className="lg:col-span-3 md:mb-30 sm:mb-30">FOUNDERS</Title>
          <div className="lg:col-span-9">
            {modules?.length > 0 &&
              modules.map(module =>
                moduleMap[module._type]
                  ? moduleMap[module._type]({
                    key: module._key,
                    data: module,
                    title: title,
                  })
                  : null
              )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ locale, defaultLocale }) {
  const [globalMeta, founderPage, founders] = await Promise.all([
    getGlobalMeta({ locale, defaultLocale }),
    getFounderPage({ locale, defaultLocale }),
    getFounders({ locale, defaultLocale })
  ])

  return {
    props: {
      globalMeta,
      founderPage,
      founders
    }
  }
}
