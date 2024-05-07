import Link from 'next/link'
import { getGlobalMeta } from '~/queries/settings'
import { paths } from '~/utils/paths'
import { useTranslation } from '~/hooks/useTranslation'
import { Layout } from '~/components/Layout'
import { Head } from '~/components/Head'
import { Title } from '~/components/Title'

export default function NotFound({ globalMeta }) {
  const t = useTranslation()

  return (
    <Layout>
      <Head global={globalMeta} />

      <div className="mt-80 p-20">
        <Title renderAs="h1">{t.notFound}</Title>

        <Link
          href={paths.home}
          className="text-style-subtitle mt-10 block text-accent underline decoration-1 underline-offset-text hover:no-underline"
        >
          {t.home}
        </Link>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ locale, defaultLocale }) {
  const globalMeta = await getGlobalMeta({ locale, defaultLocale })

  return {
    props: {
      globalMeta
    }
  }
}
