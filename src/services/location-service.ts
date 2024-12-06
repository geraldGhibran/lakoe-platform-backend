import prisma from '../libs/prisma';
import { LocationDto } from '../dto/locations-dto';

export const createLocation = async (data: LocationDto) => {
  const {
    name,
    address,
    postalCode,
    cityDistrict,
    latitude,
    longitude,
    storeId,
    userId,
    isMainLocation,
  } = data;

  // Validasi User
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    throw new Error('User not found');
  }

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
      user_id: userId,
      is_main_location: isMainLocation,
    },
  });

  return location;
};
