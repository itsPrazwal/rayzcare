import { useAtom } from 'jotai'
// import { useMediaQuery } from 'react-responsive'
import { headerHeight, breadcrumbHeight } from '~/atoms'

export const useOffset = () => {
  // const isMobile = useMediaQuery({ query: '(min-width: 1024px)' })

  // const [desktop] = useAtom(headerHeight)
  // const [mobile] = useAtom(breadcrumbHeight)

  // const offset = isMobile ? mobile : desktop

  const [offset] = useAtom(breadcrumbHeight)

  return offset
}
