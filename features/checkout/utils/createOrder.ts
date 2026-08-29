import { createClient } from "@/lib/supabase/client";

type OrderItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  wholesale_price: number | null;
};

type CreateOrderParams = {
  customerName: string;
  phone: string;
  email: string;
  address: string;
  note: string;
  paymentMethod: string;
  deliveryMethod: string;

  totalQuantity: number;
  totalAmount: number;
  shippingFee: number;
  grandTotal: number;
  freeShippingThreshold: number;

  cart: OrderItem[];
};

export async function createOrder({
  customerName,
  phone,
  email,
  address,
  note,
  paymentMethod,
  deliveryMethod,
  totalQuantity,
  totalAmount,
  shippingFee,
  grandTotal,
  freeShippingThreshold,
  cart,
}: CreateOrderParams) {

  const supabase = createClient();

  // 提供給資料庫 Function 的商品資料
  const items = cart.map((item) => ({
    product_id: item.id,
    quantity: item.quantity,
  }));

  // 呼叫資料庫 Function
  const { data: orderId, error } = await supabase.rpc(
    "create_order_with_stock",
    {
      p_customer_name: customerName,
      p_phone: phone,
      p_email: email,
      p_address: address,
      p_note: note,
      p_payment: paymentMethod,
      p_delivery_method: deliveryMethod,

      p_total_quantity: totalQuantity,
      p_total_amount: totalAmount,
      p_shipping_fee: shippingFee,
      p_grand_total: grandTotal,
      p_free_shipping_threshold: freeShippingThreshold,

      p_items: items,
    }
  );

  // 庫存不足、商品不存在、或其他資料庫錯誤
  if (error) {
    throw error;
  }

  if (!orderId) {
    throw new Error("訂單建立失敗：沒有取得訂單編號。");
  }

  // Function 回傳訂單 ID
  // 再把完整訂單資料取回來，維持原本 createOrder() 的回傳格式
  const { data: order, error: orderError } = await supabase
    .from("orders")

    .select()
    .eq("id", orderId)
    .single();

  if (orderError) {
    throw orderError;
  }

  

  return order;
}