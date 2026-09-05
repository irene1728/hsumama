"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useCart } from "@/cart/CartContext";

type MarqueeAnnouncement = {
  id: string;
  content: string;
  sort_order: number;
};
type MarqueeSettings = {
  speed_seconds: number;
};

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { cart } = useCart();
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [marqueeAnnouncements, setMarqueeAnnouncements] = useState<
  MarqueeAnnouncement[]
>([]);

const [marqueeSpeed, setMarqueeSpeed] = useState(24);

const supabase = createClient();

useEffect(() => {
  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setIsLoggedIn(!!user);
  }

async function loadMarqueeAnnouncements() {
  const { data, error } = await supabase
    .from("marquee_announcements")
    .select("id, content, sort_order")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("讀取跑馬燈失敗：", error);
  } else {
    setMarqueeAnnouncements(data ?? []);
  }

  const { data: settings, error: settingsError } =
    await supabase
      .from("marquee_settings")
      .select("speed_seconds")
      .eq("id", 1)
      .maybeSingle();

  if (settingsError) {
    console.error("讀取跑馬燈速度失敗：", settingsError);
    return;
  }

  setMarqueeSpeed(
    settings?.speed_seconds ?? 24
  );
}

  checkUser();
  loadMarqueeAnnouncements();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setIsLoggedIn(!!session?.user);
  });

  return () => {
    subscription.unsubscribe();
  };
}, [supabase]);


  const totalQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHome
          ? "bg-white/40 md:bg-white/30 backdrop-blur-xl border-b border-white/30"
          : "bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-1 py-2 md:grid md:grid-cols-[26%_48%_26%] md:px-4 md:py-2">

        {/* Logo */}
       <div className="order-2 flex-1 text-left md:order-none md:flex-none md:text-left md:justify-self-start">
          <Link href="/">
            <h1
              className={`text-3xl md:text-4xl md:font-bold cursor-pointer transition ${
                isHome
  ? "text-[#BB5500] md:text-[#BB5500]"
  : "text-[#8B4513]"
              }`}
            >
              徐媽媽冰鑽滷味
            </h1>
          </Link>

          <p
          className={`text-sm md:text-xl mt-1 transition ml-7 ${
              isHome ? "text-[#AA7700]" : "text-orange-600"
            }`}
          >
            獨家祕方．傳承三代
          </p>
        </div>

{/* 手機版選單按鈕 */}
<button
  type="button"
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  className="order-1 md:order-none md:hidden shrink-0 text-4xl leading-none text-[#4E342E]"
  aria-label="開啟選單"
>
  ☰
</button>

       {/* 中間選單 + 跑馬燈 */}
<div className="hidden md:flex flex-col items-center justify-center">

  {/* 中間選單 */}
  <nav className="flex justify-center items-center gap-8 font-medium">

    <Link
      href="/"
      className={`transition ${
        isHome
          ? "text-[#FF8800] text-[22px] hover:text-amber-300"
          : "text-[#AA7700] text-[22px] hover:text-orange-600"
      }`}
    >
      首頁
    </Link>

    <Link
      href="/products"
      className={`transition ${
        isHome
          ? "text-[#FF8800] text-[22px] hover:text-amber-300"
          : "text-[#AA7700] text-[22px] hover:text-orange-600"
      }`}
    >
      全部商品
    </Link>

    <Link
      href="/about"
      className={`transition ${
        isHome
          ? "text-[#FFBB66] text-[22px] hover:text-amber-300"
          : "text-[#AA7700] text-[22px] hover:text-orange-600"
      }`}
    >
      關於我們
    </Link>

    <Link
      href="/order-info"
      className={`transition ${
        isHome
          ? "text-[#FFBB66] text-[22px] hover:text-amber-300"
          : "text-[#AA7700] text-[22px] hover:text-orange-600"
      }`}
    >
      訂購方式
    </Link>

  </nav>

  {/* 跑馬燈 */}
  {marqueeAnnouncements.length > 0 && (
    <div className="mt-1 w-full max-w-[560px] overflow-hidden">
      <div className="relative h-6 overflow-hidden">
       <div
  className="marquee-track"
  style={{
    animationDuration: `${marqueeSpeed}s`,
  }}
>
          {[...marqueeAnnouncements, ...marqueeAnnouncements].map(
            (item, index) => (
              <span
                key={`${item.id}-${index}`}
                  className={`inline-block whitespace-nowrap text-lg mr-16 ${
    isHome
      ? "text-[#FFFF00] drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
      : "text-[#FFFF00] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
  }`}
              >
                {item.content}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  )}

</div>

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

     <Link href="/about"
        onClick={() => setMobileMenuOpen(false)}
        className="px-6 py-4 text-lg text-[#4E342E] border-b border-gray-100"
      >
        關於我們
      </Link>

      <Link href="/order-info"
        onClick={() => setMobileMenuOpen(false)}
        className="px-6 py-4 text-lg text-[#4E342E]"
      >
        訂購方式
      </Link>

<Link
  href={isLoggedIn ? "/account" : "/account/login"}
  onClick={() => setMobileMenuOpen(false)}
  className="px-6 py-4 text-lg text-[#4E342E] border-t border-gray-100"
>
  👤 {isLoggedIn ? "會員中心" : "會員登入"}
</Link>

    </nav>
  </div>
)}

     {/* 會員 + 購物車 */}
<div className="order-3 shrink-0 md:order-none md:justify-self-end flex flex-col items-end gap-1 md:flex-row md:items-center md:gap-4">

  {/* 會員登入 */}
<Link
  href={isLoggedIn ? "/account" : "/account/login"}
className={`flex items-center gap-1 font-semibold text-base md:gap-1.5 md:text-xl transition ${
    isHome
      ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] hover:text-amber-200 mr-2"
      : "text-[#4E342E] hover:text-orange-600"
  }`}
>
<span className="text-lg md:text-xl">👤</span>
  <span>{isLoggedIn ? "會員中心" : "會員登入"}</span>
</Link>

  {/* 購物車 */}
  <Link
    href="/cart"
    data-cart-target
    className="flex items-center gap-1 rounded-full bg-orange-600 px-2 py-1 md:gap-2 md:px-5 md:py-3 text-white font-semibold
      hover:bg-orange-800 transition hover:scale-105 hover:shadow-lg"
  >
   <span className="text-base md:text-2xl">🛒</span>

   <span className="text-sm md:text-lg">購物車</span>

    <span className="bg-white text-orange-600 transition-all
  duration-300 rounded-full min-w-5 h-5 md:min-w-8 md:h-8 flex items-center justify-center text-sm md:text-lg font-bold px-1 md:px-2"
    >
      {totalQuantity}
    </span>
  </Link>

</div>

      </div>
    </header>
  );
}