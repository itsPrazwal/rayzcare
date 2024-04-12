import { TrolleyIcon } from '@sanity/icons'

export default {
  name: 'featured',
  type: 'object',
  icon: TrolleyIcon,
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
      name: 'limit',
      type: 'number',
      initialValue: 10,
      validation: Rule => Rule.positive().min(1).max(30).required(),
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
