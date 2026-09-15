"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function ProductTabs() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentTab =
    pathname === "/admin/products/profit"
      ? "profit"
      : searchParams.get("tab") ?? "all";

  return (
    <div className="flex gap-2 mb-3 overflow-x-auto">

      <Link
        href="/admin/products?tab=all"
        className={`shrink-0 px-4 py-2 rounded-xl font-bold transition ${
          currentTab === "all"
            ? "bg-orange-600 text-white"
            : "bg-white text-gray-700 border hover:bg-orange-50"
        }`}
      >
        全部商品
      </Link>

      <Link
        href="/admin/products?tab=active"
        className={`shrink-0 px-4 py-2 rounded-xl font-bold transition ${
          currentTab === "active"
            ? "bg-green-600 text-white"
            : "bg-white text-gray-700 border hover:bg-green-50"
        }`}
      >
        🟢 上架商品
      </Link>

      <Link
        href="/admin/products?tab=inactive"
        className={`shrink-0 px-4 py-2 rounded-xl font-bold transition ${
          currentTab === "inactive"
            ? "bg-red-600 text-white"
            : "bg-white text-gray-700 border hover:bg-red-50"
        }`}
      >
        🔴 下架商品
      </Link>

      <Link
        href="/admin/products/profit"
        className={`shrink-0 px-4 py-2 rounded-xl font-bold transition ${
          currentTab === "profit"
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700 border hover:bg-blue-50"
        }`}
      >
        📊 毛利分析
      </Link>

    </div>
  );
}