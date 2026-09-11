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

type PurchaseRecord = {
  id: number;
  order_id: number;
  quantity: number;
  price: number;
  subtotal: number;
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

  const [purchases, setPurchases] = useState<
    Record<number, PurchaseRecord[]>
  >({});

  const [expandedId, setExpandedId] = useState<number | null>(null);

  const [loadingPurchaseId, setLoadingPurchaseId] =
    useState<number | null>(null);

  // ======================================
  // 庫存管理分頁
  // ======================================

  const [activeTab, setActiveTab] = useState<
    "stock" | "logs"
  >("stock");

  // 全部庫存異動紀錄
  const [allLogs, setAllLogs] = useState<InventoryLog[]>([]);
  const [loadingAllLogs, setLoadingAllLogs] = useState(false);

  // 搜尋條件
  const [logProductFilter, setLogProductFilter] =
    useState<string>("all");

  const [logReasonFilter, setLogReasonFilter] =
    useState<string>("all");

  const [logStartDate, setLogStartDate] =
    useState<string>("");

  const [logEndDate, setLogEndDate] =
    useState<string>("");

  // 查詢後顯示的紀錄
  const [searchedLogs, setSearchedLogs] =
    useState<InventoryLog[]>([]);

  const supabase = createClient();

  // ======================================
  // 補貨
  // ======================================

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

  // ======================================
  // 載入全部庫存異動紀錄
  // ======================================

  async function handleLoadAllLogs() {
    // 已經載入過就不需要重複查詢
    if (allLogs.length > 0) {
      return;
    }

    setLoadingAllLogs(true);

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
      .order("created_at", { ascending: false });

    setLoadingAllLogs(false);

    if (error) {
      console.error(error);
      alert("載入庫存異動紀錄失敗");
      return;
    }

    const result = data ?? [];

    setAllLogs(result);
    setSearchedLogs(result);
  }

  // ======================================
  // 單一商品：庫存異動紀錄
  // ======================================

  async function handleShowLogs(productId: number) {
    if (expandedId === productId) {
      setExpandedId(null);
      return;
    }

    setExpandedId(productId);

    // 如果已經載入過，就不用重新查詢
    if (logs[productId]) {

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
  }

  // ======================================
  // 單一商品：購買紀錄
  // ======================================

  async function handleShowPurchases(productId: number) {
    if (purchases[productId]) {
      return;
    }

    setLoadingPurchaseId(productId);

    const { data, error } = await supabase
      .from("order_items")
      .select(
        `
        id,
        order_id,
        quantity,
        price,
        subtotal,
        created_at
        `
      )
      .eq("product_id", productId)
      .order("created_at", { ascending: false });

    setLoadingPurchaseId(null);

    if (error) {
      console.error(error);
      alert("載入購買記錄失敗");
      return;
    }

    setPurchases((prev) => ({
      ...prev,
      [productId]: data ?? [],
    }));
  }

  // ======================================
  // 日期格式
  // ======================================

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // 用於日期篩選的 YYYY-MM-DD
  function getDateKey(dateString: string) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  // ======================================
  // 執行庫存異動搜尋
  // ======================================

  function handleSearchLogs() {
    let result = [...allLogs];

    // 商品篩選
    if (logProductFilter !== "all") {
      result = result.filter(
        (log) =>
          String(log.product_id) === logProductFilter
      );
    }

    // 異動類型篩選
    if (logReasonFilter !== "all") {
      result = result.filter(
        (log) => log.reason === logReasonFilter
      );
    }

    // 開始日期
    if (logStartDate) {
      result = result.filter(
        (log) => getDateKey(log.created_at) >= logStartDate
      );
    }

    // 結束日期
    if (logEndDate) {
      result = result.filter(
        (log) => getDateKey(log.created_at) <= logEndDate
      );
    }

    // 永遠保持最新在最上面
    result.sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    );

    setSearchedLogs(result);
  }

  // ======================================
  // 切換分頁
  // ======================================

  function handleChangeTab(tab: "stock" | "logs") {
    setActiveTab(tab);

    if (tab === "logs") {
      handleLoadAllLogs();
    }
  }

  // ======================================
  // 取得目前資料中所有異動類型
  // ======================================

  const reasonOptions = Array.from(
    new Set(allLogs.map((log) => log.reason).filter(Boolean))
  );

  return (
    <div className="space-y-4">
      {/* ====================================== */}
      {/* 分頁 */}
      {/* ====================================== */}

      <div className="flex gap-2 border-b border-gray-300">
        <button
          type="button"
          onClick={() => handleChangeTab("stock")}
          className={`
            px-5
            py-2.5
            rounded-t-xl
            font-bold
            transition
            ${
              activeTab === "stock"
                ? "bg-orange-600 text-white"
                : "bg-gray-100 text-stone-700 hover:bg-gray-200"
            }
          `}
        >
          📦 商品存貨
        </button>

        <button
          type="button"
          onClick={() => handleChangeTab("logs")}
          className={`
            px-5
            py-2.5
            rounded-t-xl
            font-bold
            transition
            ${
              activeTab === "logs"
                ? "bg-orange-600 text-white"
                : "bg-gray-100 text-stone-700 hover:bg-gray-200"
            }
          `}
        >
          📋 庫存異動紀錄
        </button>
      </div>

      {/* ================================================== */}
      {/* 商品存貨 */}
      {/* ================================================== */}

      {activeTab === "stock" && (
        <div className="space-y-4">
          {products.map((product) => {
            const productLogs = logs[product.id] ?? [];
            const productPurchases =
              purchases[product.id] ?? [];

            const isExpanded =
              expandedId === product.id;

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
                {/* ====================================== */}
                {/* 商品 / 庫存 / 補貨 */}
                {/* ====================================== */}

                <div
                  className="
                    grid
                    grid-cols-1
                    md:grid-cols-[minmax(0,1fr)_200px_300px]
                    md:items-center
                    gap-4
                  "
                >
                  {/* 商品 */}
                  <div className="min-w-0">
                    <h2 className="text-xl font-bold text-stone-800">
                      {product.name}
                    </h2>

                    <p className="mt-1 text-gray-600">
                      商品 ID：{product.id}
                    </p>
                  </div>

                  {/* 目前存貨 */}
                  <div className="w-full text-center">
                    <p className="text-sm text-gray-500">
                      目前存貨
                    </p>

                    <p className="mt-1 text-2xl font-bold text-orange-600">
                      {product.stock_quantity ?? 0} 份
                    </p>
                  </div>

                  {/* 補貨 */}
                  <div className="flex items-center justify-end gap-2">
                    <input
                      type="number"
                      min="1"
                      value={
                        stockInputs[product.id] ?? ""
                      }
                      onChange={(e) =>
                        setStockInputs((prev) => ({
                          ...prev,
                          [product.id]:
                            e.target.value,
                        }))
                      }
                      placeholder="補貨數量"
                      className="
                        w-32
                        border
                        border-gray-300
                        rounded-xl
                        px-3
                        py-2
                        outline-none
                        focus:border-orange-500
                        focus:ring-1
                        focus:ring-orange-500
                      "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        handleAddStock(product)
                      }
                      disabled={
                        loadingId === product.id
                      }
                      className="
                        bg-orange-600
                        hover:bg-orange-700
                        disabled:bg-gray-400
                        text-white
                        font-bold
                        px-5
                        py-2
                        rounded-xl
                        whitespace-nowrap
                      "
                    >
                      {loadingId === product.id
                        ? "補貨中..."
                        : "確認補貨"}
                    </button>
                  </div>
                </div>

                {/* ====================================== */}
                {/* 查看紀錄 */}
                {/* ====================================== */}

                <div className="mt-3 border-t border-gray-900 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (isExpanded) {
                        setExpandedId(null);
                        return;
                      }

                      setExpandedId(product.id);

                      handleShowLogs(product.id);
                      handleShowPurchases(product.id);
                    }}
                    className="
                      text-orange-600
                      font-semibold
                      hover:text-orange-700
                    "
                  >
                    {isExpanded
                      ? "▲ 隱藏紀錄"
                      : "▼ 查看異動／購買紀錄"}
                  </button>
                </div>

                {/* ====================================== */}
                {/* 左右兩欄 */}
                {/* ====================================== */}

                {isExpanded && (
                  <div
                    className="
                      mt-2
                      grid
                      md:grid-cols-2
                      gap-4
                    "
                  >
                    {/* ====================================== */}
                    {/* 左：庫存異動 */}
                    {/* ====================================== */}

                    <div className="bg-gray-50 rounded-xl p-4">
                      <h3 className="font-bold text-lg text-stone-800 mb-2">
                        📦 庫存異動紀錄
                      </h3>

                      {productLogs.length === 0 ? (
                        <p className="text-gray-500">
                          目前沒有庫存異動紀錄。
                        </p>
                      ) : (
                        <div
                          className="
                            space-y-2
                            max-h-[560px]
                            overflow-y-auto
                            pr-2
                          "
                        >
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
                                {formatDate(
                                  log.created_at
                                )}
                              </p>

                              <p className="font-bold">
                                {log.reason}
                              </p>

                              <p className="text-base">
                                {log.quantity_before} →{" "}
                                <span
                                  className={
                                    log.quantity_change >=
                                    0
                                      ? "text-green-600 font-bold"
                                      : "text-red-600 font-bold"
                                  }
                                >
                                  {log.quantity_change >=
                                  0
                                    ? `+${log.quantity_change}`
                                    : log.quantity_change}
                                </span>{" "}
                                →{" "}
                                {log.quantity_after}
                              </p>

                              {log.order_id !== null && (
                                <p className="text-sm text-gray-600">
                                  訂單：#{log.order_id}
                                </p>
                              )}

                              {log.note && (
                                <p className="text-sm text-gray-600">
                                  備註：{log.note}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* ====================================== */}
                    {/* 右：購買記錄 */}
                    {/* ====================================== */}

                    <div className="bg-gray-50 rounded-xl p-4">
                      <h3 className="font-bold text-lg text-stone-800 mb-2">
                        🛒 購買記錄
                      </h3>

                      {loadingPurchaseId ===
                      product.id ? (
                        <p className="text-gray-500">
                          載入購買記錄中...
                        </p>
                      ) : productPurchases.length ===
                        0 ? (
                        <p className="text-gray-500">
                          目前沒有購買記錄。
                        </p>
                      ) : (
                        <div
                          className="
                            space-y-2
                            max-h-[560px]
                            overflow-y-auto
                            pr-2
                          "
                        >
                          {productPurchases.map(
                            (purchase) => (
                              <div
                                key={purchase.id}
                                className="
                                  bg-white
                                  border
                                  border-gray-200
                                  rounded-xl
                                  p-3
                                "
                              >
                                <p className="text-sm text-gray-500">
                                  {formatDate(
                                    purchase.created_at
                                  )}
                                </p>

                                <p className="font-bold">
                                  訂單 #
                                  {purchase.order_id}
                                </p>

                                <p className="text-base">
                                  購買數量：
                                  <span className="font-bold">
                                    {purchase.quantity} 份
                                  </span>
                                </p>

                                <p className="text-sm text-gray-600">
                                  單價：NT${" "}
                                  {purchase.price.toLocaleString(
                                    "zh-TW"
                                  )}
                                </p>

                                <p className="text-sm text-gray-600">
                                  小計：NT${" "}
                                  {purchase.subtotal.toLocaleString(
                                    "zh-TW"
                                  )}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ================================================== */}
      {/* 全部庫存異動紀錄 */}
      {/* ================================================== */}

      {activeTab === "logs" && (
        <div
          className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            p-5
            shadow-sm
          "
        >
          {/* 標題 */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-stone-800">
              📦 庫存異動紀錄
            </h2>

            <p className="text-sm text-gray-500">
              共 {searchedLogs.length} 筆
            </p>
          </div>

          {/* ====================================== */}
          {/* 搜尋區：四欄橫向排列 */}
          {/* ====================================== */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-[1fr_1fr_2fr_auto]
              gap-3
              items-end
              mb-5
            "
          >
            {/* 商品 */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1">
                商品
              </label>

              <select
                value={logProductFilter}
                onChange={(e) =>
                  setLogProductFilter(e.target.value)
                }
                className="
                  w-full
                  h-10
                  border
                  border-gray-300
                  rounded-xl
                  px-3
                  bg-white
                  outline-none
                  focus:border-orange-500
                  focus:ring-1
                  focus:ring-orange-500
                "
              >
                <option value="all">
                  全部商品
                </option>

                {products.map((product) => (
                  <option
                    key={product.id}
                    value={product.id}
                  >
                    {product.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 異動類型 */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1">
                異動類型
              </label>

              <select
                value={logReasonFilter}
                onChange={(e) =>
                  setLogReasonFilter(e.target.value)
                }
                className="
                  w-full
                  h-10
                  border
                  border-gray-300
                  rounded-xl
                  px-3
                  bg-white
                  outline-none
                  focus:border-orange-500
                  focus:ring-1
                  focus:ring-orange-500
                "
              >
                <option value="all">
                  全部類型
                </option>

                {reasonOptions.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
            </div>

            {/* 日期 */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1">
                日期
              </label>

              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={logStartDate}
                  onChange={(e) =>
                    setLogStartDate(e.target.value)
                  }
                  className="
                    w-full
                    h-10
                    border
                    border-gray-300
                    rounded-xl
                    px-3
                    outline-none
                    focus:border-orange-500
                    focus:ring-1
                    focus:ring-orange-500
                  "
                />

                <span className="text-gray-500 whitespace-nowrap">
                  ～ 
                </span>

                <input
                  type="date"
                  value={logEndDate}
                  onChange={(e) =>
                    setLogEndDate(e.target.value)
                  }
                  className="
                    w-full
                    h-10
                    border
                    border-gray-300
                    rounded-xl
                    px-3
                    outline-none
                    focus:border-orange-500
                    focus:ring-1
                    focus:ring-orange-500
                  "
                />
              </div>
            </div>

            {/* 查詢 */}
            <button
              type="button"
              onClick={handleSearchLogs}
              className="
                h-10
                bg-orange-600
                hover:bg-orange-700
                text-white
                font-bold
                px-6
                rounded-xl
                whitespace-nowrap
              "
            >
              查詢
            </button>
          </div>

          {/* ====================================== */}
          {/* 紀錄內容 */}
          {/* ====================================== */}

          {loadingAllLogs ? (
            <div className="py-10 text-center text-gray-500">
              載入庫存異動紀錄中...
            </div>
          ) : searchedLogs.length === 0 ? (
            <div className="py-10 text-center text-gray-500">
              目前沒有符合條件的庫存異動紀錄。
            </div>
          ) : (
            <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse table-fixed">
  <colgroup>
    {/* 時間 */}
    <col className="w-[15%]" />

    {/* 商品 */}
    <col className="w-[29%]" />

    {/* 異動類型 */}
    <col className="w-[13%]" />

    {/* 數量 */}
    <col className="w-[9%]" />

    {/* 異動後庫存 */}
    <col className="w-[13%]" />

    {/* 相關資訊 */}
    <col className="w-[21%]" />
  </colgroup>

                <thead>
                  <tr className="border-b-2 border-gray-300 text-left">
                    <th className="px-3 py-3 font-bold text-stone-800 whitespace-nowrap">
                      時間
                    </th>

                    <th className="px-3 py-3 font-bold text-stone-800">
                      商品
                    </th>

                    <th className="px-3 py-3 font-bold text-stone-800 whitespace-nowrap">
                      異動類型
                    </th>

                    <th className="px-3 py-3 font-bold text-stone-800 text-right whitespace-nowrap">
                      數量
                    </th>

                    <th className="px-3 py-3 font-bold text-stone-800 text-right whitespace-nowrap">
                      異動後庫存
                    </th>

                    <th className="px-3 py-3 font-bold text-stone-800 whitespace-nowrap">
                      相關資訊
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {searchedLogs.map((log) => {
                    const product = products.find(
                      (item) =>
                        item.id === log.product_id
                    );

                    return (
                      <tr
                        key={log.id}
                        className="
                          border-b
                          border-gray-200
                          hover:bg-gray-50
                        "
                      >
                        {/* 時間 */}
                        <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">
                          {formatDate(log.created_at)}
                        </td>

                        {/* 商品 */}
                        <td className="px-3 py-3 font-semibold text-stone-800">
                          {product?.name ??
                            `商品 ID：${log.product_id}`}
                        </td>

                        {/* 異動類型 */}
                        <td className="px-3 py-3 text-stone-700 whitespace-nowrap">
                          {log.reason}
                        </td>

                        {/* 數量 */}
                        <td
                          className={`
                            px-3
                            py-3
                            text-right
                            font-bold
                            whitespace-nowrap
                            ${
                              log.quantity_change >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          `}
                        >
                          {log.quantity_change >= 0
                            ? `+${log.quantity_change}`
                            : log.quantity_change}
                        </td>

                        {/* 異動後庫存 */}
                        <td className="px-3 py-3 text-center font-bold text-stone-800 whitespace-nowrap">
                          {log.quantity_after}
                        </td>

                        {/* 相關資訊 */}
                        <td className="px-3 py-3 text-sm text-gray-600">
                          {log.order_id !== null && (
                            <div>
                              訂單：#{log.order_id}
                            </div>
                          )}

                          {log.note && (
                            <div>
                              備註：{log.note}
                            </div>
                          )}

                          {log.order_id === null &&
                            !log.note && (
                              <span className="text-gray-400">
                                —
                              </span>
                            )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}