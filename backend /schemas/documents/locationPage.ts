export default {
  name: "locationPage",
  type: "document",
  groups: [
    {
      name: "info",
      title: "Info",
    },
    {
      name: "content",
      title: "Content",
    },
  ],
  fields: [
    {
      name: "title",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "hero",
      group: "info",
      type: "hero",
    },
    {
      title: "Featured image",
      name: "image",
      group: "info",
      type: "figure",
    },
    {
      name: "description",
      group: "info",
      type: "localeBody",
    },
    {
      title: "SEO",
      name: "seo",
      type: "seo",
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
};
