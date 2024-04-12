import { BlockquoteIcon } from '@sanity/icons'

export default {
  name: 'moduleQuote',
  type: 'object',
  icon: BlockquoteIcon,
  fields: [
    {
      name: 'body',
      type: 'localeBody',
    },
    {
      name: 'author',
      type: 'string',
    }
  ],
  preview: {
    select: {
      author: 'author',
      bodyEn: 'body.en',
    },
    prepare: ({ author, bodyEn }) => {
      const firstBlock = (bodyEn || []).find(block => block._type === 'block')
      return {
        title: author,
        subtitle: firstBlock
          ? firstBlock.children
            .filter(child => child._type === 'span')
            .map(span => span.text)
            .join('')
          : 'No title'
      }
    },
  },
}