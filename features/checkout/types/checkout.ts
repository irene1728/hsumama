export type DeliveryMethod =
  | "黑貓冷凍宅配"
  | "seven"
  | "family";

export type PaymentMethod =
  | "ATM轉帳"
  | "貨到付款";

export type CheckoutFormData = {
  customerName: string;

  phone: string;

  email: string;

  address: string;

  note: string;

  deliveryMethod: DeliveryMethod;
  
  paymentMethod: PaymentMethod;
};