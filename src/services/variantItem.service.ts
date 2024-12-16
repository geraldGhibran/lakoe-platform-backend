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
  variantItem: VariantItemDto,
  variantId: number,
) => {
  return await prisma.variant_Item.create({
    data: {
      stock: variantItem.stock,
      weight: variantItem.weight,
      title: variantItem.title,
      variant_id: variantItem.variantId,
      image: variantItem.image,
      price: variantItem.price,
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

export const updateVariantItem = async (variantItem: VariantItemDto) => {
  return await prisma.variant_Item.update({
    where: {
      id: variantItem.id,
    },
    data: {
      stock: variantItem.stock,
      weight: variantItem.weight,
      title: variantItem.title,
      variant_id: variantItem.variantId,
      image: variantItem.image,
      price: variantItem.price,
    },
  });
};
