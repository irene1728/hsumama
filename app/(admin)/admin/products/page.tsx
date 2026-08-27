"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

const categoryMap: Record<string, string> = {
  pork: "豬肉",
  chicken: "雞肉",
  beef: "牛肉",
  lamb: "羊肉",
  sausage: "香腸",
  seafood: "海鮮",
  soup: "湯品",
};

export default function AdminProductsPage() {
  
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("sort_order");

    if (error) {
      console.error(error);
      return;

    }

    setProducts(data ?? []);
  }

  async function toggleActive(product: any) {
    const { error } = await supabase
      .from("products")
      .update({
        is_active: !product.is_active,
      })
      .eq("id", product.id);

    if (error) {
      alert("更新失敗");
      return;
    }

    loadProducts();
  }

  async function toggleFeatured(product: any) {
    const { error } = await supabase
      .from("products")
      .update({
        featured: !product.featured,
      })
      .eq("id", product.id);

    if (error) {
      alert("更新失敗");
      return;
    }

    loadProducts();
  }

  async function updateSortOrder(
    productId: number,
    sortOrder: number
  ) {
    const { error } = await supabase
      .from("products")
      .update({
        sort_order: sortOrder,
      })
      .eq("id", productId);

    if (error) {
      alert("排序更新失敗");
      return;
    }

    loadProducts();
  }

  return (
    <main className="max-w-7xl mx-auto p-3 md:p-1">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-2">
        商品管理
      </h1>

      {/* =========================
          Desktop：維持原本 Table
          ========================= */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border">
        <table className="w-full table-fixed">
          <thead className="bg-orange-100">
            <tr>
              <th className="w-28 px-4 py-3">圖片</th>

              <th className="w-74 text-left px-4">
                商品
              </th>

              <th className="w-32 px-4 text-center">
                分類
              </th>

              <th className="w-32 px-4 text-center">
                價格
              </th>

              <th className="w-32 px-4 text-center">
                批發價
              </th>

              <th className="w-20 px-4 text-center">
                人氣
              </th>

              <th className="w-20 px-4 text-center">
                上架
              </th>

              <th className="w-20 px-4 text-center">
                排序
              </th>

              <th className="w-32 px-4 text-center">
                操作
              </th>
            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

              <tr
                key={product.id}
                className="border-t h-12"
              >
                <td className="w-28 px-4 py-3">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="mx-auto rounded-lg object-cover"
                  />
                </td>

                <td className="w-74 px-4">
                  {product.name}
                </td>

                <td className="px-4 text-center">
                  {categoryMap[product.category] ??
                    product.category}
                </td>

                <td className="px-4 text-center">
                  {product.price
                    ? `NT$ ${product.price}`
                    : "-"}
                </td>

                <td className="px-4 text-center">
                  {product.wholesale_price != null
                    ? `NT$ ${product.wholesale_price}`
                    : "尚未設定"}
                </td>

                <td className="text-center">
                  <button
                    onClick={() =>
                      toggleFeatured(product)
                    }
                    className={`px-3 py-1 rounded-full text-sm font-bold transition ${
                      product.featured
                        ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {product.featured
                      ? "⭐ 人氣"
                      : "☆ 一般"}
                  </button>
                </td>

                <td className="text-center">
                  <button
                    onClick={() =>
                      toggleActive(product)
                    }
                    className={`px-3 py-1 rounded-full text-sm font-bold transition ${
                      product.is_active
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-red-100 text-red-700 hover:bg-red-200"
                    }`}
                  >
                    {product.is_active
                      ? "上架"
                      : "下架"}
                  </button>
                </td>

                <td className="text-center">
                  <input
                    type="number"
                    defaultValue={product.sort_order}
                    className="w-16 border rounded-lg px-2 py-1 text-center"
                    onBlur={(e) =>
                      updateSortOrder(
                        product.id,
                        Number(e.target.value)
                      )
                    }
                  />
                </td>

                <td className="text-center">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium px-3 py-2 rounded-lg transition inline-block"
                  >
                    編輯
                  </Link>
                </td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* =========================
          Mobile：商品卡片
          ========================= */}
      <div className="md:hidden space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl border bg-white p-4 shadow-sm"
          >
            {/* 商品基本資訊 */}
            <div className="flex items-center gap-4">
              <Image
                src={product.image}
                alt={product.name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />

              <div className="min-w-0 flex-1">
                <h2 className="font-bold text-lg leading-snug">
                  {product.name}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {categoryMap[product.category] ??
                    product.category}
                </p>
              </div>
            </div>

            {/* 價格資訊 */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="rounded-xl bg-gray-50 px-3 py-2">
                <div className="text-xs text-gray-500">
                  市價
                </div>

                <div className="font-bold text-gray-800 mt-1">
                  {product.price
                    ? `NT$ ${product.price}`
                    : "-"}
                </div>
              </div>

              <div className="rounded-xl bg-orange-50 px-3 py-2">
                <div className="text-xs text-gray-500">
                  批發價
                </div>

                <div className="font-bold text-orange-700 mt-1">
                  {product.wholesale_price != null
                    ? `NT$ ${product.wholesale_price}`
                    : "尚未設定"}
                </div>
              </div>
            </div>

            {/* 狀態操作 */}
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() =>
                  toggleFeatured(product)
                }
                className={`flex-1 px-3 py-2 rounded-xl text-sm font-bold transition ${
                  product.featured
                    ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {product.featured
                  ? "⭐ 人氣"
                  : "☆ 一般"}
              </button>

              <button
                onClick={() =>
                  toggleActive(product)
                }
                className={`flex-1 px-3 py-2 rounded-xl text-sm font-bold transition ${
                  product.is_active
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-red-100 text-red-700 hover:bg-red-200"
                }`}
              >
                {product.is_active
                  ? "🟢 上架"
                  : "🔴 下架"}
              </button>
            </div>

            {/* 排序 */}
            <div className="flex items-center justify-between mt-4">
              <label
                htmlFor={`sort-${product.id}`}
                className="text-sm font-medium text-gray-700"
              >
                排序
              </label>

              <input
                id={`sort-${product.id}`}
                type="number"
                defaultValue={product.sort_order}
                className="w-20 border rounded-xl px-3 py-2 text-center"
                onBlur={(e) =>
                  updateSortOrder(
                    product.id,
                    Number(e.target.value)
                  )
                }
              />
            </div>

            {/* 編輯 */}
            <Link
              href={`/admin/products/${product.id}`}
              className="mt-4 w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 rounded-xl transition flex items-center justify-center"
            >
              ✏️ 編輯商品
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}