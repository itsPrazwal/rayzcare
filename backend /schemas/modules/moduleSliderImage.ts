import { ImageIcon } from "@sanity/icons";

export default {
  name: "moduleSliderImage",
  type: "object",
  icon: ImageIcon,
  fields: [
    {
      name: "image",
      type: "figure",
    },
    {
      name: "imagePortrait",
      type: "figure",
    },
    {
      name: "caption",
      title: "Module Caption",
      type: "localeBody",
    },
    {
      type: "color",
      name: "color",
      title: "Color",
    },
    {
      title: "Link Internal",
      name: "linkInternal",
      type: "reference",
      to: [
        { title: "Service", type: "service" },
        { title: "Teams", type: "teamPage" },
        { title: "Team", type: "team" },
        { title: "Page", type: "page" },
      ],
    },
    {
      title: "Link External",
      name: "linkExternal",
      type: "url",
    },
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
