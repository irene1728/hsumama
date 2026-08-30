import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

type Order = {
  id: number;
  member_no: string | null;
  customer_name: string;
  grand_total: number;
  status: string | null;
  payment_status: string | null;
  created_at: string;
};

type Member = {
  member_no: string | null;
  name: string | null;
  created_at: string;
};

const orderStatuses = [
  "待處理",
  "處理中",
  "已出貨",
  "已完成",
  "已取消",
];

function getTaipeiDayBounds() {
  const now = new Date();

  const taipeiDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);

  const start = new Date(`${taipeiDate}T00:00:00+08:00`);
  const end = new Date(`${taipeiDate}T23:59:59.999+08:00`);

  return {
    start: start.toISOString(),
    end: end.toISOString(),
  };
}

function formatDate(date: string) {
  return new Date(date).toLocaleString("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function statusClass(status: string | null) {
  switch (status) {
    case "已完成":
      return "bg-green-100 text-green-700";

    case "已取消":
      return "bg-red-100 text-red-700";

    case "已出貨":
      return "bg-purple-100 text-purple-700";

    case "處理中":
      return "bg-blue-100 text-blue-700";

    case "待處理":
      return "bg-yellow-100 text-yellow-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const { start, end } = getTaipeiDayBounds();

  // ==================================================
  // 今日訂單
  // ==================================================

const { data: todayOrders } = await supabase
  .from("orders")
  .select("id, grand_total, status")
  .gte("created_at", start)
  .lte("created_at", end);

const todayOrderCount = todayOrders?.length ?? 0;

const todayRevenue =
  todayOrders
    ?.filter((order) => order.status !== "已取消")
    .reduce(
      (sum, order) => sum + Number(order.grand_total ?? 0),
      0
    ) ?? 0;

  // ==================================================
  // 會員總數
  // ==================================================

  const { count: memberCount } = await supabase
    .from("profiles")
    .select("user_id", {
      count: "exact",
      head: true,
    });

  // ==================================================
  // 各訂單狀態數量
  // ==================================================

  const statusCounts: Record<string, number> = {};

  await Promise.all(
    orderStatuses.map(async (orderStatus) => {
      const { count } = await supabase
        .from("orders")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("status", orderStatus);

      statusCounts[orderStatus] = count ?? 0;
    })
  );

  const pendingOrderCount = statusCounts["待處理"] ?? 0;

  // ==================================================
  // 最近訂單
  // ==================================================

  const { data: recentOrders } = await supabase
    .from("orders")
    .select(
      "id, member_no, customer_name, grand_total, status, payment_status, created_at"
    )
    .order("created_at", { ascending: false })
    .limit(5);

  const orders: Order[] = recentOrders ?? [];

  // ==================================================
  // 最新會員
  // ==================================================

  const { data: recentMembers } = await supabase
    .from("profiles")
    .select("member_no, name, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  const members: Member[] = recentMembers ?? [];

  return (
    <main className="max-w-6xl mx-auto px-3 py-4 md:px-4 md:py-4">
      {/* ==================================================
          標題
          ================================================== */}

      <div className="mb-2">
        <h1 className="text-3xl md:text-4xl font-bold text-stone-800">
             後台首頁總覽
        </h1>


      </div>

      {/* ==================================================
          核心數據
          ================================================== */}

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {/* 今日訂單 */}

        <Link
          href="/admin/orders"
          className="rounded-xl border bg-white p-4 md:p-5 shadow-sm hover:bg-orange-50 transition"
        >
          <p className="text-sm md:text-base text-gray-500">
            🛒 今日訂單
          </p>

          <p className="mt-2 text-2xl md:text-3xl font-bold text-stone-800">
            {todayOrderCount}
            <span className="ml-1 text-base font-normal text-gray-500">
              筆
            </span>
          </p>
        </Link>

        {/* 今日營業額 */}

        <Link
          href="/admin/orders"
          className="rounded-xl border bg-white p-4 md:p-5 shadow-sm hover:bg-orange-50 transition"
        >
          <p className="text-sm md:text-base text-gray-500">
            💰 今日營業額
          </p>

          <p className="mt-2 text-xl md:text-3xl font-bold text-orange-600 break-words">
            NT$ {todayRevenue.toLocaleString("zh-TW")}
          </p>
        </Link>

        {/* 會員總數 */}

        <Link
          href="/admin/members"
          className="rounded-xl border bg-white p-4 md:p-5 shadow-sm hover:bg-orange-50 transition"
        >
          <p className="text-sm md:text-base text-gray-500">
            👥 會員總數
          </p>

          <p className="mt-2 text-2xl md:text-3xl font-bold text-stone-800">
            {memberCount ?? 0}
            <span className="ml-1 text-base font-normal text-gray-500">
              人
            </span>
          </p>
        </Link>

        {/* 待處理訂單 */}

        <Link
          href="/admin/orders"
          className="rounded-xl border bg-white p-4 md:p-5 shadow-sm hover:bg-orange-50 transition"
        >
          <p className="text-sm md:text-base text-gray-500">
            📦 待處理訂單
          </p>

          <p className="mt-2 text-2xl md:text-3xl font-bold text-blue-600">
            {pendingOrderCount}
            <span className="ml-1 text-base font-normal text-gray-500">
              筆
            </span>
          </p>
        </Link>
      </section>

      {/* ==================================================
          中段：訂單狀態 + 快速操作
          ================================================== */}

      <section className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* ==================================================
            訂單狀態
            ================================================== */}

        <div className="rounded-xl border bg-white p-4 md:p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-stone-800">
              訂單狀態
            </h2>

            <Link
              href="/admin/orders"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              查看訂單 →
            </Link>
          </div>

          <div className="space-y-2">
            {orderStatuses.map((orderStatus) => (
              <Link
                key={orderStatus}
                href="/admin/orders"
                className="flex items-center justify-between rounded-lg border px-4 py-3 hover:bg-orange-50 transition"
              >
                <span className="font-medium text-gray-700">
                  {orderStatus}
                </span>

                <span
                  className={`min-w-10 text-center rounded-full px-3 py-1 text-sm font-bold ${statusClass(
                    orderStatus
                  )}`}
                >
                  {statusCounts[orderStatus] ?? 0}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* ==================================================
            快速操作
            ================================================== */}

        <div className="rounded-xl border bg-white p-4 md:p-5 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold text-stone-800 mb-4">
            快速操作
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/admin/products/new"
              className="rounded-xl border px-4 py-5 text-center font-bold text-gray-700 hover:bg-orange-50 hover:border-orange-300 transition"
            >
              <div className="text-2xl mb-1">
                ➕
              </div>

              新增商品
            </Link>

            <Link
              href="/admin/products"
              className="rounded-xl border px-4 py-5 text-center font-bold text-gray-700 hover:bg-orange-50 hover:border-orange-300 transition"
            >
              <div className="text-2xl mb-1">
                📦
              </div>

              商品管理
            </Link>

          <Link
  href="/admin/shipping"
  className="rounded-xl border px-4 py-5 text-center font-bold text-gray-700 hover:bg-orange-50 hover:border-orange-300 transition"
>
  <div className="text-2xl mb-1">
    🚚
  </div>

  配送設定
</Link>

          <Link
  href="/admin/inventory"
  className="rounded-xl border px-4 py-5 text-center font-bold text-gray-700 hover:bg-orange-50 hover:border-orange-300 transition"
>
  <div className="text-2xl mb-1">
    📦
  </div>

  庫存管理
</Link>

          </div>
        </div>
      </section>

      {/* ==================================================
          下段：最近訂單 + 最新會員
          ================================================== */}

      <section className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* ==================================================
            最近訂單
            ================================================== */}

        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-4 md:p-5 border-b">
            <h2 className="text-xl md:text-2xl font-bold text-stone-800">
              最近訂單
            </h2>

            <Link
              href="/admin/orders"
              className="text-lg text-blue-600 hover:text-blue-800 hover:underline"
            >
              查看全部 →
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="p-5 text-gray-500">
              目前沒有訂單。
            </div>
          ) : (
            <div>
              {orders.map((order) => (
                <Link
                  key={order.id}
                  href={`/admin/orders/${order.id}`}
                  className="block p-4 border-b last:border-b-0 hover:bg-orange-50 transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-bold text-stone-800">
                        訂單 #{order.id}
                      </p>

                      <p className="mt-1 text-sm text-gray-500 truncate">
                        {order.member_no
                          ? order.member_no
                          : "訪客"}{" "}
                        · {order.customer_name}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {formatDate(order.created_at)}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="font-bold text-orange-600">
                        NT$ {Number(order.grand_total).toLocaleString("zh-TW")}
                      </p>

                      <span
                        className={`inline-block mt-2 rounded-full px-2.5 py-1 text-xs font-medium ${statusClass(
                          order.status
                        )}`}
                      >
                        {order.status ?? "—"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* ==================================================
            最新會員
            ================================================== */}

        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-4 md:p-5 border-b">
            <h2 className="text-xl md:text-2xl font-bold text-stone-800">
              最新會員
            </h2>

            <Link
              href="/admin/members"
              className="text-lg text-blue-600 hover:text-blue-800 hover:underline"
            >
              查看全部 →
            </Link>
          </div>

          {members.length === 0 ? (
            <div className="p-5 text-gray-500">
              目前沒有會員。
            </div>
          ) : (
            <div>
              {members.map((member, index) => (
                <Link
                  key={`${member.member_no}-${index}`}
                  href={
                    member.member_no
                      ? `/admin/members/${member.member_no}`
                      : "/admin/members"
                  }
                  className="block p-4 border-b last:border-b-0 hover:bg-orange-50 transition"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-bold text-stone-800">
                        {member.member_no ?? "—"}
                      </p>

                      <p className="mt-1 text-gray-600">
                        {member.name ?? "未提供姓名"}
                      </p>
                    </div>

                    <p className="shrink-0 text-xs text-gray-400">
                      {formatDate(member.created_at)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}