import { FaVideo } from 'react-icons/fa';

export default {
  name: 'moduleSliderVideo',
  type: 'object',
  icon: FaVideo,
  fields: [
    {
      title: 'Video',
      name: 'video',
      type: 'figureVideo'
    },
    {
      name: 'caption',
      title: 'Module Caption',
      type: 'localeBody',
    },
    {
      type: "color",
      name: "color",
      title: "Color"
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
      type: 'url'
    }
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
