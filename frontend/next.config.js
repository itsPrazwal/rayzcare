/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    localeDetection: false
  },
  experimental: {
    scrollRestoration: true
  },
  images: {
    domains: ['cdn.sanity.io']
  },
  async redirects() {
    return [
      {
        source: '/exhibitions/type',
        destination: '/exhibitions',
        permanent: true
      },
      {
        source: '/art-fairs/type',
        destination: '/art-fairs',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
