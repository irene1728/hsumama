"use client";

import Link from "next/link";

import { useCart } from "@/cart/CartContext";
import { formatPrice } from "@/lib/formatPrice";

import CartSummaryItem from "./CartSummaryItem";

export default function CartSummary() {
  const { cart } = useCart();

  const totalQuantity = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.price ?? 0) * item.quantity,
    0
  );

  return (
    <aside className="bg-white border border-gray-200 rounded-2xl shadow p-6 sticky top-28">
      <h2 className="text-2xl font-bold text-stone-800">
        購物車摘要
      </h2>

      {/* 商品摘要 */}
      <div className="mt-6 border rounded-xl divide-y max-h-200 overflow-y-auto">
        {cart.map((item) => (
          <CartSummaryItem
            key={item.id}
            item={item}
          />
        ))}
      </div>

      {/* 統計 */}
      <div className="mt-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">
            商品數量
          </span>

          <span className="font-bold text-stone-800">
            {totalQuantity} 件
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">
            商品總額
          </span>

          <span className="text-2xl font-bold text-orange-600">
            {formatPrice(totalPrice)}
          </span>
        </div>
      </div>

      {/* 結帳按鈕 */}
      <Link
        href="/checkout"
        className="block w-full mt-8 bg-orange-600 hover:bg-orange-700 text-white text-center text-lg font-bold py-4 rounded-xl transition"
      >
        前往結帳
      </Link>
    </aside>
  );
}