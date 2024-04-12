import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";

export default {
  name: "location",
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
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "location" }),
    {
      name: "title",
      group: "info",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      group: "info",
      type: "slug",
      options: {
        source: (document) => document.title,
        maxLength: "96",
      },
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
      name: "city",
      type: "string",
      placeholder: "Paris",
    },
    {
      name: "country",
      type: "string",
      placeholder: "France",
    },
    {
      name: "description",
      group: "info",
      type: "localeBody",
    },
    // {
    //   name: "modules",
    //   group: "content",
    //   type: "array",
    //   of: [
    //     { title: "Image", type: "moduleImage" },
    //     // { title: 'Video', type: 'moduleVideo' },
    //     { title: "Slider", type: "moduleSlider" },
    //   ],
    // },
    {
      title: "SEO",
      name: "seo",
      type: "seo",
    },
  ],
  preview: {
    select: {
      title: "title",
      image: "image",
    },
    prepare: ({ title, image }) => {
      return {
        title,
        media: image,
      };
    },
  },
};
