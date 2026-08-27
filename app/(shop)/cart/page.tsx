"use client";

import Link from "next/link";

import { useCart } from "@/cart/CartContext";

import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";

export default function CartPage() {
  const { cart } = useCart();

  return (
    <main className="max-w-7xl mx-auto px-8 py-20 md:py-28">
      <h1 className="text-4xl font-bold text-stone-800">
        購物車
      </h1>

      <p className="text-gray-500 mt-1">
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
        <div className="mt-2 grid lg:grid-cols-3 gap-10">
          {/* 商品列表 */}
          <div className="lg:col-span-2">
            <CartItem />
          </div>

          {/* 購物車摘要 */}
          <CartSummary />
        </div>
      )}
    </main>
  );
}