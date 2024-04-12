import { EditIcon } from "@sanity/icons";

export default {
  name: "moduleInfo",
  type: "object",
  icon: EditIcon,
  fields: [
    {
      name: "title",
      type: "localeString",
    },
    {
      name: "modules",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              type: "localeString",
            },
            {
              name: "body",
              type: "localeBody",
            },
            {
              name: "modules",
              type: "array",
              of: [
                {
                  title: "Text",
                  type: "localeBody",
                },
                {
                  title: "Slider",
                  type: "moduleSlider",
                },
              ],
            },
          ],
          preview: {
            select: {
              titleEn: "title.en",
            },
            prepare: ({ titleEn }) => {
              return {
                title: titleEn,
              };
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      titleEn: "title.en",
      modules: "modules",
    },
    prepare: ({ titleEn, modules }) => {
      return {
        title: titleEn,
        subtitle: modules.length,
      };
    },
  },
};
