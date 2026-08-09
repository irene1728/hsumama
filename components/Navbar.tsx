"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/cart/CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { cart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2 md:grid md:grid-cols-3 md:px-8 md:py-3">

        {/* Logo */}
        <div className="justify-self-start">
          <Link href="/">
            <h1
              className={`text-2xl md:text-4xl font-bold cursor-pointer transition ${
                isHome
  ? "text-[#4E342E]"
  : "text-[#4E342E]"
              }`}
            >
              徐媽媽冰鑽滷味
            </h1>
          </Link>

          <p
          className={`text-xs md:text-base mt-1 transition ${
              isHome ? "text-[#C56A2D]" : "text-orange-600"
            }`}
          >
            獨家祕方．傳承三代
          </p>
        </div>

{/* 手機版選單按鈕 */}
<button
  type="button"
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  className="md:hidden text-2xl text-[#4E342E]"
  aria-label="開啟選單"
>
  ☰
</button>

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

{/* 手機版下拉選單 */}
{mobileMenuOpen && (
  <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 md:hidden">
    <nav className="flex flex-col">
      <Link
        href="/"
        onClick={() => setMobileMenuOpen(false)}
        className="px-6 py-4 text-lg text-[#4E342E] border-b border-gray-100"
      >
        首頁
      </Link>

      <Link
        href="/products"
        onClick={() => setMobileMenuOpen(false)}
        className="px-6 py-4 text-lg text-[#4E342E] border-b border-gray-100"
      >
        全部商品
      </Link>

      <Link
        href="/#story"
        onClick={() => setMobileMenuOpen(false)}
        className="px-6 py-4 text-lg text-[#4E342E] border-b border-gray-100"
      >
        關於我們
      </Link>

      <Link
        href="/#order"
        onClick={() => setMobileMenuOpen(false)}
        className="px-6 py-4 text-lg text-[#4E342E]"
      >
        訂購方式
      </Link>
    </nav>
  </div>
)}

        {/* 購物車 */}
        <div className="justify-self-end">
          <Link
            href="/cart"
           className="flex items-center gap-1.5 rounded-full bg-orange-600 px-3 py-2 md:gap-2 md:px-5 md:py-3 text-white font-semibold
             hover:bg-orange-800 transition hover:scale-105 hover:shadow-lg"
          >
           <span className="text-lg md:text-2xl">🛒</span>

           <span className="text-sm md:text-base">購物車</span>

          <span className="bg-white text-orange-600 transition-all
duration-300 rounded-full min-w-6 h-6 md:min-w-8 md:h-8 flex items-center justify-center text-m font-bold px-2">
              {totalQuantity}
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
}