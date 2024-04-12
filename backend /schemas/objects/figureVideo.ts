import { FaVideo } from 'react-icons/fa';

export default {
  name: 'figureVideo',
  type: 'object',
  icon: FaVideo,
  fields: [
    {
      title: 'Video',
      name: 'vimeo',
      type: 'reference',
      to: [
        {
          type: 'vimeo',
        },
      ],
    },
    {
      title: 'Caption',
      name: 'caption',
      type: 'localeString',
      options: { isHighlighted: true },
    },
    {
      title: 'Copyright',
      name: 'copyright',
      type: 'string',
      options: { isHighlighted: false },
    },
  ],
  preview: {
    select: {
      caption: 'caption.en',
      copyright: 'copyright',
      vimeoTitle: 'vimeo.name',
      vimeoDescription: 'vimeo.description',
      vimeoThumbnail: 'vimeo.pictures.2.link',
    },
    prepare: ({ caption, copyright, vimeoTitle, vimeoDescription, vimeoThumbnail }) => ({
      title: caption || vimeoTitle,
      subtitle: (copyright || vimeoDescription),
      imageUrl: vimeoThumbnail
    }),
  },
}
