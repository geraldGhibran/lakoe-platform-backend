import { ProductDto } from '../dto/product-dto';

export interface InvoicesDto {
  price: number;
  serviceCharge: number;
  status: StatusInvoice;
  receiver_longitude: number;
  receiver_latitude: number;
  receiver_district: string;
  receiver_phone: number;
  receiver_address: string;
  reciever_email: string;
  receiver_name: string;
  invoice_id: string;
  paymentId?: number;
  courierId?: number;
  product: ProductDto;
  total_amount: number;
}

export enum StatusInvoice {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
  PENDING = 'PENDING',
}
