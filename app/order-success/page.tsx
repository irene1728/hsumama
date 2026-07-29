"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Order = {
  id: number;
  customer_name: string;
  payment: string;
  total_amount: number;
};

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const [order, setOrder] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadOrder() {
      if (!orderId) return;

      const { data } = await supabase
        .from("orders")
        .select("id, customer_name, payment, total_amount")
        .eq("id", Number(orderId))
        .single();

      if (data) {
        setOrder(data);
      }
    }

    loadOrder();
  }, [orderId]);

 async function copyAccount() {
  try {
    await navigator.clipboard.writeText("123456789012");

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);

  } catch {
    alert("複製失敗，請手動複製。");
  }
}

  return (
    <main className="max-w-3xl mx-auto px-8 py-6">

      <div className="bg-white border border-gray-200 rounded-3xl shadow-lg p-4

      ">

        <div className="text-center">

          <div className="text-5xl mb-4 ">
            🎉
          </div>

          <h1 className="text-2xl font-bold text-stone-800">
            訂單已成立
          </h1>

          <p className="mt-4 text-gray-600">
            感謝您的訂購，我們已收到您的訂單。
          </p>

        </div>

        {order && (

          <div className="mt-8 space-y-4 border-t pt-6">

            <div className="flex justify-between">
              <span>訂單編號</span>
              <span className="font-bold">#{order.id}</span>
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
{/* 配送方式 */}
<div className="flex justify-between">
  <span>配送方式</span>
  <span>黑貓冷凍宅配</span>
</div>

{/* ATM 轉帳 */}
{order.payment === "ATM轉帳" && (
  <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6">
    <h3 className="text-xl font-bold text-orange-700 mb-4">
      🏦 ATM 匯款資訊
    </h3>

    <div className="space-y-2 text-gray-700">
      <p><strong>銀行：</strong>（請填入你的銀行名稱）</p>
      <p><strong>銀行代碼：</strong>822</p>
      <div className="flex items-center gap-3">

  <p>
    <strong>帳號：</strong>
    123456789012
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
      <p><strong>戶名：</strong>徐媽媽冰鑽滷味</p>
    </div>

    <p className="mt-4 text-sm text-red-600">
      ※ 請於 3 日內完成匯款，完成後請提供訂單編號及帳號後五碼。
     </p>
<hr className="my-6" />
<div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-6">

  <h3 className="text-xl font-bold text-green-700 mb-3">
    💚 訂單完成後，請加入LINE官方帳號
  </h3>

  <p className="text-gray-700 leading-8">
    並提供：
  </p>

  <ul className="mt-4 space-y-2 text-gray-700">
    <li>✅ 訂單編號</li>
    <li>✅ 匯款帳號後五碼</li>
  </ul>

  <p className="mt-5 text-gray-700 leading-8">
    收到您的訊息後，
    <br />
    我們會盡快確認款項並安排出貨。
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

{/* 貨到付款 */}
{order.payment === "貨到付款" && (
  <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6">
    <h3 className="text-xl font-bold text-green-700 mb-4">
      🚚 配送付款說明
    </h3>

    <p className="text-gray-700">
      商品將由黑貓冷凍宅配配送，請於收貨時付款給配送人員。
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