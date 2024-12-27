import { getAreaId } from '../services/biteship.service';
import { LocationDto } from '../dto/locations-dto';
import prisma from '../libs/prisma';

export const findLocationsByStoreId = async (storeId: number) => {
  try {
    const locations = await prisma.locations.findMany({
      where: {
        store_id: storeId,
      },
      orderBy: [
        {
          is_main_location: 'desc',
        },
        // {
        //   createdAt: 'asc',
        // },
      ],
    });
    return locations;
  } catch (error: Error | any) {
    throw new Error(
      `Error fetching locations for store_id ${storeId}: ${error.message}`,
    );
  }
};

export const findLocationsById = async (id: number) => {
  return await prisma.locations.findUnique({
    where: {
      id,
    },
  });
};

export const createLocation = async (data: LocationDto) => {
  const {
    name,
    address,
    postal_code,
    province,
    province_code,
    city_district,
    city_district_code,
    subdistrict,
    subdistrict_code,
    village,
    latitude,
    longitude,
    store_id,
    is_main_location,
  } = data;

  const area_input = province + ', ' + city_district + ', ' + postal_code;

  const area_id = await getAreaId(area_input);

  const store = await prisma.store.findUnique({
    where: { id: store_id },
  });
  if (!store) {
    throw new Error('Store not found');
  }
  if (is_main_location) {
    await prisma.locations.updateMany({
      where: { store_id },
      data: { is_main_location: false },
    });
  }

  const location = await prisma.locations.create({
    data: {
      name,
      address,
      postal_code,
      province,
      province_code,
      city_district,
      city_district_code,
      subdistrict,
      area_id: area_id.areas[0].id,
      subdistrict_code,
      village,
      latitude,
      longitude,
      store_id,
      is_main_location: is_main_location || false,
    },
  });

  return location;
};

export const updateLocation = async (
  id: number,
  data: Partial<LocationDto>,
) => {
  const { is_main_location, ...updateData } = data;

  const location = await prisma.locations.findUnique({ where: { id } });
  if (!location) {
    throw new Error('Location not found');
  }

  const updatedLocation = await prisma.locations.update({
    where: { id },
    data: updateData,
  });

  if (is_main_location) {
    await prisma.locations.updateMany({
      where: {
        store_id: location.store_id,
        id: { not: id },
      },
      data: { is_main_location: false },
    });

    await prisma.locations.update({
      where: { id },
      data: { is_main_location: true },
    });
  }

  return { updatedLocation, is_main_location };
};

export const deleteLocation = async (id: number) => {
  const location = await prisma.locations.findUnique({ where: { id } });
  if (!location) {
    throw new Error('Location not found');
  }

  await prisma.locations.delete({ where: { id } });
};
