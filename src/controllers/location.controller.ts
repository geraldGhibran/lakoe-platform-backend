import { LocationDto } from '../dto/locations-dto';
import { createLocation } from '../services/location-service';
import { Request, Response } from 'express';

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
      !locationData.storeId ||
      !locationData.userId
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
