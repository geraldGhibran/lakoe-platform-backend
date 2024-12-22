import prisma from '../libs/prisma';
import { VariantItemValueDto } from '../dto/variant-item-value.dto';

export const createVariantItemValue = async (
  variantItemValue: VariantItemValueDto,
  product_id: number,
) => {
  return await prisma.variant_item_value.create({
    data: {
      name: variantItemValue.name,
      is_active: true,
      price: Number(variantItemValue.price),
      stock: Number(variantItemValue.stock),
      weight: Number(variantItemValue.weight),
      sku: variantItemValue.sku,
      product_id: product_id,
    },
  });
};

export const updateVariantItemValue = async (
  variantItemValue: VariantItemValueDto,
  id: number,
) => {
  return await prisma.variant_item_value.update({
    where: {
      id,
    },
    data: {
      name: variantItemValue.name,
      is_active: true,
      price: Number(variantItemValue.price),
      stock: Number(variantItemValue.stock),
      weight: Number(variantItemValue.weight),
      sku: variantItemValue.sku,
    },
  });
};
