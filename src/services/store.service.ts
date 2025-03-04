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

    const courier_data = stores?.couriers
      ? stores.couriers
          .filter(
            (item: {
              id: number;
              courier_code: string;
              resi: string;
              courier_service_name: string;
              courier_service_code: string;
              price: number | null;
              is_active: boolean | null;
              invoice_id: number | null;
              storeId: number | null;
            }) => item.is_active,
          )
          .map((item) => item.courier_code)
          .join(',')
      : '';

    editCourierListValue(courier_data, user_id);
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

    const userId = await prisma.user.update({
      where: { id: user_id },
      data: {
        phone: store.phone,
      },
    });

    return { stores, userId };
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

export const editCourierListValue = async (
  courier: string,
  storeId: number,
) => {
  try {
    const stores = await prisma.store.update({
      where: { id: storeId },
      data: {
        courier: courier,
      },
    });

    return stores;
  } catch (error: Error | any) {
    throw new Error(`Error fetching stores: ${error.message}`);
  }
};
