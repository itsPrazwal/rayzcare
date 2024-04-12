import { ImageIcon } from "@sanity/icons";

export default {
  name: "hero",
  type: "object",
  group: "content",
  icon: ImageIcon,
  fields: [
    {
      name: "modules",
      type: "array",
      of: [
        { title: "Image", type: "moduleImage" },
        // { title: 'Video', type: 'moduleVideo' },
      ],
    },
  ],
};
