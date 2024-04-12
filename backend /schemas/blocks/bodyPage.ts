import { Large, Heading } from '../../components/BlockRenders'

export default {
  name: 'bodyPage',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        {
          title: 'Normal',
          value: 'normal',
        },
        {
          title: 'Large',
          value: 'large',
          blockEditor: { render: Large },
        },
        {
          title: 'Heading (Small)',
          value: 'heading',
          blockEditor: { render: Heading },
        },
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }],
      marks: {
        decorators: [],
        annotations: [
          { name: 'annotationLinkExternal', type: 'annotationLinkExternal' },
          { name: 'annotationLinkInternal', type: 'annotationLinkInternal' },
        ],
      },
    },
  ],
}
