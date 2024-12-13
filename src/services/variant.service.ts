import { VariantDto } from '../dto/variant-dto';
import prisma from '../libs/prisma';

export const deleteVariant = async (id: number) => {
  return await prisma.variant_Item.delete({
    where: {
      id,
    },
  });
};

export const createVariant = async (variant: VariantDto) => {
  return await prisma.variant.create({
    data: {
      name: variant.name,
      isActive: true,
      product_id: variant.productId,
    },
  });
};

export const getVariantById = async (id: number) => {
  return await prisma.variant.findUnique({
    where: {
      id,
    },
  });
};

export const getVariantsByProductId = async (productId: number) => {
  return await prisma.variant.findMany({
    where: {
      product_id: productId,
    },
  });
};

export const updateVariant = async (variant: VariantDto) => {
  return await prisma.variant.update({
    where: {
      id: variant.id,
    },
    data: {
      name: variant.name,
    },
  });
};
