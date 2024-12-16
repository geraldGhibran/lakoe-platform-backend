import { VariantDto } from '../dto/variant-dto';
import prisma from '../libs/prisma';

export const deleteVariant = async (id: number) => {
  return await prisma.variant_Item.delete({
    where: {
      id,
    },
  });
};

export const createVariant = async (variant: string, productId: number) => {
  return await prisma.variant.create({
    data: {
      name: variant,
      isActive: true,
      product_id: productId,
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

export const createManyVariant = async (
  variants: string[],
  productId: number,
) => {
  const createVariant = await prisma.variant.createMany({
    data: variants.map((variant) => ({
      name: variant,
      isActive: true,
      product_id: productId,
    })),
  });

  const getVariants = await prisma.variant.findMany({
    where: {
      product_id: productId,
    },
  });

  return getVariants;
};
