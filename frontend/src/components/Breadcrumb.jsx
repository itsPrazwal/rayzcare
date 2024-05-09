import * as React from 'react'
import { useAtom } from 'jotai'
import { useRect } from '@reach/rect'
import { breadcrumbHeight } from '~/atoms'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useLayoutContext } from '~/components/Layout'

export function Breadcrumb() {
  const router = useRouter()
  const { breadCrumbs: ctxBreadCrumbs } = useLayoutContext()

  const [breadcrumbs, setBreadcrumbs] = React.useState(null)

  const headerRef = React.useRef()
  const headerRect = useRect(headerRef)
  const [height, setHeight] = useAtom(breadcrumbHeight)

  const convertBreadcrumb = string => {
    const cleanUrl = string.replace(/(\?|&)fbclid=[^&]*/gi, '').replace(/#[^&]*/gi, '')
    return cleanUrl.replace(/-s-/g, '’s ').replace(/-s$/g, '’s').replace(/-/g, ' ').toUpperCase()
  }

  React.useEffect(() => {
    if (ctxBreadCrumbs?.length > 0) {
      setBreadcrumbs(ctxBreadCrumbs.filter(i => i.label))
    } else {
      if (router) {
        const linkPath = router.asPath.split('/')
        linkPath.shift()

        const pathArray = linkPath
          .map((path, index) => {
            return ['pages'].includes(path)
              ? null
              : { label: path, route: '/' + linkPath.slice(0, index + 1).join('/') }
          })
          .filter(n => n)

        setBreadcrumbs(pathArray)
      }
    }
  }, [router, ctxBreadCrumbs])

  React.useEffect(() => {
    if (!headerRect) return

    setHeight(headerRect.height)
  }, [headerRect, setHeight])

  if (!breadcrumbs) return null

  return (
    <header
      ref={headerRef}
      className="text-style-subtitle pointer-events-none flex w-full items-center overflow-hidden bg-white"
    >
      <ul className="flex text-accent">
        <li className="pointer-events-auto whitespace-nowrap">
          <Link href="/">Rayzscare</Link>
        </li>
        {breadcrumbs.map(({ label, route }) => (
          <li
            key={route}
            className="pointer-events-auto overflow-hidden text-ellipsis whitespace-nowrap before:px-4 before:content-['/']"
          >
            {route ? (
              <Link href={route} className="">
                {convertBreadcrumb(label)}
              </Link>
            ) : (
              <span className="cursor-default">{convertBreadcrumb(label)}</span>
            )}
          </li>
        ))}
      </ul>
    </header>
  )
}
