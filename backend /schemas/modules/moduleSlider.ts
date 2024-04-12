import { DocumentsIcon } from "@sanity/icons";

export default {
  name: "moduleSlider",
  type: "object",
  icon: DocumentsIcon,
  fields: [
    {
      name: "medias",
      type: "array",
      of: [
        {
          title: "Image",
          type: "moduleImage",
        },
        {
          title: "Video",
          type: "moduleVideo",
        },
      ],
    },
  ],
  preview: {
    select: {
      medias: "medias",
    },
    prepare: ({ medias }) => ({
      title:
        medias && medias.length
          ? `${medias.length} Media${medias.length > 1 ? "s" : ""}`
          : "No media",
      subtitle: "(Slider)",
    }),
  },
};
