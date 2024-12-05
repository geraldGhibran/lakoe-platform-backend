import prisma from '../libs/prisma';
import { ProductDto } from '../dto/product-dto';
import { validateData } from '../utils/validateData';

// create product
export const createProduct = async (product: ProductDto) => {
  console.log('ini dari product_minimum_orider', product.images);
  const createProduct = await prisma.product.create({
    data: {
      name: product.name,
      description: product.description,
      price: Number(product.price),
      isActive: true,
      minimum_order: Number(product.minimum_order),
      store_id: Number(product.store_id),
      categories_id: Number(product.categories_id),
    },
  });

  if (product.images) {
    await prisma.images.createMany({
      data: product.images.map((image) => ({
        url: image.url,
        product_id: createProduct.id,
      })),
    });

    console.log('images created');
  } else {
    console.log('no images');
  }
  console.log(createProduct);
};

// delete product
export const deleteProductById = async (id: number) => {
  return await prisma.product.delete({
    where: {
      id,
    },
  });
};

// get all product
export const getAllProductByStoreId = async (storeId: number) => {
  return await prisma.product.findMany({
    where: {
      store_id: storeId,
    },
  });
};

// get product by id (untuk detail product)
export const getProductbyId = async (id: number) => {
  return await prisma.product.findUnique({
    where: {
      id,
    },
  });
};

// get product by name
export const getProductByName = async (name: string) => {
  return await prisma.product.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });
};
