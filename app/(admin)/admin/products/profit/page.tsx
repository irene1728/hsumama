"use client";
import { Suspense } from "react";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import ProductTabs from "../ProductTabs";

type Product = {
  id: number;
  name: string;
  price: number | null;
  wholesale_price: number | null;
  is_active: boolean;
  image: string | null;
};

type ProfitProduct = Product & {
  profit: number;
  profitRate: number;
};

export default function ProductProfitPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] = useState<
    "profitAsc" | "profitDesc" | "rateAsc" | "rateDesc"
  >("profitAsc");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select(
        "id, name, price, wholesale_price, is_active, image"
      )
      .order("sort_order");

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setProducts(data ?? []);
    setLoading(false);
  }

  // =========================
  // 有完整成本資料的商品
  // =========================
const analyzedProducts = useMemo<ProfitProduct[]>(() => {
  return products
    .filter(
      (product) =>
        product.is_active &&
        product.price != null &&
        product.wholesale_price != null &&
        product.price > 0
    )

      .map((product) => {
        const price = Number(product.price);
        const wholesalePrice = Number(product.wholesale_price);

        const profit = price - wholesalePrice;
        const profitRate = (profit / price) * 100;

        return {
          ...product,
          profit,
          profitRate,
        };
      });
  }, [products]);

  // =========================
  // 尚未設定批發價
  // =========================
const missingCostProducts = useMemo(() => {
  return products.filter(
    (product) =>
      product.is_active &&
      product.price != null &&
      product.wholesale_price == null
  );
}, [products]);
  // =========================
  // 排序
  // =========================
  const sortedProducts = useMemo(() => {
    const list = [...analyzedProducts];

    switch (sortBy) {
      case "profitDesc":
        return list.sort((a, b) => b.profit - a.profit);

      case "rateAsc":
        return list.sort(
          (a, b) => a.profitRate - b.profitRate
        );

      case "rateDesc":
        return list.sort(
          (a, b) => b.profitRate - a.profitRate
        );

      case "profitAsc":
      default:
        return list.sort((a, b) => a.profit - b.profit);
    }
  }, [analyzedProducts, sortBy]);

  // =========================
  // 最高／最低毛利
  // =========================
  const highestProfitProduct =
    analyzedProducts.length > 0
      ? analyzedProducts.reduce((highest, product) =>
          product.profit > highest.profit
            ? product
            : highest
        )
      : null;

  const lowestProfitProduct =
    analyzedProducts.length > 0
      ? analyzedProducts.reduce((lowest, product) =>
          product.profit < lowest.profit
            ? product
            : lowest
        )
      : null;

  // =========================
  // 平均毛利率
  // =========================
  const averageProfitRate =
    analyzedProducts.length > 0
      ? analyzedProducts.reduce(
          (sum, product) => sum + product.profitRate,
          0
        ) / analyzedProducts.length
      : 0;

  return (
    <main className="max-w-7xl mx-auto p-2 md:p-1">

      <h1 className="text-3xl md:text-4xl font-bold mb-2">
        商品管理
      </h1>

      {/* =========================
          商品管理分頁
          ========================= */}
     <Suspense fallback={<p>讀取中...</p>}>
  <ProductTabs />
</Suspense>

      {/* =========================
          毛利分析標題
          ========================= */}
      <div className="mb-4">

        <h2 className="text-2xl md:text-3xl font-bold">
          📊 毛利分析
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          查看所有商品的售價、批發成本與單件毛利。
        </p>

      </div>

      {loading ? (

        <div className="rounded-2xl border bg-white p-8 text-center text-gray-500">
          載入商品資料中...
        </div>

      ) : (

        <>

          {/* =========================
              統計卡片
              ========================= */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">

            <div className="rounded-2xl border bg-white p-4">
              <div className="text-sm text-gray-500">
                可分析商品
              </div>

              <div className="text-2xl font-bold mt-1">
                {analyzedProducts.length}
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-4">
              <div className="text-sm text-gray-500">
                🟢 最高毛利
              </div>

              <div className="font-bold text-lg mt-1">
                {highestProfitProduct
                  ? `NT$ ${highestProfitProduct.profit}`
                  : "-"}
              </div>

              {highestProfitProduct && (
                <div className="text-sm text-gray-500 truncate mt-1">
                  {highestProfitProduct.name}
                </div>
              )}
            </div>

            <div className="rounded-2xl border bg-white p-4">
              <div className="text-sm text-gray-500">
                🔴 最低毛利
              </div>

              <div
                className={`font-bold text-lg mt-1 ${
                  lowestProfitProduct &&
                  lowestProfitProduct.profit < 0
                    ? "text-red-600"
                    : "text-gray-800"
                }`}
              >
                {lowestProfitProduct
                  ? `NT$ ${lowestProfitProduct.profit}`
                  : "-"}
              </div>

              {lowestProfitProduct && (
                <div className="text-sm text-gray-500 truncate mt-1">
                  {lowestProfitProduct.name}
                </div>
              )}
            </div>

            <div className="rounded-2xl border bg-white p-4">
              <div className="text-sm text-gray-500">
                平均毛利率
              </div>

              <div className="text-2xl font-bold mt-1">
                {averageProfitRate.toFixed(1)}%
              </div>
            </div>

          </div>

          {/* =========================
              尚未設定批發價
              ========================= */}
          {missingCostProducts.length > 0 && (

            <div className="rounded-2xl border border-yellow-300 bg-yellow-50 p-4 mb-5">

              <div className="font-bold text-yellow-800">
                ⚠️ 尚有 {missingCostProducts.length} 項商品尚未設定批發成本
              </div>

              <div className="text-sm text-yellow-700 mt-1">
                尚未設定批發價的商品不會列入毛利計算。
              </div>

            </div>

          )}

          {/* =========================
              排序
              ========================= */}
          <div className="flex flex-wrap items-center gap-2 mb-3">

            <span className="font-bold text-gray-700">
              排序：
            </span>

            <button
              onClick={() => setSortBy("profitAsc")}
              className={`px-3 py-2 rounded-xl text-sm font-bold border ${
                sortBy === "profitAsc"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-blue-50"
              }`}
            >
              毛利最低 → 最高
            </button>

            <button
              onClick={() => setSortBy("profitDesc")}
              className={`px-3 py-2 rounded-xl text-sm font-bold border ${
                sortBy === "profitDesc"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-blue-50"
              }`}
            >
              毛利最高 → 最低
            </button>

            <button
              onClick={() => setSortBy("rateAsc")}
              className={`px-3 py-2 rounded-xl text-sm font-bold border ${
                sortBy === "rateAsc"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-blue-50"
              }`}
            >
              毛利率最低 → 最高
            </button>

            <button
              onClick={() => setSortBy("rateDesc")}
              className={`px-3 py-2 rounded-xl text-sm font-bold border ${
                sortBy === "rateDesc"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-blue-50"
              }`}
            >
              毛利率最高 → 最低
            </button>

          </div>

          {/* =========================
              Desktop
              ========================= */}
          <div className="hidden md:block overflow-x-auto rounded-2xl border bg-white">

            <table className="w-full">

              <thead className="bg-blue-50">

                <tr>

                  <th className="text-left px-4 py-3">
                    商品
                  </th>

                  <th className="px-4 py-3 text-center">
                    狀態
                  </th>

                  <th className="px-4 py-3 text-center">
                    售價
                  </th>

                  <th className="px-4 py-3 text-center">
                    批發成本
                  </th>

                  <th className="px-4 py-3 text-center">
                    單件毛利
                  </th>

                  <th className="px-4 py-3 text-center">
                    毛利率
                  </th>

                </tr>

              </thead>

              <tbody>

                {sortedProducts.map((product) => (

                  <tr
                    key={product.id}
                    className="border-t"
                  >

                    <td className="px-4 py-3 font-medium">
                      {product.name}
                    </td>

                    <td className="px-4 py-3 text-center">

                      {product.is_active ? (
                        <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-700 text-sm font-bold">
                          上架
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 rounded-full bg-red-100 text-red-700 text-sm font-bold">
                          下架
                        </span>
                      )}

                    </td>

                    <td className="px-4 py-3 text-center">
                      NT$ {product.price}
                    </td>

                    <td className="px-4 py-3 text-center">
                      NT$ {product.wholesale_price}
                    </td>

                    <td
                      className={`px-4 py-3 text-center font-bold ${
                        product.profit < 0
                          ? "text-red-600"
                          : product.profit === 0
                          ? "text-orange-600"
                          : "text-gray-800"
                      }`}
                    >
                      NT$ {product.profit}
                    </td>

                    <td className="px-4 py-3 text-center font-bold">
                      {product.profitRate.toFixed(1)}%
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* =========================
              Mobile
              ========================= */}
          <div className="md:hidden space-y-3">

            {sortedProducts.map((product) => (

              <div
                key={product.id}
                className="rounded-2xl border bg-white p-4 shadow-sm"
              >

                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0">

                    <h3 className="font-bold text-lg">
                      {product.name}
                    </h3>

                    <div className="text-sm text-gray-500 mt-1">
                      {product.is_active
                        ? "🟢 上架"
                        : "🔴 下架"}
                    </div>

                  </div>

                  <div
                    className={`shrink-0 font-bold text-lg ${
                      product.profit < 0
                        ? "text-red-600"
                        : product.profit === 0
                        ? "text-orange-600"
                        : "text-gray-800"
                    }`}
                  >
                    NT$ {product.profit}
                  </div>

                </div>

                <div className="grid grid-cols-3 gap-2 mt-3">

                  <div className="rounded-xl bg-gray-50 p-2">
                    <div className="text-xs text-gray-500">
                      售價
                    </div>

                    <div className="font-bold mt-1">
                      NT$ {product.price}
                    </div>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-2">
                    <div className="text-xs text-gray-500">
                      批發成本
                    </div>

                    <div className="font-bold mt-1">
                      NT$ {product.wholesale_price}
                    </div>
                  </div>

                  <div className="rounded-xl bg-blue-50 p-2">
                    <div className="text-xs text-gray-500">
                      毛利率
                    </div>

                    <div className="font-bold mt-1">
                      {product.profitRate.toFixed(1)}%
                    </div>
                  </div>

                </div>

              </div>

            ))}

          </div>

          {sortedProducts.length === 0 && (

            <div className="rounded-2xl border bg-white p-8 text-center text-gray-500">
              目前沒有可分析的商品資料。
            </div>

          )}

        </>

      )}

    </main>
  );
}