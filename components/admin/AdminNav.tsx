"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  {
    name: "Dashboard",
    href: "/admin",
  },
  {
    name: "商品管理",
    href: "/admin/products",
  },
  {
    name: "訂單管理",
    href: "/admin/orders",
  },
  {
    name: "配送設定",
    href: "/admin/shipping",
  },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl gap-2 px-6 py-3">
        {menus.map((menu) => {
          const active =
            pathname === menu.href ||
            (menu.href !== "/admin" && pathname.startsWith(menu.href));

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
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
    </nav>
  );
}