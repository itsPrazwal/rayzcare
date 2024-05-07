import clsx from 'clsx'
import Link from 'next/link'
import * as React from 'react'
import { Portal } from 'react-portal'
import { useRouter } from 'next/router'
import { useMediaQuery } from 'react-responsive'
import { m, AnimatePresence } from 'framer-motion'

import { LogoIcon } from '~/components/Icons'
import { ToggleIcon } from '~/components/Icons'
import { Breadcrumb } from '~/components/Breadcrumb'

export function Header() {
  const router = useRouter()
  const isHome = router.pathname === '/'

  const [open, setOpen] = React.useState(false)
  const isMobile = useMediaQuery({query: '(max-width: 1024px)'})

  const headerRef = React.useRef()

  const menu = [
    {name: 'Services', href: '/services'},
    {name: 'About', href: '/pages/about'},
    {name: 'Gallery', href: '/gallery'},
    {name: 'Contact', href: '/contact'}
  ]

  return (
    <>
      <header
        ref={headerRef}
        className={clsx('md:h-[--header-height] sm:border-b-2 md:shadow-gray-200 md:shadow-md fixed grid grid-cols-12 inset-x-0 top-0 z-20 w-full px-20 py-10 pb-5 text-accent bg-white')}
      >
        <Link href="/" className="col-span-3 sm:col-span-9">
          <LogoIcon className="sm:h-[1.95rem] md:h-[2.5rem] w-auto"/>
        </Link>
        {!isMobile
          ? (
            <div className="col-span-6 flex gap-20 justify-center items-center">
              {menu.map(item => (
                <Link href={item.href} key={item.name} className="uppercase">{item.name}</Link>
              ))}
            </div>
          )
          : (
            <>
              <button
                onClick={() => setOpen(!open)}
                className="col-span-3 text-accent text-right"
              >
                <m.span
                  initial={false}
                  animate={{rotate: open ? '45deg' : 0}}
                  transition={{duration: 0.1, ease: 'easeOut'}}
                  className="inline-block w-[1.3rem]"
                >
                  <ToggleIcon/>
                </m.span>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <Portal>
                    <m.div
                      initial={{bottom: '100%'}}
                      animate={{bottom: '0%'}}
                      exit={{bottom: '100%'}}
                      transition={{ease: 'circOut', duration: 0.25}}
                      className="fixed bottom-0 left-0 right-0 top-0 z-20 overflow-hidden"
                    >
                      <div
                        className="absolute left-0 top-0 flex h-full w-full flex-col gap-10 border-b-0 border-accent bg-white px-20 pb-15 pt-10 text-accent md:h-min lg:gap-0">
                        <div className="lg:column-gap-20 grid items-center gap-10 lg:grid-cols-[12rem_1fr] lg:gap-40">
                          <div className="border-b-2 py-10 mb-10 w-full flex justify-between items-center">
                            <Link href="/" className="w-max">
                              <LogoIcon className="h-[1.95rem] w-auto"/>
                            </Link>
                            <button
                              onClick={() => setOpen(!open)}
                              className="w-[1.3rem]"
                            >
                              <m.span
                                initial={false}
                                animate={{rotate: '45deg'}}
                                transition={{duration: 0.1, ease: 'easeOut'}}
                                className="block"
                              >
                                <ToggleIcon/>
                              </m.span>
                            </button>
                          </div>
                          <ul
                            className="text-style-subtitle menu-title flex flex-col gap-20 leading-8 lg:flex-row lg:gap-20 lg:whitespace-nowrap lg:leading-10">
                            {menu.map(({name, href}) => (
                              <li key={name} className="uppercase">
                                <Link href={href}>{name}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </m.div>
                  </Portal>
                )}
              </AnimatePresence>
            </>
          )}
      </header>
    </>
  )
}
