import Link from 'next/link'
import * as React from 'react'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { LogoIcon } from '~/components/Icons'
import { NewsletterSubscribe } from '~/components/NewsletterSubscribe'
import { getFooterContent } from '~/queries/footer'

const footerLinks = [
  { name: 'Terms & Conditions', href: '/pages/terms-&-conditions' },
  { name: 'Accessibility', href: '/pages/accessibility' },
  { name: 'Privacy policy', href: '/pages/privacy-policy' }
]

export function Footer() {
  const { locale, defaultLocale } = useRouter()

  const [footerContent, setFooterContent] = React.useState({})

  React.useEffect(() => {
    ;(async () => {
      const res = await getFooterContent({ locale, defaultLocale })
      setFooterContent(res)
    })()
  }, [locale, defaultLocale])

  return (
    <div className="flex w-full flex-col items-center justify-between gap-16 px-24 py-12 sm:gap-10 md:h-[--footer-height]">
      <div className="flex w-full items-center justify-center">
        <Link href="/">
          <LogoIcon className="w-[10rem]" />
        </Link>
      </div>

      <div className="flex w-full justify-center gap-45 sm:gap-10">
        {footerContent?.locations?.slice(0, 4)?.map(({ _id, city }) => (
          <div key={_id} className="text-style-description uppercase sm:text-12">
            {city}
          </div>
        ))}
      </div>
      <NewsletterSubscribe
        listID={process.env.MAILCHIMP_AUDIENCE_ID}
        message="Thank you. You are now subscribed."
      />
      <div className="flex w-full items-center justify-between sm:flex-col-reverse sm:gap-16">
        <div className="text-style-caption flex gap-20 uppercase text-accent sm:mt-20 sm:w-full sm:flex-col sm:items-center sm:gap-4 sm:text-11 md:text-11 lg:text-12">
          <div>© 2024 Rayzcare</div>
          <div className="flex justify-center sm:w-full sm:gap-10 md:gap-20">
            {footerLinks.map(item => (
              <Link key={item.name} href={item.href}>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-10">
          {footerContent?.socialLinks?.map(item => (
            <NextLink
              href={item.link}
              key={item.title}
              title={item.title}
              className="inline-block w-auto"
            >
              <Image width={20} height={20} src={item.icon} alt={item.title} />
            </NextLink>
          ))}
          <Link href="/contact" title="Contact us">
            <svg
              width="20"
              height="20"
              viewBox="0 0 26 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="0.458252" width="25.8333" height="18.0833" rx="3" fill="#1946AD" />
              <path
                d="M3.875 4.33325L12.9167 9.49992L21.9583 4.33325"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
