import { supabase } from "@/lib/supabase";

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
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

  // 建立訂單
  const { data: order, error: orderError } = await supabase
    .from("orders")
    
.insert({
  customer_name: customerName,
  phone,
  email,
  address,
  note,
  payment: paymentMethod,
  delivery_method: deliveryMethod,
  total_quantity: totalQuantity,
  total_amount: totalAmount,
  shipping_fee: shippingFee,
  grand_total: grandTotal,
  free_shipping_threshold: freeShippingThreshold,
})

    .select()
    .single();

  if (orderError) {
    throw orderError;
  }

  // 建立訂單商品
const items = cart.map((item) => ({
  order_id: order.id,

  product_name: item.name,

  quantity: item.quantity,

  price: item.price,

  subtotal: item.price * item.quantity,
}));
  const { error: itemError } = await supabase
    .from("order_items")
    .insert(items);

  if (itemError) {
    throw itemError;
  }

  return order;
}