
export type DeliveryMethod =
  | "新竹物流冷凍宅配"
  | "自取"
  | "seven"
  | "family";

export type PaymentMethod =
  | "ATM／線上轉帳"
  | "自取現場現金付款";

export type CheckoutFormData = {
  customerName: string;

  phone: string;

  email: string;

  address: string;

  note: string;

  deliveryMethod: DeliveryMethod;

  paymentMethod: PaymentMethod;
};
