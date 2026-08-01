export type DeliveryMethod =
  | "home"
  | "seven"
  | "family";

export type PaymentMethod =
  | "credit-card"
  | "bank-transfer"
  | "cash-on-delivery";

export type CheckoutFormData = {
  customerName: string;

  phone: string;

  email: string;

  address: string;

  note: string;

  deliveryMethod: DeliveryMethod;

  paymentMethod: PaymentMethod;
};