import { FaVideo } from 'react-icons/fa';

export default {
  name: 'moduleVideo',
  type: 'object',
  icon: FaVideo,
  fields: [
    {
      title: 'Video',
      name: 'video',
      type: 'figureVideo'
    },
    {
      name: "caption",
      title: "Module Caption",
      type: "localeBody",
    },
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
    //   },
    // },
  ],
  preview: {
    select: {
      caption: 'video.caption.en',
      copyright: 'video.copyright',
      vimeoTitle: 'video.vimeo.name',
      vimeoDescription: 'video.vimeo.description',
      vimeoThumbnail: 'video.vimeo.pictures.2.link',
    },
    prepare: ({ caption, copyright, vimeoTitle, vimeoDescription, vimeoThumbnail }) => ({
      title: caption || vimeoTitle,
      subtitle: '(Video) ' + (copyright || vimeoDescription),
      imageUrl: vimeoThumbnail
    }),
  },
}
