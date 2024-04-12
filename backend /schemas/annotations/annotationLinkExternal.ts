import { LinkIcon } from '@sanity/icons'

export default {
  title: 'Link',
  name: 'annotationLinkExternal',
  type: 'object',
  blockEditor: { icon: LinkIcon },
  fields: [
    {
      title: 'URL',
      name: 'url',
      type: 'url',
      validation: Rule =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    },
  ],
}
