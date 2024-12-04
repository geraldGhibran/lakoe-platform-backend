import prisma from '../libs/prisma';

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
      location: true,
      name: true,
      role: true,
      phone: true,
      id: true,
    },
  });
};
