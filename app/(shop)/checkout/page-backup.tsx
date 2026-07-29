"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/cart/CartContext";

export default function CheckoutPage() {

  const { cart, clearCart } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  return (
    <main className="max-w-7xl mx-auto px-8 py-12">

      <h1 className="text-4xl font-bold text-stone-800 mb-10">
        結帳
      </h1>

      <div className="grid lg:grid-cols-3 gap-10">

        {/* 左邊：收件資料 */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-md p-8">

          <h2 className="text-2xl font-bold mb-8">
            收件資料
          </h2>

<div className="space-y-6">

  {/* 收件人 */}
  <div>
    <label className="block font-semibold mb-2">
      收件人姓名
    </label>

  <input
  type="text"
  value={customerName}
  onChange={(e) => setCustomerName(e.target.value)}
  placeholder="請輸入收件人姓名"
  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none"
/>
  </div>

  {/* 電話 */}
  <div>
    <label className="block font-semibold mb-2">
      聯絡電話
    </label>

  <input
  type="tel"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  placeholder="請輸入手機號碼"
  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none"
/>
  </div>

  {/* Email */}
  <div>
    <label className="block font-semibold mb-2">
      Email（選填）
    </label>

   <input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="example@email.com"
  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none"
/>
  </div>

  {/* 地址 */}
  <div>
    <label className="block font-semibold mb-2">
      收件地址
    </label>

    <input
  type="text"
  value={address}
  onChange={(e) => setAddress(e.target.value)}
  placeholder="請輸入完整地址"
  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none"
/>
  </div>

  {/* 備註 */}
  <div>
    <label className="block font-semibold mb-2">
      備註
    </label>

   <textarea
  rows={4}
  value={note}
  onChange={(e) => setNote(e.target.value)}
  placeholder={`如需指定到貨日期、
切片需求、
其他特殊需求，
請在此留言。我們將盡快與您確認。`}
  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none resize-none"
/>

  </div>

</div>

        </div>

        {/* 右邊：訂單摘要 */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-8 h-fit sticky top-28">

          <h2 className="text-2xl font-bold">
  訂單摘要
</h2>

<div className="mt-8 space-y-5">

  {/* 商品列表 */}
  <div className="space-y-3">

    {cart.map((item) => (

  <div
    key={item.slug}
    className="flex justify-between items-start gap-3"
  >

    <span className="flex-1">
      {item.name}
    </span>

    <span className="font-semibold whitespace-nowrap">
      × {item.quantity}
    </span>

  </div>

))}

  </div>

  <hr />

  {/* 商品數量 */}
  <div className="flex justify-between">

    <span>商品數量</span>

    <span className="font-bold">

      {cart.reduce(
        (sum, item) => sum + item.quantity,
        0
      )} 件

    </span>

  </div>

  <hr />

  {/* 配送方式 */}
  <div className="flex justify-between">

    <span>配送方式</span>

    <span className="font-bold">
      黑貓冷凍宅配
    </span>

  </div>

  <hr />

  {/* 付款方式 */}
  <div className="flex justify-between">

    <span>付款方式</span>

    <span className="font-bold text-orange-600">
      價格請洽詢
    </span>

  </div>

  <hr />

  {/* 商品金額 */}
  <div className="flex justify-between">

    <span>商品金額</span>

    <span className="font-bold text-orange-600">
      價格請洽詢
    </span>

  </div>

</div>

<Link
  href="/order-success"
  className="block w-full mt-10 bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-xl text-lg font-bold text-center transition"
>
  確認送出訂單
</Link>

        </div>

      </div>

    </main>
  );
}