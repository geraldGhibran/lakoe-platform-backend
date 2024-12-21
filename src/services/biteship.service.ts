import { OrderDto, RatesDto } from '../dto/biteship-dto';
import biteship from '../utils/biteship';

export const calculateShippingRates = async (params: RatesDto) => {
  const { origin_area_id, destination_area_id, couriers, items } = params;

  try {
    const response = await biteship.post('/rates/couriers', {
      origin_area_id,
      destination_area_id,
      couriers,
      items,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(
      `Failed to calculate shipping rates: ${error.response?.data?.message || error.message}`,
    );
  }
};

export const createOrder = async (orderData: OrderDto) => {
  try {
    const response = await biteship.post('/orders', orderData);
    return response.data;
  } catch (error: any) {
    throw new Error(
      `Failed to create order: ${error.response?.data?.message || error.message}`,
    );
  }
};

export const trackingOrder = async (resi: string, service: string) => {
  try {
    const response = await biteship.get(
      `/trackings/${resi}/couriers/${service}`,
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      `Failed to tracking order: ${error.response?.data?.message || error.message}`,
    );
  }
};

export const getListCouriers = async () => {
  try {
    const response = await biteship.get(`/couriers`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      `Failed to get list couriers: ${error.response?.data?.message || error.message}`,
    );
  }
};

export const getAreaId = async (countries: any, input: any, type: any) => {
  try {
    const response = await biteship.get(`/maps/areas`, {
      params: {
        countries,
        input,
        type,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      `Failed to get list couriers: ${error.response?.data?.message || error.message}`,
    );
  }
};
