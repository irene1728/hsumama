import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type PointTransaction = {
  id: string;
  order_id: number | null;
  type: string;
  amount: number;
  description: string | null;
  created_at: string;
};

type OrderInfo = {
  id: number;
  order_no: string | null;
};

export default async function PointsPage() {
  const supabase = await createClient();

  // ==================================================
  // 取得目前登入會員
  // ==================================================

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/account/login");
  }

  // ==================================================
  // 取得目前積分
  // ==================================================

  const {
    data: memberPoints,
    error: pointsError,
  } = await supabase
    .from("member_points")
    .select("points")
    .eq("user_id", user.id)
    .maybeSingle();

  if (pointsError) {
    console.error(
      "讀取會員積分失敗：",
      pointsError
    );
  }

  const currentPoints =
    memberPoints?.points ?? 0;

  // ==================================================
  // 取得積分交易紀錄
  // ==================================================

  const {
    data: transactions,
    error: transactionsError,
  } = await supabase
    .from("point_transactions")
    .select(
      "id, order_id, type, amount, description, created_at"
    )
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  // ==================================================
  // 取得相關訂單
  // ==================================================

  const orderIds =
    (transactions ?? [])
      .map(
        (transaction) =>
          transaction.order_id
      )
      .filter(
        (id): id is number =>
          id !== null
      );

  let orders: OrderInfo[] = [];

  if (orderIds.length > 0) {
    const {
      data: orderData,
      error: orderError,
    } = await supabase
      .from("orders")
      .select("id, order_no")
      .in("id", orderIds);

    if (orderError) {
      console.error(
        "讀取訂單編號失敗：",
        orderError
      );
    } else {
      orders = orderData ?? [];
    }
  }

  // ==================================================
  // 建立訂單編號對照表
  // ==================================================

  const orderMap = new Map<
    number,
    string
  >();

  orders.forEach((order) => {
    orderMap.set(
      order.id,
      order.order_no ?? `#${order.id}`
    );
  });

  // ==================================================
  // 日期格式
  // ==================================================

  function formatDate(date: string) {
    return new Date(date).toLocaleString(
      "zh-TW",
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-2 md:py-8">

      {/* ==================================================
          頁面標題
          ================================================== */}

      <div className="flex items-center justify-between gap-3 mb-1 md:mb-3">

        <h1 className="text-3xl md:text-4xl font-bold text-[#4E342E]">
          積分明細
        </h1>

        <Link
          href="/account"
          className="border border-orange-600 rounded-lg px-3 py-1 text-orange-600 font-bold text-lg hover:bg-orange-50 transition whitespace-nowrap"
        >
          🔙 會員中心
        </Link>

      </div>

      {/* ==================================================
          目前積分
          ================================================== */}

      <section className="border rounded-2xl p-3 md:p-5 shadow-sm mb-2 md:mb-5">

        <p className="text-gray-500">
          目前積分
        </p>

        <p className="text-2xl font-bold text-orange-600">
          🎁{" "}
          {currentPoints.toLocaleString(
            "zh-TW"
          )}{" "}
          點
        </p>

      </section>

      {/* ==================================================
          積分明細標題
          ================================================== */}

      <section>

        <h2 className="text-2xl font-bold text-[#4E342E] mb-1 md:mb-3">
          積分明細
        </h2>

        {transactionsError ? (

          /* ==================================================
             讀取失敗
             ================================================== */

          <div className="border rounded-2xl p-5 shadow-sm">

            <p className="text-red-600">
              讀取積分明細失敗。
            </p>

          </div>

        ) : !transactions ||
          transactions.length === 0 ? (

          /* ==================================================
             沒有紀錄
             ================================================== */

          <div className="border rounded-2xl p-5 shadow-sm">

            <p className="text-gray-500">
              目前沒有積分紀錄。
            </p>

          </div>

        ) : (

          <>
            {/* ==================================================
                Desktop
                表格
                ================================================== */}

            <div className="hidden md:block border rounded-2xl overflow-hidden shadow-sm bg-white">

              <div className="max-h-[800px] overflow-y-auto">

                <table className="w-full table-fixed">

                  <colgroup>

                    <col className="w-[22%]" />

                    <col className="w-[28%]" />

                    <col className="w-[25%]" />

                    <col className="w-[25%]" />

                  </colgroup>

                  {/* ==================================================
                      表頭
                      ================================================== */}

                  <thead className="bg-gray-100 sticky top-0 z-10">

                    <tr>

                      <th className="px-4 py-3 text-center font-bold whitespace-nowrap">
                        積分增加
                      </th>

                      <th className="px-4 py-3 text-center font-bold whitespace-nowrap">
                        項目
                      </th>

                      <th className="px-4 py-3 text-center font-bold whitespace-nowrap">
                        訂單
                      </th>

                      <th className="px-4 py-3 text-center font-bold whitespace-nowrap">
                        日期
                      </th>

                    </tr>

                  </thead>

                  {/* ==================================================
                      表格內容
                      ================================================== */}

                  <tbody>

                    {transactions.map(
                      (transaction) => {

                        const orderNo =
                          transaction.order_id !==
                          null
                            ? orderMap.get(
                                transaction.order_id
                              )
                            : null;

                        const isPositive =
                          transaction.amount > 0;

                        return (

                          <tr
                            key={
                              transaction.id
                            }
                            className="border-t hover:bg-orange-50 transition"
                          >

                            {/* 積分增加 */}

                            <td className="px-4 py-4 text-center font-bold whitespace-nowrap">

                              <span
                                className={
                                  isPositive
                                    ? "text-orange-600"
                                    : "text-red-600"
                                }
                              >
                                {isPositive
                                  ? "🎁 +"
                                  : "🛒 "}

                                {Math.abs(
                                  transaction.amount
                                ).toLocaleString(
                                  "zh-TW"
                                )}{" "}
                                點
                              </span>

                            </td>

                            {/* 項目 */}

                            <td className="px-4 py-4 text-center">

                              <span className="break-words">

                                {transaction.description ??
                                  "—"}

                              </span>

                            </td>

                            {/* 訂單 */}

                            <td className="px-4 py-4 text-center">

                              {transaction.order_id !==
                                null &&
                              orderNo ? (

                                <Link
                                  href={`/account/orders/${transaction.order_id}`}
                                  className="text-blue-600 hover:text-blue-800 hover:underline font-semibold whitespace-nowrap"
                                >
                                  訂單{" "}
                                  {orderNo}
                                </Link>

                              ) : (

                                "—"

                              )}

                            </td>

                            {/* 日期 */}

                            <td className="px-4 py-4 text-center whitespace-nowrap text-sm">

                              {formatDate(
                                transaction.created_at
                              )}

                            </td>

                          </tr>

                        );
                      }
                    )}

                  </tbody>

                </table>

              </div>

            </div>


            {/* ==================================================
                Mobile
                卡片式
                ================================================== */}

            <div className="md:hidden">

              <div className="max-h-[400px] overflow-y-auto space-y-2 pr-1">

                {transactions.map(
                  (transaction) => {

                    const orderNo =
                      transaction.order_id !==
                      null
                        ? orderMap.get(
                            transaction.order_id
                          )
                        : null;

                    const isPositive =
                      transaction.amount > 0;

                    return (

                      <div
                        key={
                          transaction.id
                        }
                        className="border rounded-xl p-3 bg-white shadow-sm"
                      >

                        {/* ==================================================
                            第一行
                            積分＋日期
                            ================================================== */}

                        <div className="flex items-center justify-between gap-2">

                          <span
                            className={`font-bold whitespace-nowrap ${
                              isPositive
                                ? "text-orange-600"
                                : "text-red-600"
                            }`}
                          >

                            {isPositive
                              ? "🎁 +"
                              : "🛒 "}

                            {Math.abs(
                              transaction.amount
                            ).toLocaleString(
                              "zh-TW"
                            )}{" "}
                            點

                          </span>

                          <span className="text-sm text-gray-500 whitespace-nowrap">

                            {formatDate(
                              transaction.created_at
                            )}

                          </span>

                        </div>


                        {/* ==================================================
                            分隔線
                            ================================================== */}

                        <hr className="my-2 border-gray-200" />


                        {/* ==================================================
                            項目
                            ================================================== */}

                     <div className="space-y-1">
  <p className="text-gray-700">
    {transaction.type === "earn" &&
    transaction.order_id !== null
      ? "訂單完成消費回饋"
      : transaction.description ?? "—"}
  </p>
</div>


                        {/* ==================================================
                            訂單
                            ================================================== */}

                        {transaction.order_id !==
                          null &&
                        orderNo ? (

                          <Link
                            href={`/account/orders/${transaction.order_id}`}
                            className="inline-block mt-1 text-blue-600 hover:text-blue-800 hover:underline font-semibold"
                          >
                            訂單{" "}
                            {orderNo}
                          </Link>

                        ) : null}

                      </div>

                    );
                  }
                )}

              </div>

            </div>

          </>

        )}

      </section>

    </main>
  );
}