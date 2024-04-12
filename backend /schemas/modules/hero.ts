import { ImageIcon } from '@sanity/icons'

export default {
  name: 'hero',
  type: 'object',
  icon: ImageIcon,
  fields: [
    {
      title: 'Heading (Optional)',
      name: 'heading',
      type: 'string',
    },
    {
      name: 'collection',
      type: 'reference',
      to: [{ type: 'collection' }],
    },
    {
      name: 'color',
      type: 'color',
      options: {
        disableAlpha: true,
      },
    },
    {
      name: 'image',
      type: 'image',
      fields: [
        {
          title: 'Layout',
          name: 'layout',
          type: 'string',
          initialValue: 'centered',
          options: {
            list: [
              { value: 'full', title: 'Full' },
              { value: 'centered', title: 'Centered' },
            ],
            isHighlighted: true,
          },
        },
      ],
    },
    {
      title: 'Video',
      name: 'video',
      type: 'reference',
      to: [
        {
          type: 'vimeo',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'collection.title',
      slug: 'collection.slug',
    },
    prepare: ({ title, slug }) => ({
      title,
      subtitle: `/collection/${slug.current}`,
    }),
  },
}
