export default {
  name: 'shopifyProductVariant',
  title: 'Shopify',
  type: 'object',
  readOnly: true,
  options: { collapsed: true, collapsible: true },
  fields: [
    /*
    {
      name: 'inStock',
      title: 'In stock',
      type: 'boolean',
    },
    */
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
    },
    {
      name: 'sku',
      type: 'string',
    },
    {
      title: 'ID',
      name: 'id',
      type: 'number',
    },
    {
      title: 'Product ID',
      name: 'productId',
      type: 'number',
    },
    {
      name: 'price',
      type: 'number',
    },
    {
      name: 'compareAtPrice',
      type: 'number',
    },
    {
      name: 'option1',
      type: 'string',
    },
    {
      name: 'option2',
      type: 'string',
    },
    {
      name: 'option3',
      type: 'string',
    },
    {
      title: 'Preview Image URL',
      name: 'previewImageUrl',
      type: 'string',
      description: 'Image displayed in both cart and checkout.',
    },
  ],
}
