"use client";

// Next.js
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Features
import CheckoutForm from "@/features/checkout/components/CheckoutForm";
import DeliveryMethod from "@/features/checkout/components/DeliveryMethod";
import OrderSummary from "@/features/checkout/components/OrderSummary";


import { useCheckout } from "@/features/checkout/hooks/useCheckout";
import { validateCheckout } from "@/features/checkout/utils/validateCheckout";
import { createOrder } from "@/features/checkout/utils/createOrder";
import { calculateOrderTotal } from "@/features/checkout/utils/calculateOrderTotal";

// Shared
import { useCart } from "@/cart/CartContext";
import { supabase } from "@/lib/supabase";

export default function CheckoutPage() {

  const router = useRouter();
const [stockError, setStockError] = useState<string | null>(null);
  const { cart, clearCart } = useCart();

type ShippingSetting = {
  delivery_method: string;
  shipping_fee: number;
  free_shipping_threshold: number;
  is_active: boolean;
};

const [shippingSetting, setShippingSetting] =
  useState<ShippingSetting | null>(null);


 const {
  customerName,
  setCustomerName,

  phone,
  setPhone,

  email,
  setEmail,

  address,
  setAddress,

  note,
  setNote,

  deliveryMethod,
  setDeliveryMethod,

  paymentMethod,
  setPaymentMethod,

  loading,
  setLoading,
} = useCheckout();

useEffect(() => {
  async function loadShippingSetting() {
    const { data, error } = await supabase
      .from("shipping_settings")
      .select(
        "delivery_method, shipping_fee, free_shipping_threshold, is_active"
      )
      .eq("delivery_method", deliveryMethod)
      .eq("is_active", true)
      .maybeSingle();

    if (error) {
      console.error("Shipping settings error:", error);
      return;
    }

    setShippingSetting(data);
   
  }

  loadShippingSetting();
}, [deliveryMethod]);

   const totalQuantity = cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
const totalAmount = cart.reduce(
  (sum, item) => sum + (item.price ?? 0) * item.quantity,
  0
);

const {
  shippingFee,
  grandTotal,
  freeShippingThreshold,
} = shippingSetting
  ? calculateOrderTotal({
      totalAmount,
      shippingFee: shippingSetting.shipping_fee,
      freeShippingThreshold:
        shippingSetting.free_shipping_threshold,
    })
  : {
      shippingFee: 0,
      grandTotal: totalAmount,
      freeShippingThreshold: 0,
    };


async function handleSubmit() {

const error = validateCheckout({
  customerName,
  phone,
  address,
  cartLength: cart.length,
});

if (error) {
  alert(error);
  return;
}

  setLoading(true);

  try {

   
const order = await createOrder({
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
});

clearCart();

if (order) {
  router.push(`/order-success?id=${order.id}`);
}

}

catch (error) {

  console.error("Supabase Error:", error);

  const message =
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
      ? error.message
      : "目前庫存不足，無法購買。";

  setStockError(message);

}

  finally {

    setLoading(false);

  }

}

return (
  <>
    <main className="max-w-7xl mx-auto px-8 py-20 md:py-28">

      <h1 className="text-4xl font-bold text-stone-800 mb-2">
        結帳
      </h1>

      <div className="grid lg:grid-cols-3 gap-10">

        {/* 左邊：收件資料 */}
        <div className="lg:col-span-2">
  <CheckoutForm
    customerName={customerName}
    onCustomerNameChange={setCustomerName}

    phone={phone}
    onPhoneChange={setPhone}

    email={email}
    onEmailChange={setEmail}

    address={address}
    onAddressChange={setAddress}

    note={note}
    onNoteChange={setNote}
  />
</div>

        {/* 右邊：訂單摘要 */}
<div className="h-fit sticky top-28 space-y-6">

<OrderSummary
  cart={cart}
  totalQuantity={totalQuantity}
  totalAmount={totalAmount}
  shippingFee={shippingFee}
  freeShippingThreshold={
    shippingSetting?.free_shipping_threshold ?? 0
  }
  grandTotal={grandTotal}
  deliveryMethod={deliveryMethod}
  paymentMethod={paymentMethod}
/>

  <button
    onClick={handleSubmit}
    disabled={loading}
    className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white py-4 rounded-xl text-lg font-bold transition"
  >
    {loading ? "送出中..." : "確認送出訂單"}
  </button>
</div>


</div>
        </main>

    {stockError && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl">

          <h2 className="text-2xl font-bold text-stone-800 text-center">
            徐媽媽冰鑽滷味
          </h2>

          <div className="mt-5 text-center text-gray-700 leading-relaxed">
            <p className="text-xl font-bold text-orange-600">
              目前庫存不足
            </p>

            <p className="mt-4">
              {stockError}
            </p>

            <p className="mt-4">
              請調整商品數量後再試。
            </p>
          </div>

          <button
            type="button"
            onClick={() => setStockError(null)}
            className="mt-6 w-full rounded-xl bg-orange-600 py-3 font-bold text-white transition hover:bg-orange-700"
          >
            確定
          </button>

        </div>
      </div>
    )}
  </>
);
  
}