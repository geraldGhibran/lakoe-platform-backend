import prisma from '../libs/prisma';
import { ProductDto } from '../dto/product-dto';
import { validateData } from '../utils/validateData';

// create product
export const createProduct = async (product: ProductDto) => {
  console.log('ini product', product);
  const createProduct = await prisma.product.create({
    data: {
      name: product.name,
      description: product.description,
      price: Number(product.price),
      isActive: true,
      minimum_order: Number(product.minimum_order),
      store_id: Number(product.store_id),
      categories_id: Number(product.categories_id),
      url: 'ini kosong',
    },
  });

  // if (product.images) {
  //   await prisma.images.createMany({
  //     data: product.images.map((image) => ({
  //       url: image.url,
  //       product_id: createProduct.id,
  //     })),
  //   });

  //   console.log('images created');
  // } else {
  //   console.log('no images');
  // }
  return createProduct;
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
  console.log(`ini dari service`, name);
  const test = 'ini test';
  const result = await prisma.product.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });
  console.log(result);
  return result;
};

export const sortProductByHighestPrice = async (store_id: number) => {
  return await prisma.product.findMany({
    where: {
      store_id,
    },
    orderBy: {
      price: 'asc',
    },
  });
};

export const sortProductByLowestPrice = async (store_id: number) => {
  return await prisma.product.findMany({
    where: {
      store_id,
    },
    orderBy: {
      price: 'desc',
    },
  });
};

export const sortProductByNewest = async (store_id: number) => {
  return await prisma.product.findMany({
    where: {
      store_id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const sortProductByOldest = async (store_id: number) => {
  return await prisma.product.findMany({
    where: {
      store_id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
};

export const getProductByUrl = async (url: string) => {
  return await prisma.product.findFirst({
    where: {
      url,
    },
  });
};

export const updateProductById = async (id: number, data: ProductDto) => {
  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      minimum_order: Number(data.minimum_order),
      store_id: Number(data.store_id),
      categories_id: Number(data.categories_id),
      url: data.url,
    },
  });

  // const images = await prisma.images.createMany({
  //   data: data.images.map((image) => ({
  //     url: image.url,
  //     product_id: id,
  //   })),
  // });

  return {
    product,
    // images,
  };
};

export const deleteManyProduct = async (ids: number[]) => {
  return await prisma.product.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
};
