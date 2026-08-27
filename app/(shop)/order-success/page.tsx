"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { orderToPdf } from "@/features/checkout/mapper";
import DownloadOrderButton from "@/features/checkout/components/DownloadOrderButton";
type OrderItem = {
  product_name: string;
  quantity: number;

  price: number;
  subtotal: number;

  wholesale_price: number | null;
  wholesale_subtotal: number | null;
};

type Order = {
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

  items: OrderItem[];
};

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const [order, setOrder] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadOrder() {
      if (!orderId) return;

const { data } = await supabase
  .from("orders")
  .select(
    "id, customer_name, phone, email, address, note, payment, delivery_method, total_amount, shipping_fee, grand_total"
  )
  .eq("id", Number(orderId))
  .single();


const { data: items } = await supabase
  .from("order_items")
  .select("*")
  .eq("order_id", Number(orderId));


      if (data) {
  setOrder({
    ...data,
    items: items ?? [],
  });
}
    }

    loadOrder();
  }, [orderId]);

 async function copyAccount() {
  try {
    await navigator.clipboard.writeText("170001010083");

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);

  } catch {
    alert("複製失敗，請手動複製。");
  }
}

if (!order) return null;

const pdfOrder = orderToPdf(order);

  return (
    <main className="max-w-3xl mx-auto px-8 py-6">

      <div className="bg-white border border-gray-200 rounded-3xl shadow-lg p-4

      ">

        <div className="text-center">

      
          <h1 className="text-2xl font-bold text-stone-800 mt-10 lg:mt-15">
            🎉訂單已成立🎉
          </h1>

            <p className="mt-1 text-gray-600 leading-7">
    <span className="block">感謝您的訂購，</span>
    <span className="block">我們已收到您的訂單。</span>
  </p>
        </div>

        {order && (

          <div className="mt-4 space-y-4 border-t pt-4">

            <div className="flex justify-between">
              <span>訂單編號</span>
              <span className="font-bold">#{order.id}</span>
               <DownloadOrderButton
  order={pdfOrder}
/>
        
            </div>

            <div className="flex justify-between">
              <span>收件人</span>
              <span>{order.customer_name}</span>
            </div>

            <div className="flex justify-between">
              <span>付款方式</span>
              <span>{order.payment}</span>
            </div>

            <div className="flex justify-between">
              <span>商品金額</span>
              <span className="font-bold text-orange-600">
                NT$ {order.total_amount.toLocaleString("zh-TW")}
              </span>
            </div>

<div className="flex justify-between">
  <span>運送金額</span>
  <span>
    NT$ {order.shipping_fee.toLocaleString("zh-TW")}
  </span>
</div>

<div className="flex justify-between">
  <span>配送方式</span>
  <span>{order.delivery_method}</span>
</div>

<div className="flex justify-between">
  <span>應付總金額</span>
  <span className="font-bold text-orange-600">
    NT$ {order.grand_total.toLocaleString("zh-TW")}
  </span>
</div>




{/* ATM 轉帳 */}
{order.payment === "ATM轉帳" && (
  <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-5">
    <h3 className="text-xl font-bold text-orange-700 mb-2">
      🏦 ATM 匯款資訊
    </h3>

    <div className="space-y-1 text-gray-700">
      <p><strong>銀行：</strong>台灣銀行</p>
      <p><strong>銀行代碼：</strong>004</p>
      <div className="flex items-center gap-3">

  <p>
    <strong>帳號：</strong>
    170001010083
  </p>

  
<button
  onClick={copyAccount}
  className={`text-sm text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 shadow
    ${
      copied
        ? "bg-green-600 hover:bg-green-700"
        : "bg-orange-600 hover:bg-orange-700"
    }`}
>
  {copied ? "✅ 已複製" : "📋 複製帳號"}
</button>

</div>
     
    </div>

    <p className="mt-4 text-base text-red-600">
      ※ 請於 3 日內完成匯款，完成後請提供訂單編號及帳號後五碼。
     </p>
<hr className="my-4" />
<div className="mt-4 rounded-2xl border border-green-200 bg-green-50 p-4">

  <h3 className="text-xl font-bold text-green-700 mb-2">
    💚 訂單完成後，請加入LINE官方帳號
  </h3>

  <p className="text-gray-700 leading-6">
    並提供：
  </p>

  <ul className="mt-2 space-y-1 text-gray-700">
    <li>✅ 訂單編號</li>
    <li>✅ 匯款帳號後五碼</li>
  </ul>

  <p className="mt-2 text-gray-700 leading-6">
    收到您的訊息後，
    <br />
    我們會盡快確認款項，並且為您安排出貨。
    <br />
    感謝您的支持～❤️
  </p>

  <a
    href="https://lin.ee/q8kagIG"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white text-xl font-bold px-7 py-2 rounded-xl transition"
  >
    加入LINE官方帳號
  </a>
</div>

  </div>

)}

{/* 貨到付款 */}
{order.payment === "貨到付款" && (
  <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6">
    <h3 className="text-xl font-bold text-green-700 mb-4">
      🚚 配送付款說明
    </h3>

    <p className="text-gray-700">
      商品將由新竹物流冷凍宅配配送，請於收貨時付款給配送人員。
    </p>
 <hr className="my-6" />

 <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-6">
    <h3 className="text-xl font-bold text-green-700 mb-4">
      💚 訂單完成後，請加入 LINE 官方帳號。
    </h3>

    <p className="text-gray-700 leading-8">
      並提供：
    </p>

    <ul className="mt-4 space-y-2 text-gray-700">
      <li>✅ 訂單編號</li>
    </ul>

    <p className="mt-5 text-gray-700 leading-8">
      我們會盡快確認訂單並安排出貨。
      <br />
      感謝您的支持～❤️
    </p>

    <a
      href="https://lin.ee/q8kagIG"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block mt-6 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl transition"
    >
      加入 LINE 官方帳號
    </a>
  </div>

  </div>
)}


</div>
)}

        <Link
          href="/"
          className="block text-center mt-12 bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-xl text-lg font-bold"
        >
          返回首頁
        </Link>

      </div>

    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="max-w-3xl mx-auto px-8 py-20 text-center">
          <p>載入中...</p>
        </main>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
