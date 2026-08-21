"use client";

import Image from "next/image";

import { useCart } from "@/cart/CartContext";
import { formatPrice } from "@/lib/formatPrice";

export default function CartItem() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  return (
    <div className="space-y-6">
      {cart.map((item) => {
        const subtotal =
          item.price === null ? null : item.price * item.quantity;

        return (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-2xl shadow p-3 lg:p-2 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 min-w-0"
          >
            {/* 商品圖片 */}
            <Image
              src={item.image}
              alt={item.name}
              width={120}
              height={120}
              className="rounded-xl object-contain ml-0 lg:ml-2 shrink-0 mx-auto lg:mx-0"
            />

            {/* 商品資訊 */}
            <div className="flex-1 min-w-0">
              <h2 className="text-xl lg:text-2xl font-bold text-stone-800 break-words">
                {item.name}
              </h2>

              <p className="mt-2 text-lg text-orange-600 font-semibold">
                {formatPrice(item.price)}
              </p>

              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() => decreaseQuantity(item.slug)}
                  className="w-9 h-9 rounded-lg border text-xl hover:bg-gray-100 transition shrink-0"
                >
                  −
                </button>

                <span className="text-xl font-bold w-8 text-center shrink-0">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQuantity(item.slug)}
                  className="w-9 h-9 rounded-lg border text-xl hover:bg-gray-100 transition shrink-0"
                >
                  ＋
                </button>
              </div>

              <p className="mt-3 text-base text-gray-600">
                小計：
                <span className="ml-2 font-bold text-stone-800">
                  {formatPrice(subtotal)}
                </span>
              </p>
            </div>

            {/* 刪除按鈕 */}
            <button
              onClick={() => removeFromCart(item.slug)}
              className="w-full lg:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition shrink-0"
            >
              <span className="text-2xl">
                🗑️
              </span>

              <span className="text-lg font-medium">
                刪除
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}