import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: 'v1.0.0',
    title: 'Swagger Lakoe Project',
    description: 'Implementation of Swagger with TypeScript',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: '',
    },
  ],
  components: {
    '@schemas': {
      ProductDto: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          name: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          imageIds: {
            type: 'array',
            items: {
              type: 'integer',
            },
          },
          price: {
            type: 'integer',
          },
          isActive: {
            type: 'boolean',
          },
          variantsId: {
            type: 'integer',
          },
          variantIds: {
            type: 'array',
            items: {
              type: 'integer',
            },
          },
          minimumOrder: {
            type: 'integer',
          },
          storeId: {
            type: 'integer',
          },
          categoriesId: {
            type: 'integer',
          },
        },
      },
      StoreDto: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          name: {
            type: 'string',
          },
          slogan: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          logoImg: {
            type: 'string',
          },
          bannerImg: {
            type: 'string',
          },
          locationIds: {
            type: 'array',
            items: {
              type: 'integer',
            },
          },
          bankAccountId: {
            type: 'integer',
          },
          productIds: {
            type: 'array',
            items: {
              type: 'integer',
            },
          },
          userId: {
            type: 'integer',
          },
        },
      },
      UserDto: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1,
          },
          name: {
            type: 'string',
            example: 'John Doe',
          },
          email: {
            type: 'string',
            example: 'john.doe@example.com',
          },
          phone: {
            type: 'integer',
            example: 1234567890,
          },
          password: {
            type: 'string',
            example: 'password123',
          },
          role: {
            type: 'string',
            enum: ['ADMIN', 'SELLER'],
            example: 'ADMIN',
          },
          locationId: {
            type: 'integer',
            example: 1,
          },
          storeId: {
            type: 'integer',
            example: 1,
          },
        },
      },
      RoleEnum: { type: 'string', enum: ['ADMIN', 'SELLER'] },
      CategoriesDto: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          name: {
            type: 'string',
          },
          productIds: {
            type: 'array',
            items: {
              type: 'integer',
            },
            example: [1, 2, 3],
          },
        },
      },
      BankAccountDto: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          bank: {
            type: 'string',
          },
          accNumber: {
            type: 'integer',
          },
          accName: {
            type: 'string',
          },
          storeId: {
            type: 'integer',
          },
        },
      },
      CourierDto: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          courierCode: {
            type: 'string',
          },
          courierServiceName: {
            type: 'string',
          },
          courierServiceCode: {
            type: 'string',
          },
          price: {
            type: 'integer',
          },
          invoiceId: {
            type: 'integer',
          },
        },
      },
      ImagesDto: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          url: {
            type: 'string',
          },
          productId: {
            type: 'integer',
          },
        },
      },
      InvoicesDto: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          price: {
            type: 'integer',
          },
          status: {
            type: 'string',
            enum: ['PAID', 'UNPAID', 'PENDING'],
          },
          receiverLongitude: {
            type: 'number',
          },
          receiverLatitude: {
            type: 'number',
          },
          receiverDistrict: {
            type: 'string',
          },
          receiverPhone: {
            type: 'integer',
          },
          receiverAddress: {
            type: 'string',
          },
          receiverName: {
            type: 'string',
          },
          invoiceNumber: {
            type: 'string',
          },
          paymentId: {
            type: 'integer',
          },
          courierId: {
            type: 'integer',
          },
        },
      },
      StatusInvoice: {
        type: 'string',
        enum: ['PAID', 'UNPAID', 'PENDING'],
      },
      LocationsDto: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          name: {
            type: 'string',
          },
          address: {
            type: 'string',
          },
          postalCode: {
            type: 'integer',
          },
          cityDistrict: {
            type: 'integer',
          },
          latitude: {
            type: 'number',
          },
          longitude: {
            type: 'number',
          },
          storeId: {
            type: 'integer',
          },
          userId: {
            type: 'integer',
          },
          isMainLocation: {
            type: 'boolean',
          },
        },
      },
      PaymentsDto: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          bank: {
            type: 'string',
          },
          amount: {
            type: 'integer',
          },
          status: {
            type: 'string',
          },
          invoiceId: {
            type: 'integer',
          },
        },
      },
      StatusPayment: {
        type: 'string',
        enum: ['PENDING', 'SUCCESS', 'FAILED'],
      },
      VariantDto: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          stock: {
            type: 'integer',
          },
          weight: {
            type: 'integer',
          },
          name: {
            type: 'string',
          },
          variantItemId: {
            type: 'integer',
          },
          productId: {
            type: 'integer',
          },
          isActive: {
            type: 'string',
          },
          price: {
            type: 'string',
          },
        },
      },
      VariantItemDto: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          image: {
            type: 'string',
          },
          title: {
            type: 'string',
          },
          weight: {
            type: 'integer',
          },
          variantId: {
            type: 'integer',
          },
        },
      },
      VariantItemOptionDto: {
        type: 'object',
        properties: {
          variantId: {
            type: 'integer',
          },
          variantItemId: {
            type: 'integer',
          },
        },
      },
      WithdrawDto: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          amount: {
            type: 'integer',
          },
        },
      },
      LoginDTO: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
            format: 'password',
          },
        },
      },
      RegisterDTO: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
            format: 'password',
          },
          address: {
            type: 'string',
          },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
  },
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes/index.ts'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
