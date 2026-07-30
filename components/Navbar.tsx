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
          ? "bg-white/30 backdrop-blur-xl border-b border-white/30"
          : "bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center px-8 py-3">

        {/* Logo */}
        <div className="justify-self-start">
          <Link href="/">
            <h1
              className={`text-4xl font-bold cursor-pointer transition ${
                isHome
  ? "text-[#4E342E]"
  : "text-[#4E342E]"
              }`}
            >
              徐媽媽冰鑽滷味
            </h1>
          </Link>

          <p
            className={`text-base mt-1 transition ${
              isHome ? "text-[#C56A2D]" : "text-orange-600"
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
                ? "text-[#AA7700] text-[22px] hover:text-amber-300"
                : "text-[#AA7700] text-[22px] hover:text-orange-600"
            }`}
          >
            首頁
          </Link>

          <Link
            href="/products"
            className={`transition ${
              isHome
                ? "text-[#AA7700] text-[22px] hover:text-amber-300"
                : "text-[#AA7700] text-[22px] hover:text-orange-600"
            }`}
          >
            全部商品
          </Link>

          <Link href="/#story"
            className={`transition ${
              isHome
                ? "text-[#AA7700] text-[22px] hover:text-amber-300"
                : "text-[#AA7700] text-[22px] hover:text-orange-600"
            }`}
          >
            關於我們
          </Link>

          <Link href="/#order"
            className={`transition ${
              isHome
                ? "text-[#AA7700] text-[22px] hover:text-amber-300"
                : "text-[#AA7700] text-[22px] hover:text-orange-600"
            }`}
          >
            訂購方式
         </Link>

        </nav>

        {/* 購物車 */}
        <div className="justify-self-end">
          <Link
            href="/cart"
            className="flex items-center gap-2 rounded-full bg-orange-600 px-5 py-3 text-white font-semibold
             hover:bg-orange-800 transition hover:scale-105 hover:shadow-lg"
          >
            <span className="text-2xl">🛒</span>

            <span>購物車</span>

          <span className="bg-white text-orange-600 transition-all
duration-300 rounded-full min-w-8 h-8 flex items-center justify-center text-m font-bold px-2">
              {totalQuantity}
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
}