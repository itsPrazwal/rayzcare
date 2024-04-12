export default {
  name: "body",
  type: "array",
  of: [
    {
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Title", value: "h2" },
        { title: "Subtitle", value: "h4" },
      ],
      lists: [{ title: "Bullet", value: "bullet" }],
      marks: {
        decorators: [
          { title: "Italic", value: "em" },
          { title: "Strong", value: "strong" },
        ],
        annotations: [
          { name: "annotationLinkExternal", type: "annotationLinkExternal" },
          { name: "annotationLinkInternal", type: "annotationLinkInternal" },
        ],
      },
    },
    {
      type: "figure",
      validation: (Rule) => Rule.required(),
    },
    {
      type: "figureVideo",
      validation: (Rule) => Rule.required(),
    },
  ],
};
