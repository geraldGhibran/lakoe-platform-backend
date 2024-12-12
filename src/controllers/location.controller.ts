import { Request, Response } from 'express';
import { LocationDto } from '../dto/locations-dto';
import {
  createLocation,
  deleteLocation,
  findLocationsByStoreId,
  updateLocation,
  findLocationsById,
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
      !locationData.postal_code ||
      !locationData.city_district ||
      !locationData.latitude ||
      !locationData.longitude ||
      !locationData.store_id
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

export const updateLocationById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  const locationData: Partial<LocationDto> = req.body;

  if (!id) {
    res.status(400).json({ error: 'Location ID is required' });
    return;
  }

  try {
    const updatedLocation = await updateLocation(Number(id), locationData);
    res.status(200).json({
      message: 'Location updated successfully',
      data: updatedLocation,
    });
  } catch (error: any) {
    console.error('Error updating location:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteLocationById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: 'Location ID is required' });
    return;
  }

  try {
    await deleteLocation(Number(id));
    res.status(200).json({ message: 'Location deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting location:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getLocationsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await findLocationsById(Number(id));
    res.send(result);
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message);
  }
};
