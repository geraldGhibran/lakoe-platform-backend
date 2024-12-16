export interface RatesDto {
  origin_postal_code: number;
  destination_postal_code: number;
  couriers?: string;
  items?: Item[];
}

export interface Item {
  name: string;
  description: string;
  value: number;
  length: number;
  width: number;
  height: number;
  weight: number;
  quantity: number;
}

export interface OrderDto {
  shipperContactName: string;
  shipperContactPhone: string;
  shipperContactEmail: string;
  shipperOrganization: string;

  originContactName: string;
  originContactPhone: string;
  originAddress: string;
  originNote: string;
  originPostalCode: number;

  destinationContactName: string;
  destinationContactPhone: string;
  destinationContactEmail: string;
  destinationAddress: string;
  destinationPostalCode: number;
  destinationNote: string;

  courierCompany: string;
  courierType: string;
  courierInsurance: number;
  deliveryType: string;
  orderNote: string;
  metadata: Record<string, any>;

  items: Item[];
}
