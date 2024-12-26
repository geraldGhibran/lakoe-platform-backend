export interface RatesDto {
  origin_postal_code?: number;
  origin_area_id: string;
  destination_area_id: string;
  destination_postal_code?: number;
  couriers?: string;
  items?: Item[];
}

export interface Item {
  name: string;
  description?: string;
  value: number;
  length?: number;
  width?: number;
  height?: number;
  weight: number;
  quantity: number;
}

export interface OrderDto {
  // shipper_contact_name: string;
  // shipper_contact_phone: string;
  // shipper_contact_email: string;
  // shipper_organization: string;

  origin_contact_name: string;
  origin_contact_phone: string;
  origin_address: string;
  origin_note: string;
  origin_postal_code: number;

  destination_contact_name: string;
  destination_contact_phone: string;
  destination_contact_email: string;
  destination_address: string;
  destination_postal_code: number;
  destination_note: string;

  courier_company: string;
  courier_type: string;
  courier_insurance: number;
  delivery_type: string;
  order_note: string;
  metadata: Record<string, any>;

  items: Item[];
}
