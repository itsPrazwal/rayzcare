export default {
  name: 'productInfo',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      type: 'body',
    },
  ],
}
