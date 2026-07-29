"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/cart/CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { cart } = useCart();

  const totalQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHome
          ? "bg-white/20 backdrop-blur-md border-b border-white/20"
          : "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center px-8 py-4">

        {/* Logo */}
        <div className="justify-self-start">
          <Link href="/">
            <h1
              className={`text-4xl font-bold cursor-pointer transition ${
                isHome ? "text-white" : "text-stone-900"
              }`}
            >
              徐媽媽冰鑽滷味
            </h1>
          </Link>

          <p
            className={`text-sm mt-1 transition ${
              isHome ? "text-amber-200" : "text-orange-600"
            }`}
          >
            獨家祕方．傳承三代
          </p>
        </div>

        {/* 中間選單 */}
        <nav className="hidden md:flex justify-center items-center gap-8 font-medium">

          <Link
            href="/"
            className={`transition ${
              isHome
                ? "text-white hover:text-amber-300"
                : "text-stone-800 hover:text-orange-600"
            }`}
          >
            首頁
          </Link>

          <Link
            href="/products"
            className={`transition ${
              isHome
                ? "text-white hover:text-amber-300"
                : "text-stone-800 hover:text-orange-600"
            }`}
          >
            全部商品
          </Link>

          <a
            href="/#story"
            className={`transition ${
              isHome
                ? "text-white hover:text-amber-300"
                : "text-stone-800 hover:text-orange-600"
            }`}
          >
            關於我們
          </a>

          <a
            href="/#order"
            className={`transition ${
              isHome
                ? "text-white hover:text-amber-300"
                : "text-stone-800 hover:text-orange-600"
            }`}
          >
            訂購方式
          </a>

        </nav>

        {/* 購物車 */}
        <div className="justify-self-end">
          <Link
            href="/cart"
            className="flex items-center gap-2 rounded-full bg-orange-600 px-5 py-3 text-white font-semibold hover:bg-orange-700 transition"
          >
            <span>🛒</span>

            <span>購物車</span>

            <span className="bg-white text-orange-600 rounded-full min-w-6 h-6 flex items-center justify-center text-sm font-bold px-2">
              {totalQuantity}
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
}