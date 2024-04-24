export const productSwaggerSchema = {
  Product: {
    type: 'object',
    description:
      'Defines the structure of a product entity including required fields and types for each field.',
    required: ['name', 'quantity', 'price'],
    properties: {
      name: {
        type: 'string',
        description: 'The name of the product.',
      },
      quantity: {
        type: 'integer',
        default: 0,
        description: 'The quantity of the product in stock.',
      },
      price: {
        type: 'number',
        default: 0,
        description: 'The price of the product.',
      },
      image: {
        type: 'string',
        description: 'The image URL of the product.',
      },
    },
  },
};
