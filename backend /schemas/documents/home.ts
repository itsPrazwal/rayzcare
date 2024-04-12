export default {
  name: 'home',
  type: 'document',
  fields: [
    {
      name: 'modules',
      type: 'array',
      of: [
        { title: 'Image', type: 'moduleSliderImage' },
        { title: 'Video', type: 'moduleSliderVideo' }
      ],
    },
    {
      title: 'SEO',
      name: 'seo',
      type: 'seo',
    },
  ],
}
