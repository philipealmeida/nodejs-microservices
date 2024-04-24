export const productMessageSwaggerSchema = {
  ProductMessage: {
    type: 'object',
    description: 'Provides a dynamic message for the Products API.',
    properties: {
      message: {
        type: 'string',
        description: 'Dynamically generated message',
      },
    },
  },
};
