import type { Order as PdfOrder } from "../types/order";

/**
 * Order Success 頁面目前查詢回來的資料
 */
export interface OrderRow {
  id: number;

  customer_name: string;
  phone: string;
  email: string;
  address: string;

  payment: string;

  total_amount: number;
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


    // 付款方式
    paymentMethod: order.payment === "ATM轉帳" ? "ATM" : "COD",

    // 配送
    shippingMethod: "",

    // 商品（下一階段接）
    items: [],

    // 金額
    subtotal: order.total_amount,
    shippingFee: 0,
    total: order.total_amount,
  };
}