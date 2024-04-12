export default {
  name: 'productOption',
  type: 'object',
  readOnly: true,
  fields: [
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'values',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
  preview: {
    select: {
      name: 'name',
    },
    prepare: ({ name }) => ({
      title: name,
    }),
  },
}
