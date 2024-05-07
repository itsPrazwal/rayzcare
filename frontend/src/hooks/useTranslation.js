import { useRouter } from 'next/router'
import { translations } from '~/utils/translations'

export const useTranslation = () => {
  const { locale } = useRouter()
  const t = translations[locale]

  return t
}
