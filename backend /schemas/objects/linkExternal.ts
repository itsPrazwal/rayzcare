import { EarthGlobeIcon } from '@sanity/icons'

export default {
  title: 'External Link',
  name: 'linkExternal',
  type: 'object',
  icon: EarthGlobeIcon,
  initialValue: {
    newWindow: true,
  },
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'URL',
      name: 'url',
      type: 'url',
      validation: Rule => Rule.required().uri({ scheme: ['http', 'https'] }),
    },
    {
      title: 'Open in a new window?',
      name: 'newWindow',
      type: 'boolean',
    },
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url',
    },
    prepare({ title, url }) {
      let subtitle = []
      if (url) {
        subtitle.push(`→ ${url}`)
      }

      return {
        subtitle: subtitle.join(' '),
        title,
      }
    },
  },
}
