import { DocumentIcon } from '@sanity/icons'

export default {
  name: 'page',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'localeString',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      type: 'localeBody',
    },
    {
      name: "modules",
      type: "array",
      of: [
        { title: "Text", type: "moduleText" },
        { title: "Quote", type: "moduleQuote" },
        { title: "Info", type: "moduleInfo" },
        { title: "Image", type: "moduleImage" },
        { title: 'Video', type: 'moduleVideo' }
      ],
    },
    {
      title: 'SEO',
      name: 'seo',
      type: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'title.en',
    },
    prepare({ title }) {
      return {
        title,
        media: DocumentIcon,
      }
    },
  },
}
