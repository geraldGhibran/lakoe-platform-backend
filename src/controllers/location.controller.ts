import { Request, Response } from 'express';
import { LocationDto } from '../dto/locations-dto';
import {
  createLocation,
  findLocationsByStoreId,
} from '../services/location-service';

export const getLocationsByStoreId = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { storeId } = req.params;

  if (!storeId) {
    res.status(400).json({ error: 'storeId parameter is required' });
    return;
  }

  try {
    const locations = await findLocationsByStoreId(Number(storeId));
    if (!locations || locations.length === 0) {
      res.status(404).json({ message: 'No locations found for this store_id' });
      return;
    }
    res.status(200).json(locations);
  } catch (error: any) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching locations' });
  }
};

export const addLocation = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const locationData: LocationDto = req.body;

    // Validasi input
    if (
      !locationData.name ||
      !locationData.address ||
      !locationData.postalCode ||
      !locationData.cityDistrict ||
      !locationData.latitude ||
      !locationData.longitude ||
      !locationData.storeId
    ) {
      res.status(400).json({ error: 'All fields are required' });
      return;
    }

    const location = await createLocation(locationData);

    res.status(201).json({
      message: 'Location created successfully',
      data: location,
    });
  } catch (error: any) {
    console.error('Error creating location:', error.message);
    res.status(500).json({ error: error.message });
  }
};
