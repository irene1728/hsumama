export interface OrderItem {

  id: string;

  name: string;

  quantity: number;

  price: number;

  subtotal: number;

  wholesalePrice?: number | null;

  wholesaleSubtotal?: number | null;

  profit?: number | null;

}

export interface Order {

  orderNo: string;

  orderDate: string;

  customerName: string;

  phone: string;

  email: string;

  address: string;

  note: string;

  paymentMethod: "ATM";

  shippingMethod: string;

  items: OrderItem[];

  subtotal: number;

  shippingFee: number;

  total: number;

}