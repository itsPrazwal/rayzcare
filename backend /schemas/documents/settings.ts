export default {
  title: "Settings",
  name: "settings",
  type: "document",
  fields: [
    {
      title: "Links",
      name: "linksFirst",
      type: "array",
      of: [{ type: "reference", to: [{ type: "page" }] }],
    },
    {
      title: "Secondary Links",
      name: "linksSecond",
      type: "array",
      of: [{ type: "reference", to: [{ type: "page" }] }],
    },
    {
      title: "Privacy policy",
      name: "privacyPolicy",
      type: "localeBody",
    },
    {
      title: "Accessibility",
      name: "accessibility",
      type: "localeBody",
    },
    {
      title: "Terms & Conditions",
      name: "termsConditions",
      type: "localeBody",
    },
  ],
  preview: {
    prepare: () => ({
      title: "Footer Settings",
    }),
  },
};
