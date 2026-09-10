"use client";

import { useState } from "react";
import Link from "next/link";

type PointTransaction = {
  id: string;
  type: string;
  amount: number;
  balance_after: number;
  description: string | null;
  created_at: string;
  reference_key: string | null;
  order_id: number | null;
  display_created_at: string;
};

type PointsTabsProps = {
  currentPoints: number;
  totalEarned: number;
  totalUsed: number;
  pointTransactions: PointTransaction[];
  transactionsError: string | null;
};

export default function PointsTabs({
  currentPoints,
  totalEarned,
  totalUsed,
  pointTransactions,
  transactionsError,
}: PointsTabsProps) {
  const [activeTab, setActiveTab] = useState<
    "points" | "coupons"
  >("points");

  // ==================================================
  // 積分類型中文名稱
  // ==================================================

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "earn":
        return "獲得";

      case "redeem":
        return "使用";

      case "refund":
        return "退還";

      case "reversal":
        return "沖銷";

      case "admin_adjust":
        return "管理員調整";

      default:
        return type;
    }
  };

  return (
    <div className="mt-5">

      {/* ==================================================
          左右切換
          ================================================== */}

      <div className="grid grid-cols-2 rounded-xl border border-gray-300 bg-white overflow-hidden shadow-sm">

        {/* 會員積分 */}
        <button
          type="button"
          onClick={() => setActiveTab("points")}
          className={`py-3 md:py-4 text-base md:text-lg font-bold transition ${
            activeTab === "points"
              ? "bg-orange-500 text-white"
              : "bg-white text-gray-600 hover:bg-orange-50"
          }`}
        >
          會員積分
        </button>

        {/* 優惠券 */}
        <button
          type="button"
          onClick={() => setActiveTab("coupons")}
          className={`py-3 md:py-4 text-base md:text-lg font-bold transition ${
            activeTab === "coupons"
              ? "bg-orange-500 text-white"
              : "bg-white text-gray-600 hover:bg-orange-50"
          }`}
        >
          優惠券
        </button>

      </div>

      {/* ==================================================
          會員積分
          ================================================== */}

      {activeTab === "points" && (
        <div className="mt-5">

          {/* ==================================================
              積分摘要
              ================================================== */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

            {/* 目前積分 */}
            <div className="rounded-xl border border-gray-300 bg-white p-5 shadow-sm">

              <p className="text-lg text-gray-500">
                目前積分
              </p>

              <p className="mt-2 text-3xl font-bold text-orange-600">
                {currentPoints.toLocaleString()} 點
              </p>

            </div>

            {/* 累計獲得 */}
            <div className="rounded-xl border border-gray-300 bg-white p-5 shadow-sm">

              <p className="text-lg text-gray-500">
                累計獲得
              </p>

              <p className="mt-2 text-3xl font-bold text-green-600">
                {totalEarned.toLocaleString()} 點
              </p>

            </div>

            {/* 累計使用 */}
            <div className="rounded-xl border border-gray-300 bg-white p-5 shadow-sm">

              <p className="text-lg text-gray-500">
                累計使用
              </p>

              <p className="mt-2 text-3xl font-bold text-red-600">
                {totalUsed.toLocaleString()} 點
              </p>

            </div>

          </div>

          {/* ==================================================
              積分紀錄
              ================================================== */}

          <section className="mt-6">

            <h2 className="text-2xl font-bold text-stone-800 mb-2">
              積分紀錄
            </h2>

            {transactionsError ? (

              <div className="rounded-xl border border-red-200 bg-white p-6">

                <p className="text-red-600">
                  {transactionsError}
                </p>

              </div>

            ) : pointTransactions.length === 0 ? (

              <div className="rounded-xl border border-gray-300 bg-white p-6">

                <p className="text-gray-500">
                  目前沒有積分紀錄。
                </p>

              </div>

            ) : (

              <>
                {/* ==================================================
                    桌機版：表格
                    ================================================== */}

                <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-300 bg-white shadow-sm">

                  <table className="w-full border-collapse">

                    <thead>

                      <tr className="bg-orange-50 text-left">

                        <th className="px-4 py-3 font-bold">
                          日期
                        </th>

                        <th className="px-4 py-3 font-bold">
                          類型
                        </th>

                        <th className="px-4 py-3 font-bold text-right">
                          積分變動
                        </th>

                        <th className="px-4 py-3 font-bold text-right">
                          交易後餘額
                        </th>

                        <th className="px-4 py-3 font-bold">
                          說明
                        </th>

                        <th className="px-4 py-3 font-bold">
                          訂單
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {pointTransactions.map(
                        (transaction) => (
                          <tr
                            key={transaction.id}
                            className="border-t border-gray-200"
                          >

                            {/* 日期 */}
                            <td className="px-4 py-3 whitespace-nowrap">
                              {transaction.display_created_at}
                            </td>

                            {/* 類型 */}
                            <td className="px-4 py-3 whitespace-nowrap">
                              {getTypeLabel(
                                transaction.type
                              )}
                            </td>

                            {/* 積分變動 */}
                            <td
                              className={`px-4 py-3 text-right font-bold whitespace-nowrap ${
                                transaction.amount > 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {transaction.amount > 0
                                ? "+"
                                : ""}

                              {transaction.amount.toLocaleString()}
                            </td>

                            {/* 交易後餘額 */}
                            <td className="px-4 py-3 text-right whitespace-nowrap">
                              {transaction.balance_after.toLocaleString()}
                            </td>

                            {/* 說明 */}
                            <td className="px-4 py-3">
                              {transaction.description ??
                                "—"}
                            </td>

                            {/* 訂單 */}
                            <td className="px-4 py-3 whitespace-nowrap">

                              {transaction.order_id ? (
                                <Link
                                  href={`/admin/orders/${transaction.order_id}`}
                                  className="text-orange-600 hover:underline"
                                >
                                  查看訂單
                                </Link>
                              ) : (
                                "—"
                              )}

                            </td>

                          </tr>
                        )
                      )}

                    </tbody>

                  </table>

                </div>

                {/* ==================================================
                    手機版：卡片
                    ================================================== */}

                <div className="md:hidden space-y-3">

                  {pointTransactions.map(
                    (transaction) => (
                      <div
                        key={transaction.id}
                        className="rounded-xl border border-gray-300 bg-white p-4 shadow-sm"
                      >

                        {/* 日期 */}
                        <div className="pb-3 border-b border-gray-200">

                          <p className="text-sm text-gray-500">
                            日期
                          </p>

                          <p className="mt-1 text-base">
                            {transaction.display_created_at}
                          </p>

                        </div>

                        {/* 類型 */}
                        <div className="mt-3 flex justify-between gap-4">

                          <span className="text-gray-500">
                            類型
                          </span>

                          <span className="font-medium">
                            {getTypeLabel(
                              transaction.type
                            )}
                          </span>

                        </div>

                        {/* 積分變動 */}
                        <div className="mt-2 flex justify-between gap-4">

                          <span className="text-gray-500">
                            積分變動
                          </span>

                          <span
                            className={`font-bold ${
                              transaction.amount > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {transaction.amount > 0
                              ? "+"
                              : ""}

                            {transaction.amount.toLocaleString()}{" "}
                            點
                          </span>

                        </div>

                        {/* 交易後餘額 */}
                        <div className="mt-2 flex justify-between gap-4">

                          <span className="text-gray-500">
                            交易後餘額
                          </span>

                          <span className="font-medium">
                            {transaction.balance_after.toLocaleString()}{" "}
                            點
                          </span>

                        </div>

                        {/* 說明 */}
                        <div className="mt-2">

                          <p className="text-gray-500">
                            說明
                          </p>

                          <p className="mt-1 break-words">
                            {transaction.description ??
                              "—"}
                          </p>

                        </div>

                        {/* 訂單 */}
                        <div className="mt-3 pt-3 border-t border-gray-200">

                          <span className="text-gray-500">
                            訂單：
                          </span>

                          {transaction.order_id ? (
                            <Link
                              href={`/admin/orders/${transaction.order_id}`}
                              className="ml-1 text-orange-600 font-medium hover:underline"
                            >
                              查看訂單 →
                            </Link>
                          ) : (
                            <span className="ml-1">
                              —
                            </span>
                          )}

                        </div>

                      </div>
                    )
                  )}

                </div>

              </>
            )}

          </section>

        </div>
      )}

      {/* ==================================================
          優惠券
          ================================================== */}

      {activeTab === "coupons" && (
        <div className="mt-5">

          <section>

            <h2 className="text-2xl font-bold text-stone-800 mb-2">
              優惠券
            </h2>

            <div className="rounded-xl border border-gray-300 bg-white p-6 min-h-[120px]">

              {/* 優惠券系統尚未建立，目前留空 */}

            </div>

          </section>

        </div>
      )}

    </div>
  );
}