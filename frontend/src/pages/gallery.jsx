import { getGlobalMeta } from '~/queries/settings'
import { Layout } from '~/components/Layout'
import { Head } from '~/components/Head'
import { Title } from '~/components/Title'

export default function GalleryPage({ globalMeta }) {

  return (
    <Layout>
      <Head global={globalMeta} pageTitle={'Gallery'} meta={{}} />

      <div className="flex flex-col gap-30">
        <Title>Gallery</Title>

        <div className="-mt-25 grid md:grid-cols-12">
          Coming Soon...
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ locale, defaultLocale }) {
  const [globalMeta] = await Promise.all([
    getGlobalMeta({ locale, defaultLocale }),
  ])

  return {
    props: {
      globalMeta,
    }
  }
}
