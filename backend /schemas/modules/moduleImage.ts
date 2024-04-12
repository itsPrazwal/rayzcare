import { ImageIcon } from "@sanity/icons";

export default {
  name: "moduleImage",
  type: "object",
  icon: ImageIcon,
  fields: [
    {
      name: "image",
      type: "figure",
    },
    {
      name: "caption",
      title: "Module Caption",
      type: "localeBody",
    },
    {
      name: 'ratio',
      type: 'ratio'
    }
    // {
    //   title: 'Layout',
    //   name: 'layout',
    //   type: 'string',
    //   initialValue: 'centered',
    //   options: {
    //     list: [
    //       { value: 'full', title: 'Full' },
    //       { value: 'centered', title: 'Centered' },
    //     ],
    //     isHighlighted: true,
    //   },
    // },
  ],
  preview: {
    select: {
      caption: "image.caption.en",
      copyright: "image.copyright",
      media: "image",
    },
    prepare: ({ caption, copyright, media }) => ({
      title: caption,
      subtitle: "(Image) " + (copyright || ""),
      media,
    }),
  },
};
