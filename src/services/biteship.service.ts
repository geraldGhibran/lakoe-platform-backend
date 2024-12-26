import { CourierDto } from '../dto/courier-dto';
import { OrderDto, RatesDto } from '../dto/biteship-dto';
import biteship from '../utils/biteship';
import prisma from '../libs/prisma';

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

export const getListCouriers = async (storeId: number) => {
  const TARGET_COURIERS = [
    'GOJEK',
    'GRAB',
    'JNE',
    'J&T',
    'SICEPAT',
    'TIKI',
    'ANTERAJA',
  ];
  try {
    const response = await biteship.get(`/couriers`);
    const couriers = response.data?.couriers;
    const filteredCouriers = couriers.filter(
      (courier: any) =>
        TARGET_COURIERS.includes(courier.courier_name?.toUpperCase()) &&
        ['Reguler', 'Instant'].includes(courier.courier_service_name),
    );

    const formattedData = filteredCouriers.map((courier: CourierDto) => ({
      courier_code: courier.courier_code,
      courier_service_name: courier.courier_service_name,
      courier_service_code: courier.courier_service_code,
      resi: '12323',
      storeId: storeId,
    }));

    const store = await prisma.store.findUnique({
      where: { id: storeId },
    });
    if (!store) {
      throw new Error('Store not found');
    }

    const createCourierStore = await prisma.courier.createMany({
      data: formattedData,
    });

    return createCourierStore;
  } catch (error: any) {
    throw new Error(
      `Failed to get list couriers: ${error.response?.data?.message || error.message}`,
    );
  }
};

export const getAreaId = async (input: any) => {
  try {
    const response = await biteship.get(`/maps/areas`, {
      params: {
        countries: 'ID',
        input,
        type: 'single',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      `Failed to get list couriers: ${error.response?.data?.message || error.message}`,
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
