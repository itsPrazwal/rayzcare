import { getGlobalMeta, getSettings } from '~/queries/settings'
import { Head } from '~/components/Head'
import { Layout } from '~/components/Layout'
import { Title } from '~/components/Title'
import { RichText } from '~/components/RichText'

export default function AccessibilityPage({ globalMeta, settings }) {
  return (
    <Layout>
      <Head global={globalMeta} pageTitle="Accessibility" />

      <div className="mt-[--breadcrumb-height] flex flex-col gap-30 p-20">
        <Title>Accessibility</Title>
        <div className="text-style-description md:px-[5rem]">
          <RichText value={settings?.accessibility} />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ locale, defaultLocale }) {
  const [globalMeta, settings] = await Promise.all([
    getGlobalMeta(),
    getSettings({ locale, defaultLocale })
  ])

  return {
    props: {
      globalMeta,
      settings
    }
  }
}
