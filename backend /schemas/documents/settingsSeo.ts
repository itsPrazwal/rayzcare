export default {
  name: 'settingsSeo',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      description: 'Title used for search engines and browsers.',
      validation: Rule =>
        Rule.required().max(50).warning('Longer titles may be truncated by search engines.'),
    },
    {
      name: 'description',
      type: 'text',
      rows: 3,
      description: 'Description for search engines.',
      // validation: Rule => Rule.max(250).warning('Longer descriptions may be truncated by search engines.'),
    },
    {
      name: 'domain',
      type: 'url',
      validation: Rule => Rule.required(),
    },
    {
      name: 'keywords',
      type: 'string',
      description: 'Comma-separated list of keywords.',
    },
    {
      name: 'image',
      type: 'image',
      description: 'Recommended size 1200x630 (will be auto resized).',
    },
    {
      name: 'favicon',
      type: 'image',
      description: '512x512 PNG required (will be auto resized).',
      options: { accept: 'image/png' },
    },
  ],
}
