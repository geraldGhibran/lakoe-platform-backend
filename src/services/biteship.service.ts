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

// export const mapStatusToInvoice = (biteshipStatus: string): StatusInvoice => {
//   const statusMap: { [key: string]: StatusInvoice } = {
//     courier_not_found: StatusInvoice.CANCELED,
//     picking_up: StatusInvoice.WAIT_TO_PICKUP,
//     allocated: StatusInvoice.WAIT_TO_PICKUP,
//     dropping_off: StatusInvoice.PROCESS,
//     picked: StatusInvoice.PROCESS,
//     delivered: StatusInvoice.DELIVERED,
//   };

//   const mappedStatus = statusMap[biteshipStatus];
//   if (!mappedStatus) {
//     throw new Error(`Unhandled Biteship status: ${biteshipStatus}`);
//   }
//   return mappedStatus;
// };

// export const updateStatusByWaybill = async (
//   courierWaybillId: string,
//   biteshipStatus: string,
// ) => {
//   try {
//     const mappedStatus = mapStatusToInvoice(biteshipStatus);

//     const updatedOrder = await prisma.invoices.updateMany({
//       where: { Courier: { resi: courierWaybillId } },
//       data: { status: mappedStatus },
//     });

//     if (updatedOrder.count === 0) {
//       throw new Error(`Order with waybill ID ${courierWaybillId} not found`);
//     }

//     return { success: true, updatedOrder, status: mappedStatus };
//   } catch (error: any) {
//     throw new Error(`Failed to update status: ${error.message}`);
//   }
// };
