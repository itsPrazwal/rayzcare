export default {
  name: 'teamPage',
  type: 'document',
  groups: [
    {
      name: 'info',
      title: 'Info',
    },
    {
      name: 'content',
      title: 'Content',
    }
  ],
  fields: [
    {
      name: 'title',
      type: 'localeString',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Featured image',
      name: 'image',
      group: 'info',
      type: 'figure',
    },
    {
      name: "hero",
      group: "content",
      type: "hero",
    },
    {
      name: 'description',
      group: 'info',
      type: 'localeBody',
    },
    {
      name: 'modules',
      type: 'array',
      of: [
        { title: 'Teams', type: 'moduleTeams' },
      ],
    },
    {
      title: 'SEO',
      name: 'seo',
      type: 'seo',
    },
  ],
  preview: {
    select: {
      title: "title.en",
      featured: "featured"
    },
    prepare: ({ title, featured }) => {
      return {
        title,
        media: featured,
      };
    },
  },
}
