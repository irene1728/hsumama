"use client";

// Next.js
import Link from "next/link";
import { useRouter } from "next/navigation";

// Features
import CheckoutForm from "@/features/checkout/components/CheckoutForm";
import DeliveryMethod from "@/features/checkout/components/DeliveryMethod";
import OrderSummary from "@/features/checkout/components/OrderSummary";
import PaymentMethod from "@/features/checkout/components/PaymentMethod";

import { useCheckout } from "@/features/checkout/hooks/useCheckout";
import { validateCheckout } from "@/features/checkout/utils/validateCheckout";
import { createOrder } from "@/features/checkout/utils/createOrder";
// Shared
import { useCart } from "@/cart/CartContext";
import { supabase } from "@/lib/supabase";

export default function CheckoutPage() {

  const router = useRouter();

  const { cart, clearCart } = useCart();

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
   const totalQuantity = cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
const totalAmount = cart.reduce(
  (sum, item) => sum + (item.price ?? 0) * item.quantity,
  0
);

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

  totalQuantity,
  totalAmount,

  cart,
});

clearCart();

if (order) {
  router.push(`/order-success?id=${order.id}`);
}

}

catch (error) {

  console.error("Supabase Error:", error);

  alert(JSON.stringify(error, null, 2));

}
  
  finally {

    setLoading(false);

  }

}

  return (
    <main className="max-w-7xl mx-auto px-8 py-12">

      <h1 className="text-4xl font-bold text-stone-800 mb-10">
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
    deliveryMethod={deliveryMethod}
    paymentMethod={paymentMethod}
  />

  <PaymentMethod
    paymentMethod={paymentMethod}
    onPaymentMethodChange={setPaymentMethod}
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
  );
}