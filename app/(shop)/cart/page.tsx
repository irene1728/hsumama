"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/cart/CartContext";

export default function CartPage() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  return (
    <main className="max-w-7xl mx-auto px-8 py-12">

      <h1 className="text-4xl font-bold text-stone-800">
        購物車
      </h1>

      <p className="text-gray-500 mt-2">
        共 {cart.length} 項商品
      </p>

      {cart.length === 0 ? (

        <div className="text-center py-24">

          <p className="text-2xl text-gray-500">
            您的購物車目前沒有商品
          </p>

          <Link
            href="/products"
            className="inline-block mt-8 bg-orange-600 text-white px-8 py-4 rounded-xl hover:bg-orange-700 transition"
          >
            前往選購商品
          </Link>

        </div>

      ) : (

        <div className="mt-12 grid lg:grid-cols-3 gap-10">

          {/* 商品列表 */}
          <div className="lg:col-span-2 space-y-6">

            {cart.map((item) => (

              <div
                key={item.slug}
                className="bg-white border border-gray-200 rounded-2xl shadow p-6 flex items-center gap-6"
              >

                <Image
                  src={item.image}
                  alt={item.name}
                  width={120}
                  height={120}
                  className="rounded-xl object-contain"
                />

                <div className="flex-1">

                  <h2 className="text-2xl font-bold">
                    {item.name}
                  </h2>

                  <div className="flex items-center gap-3 mt-5">

                    <button
                      onClick={() => decreaseQuantity(item.slug)}
                      className="w-10 h-10 rounded-lg border text-xl hover:bg-gray-100"
                    >
                      −
                    </button>

                    <span className="text-xl font-bold w-8 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.slug)}
                      className="w-10 h-10 rounded-lg border text-xl hover:bg-gray-100"
                    >
                      ＋
                    </button>

                  </div>

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

            ))}

          </div>

          {/* 購物車摘要 */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow p-8 h-fit sticky top-28">

            <h2 className="text-2xl font-bold text-stone-800">
              購物車摘要
            </h2>

            <div className="mt-8 space-y-5">

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

        </div>

      )}

    </main>
  );
}