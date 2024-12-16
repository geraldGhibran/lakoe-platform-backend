import { OrderDto, RatesDto } from '../dto/biteship-dto';
import biteship from '../utils/biteship';

export const calculateShippingRates = async (params: RatesDto) => {
  const { origin_postal_code, destination_postal_code, couriers, items } =
    params;

  try {
    const response = await biteship.post('/rates/couriers', {
      origin_postal_code,
      destination_postal_code,
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
