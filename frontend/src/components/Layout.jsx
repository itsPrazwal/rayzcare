import { Header } from '~/components/Header'
import { createContext, useContext } from 'react'

/**
 * The object defining requirement of keys for bread crumb.
 * @typedef {Object} BreakCrumb
 * @property {string} label
 * @property {string} [route]
 */

/**
 * @type {React.Context<{breadCrumbs: BreakCrumb[]}>}
 */
const LayoutContext = createContext({ breadCrumbs: [] })

/**
 * @param {React.Children} children
 * @param {BreakCrumb[]} [breadCrumbs]
 * @return {JSX.Element}
 * @constructor
 */
export function Layout({ children, breadCrumbs = [] }) {
  return (
    <LayoutContext.Provider value={{ breadCrumbs }}>
      <Header />
      <main className="md:min-h-[--body-min-height] mt-[--header-height] p-20">{children}</main>
    </LayoutContext.Provider>
  )
}

export const useLayoutContext = () => useContext(LayoutContext)
