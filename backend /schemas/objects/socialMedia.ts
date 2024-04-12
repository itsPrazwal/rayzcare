import { LinkIcon } from "@sanity/icons";

export default {
  name: 'socialMedia',
  type: 'object',
  icon: LinkIcon,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Media Link',
      name: 'link',
      type: 'url',
    },
    {
      title: 'Media Icon',
      name: 'icon',
      type: 'image'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'link',
      imageUrl: 'icon.asset.url',
    },
    prepare: ({ title, subtitle, imageUrl }) => ({
      title,
      subtitle,
      imageUrl
    }),
  },
}