export interface PaymentsDto {
  id: number;
  bank: string;
  amount: number;
  status: StatusPayment;
  invoiceId: number;
}

export enum StatusPayment {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}
