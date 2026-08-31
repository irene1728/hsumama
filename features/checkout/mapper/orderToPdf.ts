import type { Order as PdfOrder } from "../types/order";

/**
 * Order Success 頁面目前查詢回來的資料
 */
interface OrderItemRow {
  product_name: string;
  quantity: number;

  price: number;
  subtotal: number;
}

export interface OrderRow {
  id: number;

  customer_name: string;
  phone: string;
  email: string;
  address: string;
  note: string;

  payment: string;
  delivery_method: string;

  total_amount: number;
  shipping_fee: number;
  grand_total: number;

  items: OrderItemRow[];
}

/**
 * Database Model -> PDF Model
 */
export function orderToPdf(order: OrderRow): PdfOrder {

  return {
    // Header
    orderNo: String(order.id),
    orderDate: new Date().toLocaleDateString("zh-TW"),

    // 客戶資料
    customerName: order.customer_name,
    phone: order.phone,
    email: order.email,
    address: order.address,
    note: order.note,

    // 商品
    items: order.items.map((item, index) => ({
      id: String(index + 1),
      name: item.product_name,
      quantity: item.quantity,
      price: item.price,
      subtotal: item.subtotal,
    })),

    // 金額
    subtotal: order.total_amount,
    shippingFee: order.shipping_fee,
    total: order.grand_total,

    // 付款方式
    paymentMethod: "ATM",

    // 配送方式
    shippingMethod: order.delivery_method,
  };
}