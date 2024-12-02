export interface InvoicesDto {
  id: number;
  price: number;
  serviceCharge: number;
  status: StatusInvoice;
  receiverLongitude: number;
  receiverLatitude: number;
  receiverDistrict: string;
  receiverPhone: number;
  receiverAddress: string;
  receiverName: string;
  invoiceNumber: string;
  paymentId?: number;
  courierId?: number;
}

export enum StatusInvoice {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
  PENDING = 'PENDING',
}
