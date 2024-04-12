import { ImageIcon } from '@sanity/icons'

export default {
  name: 'figure',
  type: 'image',
  icon: ImageIcon,
  options: {
    hotspot: true
  },
  fields: [
    {
      title: 'Caption',
      name: 'caption',
      type: 'localeString',
      options: { isHighlighted: true },
    },
    {
      title: 'Copyright',
      name: 'copyright',
      type: 'string',
      options: { isHighlighted: true },
    },
  ],
  preview: {
    select: {
      media: 'asset.url',
      originalFilename: 'asset.originalFilename',
    },
    prepare: ({ media, originalFilename }) => ({
      title: originalFilename,
      imageUrl: media,
    }),
  },
}
