import { createClient } from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'
import { LiveQueryProvider } from '@sanity/preview-kit'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || ''
export const sanityReadToken = process.env.NEXT_PUBLIC_SANITY_READ_TOKEN || ''
export const sanityPreviewEnabled = process.env.NEXT_PUBLIC_SANITY_PREVIEW_LIVE === 'enable'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-02-01',
  useCdn: false,
  token: sanityPreviewEnabled ? sanityReadToken : '',
  ignoreBrowserTokenWarning: true,
  perspective: sanityPreviewEnabled ? 'previewDrafts' : 'published'
})

export const urlFor = source =>
  !!source
    ? createImageUrlBuilder({ projectId, dataset }).image(source).auto('format').fit('max')
    : null

export const SanityLivePreviewProvider = ({ children }) => {
  return (
    <LiveQueryProvider client={client} refreshInterval={5000}>
      {children}
    </LiveQueryProvider>
  )
}
