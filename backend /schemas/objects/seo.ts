export default {
  name: 'seo',
  type: 'object',
  options: { collapsed: true, collapsible: true },
  fields: [
    {
      title: 'Title (Overrides default title)',
      name: 'title',
      type: 'string',
      validation: Rule => Rule.max(50).warning('Longer titles may be truncated by search engines.'),
    },
    {
      name: 'description',
      type: 'text',
      rows: 3,
      // validation: Rule =>
      //   Rule.max(150).warning('Longer descriptions may be truncated by search engines.'),
    },
    {
      name: 'keywords',
      type: 'string',
      description: 'Comma-separated list of keywords.',
    },
    {
      title: 'Image (Overrides default image)',
      name: 'image',
      type: 'image',
    },
  ],
}
