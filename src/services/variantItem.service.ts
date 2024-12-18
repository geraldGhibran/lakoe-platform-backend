import { VariantItemDto } from '../dto/variant-item-dto';
import prisma from '../libs/prisma';

export const getAllVariantItemByVariant = async (variantId: number) => {
  return await prisma.variant_Item.findMany({
    where: {
      variant_id: variantId,
    },
  });
};

export const createVariantItem = async (
  variantItem: string,
  variantId: number,
) => {
  return await prisma.variant_Item.create({
    data: {
      name: variantItem,
      variant_id: variantId,
    },
  });
};

export const deleteVariantItem = async (id: number) => {
  return await prisma.variant_Item.delete({
    where: {
      id,
    },
  });
};

export const updateVariantItem = async (
  variantItem: VariantItemDto,
  variantId: number,
) => {
  return await prisma.variant_Item.update({
    where: {
      id: variantId,
    },
    data: {
      name: variantItem.name,
    },
  });
};

export const createManyVariantItems = async (
  variantItem: string[],
  id: number,
) => {
  return await prisma.variant_Item.createMany({
    data: variantItem.map((item) => ({
      name: item,
      variant_id: id,
    })),
  });
};
