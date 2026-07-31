"use client";

import Link from "next/link";
import { useCart } from "@/cart/CartContext";

export default function CartSummary() {
  const { cart } = useCart();

  const totalQuantity = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow p-8 h-fit sticky top-28">
      <h2 className="text-2xl font-bold text-stone-800">
        購物車摘要
      </h2>

      <div className="mt-8 space-y-5">
        <div className="flex justify-between">
          <span>商品數量</span>

          <span className="font-bold">
            {totalQuantity} 件
          </span>
        </div>

        <hr />

        <div className="flex justify-between">
          <span>商品金額</span>

          <span className="font-bold text-orange-600">
            價格請洽詢
          </span>
        </div>
      </div>

      <Link
        href="/checkout"
        className="block w-full mt-10 bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-xl text-lg font-bold text-center transition"
      >
        前往結帳
      </Link>
    </div>
  );
}
