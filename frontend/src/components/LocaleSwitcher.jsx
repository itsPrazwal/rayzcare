import * as React from 'react'
import { useRouter } from 'next/router'

export function LocaleSwitcher() {
  const router = useRouter()
  const {
    // locales,
    locale,
    asPath
  } = router

  // function handleChange(e) {
  //   router.push(asPath, asPath, { locale: e.target.value })
  // }

  function handleClick() {
    router.push(asPath, asPath, { locale: locale === 'fr' ? 'en' : 'fr' })
  }

  return (
    <button
      className="pointer-events-auto h-40 w-40 appearance-none rounded-full border border-solid border-[color:var(--bgColor)] bg-[color:var(--fgColor)] text-center text-12 uppercase text-[color:var(--bgColor)] hover:bg-black hover:text-white"
      onClick={handleClick}
    >
      {locale === 'fr' ? 'en' : 'fr'}
    </button>
  )

  // return (
  //   <select
  //     name="language"
  //     onChange={handleChange}
  //     defaultValue={locale}
  //     className="pointer-events-auto h-40 w-40 appearance-none rounded-full border border-dashed border-[color:var(--bgColor)] bg-[color:var(--fgColor)] text-center text-12 uppercase text-[color:var(--bgColor)]"
  //   >
  //     {locales.map(locale => (
  //       <option key={locale} label={locale} value={locale}>
  //         {locale}
  //       </option>
  //     ))}
  //   </select>
  // )
}
