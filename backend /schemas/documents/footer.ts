export default {
  title: "Footer",
  name: "footerContent",
  type: "document",
  fields: [
    {
      title: "Locations",
      name: "locations",
      type: "array",
      of: [{ type: "reference", to: [{ title: "Locations", type: "location" }] }],
      validation: (Rule) => (Rule.unique() && Rule.max(4)),
    },
    {
      title: 'Social Media Links',
      name: 'socialLinks',
      type: 'array',
      of: [{type: 'socialMedia', title: 'Social Media'}]
    }
  ],
  preview: {
    prepare: () => ({
      title: "Footer Content",
    }),
  },
};
