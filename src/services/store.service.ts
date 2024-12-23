import { CourierDto } from '../dto/courier-dto';
import { StoreDto } from '../dto/store-dto';
import prisma from '../libs/prisma';

export const getStoreByUserId = async (user_id: number) => {
  try {
    const stores = await prisma.store.findUnique({
      where: {
        user_id,
      },
      include: {
        Locations: true,
        bankAccount: true,
        products: true,
        couriers: {
          orderBy: {
            id: 'asc',
          },
        },
        user: true,
      },
    });
    return stores;
  } catch (error: Error | any) {
    throw new Error(`Error fetching stores: ${error.message}`);
  }
};

export const getAllStore = async () => {
  try {
    const stores = await prisma.store.findMany({
      include: {
        Locations: true,
        bankAccount: true,
        products: true,
        user: true,
      },
    });
    return stores;
  } catch (error: Error | any) {
    throw new Error(`Error fetching stores: ${error.message}`);
  }
};

export const editStoreByUserId = async (store: StoreDto, user_id: number) => {
  console.log('ini dari logo_img', store.logo_img);
  try {
    const stores = await prisma.store.update({
      where: { user_id },
      data: {
        name: store.name,
        slogan: store.slogan,
        description: store.description,
        logo_img: store.logo_img || '',
      },
    });

    return stores;
  } catch (error: Error | any) {
    throw new Error(`Error fetching stores: ${error.message}`);
  }
};

export const editCourierIsActiveStoreById = async (
  courier: CourierDto,
  storeId: number,
) => {
  try {
    const stores = await prisma.courier.update({
      where: { id: courier.id, storeId: storeId },
      data: {
        is_active: courier.is_active,
      },
    });

    return stores;
  } catch (error: Error | any) {
    throw new Error(`Error fetching stores: ${error.message}`);
  }
};
