import { LocationDto } from '../dto/locations-dto';
import prisma from '../libs/prisma';

export const findLocationsByStoreId = async (storeId: number) => {
  try {
    const locations = await prisma.locations.findMany({
      where: {
        store_id: storeId,
      },
    });
    return locations;
  } catch (error: Error | any) {
    throw new Error(
      `Error fetching locations for store_id ${storeId}: ${error.message}`,
    );
  }
};

export const createLocation = async (data: LocationDto) => {
  const {
    name,
    address,
    postalCode,
    cityDistrict,
    latitude,
    longitude,
    storeId,
    isMainLocation,
  } = data;

  const store = await prisma.store.findUnique({
    where: { id: storeId },
  });
  if (!store) {
    throw new Error('Store not found');
  }

  const location = await prisma.locations.create({
    data: {
      name,
      address,
      postal_code: postalCode,
      city_district: cityDistrict,
      latitude,
      longitude,
      store_id: storeId,
      is_main_location: isMainLocation,
    },
  });

  return location;
};
