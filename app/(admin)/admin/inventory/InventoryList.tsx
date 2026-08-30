"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Product = {
  id: number;
  name: string;
  stock_quantity: number;
};

type InventoryLog = {
  id: number;
  product_id: number;
  quantity_before: number;
  quantity_change: number;
  quantity_after: number;
  reason: string;
  order_id: number | null;
  note: string | null;
  created_at: string;
};

type Props = {
  products: Product[];
};

export default function InventoryList({ products }: Props) {
  const [stockInputs, setStockInputs] = useState<
    Record<number, string>
  >({});

  const [loadingId, setLoadingId] = useState<number | null>(null);

  const [logs, setLogs] = useState<
    Record<number, InventoryLog[]>
  >({});

  const [expandedId, setExpandedId] = useState<number | null>(null);

  const supabase = createClient();

  async function handleAddStock(product: Product) {
    const value = stockInputs[product.id];

    const quantity = Number(value);

    if (!value || !Number.isInteger(quantity) || quantity <= 0) {
      alert("請輸入正確的補貨數量");
      return;
    }

    setLoadingId(product.id);

    const { data, error } = await supabase.rpc("add_stock", {
      p_product_id: product.id,
      p_quantity: quantity,
      p_note: "後台補貨",
    });

    setLoadingId(null);

    if (error) {
      console.error(error);
      alert("補貨失敗，請稍後再試。");
      return;
    }

    alert(
      `${product.name} 補貨成功！\n目前存貨：${data} 份`
    );

    setStockInputs((prev) => ({
      ...prev,
      [product.id]: "",
    }));

    window.location.reload();
  }

  async function handleShowLogs(productId: number) {
    if (expandedId === productId) {
      setExpandedId(null);
      return;
    }

    // 已經載入過，就直接展開
    if (logs[productId]) {
      setExpandedId(productId);
      return;
    }

    const { data, error } = await supabase
      .from("inventory_logs")
      .select(
        `
        id,
        product_id,
        quantity_before,
        quantity_change,
        quantity_after,
        reason,
        order_id,
        note,
        created_at
        `
      )
      .eq("product_id", productId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      alert("載入庫存異動紀錄失敗");
      return;
    }

    setLogs((prev) => ({
      ...prev,
      [productId]: data ?? [],
    }));

    setExpandedId(productId);
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="space-y-4">
      {products.map((product) => {
        const productLogs = logs[product.id] ?? [];
        const isExpanded = expandedId === product.id;

        return (
          <div
            key={product.id}
            className="
              bg-white
              border
              border-gray-200
              rounded-2xl
              p-5
              shadow-sm
            "
          >
            <div
              className="
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-4
              "
            >
              {/* 商品 */}
              <div>
                <h2 className="text-xl font-bold text-stone-800">
                  {product.name}
                </h2>

                <p className="mt-1 text-gray-600">
                  商品 ID：{product.id}
                </p>
              </div>

              {/* 目前存貨 */}
              <div>
                <p className="text-sm text-gray-500">
                  目前存貨
                </p>

                <p className="text-2xl font-bold text-orange-600">
                  {product.stock_quantity ?? 0} 份
                </p>
              </div>

              {/* 補貨 */}
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  value={stockInputs[product.id] ?? ""}
                  onChange={(e) =>
                    setStockInputs((prev) => ({
                      ...prev,
                      [product.id]: e.target.value,
                    }))
                  }
                  placeholder="補貨數量"
                  className="
                    w-32
                    border
                    rounded-xl
                    px-3
                    py-2
                  "
                />

                <button
                  type="button"
                  onClick={() => handleAddStock(product)}
                  disabled={loadingId === product.id}
                  className="
                    bg-orange-600
                    hover:bg-orange-700
                    disabled:bg-gray-400
                    text-white
                    font-bold
                    px-5
                    py-2
                    rounded-xl
                  "
                >
                  {loadingId === product.id
                    ? "補貨中..."
                    : "確認補貨"}
                </button>
              </div>
            </div>

            {/* 查看異動紀錄 */}
            <div className="mt-4 border-t pt-4">
              <button
                type="button"
                onClick={() => handleShowLogs(product.id)}
                className="
                  text-orange-600
                  font-semibold
                  hover:text-orange-700
                "
              >
                {isExpanded
                  ? "▲ 隱藏異動紀錄"
                  : "▼ 查看異動紀錄"}
              </button>
            </div>

            {/* 異動紀錄 */}
            {isExpanded && (
              <div className="mt-4 bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-lg text-stone-800 mb-3">
                  庫存異動紀錄
                </h3>

                {productLogs.length === 0 ? (
                  <p className="text-gray-500">
                    目前沒有庫存異動紀錄。
                  </p>
                ) : (
                  <div className="space-y-3">
                    {productLogs.map((log) => (
                      <div
                        key={log.id}
                        className="
                          bg-white
                          border
                          border-gray-200
                          rounded-xl
                          p-3
                        "
                      >
                        <p className="text-sm text-gray-500">
                          {formatDate(log.created_at)}
                        </p>

                        <p className="font-bold mt-1">
                          {log.reason}
                        </p>

                        <p className="mt-1">
                          {log.quantity_before} →{" "}
                          <span
                            className={
                              log.quantity_change >= 0
                                ? "text-green-600 font-bold"
                                : "text-red-600 font-bold"
                            }
                          >
                            {log.quantity_change >= 0
                              ? `+${log.quantity_change}`
                              : log.quantity_change}
                          </span>{" "}
                          → {log.quantity_after}
                        </p>

                        {log.order_id !== null && (
                          <p className="text-sm text-gray-600 mt-1">
                            訂單：#{log.order_id}
                          </p>
                        )}

                        {log.note && (
                          <p className="text-sm text-gray-600 mt-1">
                            備註：{log.note}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}