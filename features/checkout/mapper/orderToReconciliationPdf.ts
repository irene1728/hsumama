import type { Order as PdfOrder } from "../types/order";

/**
 * 對帳單專用｜資料庫訂單商品
 *
 * v0.13 Step 2-3B
 *
 * 注意：
 * 這裡使用 order_items 中「下單當時保存的批發價快照」。
 * 不重新查詢 products.wholesale_price。
 */
interface ReconciliationOrderItemRow {
  product_name: string;
  quantity: number;

  price: number;
  subtotal: number;

  wholesale_price: number | null;
  wholesale_subtotal: number | null;
}

/**
 * 對帳單專用｜資料庫訂單
 */
export interface ReconciliationOrderRow {
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

  items: ReconciliationOrderItemRow[];
}

/**
 * Database Model -> Reconciliation PDF Model
 *
 * 對帳單商品金額：
 * 使用 order_items.wholesale_price
 * 使用 order_items.wholesale_subtotal
 *
 * 絕對不重新查詢 products.wholesale_price。
 */
export function orderToReconciliationPdf(
  order: ReconciliationOrderRow
): PdfOrder {

  return {
    // ==========================================
    // Header
    // ==========================================

    orderNo: String(order.id),

    orderDate: new Date().toLocaleDateString("zh-TW"),

    // ==========================================
    // 客戶資料
    // ==========================================

    customerName: order.customer_name,
    phone: order.phone,
    email: order.email,
    address: order.address,
    note: order.note,

    // ==========================================
    // 商品
    // ==========================================

    items: order.items.map((item, index) => ({
      id: String(index + 1),

      name: item.product_name,

      quantity: item.quantity,

      // 保留原本市價資料
      price: item.price,

      subtotal: item.subtotal,

      // ========================================
      // 對帳單專用批發價快照
      // ========================================

      wholesalePrice: item.wholesale_price,

      wholesaleSubtotal: item.wholesale_subtotal,
    })),

    // ==========================================
    // 金額
    // ==========================================

    // 對帳單的商品金額會另外使用
    // items[].wholesaleSubtotal 計算。
    //
    // 這裡仍保留原訂單金額，
    // 避免破壞共用 Order 型別。
    subtotal: order.total_amount,

    // 運費使用訂單當時保存的 shipping_fee
    shippingFee: order.shipping_fee,

    // 顧客實際支付總額
    total: order.grand_total,

    // ==========================================
    // 付款方式
    // ==========================================

    paymentMethod:
      order.payment === "ATM轉帳"
        ? "ATM"
        : "COD",

    // ==========================================
    // 配送方式
    // ==========================================

    shippingMethod: order.delivery_method,
  };
}