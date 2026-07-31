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
            className="bg-white border border-gray-200 rounded-2xl shadow p-3 flex items-center gap-6"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={120}
              height={120}
              className="rounded-xl object-contain"
            />

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-stone-800">
                {item.name}
              </h2>

              <p className="mt-2 text-lg text-orange-600 font-semibold">
                {formatPrice(item.price)}
              </p>

              <div className="flex items-center gap-3 mt-5">
                <button
                  onClick={() => decreaseQuantity(item.slug)}
                  className="w-10 h-10 rounded-lg border text-xl hover:bg-gray-100 transition"
                >
                  −
                </button>

                <span className="text-xl font-bold w-8 text-center">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQuantity(item.slug)}
                  className="w-10 h-10 rounded-lg border text-xl hover:bg-gray-100 transition"
                >
                  ＋
                </button>
              </div>

              <p className="mt-5 text-base text-gray-600">
                小計：
                <span className="ml-2 font-bold text-stone-800">
                  {formatPrice(subtotal)}
                </span>
              </p>
            </div>

            <button
              onClick={() => removeFromCart(item.slug)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition"
            >
              <span className="text-2xl">🗑️</span>

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