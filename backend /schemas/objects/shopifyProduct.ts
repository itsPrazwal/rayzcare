export default {
  name: 'shopifyProduct',
  title: 'Shopify',
  type: 'object',
  options: { collapsed: true, collapsible: true },
  readOnly: true,
  fields: [
    {
      name: 'createdAt',
      type: 'string',
    },
    {
      name: 'updatedAt',
      type: 'string',
    },
    {
      title: 'Product status',
      name: 'status',
      type: 'string',
      options: {
        layout: 'dropdown',
        list: ['active', 'archived', 'draft'],
      },
      validation: Rule => Rule.required(),
    },
    {
      title: 'Deleted from Shopify?',
      name: 'isDeleted',
      type: 'boolean',
    },
    {
      name: 'title',
      type: 'string',
      description: 'Title displayed in both cart and checkout.',
      validation: Rule => Rule.required(),
    },
    {
      title: 'ID',
      name: 'id',
      type: 'number',
      description: 'Shopify Product ID.',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      description: 'Shopify Product handle.',
    },
    {
      name: 'productType',
      type: 'string',
    },
    {
      name: 'tags',
      type: 'string',
    },
    {
      name: 'priceRange',
      type: 'object',
      fields: [
        {
          name: 'minVariantPrice',
          type: 'number',
          validation: Rule => Rule.required(),
        },
        {
          name: 'maxVariantPrice',
          type: 'number',
          validation: Rule => Rule.required(),
        },
      ],
    },
    {
      name: 'previewImageUrl',
      type: 'string',
      description: 'Image displayed in both cart and checkout.',
    },
    {
      name: 'options',
      type: 'array',
      of: [{ name: 'option', type: 'productOption' }],
    },
    {
      name: 'variants',
      type: 'array',
      of: [{ type: 'reference', weak: true, to: [{ type: 'productVariant' }] }],
    },
  ],
}
