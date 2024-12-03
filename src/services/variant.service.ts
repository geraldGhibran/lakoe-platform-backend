import { VariantDto } from '../dto/variant-dto';
import prisma from '../libs/prisma';

export const deleteVariant = async (id: number) => {
  return await prisma.variant_Item.delete({
    where: {
      id,
    },
  });
};
