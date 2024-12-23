import { PrismaClient, Categories } from '@prisma/client';

const prisma = new PrismaClient();

const getCategories = async (): Promise<Categories[]> => {
  return await prisma.categories.findMany({
    where: {
      parentId: null,
    },
    include: {
      subcategories: {
        include: {
          subcategories: true,
        },
      },
    },
  });
};

export default { getCategories };
