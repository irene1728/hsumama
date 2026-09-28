"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Order = {
  id: number;
  created_at: string;
  total_quantity: number | null;
  total_amount: number | null;
  shipping_fee: number | null;
  grand_total: number | null;
  points_used: number | null;
  status: string | null;
};

type OrderItem = {
  order_id: number | null;
  product_name: string | null;
  quantity: number | null;
  price: number | null;
  subtotal: number | null;
  wholesale_subtotal: number | null;
};

type ProductSummary = {
  productName: string;
  quantity: number;
  amount: number;
};

export default function AdminSalesPage() {
  const supabase = createClient();

  const today = new Date();
  const currentYear = today.getFullYear();

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(today.getMonth() + 1);

  const [orders, setOrders] = useState<Order[]>([]);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const years = useMemo(
    () =>
      Array.from(
        { length: Math.max(currentYear - 2024 + 1, 1) },
        (_, index) => currentYear - index
      ),
    [currentYear]
  );

  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  async function loadSalesStatistics() {
    setLoading(true);
    setErrorMessage("");

    /*
     * Supabase 的 created_at 是 timestamptz。
     * 這裡使用台灣時區 +08:00 建立月份邊界，
     * 避免月底／月初因 UTC 轉換而誤算。
     */
    const startDate = new Date(
      `${year}-${String(month).padStart(2, "0")}-01T00:00:00+08:00`
    );

    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;

    const endDate = new Date(
      `${nextYear}-${String(nextMonth).padStart(2, "0")}-01T00:00:00+08:00`
    );

    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .select(
        "id, created_at, total_quantity, total_amount, shipping_fee, grand_total, points_used, status"
      )
      .gte("created_at", startDate.toISOString())
      .lt("created_at", endDate.toISOString())
      .not("status", "in", '("已取消","已退貨")')
      .order("created_at", { ascending: true });

    if (orderError) {
      console.error("Sales statistics order error:", orderError);
      setOrders([]);
      setItems([]);
      setErrorMessage("讀取訂單統計失敗，請稍後再試。");
      setLoading(false);
      setSearched(true);
      return;
    }

    const validOrders = (orderData ?? []) as Order[];
    setOrders(validOrders);

    if (validOrders.length === 0) {
      setItems([]);
      setLoading(false);
      setSearched(true);
      return;
    }

    const orderIds = validOrders.map((order) => order.id);

    const { data: itemData, error: itemError } = await supabase
      .from("order_items")
      .select("order_id, product_name, quantity, price, subtotal, wholesale_subtotal")
      .in("order_id", orderIds);

    if (itemError) {
      console.error("Sales statistics item error:", itemError);
      setItems([]);
      setErrorMessage("讀取商品銷售明細失敗，請稍後再試。");
    } else {
      setItems((itemData ?? []) as OrderItem[]);
    }

    setLoading(false);
    setSearched(true);
  }

  useEffect(() => {
    loadSalesStatistics();
  }, []);

  const productSummaries = useMemo<ProductSummary[]>(() => {
    const map = new Map<string, ProductSummary>();

    for (const item of items) {
      const productName = item.product_name?.trim() || "未命名商品";
      const quantity = Number(item.quantity ?? 0);

      const amount =
        item.subtotal !== null && item.subtotal !== undefined
          ? Number(item.subtotal)
          : Number(item.price ?? 0) * quantity;

      const existing = map.get(productName);

      if (existing) {
        existing.quantity += quantity;
        existing.amount += amount;
      } else {
        map.set(productName, {
          productName,
          quantity,
          amount,
        });
      }
    }

    return Array.from(map.values()).sort(
      (a, b) => b.quantity - a.quantity
    );
  }, [items]);

  const orderCount = orders.length;

  const productQuantity = productSummaries.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const productSalesAmount = productSummaries.reduce(
    (sum, product) => sum + product.amount,
    0
  );

  const wholesaleAmount = items.reduce(
    (sum, item) => sum + Number(item.wholesale_subtotal ?? 0),
    0
  );

  const totalAmount = orders.reduce(
    (sum, order) => sum + Number(order.total_amount ?? 0),
    0
  );

  const shippingAmount = orders.reduce(
    (sum, order) => sum + Number(order.shipping_fee ?? 0),
    0
  );

  const pointsUsed = orders.reduce(
    (sum, order) => sum + Number(order.points_used ?? 0),
    0
  );

  const grandTotal = orders.reduce(
    (sum, order) => sum + Number(order.grand_total ?? 0),
    0
  );

  const completedOrderCount = orders.filter(
    (order) => order.status === "已完成"
  ).length;

  function formatMoney(value: number) {
    return `NT$ ${Math.round(value).toLocaleString("zh-TW")}`;
  }

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    loadSalesStatistics();
  }

  return (
    <main className="max-w-7xl mx-auto p-2 md:p-1">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        📊 單月銷售統計
      </h1>

      {/* 年份／月份查詢 */}
      <form
        onSubmit={handleSearch}
        className="rounded-2xl border bg-white p-4 mb-5"
      >
        <div className="flex flex-col md:flex-row md:items-end gap-3">
          <div className="flex-1">
            <label className="block text-sm font-bold text-gray-600 mb-1">
              年份
            </label>

            <select
              value={year}
              onChange={(event) => setYear(Number(event.target.value))}
              className="border rounded-xl px-3 py-2 w-full bg-white"
            >
              {years.map((item) => (
                <option key={item} value={item}>
                  {item} 年
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-bold text-gray-600 mb-1">
              月份
            </label>

            <select
              value={month}
              onChange={(event) => setMonth(Number(event.target.value))}
              className="border rounded-xl px-3 py-2 w-full bg-white"
            >
              {months.map((item) => (
                <option key={item} value={item}>
                  {item} 月
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="md:w-32 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-bold px-6 py-2"
          >
            {loading ? "查詢中..." : "查詢"}
          </button>
        </div>
      </form>

      {errorMessage && (
        <div className="rounded-2xl border border-red-300 bg-red-50 text-red-700 p-4 mb-5">
          {errorMessage}
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl border bg-white p-8 text-center text-gray-500">
          正在讀取 {year} 年 {month} 月銷售資料...
        </div>
      ) : searched ? (
        <>
          <div className="mb-4">
            <h2 className="text-2xl md:text-3xl font-bold">
              {year} 年 {month} 月
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              已排除「已取消」與「已退貨」訂單。
            </p>
          </div>

          {/* 主要統計 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            <div className="rounded-2xl border bg-white p-4">
              <div className="text-sm text-gray-500">
                🛒 有效訂單
              </div>

              <div className="text-2xl font-bold mt-1">
                {orderCount.toLocaleString("zh-TW")} 筆
              </div>

              <div className="text-xs text-gray-400 mt-1">
                已完成 {completedOrderCount} 筆
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-4">
              <div className="text-sm text-gray-500">
                📦 商品總銷量
              </div>

              <div className="text-2xl font-bold mt-1">
                {productQuantity.toLocaleString("zh-TW")} 個
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-4">
              <div className="text-sm text-gray-500">
                💰 商品銷售額
              </div>

              <div className="text-xl md:text-2xl font-bold mt-1">
                {formatMoney(productSalesAmount)}
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-4">
              <div className="text-sm text-gray-500">
                💳 實收總額
              </div>

              <div className="text-xl md:text-2xl font-bold mt-1 text-orange-600">
                {formatMoney(grandTotal)}
              </div>
            </div>
          </div>

          {/* 金額細項 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
            <div className="rounded-2xl border bg-white p-4">
              <div className="text-sm text-gray-500">
                🏷️ 當月批發額
              </div>

              <div className="font-bold text-lg mt-1">
                {formatMoney(wholesaleAmount)}
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-4">
              <div className="text-sm text-gray-500">
                🚚 運費
              </div>

              <div className="font-bold text-lg mt-1">
                {formatMoney(shippingAmount)}
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-4 col-span-2 md:col-span-1">
              <div className="text-sm text-gray-500">
                🎁 積分折抵
              </div>

              <div className="font-bold text-lg mt-1">
                {formatMoney(pointsUsed)}
              </div>
            </div>
          </div>

          {/* 商品銷售明細 */}
          <div className="rounded-2xl border bg-white overflow-hidden">
            <div className="px-4 py-4 border-b">
              <h2 className="text-2xl font-bold">
                🥩 當月商品銷售明細
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                依銷售數量由高至低排列
              </p>
            </div>

            {productSummaries.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                {year} 年 {month} 月沒有有效訂單商品紀錄。
              </div>
            ) : (
              <>
                {/* Desktop */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-orange-50">
                      <tr>
                        <th className="px-4 py-3 text-left">
                          商品
                        </th>

                        <th className="px-4 py-3 text-center">
                          銷售數量
                        </th>

                        <th className="px-4 py-3 text-right">
                          銷售金額
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {productSummaries.map((product, index) => (
                        <tr
                          key={product.productName}
                          className="border-t"
                        >
                          <td className="px-4 py-3 font-medium">
                            <span className="inline-block w-8 text-gray-400">
                              {index + 1}.
                            </span>

                            {product.productName}
                          </td>

                          <td className="px-4 py-3 text-center font-bold">
                            {product.quantity.toLocaleString("zh-TW")} 個
                          </td>

                          <td className="px-4 py-3 text-right font-bold">
                            {formatMoney(product.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>

                    <tfoot className="bg-gray-50 border-t-2">
                      <tr>
                        <td className="px-4 py-3 font-bold">
                          合計
                        </td>

                        <td className="px-4 py-3 text-center font-bold">
                          {productQuantity.toLocaleString("zh-TW")} 個
                        </td>

                        <td className="px-4 py-3 text-right font-bold">
                          {formatMoney(productSalesAmount)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Mobile */}
                <div className="md:hidden divide-y">
                  {productSummaries.map((product, index) => (
                    <div
                      key={product.productName}
                      className="p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="font-bold min-w-0">
                          <span className="text-gray-400 mr-2">
                            {index + 1}.
                          </span>

                          {product.productName}
                        </div>

                        <div className="font-bold whitespace-nowrap">
                          {product.quantity.toLocaleString("zh-TW")} 個
                        </div>
                      </div>

                      <div className="mt-2 text-sm text-gray-500">
                        銷售金額：
                        <span className="font-bold text-gray-800 ml-1">
                          {formatMoney(product.amount)}
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="p-4 bg-gray-50">
                    <div className="flex justify-between font-bold">
                      <span>合計</span>

                      <span>
                        {productQuantity.toLocaleString("zh-TW")} 個
                      </span>
                    </div>

                    <div className="text-right font-bold mt-1">
                      {formatMoney(productSalesAmount)}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      ) : null}
    </main>
  );
}
