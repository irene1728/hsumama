"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menus = [
  {
    name: "系統總覽",
    href: "/admin",
  },
  {
    name: "商品管理",
    href: "/admin/products",
  },
  {
    name: "庫存管理",
    href: "/admin/inventory",
  },
  {
    name: "訂單管理",
    href: "/admin/orders",
  },
  {
    name: "會員管理",
    href: "/admin/members",
  },
  {
    name: "配送設定",
    href: "/admin/shipping",
  },
];

export default function AdminNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const overview = menus[0];
  const mobileMenus = menus.slice(1);

  const isActive = (href: string) => {
    return (
      pathname === href ||
      (href !== "/admin" && pathname.startsWith(href))
    );
  };

  return (
    <nav className="relative border-b bg-white">
      {/* ==================================================
          Desktop
          ================================================== */}

      <div className="hidden md:flex mx-auto max-w-7xl gap-2 px-6 py-3">
        {menus.map((menu) => {
          const active = isActive(menu.href);

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`rounded-lg px-4 py-2 text-sm md:text-2xl font-medium transition ${
                active
                  ? "bg-orange-500 text-white"
                  : "text-gray-700 hover:bg-orange-100"
              }`}
            >
              {menu.name}
            </Link>
          );
        })}
      </div>

      {/* ==================================================
          Mobile
          左邊：三條線
          右邊：系統總覽
          ================================================== */}

      <div className="md:hidden">
        <div className="flex items-center justify-between gap-3 px-4 py-2">
          {/* 漢堡選單 */}

          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen((open) => !open)
            }
            aria-label="開啟後台選單"
            aria-expanded={mobileMenuOpen}
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border transition ${
              mobileMenuOpen
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-orange-100"
            }`}
          >
            <span className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-6 bg-current" />
              <span className="block h-0.5 w-6 bg-current" />
              <span className="block h-0.5 w-6 bg-current" />
            </span>
          </button>

          {/* 系統總覽 */}

          <Link
            href={overview.href}
            onClick={() => setMobileMenuOpen(false)}
            className={`flex-1 rounded-lg px-4 py-2 text-center text-xl font-bold transition ${
              isActive(overview.href)
                ? "bg-orange-500 text-white"
                : "text-gray-700 hover:bg-orange-100"
            }`}
          >
            {overview.name}
          </Link>
        </div>

        {/* ==================================================
            Mobile 下拉選單
            ================================================== */}

{mobileMenuOpen && (
  <div className="absolute left-0 right-0 top-full z-50 border-b border-gray-300 bg-white px-4 py-2 shadow-lg">
    <div className="space-y-1">
      {mobileMenus.map((menu) => {
        const active = isActive(menu.href);

        return (
          <Link
            key={menu.href}
            href={menu.href}
            onClick={() => setMobileMenuOpen(false)}
            className={`block rounded-lg px-4 py-3 text-lg font-medium transition ${
              active
                ? "bg-orange-500 text-white"
                : "text-gray-700 hover:bg-orange-100"
            }`}
          >
            {menu.name}
          </Link>
        );
      })}
    </div>
  </div>
)}
      </div>
    </nav>
  );
}