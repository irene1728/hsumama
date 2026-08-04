export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Order {
  orderNo: string;

  orderDate: string;

  customerName: string;
  phone: string;
  email: string;
  address: string;

  paymentMethod: "ATM" | "COD";

  shippingMethod: string;

  items: OrderItem[];

  subtotal: number;
  shippingFee: number;
  total: number;
}