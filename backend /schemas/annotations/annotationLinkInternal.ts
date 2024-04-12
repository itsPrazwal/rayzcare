import { DocumentIcon } from '@sanity/icons'
import { PAGE_REFERENCES } from '../../constants'

export default {
  title: 'Internal Link',
  name: 'annotationLinkInternal',
  type: 'object',
  blockEditor: { icon: DocumentIcon },
  fields: [
    {
      name: 'reference',
      type: 'reference',
      weak: true,
      to: PAGE_REFERENCES,
    },
  ],
}
