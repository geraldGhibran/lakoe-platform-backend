import { CourierDto } from '../dto/courier-dto';
import { OrderDto, RatesDto } from '../dto/biteship-dto';
import biteship from '../utils/biteship';
import prisma from '../libs/prisma';
import { StatusInvoice } from '@prisma/client';

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

export const createOrder = async (invoiceId: number) => {
  try {
    const invoice = await prisma.invoices.findUnique({
      where: { id: invoiceId },
      include: {
        store: {
          include: {
            Locations: true,
            user: true,
          },
        },
        Product: true,
        Courier: true,
      },
    });

    if (!invoice) {
      throw new Error('Invoice not found');
    }

    const originLocation = invoice.store.Locations.find(
      (location) => location.is_main_location,
    );

    if (!originLocation) {
      throw new Error('Store main location not found');
    }

    const payload: OrderDto = {
      origin_contact_name: invoice.store.name,
      origin_contact_phone: invoice.store.user.phone.toString(),
      origin_address: originLocation.address,
      origin_note: 'Main store location',
      origin_postal_code: originLocation.postal_code,
      destination_contact_name: invoice.receiver_name,
      destination_contact_phone: invoice.receiver_phone.toString(),
      destination_contact_email: invoice.receiver_email,
      destination_address: invoice.receiver_address,
      destination_postal_code: invoice.receiver_postal_code,
      destination_note: 'Please handle with care',
      courier_company: invoice.Courier?.courier_code || 'jne',
      courier_type: invoice.Courier?.courier_service_code || 'reg',
      courier_insurance: 0,
      delivery_type: 'now',
      order_note: invoice.receiver_district || 'No specific notes',
      metadata: {},
      items: invoice.Product.map((product) => ({
        name: product.name,
        value: product.price,
        quantity: 1,
        weight: product.Height || 0,
      })),
    };

    const response = await biteship.post('/orders', payload);

    const { id: biteshipOrderId, courier } = response.data;
    // console.log(response.data);

    const createdCourier = await prisma.courier.create({
      data: {
        courier_code: courier.company,
        courier_service_name: courier.type,
        courier_service_code: courier.type,
        price: invoice.courier_price,
        resi: courier.waybill_id,
        link: courier.link,
        invoice_id: invoice.id,
      },
    });

    // Update status invoice setelah order berhasil dibuat
    await prisma.invoices.update({
      where: { id: invoice.id },
      data: {
        status: 'PROCESS',
      },
    });
    return { biteshipOrderId, courier: createdCourier };
  } catch (error: any) {
    throw new Error(
      `Failed to create order: ${error.response?.data?.code || error.message}`,
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
export const mapStatusToInvoice = (biteshipStatus: string): StatusInvoice => {
  const statusMap: { [key: string]: StatusInvoice } = {
    courier_not_found: StatusInvoice.CANCELED,
    picking_up: StatusInvoice.WAIT_TO_PICKUP,
    allocated: StatusInvoice.WAIT_TO_PICKUP,
    dropping_off: StatusInvoice.PROCESS,
    picked: StatusInvoice.PROCESS,
    delivered: StatusInvoice.DELIVERED,
  };

  const mappedStatus = statusMap[biteshipStatus];
  if (!mappedStatus) {
    throw new Error(`Unhandled Biteship status: ${biteshipStatus}`);
  }
  return mappedStatus;
};

export const updateStatusByWaybill = async (
  courierWaybillId: string,
  biteshipStatus: string,
) => {
  try {
    const mappedStatus = mapStatusToInvoice(biteshipStatus);

    const updatedOrder = await prisma.invoices.updateMany({
      where: { Courier: { resi: courierWaybillId } },
      data: { status: mappedStatus },
    });

    if (updatedOrder.count === 0) {
      throw new Error(`Order with waybill ID ${courierWaybillId} not found`);
    }

    return { success: true, updatedOrder, status: mappedStatus };
  } catch (error: any) {
    throw new Error(`Failed to update status: ${error.message}`);
  }
};
