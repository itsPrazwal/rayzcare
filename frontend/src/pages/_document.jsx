import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect dns-prefetch" href="https://cdn.sanity.io" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id="modal-root" />
      </body>
    </Html>
  )
}
