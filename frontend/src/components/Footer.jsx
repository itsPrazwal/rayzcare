import Link from 'next/link'
import * as React from 'react'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

// import ndisImg from 'public/images/ilovendis.png'

import { LogoIcon } from '~/components/Icons'
import { NewsletterSubscribe } from '~/components/NewsletterSubscribe'
import { getFooterContent } from '~/queries/footer'

const footerLinks = [
  {name: 'Terms & Conditions', href: '/pages/terms-&-conditions'},
  {name: 'Accessibility', href: '/pages/accessibility'},
  {name: 'Privacy policy', href: '/pages/privacy-policy'}
]

export function Footer() {
  const {locale, defaultLocale} = useRouter()

  const [footerContent, setFooterContent] = React.useState({})

  React.useEffect(() => {
    ;(async () => {
      const res = await getFooterContent({locale, defaultLocale})
      setFooterContent(res)
    })()
  }, [locale, defaultLocale])

  return (
    <div className="w-full flex flex-col justify-between  bg-gray-800 md:h-[--footer-height]">
      <div className="flex md:h-[--footer-height] flex-col justify-between px-24 py-12 ">
        <div className="grid grid-cols-12 gap-4">
          <div className="flex flex-col w-full items-center justify-start h-full col-span-6">
            <Link href="/">
              <LogoIcon height="100"/>
            </Link>
          </div>
          <div className="flex flex-col w-full items-center justify-end h-full col-span-4">
            <NewsletterSubscribe
              listID={process.env.MAILCHIMP_AUDIENCE_ID}
              message="Thank you. You are now subscribed."
            />
          </div>
          <div className="flex w-full items-center justify-center px-10 col-span-2">
            {/*<Image src={ndisImg} alt="ilovendis"/>*/}
          </div>
        </div>
        <div className="grid grid-cols-12 text-style-caption text-white uppercase">
          <div className="col-span-6 flex justify-center sm:w-full sm:gap-10 md:gap-20">
            {footerLinks.map(item => (
              <Link key={item.name} href={item.href}>
                {item.name}
              </Link>
            ))}
          </div>
          <div className="col-span-4"/>
          <div className="col-span-2 flex justify-center sm:w-full sm:gap-10 md:gap-20">
            {footerContent?.socialLinks?.map(item => (
              <NextLink
                href={item.link}
                key={item.title}
                title={item.title}
                className="inline-block w-auto"
              >
                <Image width={30} height={30} src={item.icon} alt={item.title}/>
              </NextLink>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full h-26 bg-theme py-8 font-bold text-gray-800 text-center uppercase text-10">
        © Rayzs care 2024
      </div>
    </div>
  )
}
