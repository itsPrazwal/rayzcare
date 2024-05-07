import { getGlobalMeta, getSettings } from '~/queries/settings'
import { Head } from '~/components/Head'
import { Layout } from '~/components/Layout'
import { Title } from '~/components/Title'
import { RichText } from '~/components/RichText'

export default function PrivacyPolicyPage({ globalMeta, settings }) {
  console.log({settings})
  return (
    <Layout>
      <Head global={globalMeta} pageTitle="Privacy policy" />

      <div className="flex flex-col">
        <Title>Privacy policy</Title>
        <div className="text-style-description md:px-[5rem]">
          <RichText value={settings?.privacyPolicy} />
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
