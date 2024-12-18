import prisma from '../libs/prisma';
import { VariantItemValueDto } from '../dto/variant-item-value.dto';

export const createVariantItemValue = async (
  variantItemValue: VariantItemValueDto,
  product_id: number,
) => {
  return await prisma.variant_item_value.create({
    data: {
      name: variantItemValue.name,
      is_active: variantItemValue.is_active,
      price: Number(variantItemValue.price),
      stock: Number(variantItemValue.stock),
      weight: Number(variantItemValue.weight),
      sku: variantItemValue.sku,
      image: 'test',
      product_id: product_id,
    },
  });
};
