const supportedLanguages = [
  { id: "en", title: "English", isDefault: true },
  // { id: 'fr', title: 'French' },
];

const baseLanguage = supportedLanguages.find((l) => l.isDefault);

export default {
  title: "Localized description",
  name: "localeBody",
  type: "object",
  fieldsets: [
    {
      title: "Translations",
      name: "translations",
      options: { collapsible: true },
    },
  ],
  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: "body",
    fieldset: lang.isDefault ? null : "translations",
  })),
  preview: {
    select: {
      bodyEn: "en",
    },
    prepare: ({ bodyEn }) => {
      const firstBlock = (bodyEn || []).find(
        (block) => block._type === "block"
      );
      return {
        title: firstBlock
          ? firstBlock.children
              .filter((child) => child._type === "span")
              .map((span) => span.text)
              .join("")
          : "No title",
      };
    },
  },
};
