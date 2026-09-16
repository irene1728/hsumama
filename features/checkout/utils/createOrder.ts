import { createClient } from "@/lib/supabase/client";

type OrderItem = {
  id: number;

  quantity: number;

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
pointsUsed: number;

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
  pointsUsed,

  cart,
}: CreateOrderParams) {

  const supabase = createClient();


  const items = cart.map((item) => ({
    product_id: item.id,
    quantity: item.quantity,
  }));

  // ------------------------------------------
  // 建立訂單
  // ------------------------------------------

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
      p_free_shipping_threshold:
        freeShippingThreshold,
      p_items: items,
      p_points_used: pointsUsed,

    }
  );

  
  if (error) {
    throw error;
  }

  if (!orderId) {
    throw new Error(
      "訂單建立失敗：沒有取得訂單編號。"
    );
  }



  // ------------------------------------------
  // 訂單 Email 通知
  //
  // Email 是通知流程，不影響訂單建立結果。
  // 即使 Email 寄送失敗，訂單仍然視為建立成功。
  // ------------------------------------------

void fetch("/api/email/order-created", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    orderId,
  }),
  keepalive: true,
})
  .then(async (response) => {
    const result = await response.json();

    if (!response.ok) {
      console.error(
        "Order email notification failed:",
        result
      );
      return;
    }

 
  })
  .catch((emailError) => {
    console.error(
      "Order email notification error:",
      emailError
    );
  });

  // ------------------------------------------
  // 回傳訂單
  // ------------------------------------------

  return {
  id: orderId,
};
}