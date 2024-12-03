import prisma from '../libs/prisma';
import { ProductDto } from '../dto/product-dto';
import { validateData } from '../utils/validateData';

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
