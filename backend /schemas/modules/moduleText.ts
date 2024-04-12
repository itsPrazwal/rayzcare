import { EditIcon } from '@sanity/icons'

export default {
  name: 'moduleText',
  type: 'object',
  icon: EditIcon,
  fields: [
    {
      name: 'title',
      type: 'localeString',
    },
    {
      name: 'body',
      type: 'localeBody',
    },
    // {
    //   title: 'Style',
    //   name: 'style',
    //   type: 'string',
    //   initialValue: 'normal',
    //   options: {
    //     list: [
    //       { value: 'normal', title: 'Normal' },
    //       { value: 'large', title: 'Large' },
    //     ],
    //     isHighlighted: true,
    //   },
    // },
  ],
  preview: {
    select: {
      titleEn: 'title.en',
      bodyEn: 'body.en',
    },
    prepare: ({ titleEn, bodyEn }) => {
      const firstBlock = (bodyEn || []).find(block => block._type === 'block')
      return {
        title: titleEn,
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