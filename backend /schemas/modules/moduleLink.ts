import { LinkIcon } from "@sanity/icons";

export default {
  name: "moduleLink",
  type: "object",
  icon: LinkIcon,
  fields: [
    {
      title: "Display Label",
      name: "label",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "URL Path",
      name: "url",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Open in new tab ?',
      name: 'newTab',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: "label",
      url: "url",
    },
    prepare: ({ title, url }) => {
      return {
        title,
        subtitle: url,
      };
    },
  },
};
