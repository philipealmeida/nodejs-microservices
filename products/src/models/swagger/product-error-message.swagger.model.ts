export const productErrorMessageSwaggerSchema = {
  ProductErrorMessage: {
    type: 'object',
    description: 'Provides a dynamic error message for the Products API.',
    properties: {
      message: {
        type: 'string',
        description: 'Dinamically error message',
      },
    },
  },
};
