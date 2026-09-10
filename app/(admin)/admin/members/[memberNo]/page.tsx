import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{
    memberNo: string;
  }>;
};

type MemberOrder = {
  id: number;
  order_no: string | null;
  status: string | null;
  payment_status: string | null;
  total_amount: number;
  grand_total: number;
  created_at: string;
};

type PointTransaction = {
  id: string;
  type: string;
  amount: number;
  balance_after: number;
};

export default async function MemberPage({
  params,
}: PageProps) {
  const { memberNo } = await params;

  const supabase = await createClient();

  // 先找到會員資料
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select(
      "user_id, member_no, name, phone, email, birthday, address, created_at, updated_at"
    )
    .eq("member_no", memberNo)
    .maybeSingle();

  if (profileError) {
    return (
      <main className="min-h-screen bg-[#F7FFE5]">
        <div className="max-w-5xl mx-auto px-6 md:px-6 py-10">
          <h1 className="text-3xl font-bold text-stone-800">
            會員資料
          </h1>

          <p className="mt-6 text-red-600">
            讀取會員資料失敗。
          </p>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="min-h-screen bg-[#F7FFE5]">
        <div className="max-w-5xl mx-auto px-6 md:px-6 py-10">
          <h1 className="text-3xl font-bold text-stone-800">
            找不到會員
          </h1>

          <p className="mt-4 text-gray-600">
            會員編號：{memberNo}
          </p>
        </div>
      </main>
    );
  }

  // 透過 user_id 找出這個會員的歷史訂單
  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select(
      "id, order_no, status, payment_status, total_amount, grand_total, created_at"
    )
    .eq("user_id", profile.user_id)
    .order("created_at", { ascending: false });

  const memberOrders: MemberOrder[] = orders ?? [];

  // 取得會員積分紀錄
  const { data: pointData, error: pointError } = await supabase
    .from("point_transactions")
    .select("id, type, amount, balance_after")
    .eq("user_id", profile.user_id)
    .order("created_at", { ascending: false });

  const pointTransactions: PointTransaction[] =
    pointData ?? [];

  // 目前積分
  const currentPoints =
    pointTransactions.length > 0
      ? pointTransactions[0].balance_after
      : 0;

  // 累計獲得
  const totalEarned = pointTransactions
    .filter(
      (transaction) =>
        transaction.type === "earn" ||
        transaction.type === "refund"
    )
    .reduce(
      (total, transaction) =>
        total + Math.abs(transaction.amount),
      0
    );

  // 累計使用
  const totalUsed = pointTransactions
    .filter(
      (transaction) =>
        transaction.type === "redeem"
    )
    .reduce(
      (total, transaction) =>
        total + Math.abs(transaction.amount),
      0
    );

  return (
    <main className="min-h-screen bg-[#F7FFE5]">
      <div className="max-w-5xl mx-auto px-3 md:px-6 py-4 md:py-5">

        {/* 會員資料 */}
        <h1 className="text-3xl font-bold text-stone-800 mb-2">
          會員資料
        </h1>

        <div className="rounded-xl border border-gray-300 bg-white p-4 shadow-sm">
          <div className="space-y-2">

            {/* 會員編號 */}
            <div>
              <p className="text-lg text-gray-500">
                會員編號
              </p>

              <p className="mt-1 font-bold text-xl">
                {profile.member_no}
              </p>

              <hr className="border-b border-gray-200"></hr>
            </div>

            {/* 姓名 */}
            <div>
              <p className="text-lg text-gray-500">
                姓名
              </p>

              <p className="mt-1 text-xl">
                {profile.name}
              </p>

              <hr className="border-b border-gray-200"></hr>
            </div>

            {/* 電話 */}
            <div>
              <p className="text-lg text-gray-500">
                電話
              </p>

              <p className="mt-1 text-xl">
                {profile.phone}
              </p>

              <hr className="border-b border-gray-200"></hr>
            </div>

            {/* Email */}
            <div>
              <p className="text-lg text-gray-500">
                Email
              </p>

              <p className="mt-1 text-lg md:text-xl">
                {profile.email}
              </p>

              <hr className="border-b border-gray-200"></hr>
            </div>

            {/* 生日 */}
            <div>
              <p className="text-lg text-gray-500">
                生日
              </p>

              <p className="mt-1 text-lg md:text-xl">
                {profile.birthday ?? "—"}
              </p>

              <hr className="border-b border-gray-200"></hr>
            </div>

            {/* 地址 */}
            <div>
              <p className="text-lg text-gray-500">
                地址
              </p>

              <p className="mt-1 text-lg md:text-xl">
                {profile.address}
              </p>

              <hr className="border-b border-gray-200"></hr>
            </div>

            {/* 註冊時間 */}
            <div>
              <p className="text-lg text-gray-500">
                註冊時間
              </p>

              <p className="mt-1 text-lg md:text-xl">
                {new Date(profile.created_at).toLocaleString(
                  "zh-TW"
                )}
              </p>

              <hr className="border-b border-gray-200"></hr>
            </div>

          </div>
        </div>

        {/* ==================================================
            積分／優惠券摘要
            ================================================== */}

        <div className="mt-3 rounded-xl border border-gray-300 bg-white shadow-sm">

          <div className="grid grid-cols-2 md:grid-cols-5">

            {/* 目前積分 */}
            <div className="px-3 py-3 md:px-4 border-b md:border-b-0 md:border-r border-gray-200 text-center">
              <p className="text-sm md:text-base text-gray-500">
                目前積分
              </p>

              <p className="mt-1 text-lg md:text-xl font-bold text-orange-600">
                {currentPoints.toLocaleString()} 點
              </p>
            </div>

            {/* 累計獲得 */}
            <div className="px-3 py-3 md:px-4 border-b md:border-b-0 md:border-r border-gray-200 text-center">
              <p className="text-sm md:text-base text-gray-500">
                累計獲得
              </p>

              <p className="mt-1 text-lg md:text-xl font-bold text-green-600">
                {totalEarned.toLocaleString()} 點
              </p>
            </div>

            {/* 累計使用 */}
            <div className="px-3 py-3 md:px-4 border-b md:border-b-0 md:border-r border-gray-200 text-center">
              <p className="text-sm md:text-base text-gray-500">
                累計使用
              </p>

              <p className="mt-1 text-lg md:text-xl font-bold text-red-600">
                {totalUsed.toLocaleString()} 點
              </p>
            </div>

            {/* 優惠券 */}
            <div className="px-3 py-3 md:px-4 border-b md:border-b-0 md:border-r border-gray-200 text-center">
              <p className="text-sm md:text-base text-gray-500">
                優惠券
              </p>

              {/* 優惠券系統尚未建立，目前留白 */}
              <p className="mt-1 text-lg md:text-xl font-bold text-stone-800">
                {" "}
              </p>
            </div>

            {/* 查看紀錄 */}
            <Link
              href={`/admin/members/${profile.member_no}/points`}
              className="px-3 py-3 md:px-4 flex flex-col items-center justify-center text-center hover:bg-orange-50 transition"
            >
              <p className="text-sm md:text-base text-gray-500">
                查看紀錄
              </p>

              <p className="mt-1 text-lg md:text-xl font-bold text-orange-600">
                查看 →
              </p>
            </Link>

          </div>

        </div>

        {/* 歷史訂單 */}
        <section className="mt-5">

          <h2 className="text-2xl font-bold text-stone-800 mb-2">
            會員訂單
          </h2>

          {ordersError ? (
            <div className="rounded-xl border border-red-200 bg-white p-6">
              <p className="text-red-600">
                讀取會員訂單失敗。
              </p>
            </div>
          ) : memberOrders.length === 0 ? (
            <div className="rounded-xl border border-gray-300 bg-white p-6">
              <p className="text-gray-500">
                目前沒有訂單。
              </p>
            </div>
          ) : (
            <div className="space-y-4">

              {memberOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/admin/orders/${order.id}`}
                  className="block rounded-xl border border-gray-300 bg-white p-5 transition hover:bg-orange-50 hover:shadow-sm"
                >

                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                    <div>
                      <p className="font-bold text-lg text-stone-800">
                        訂單 {order.order_no ?? String(order.id)}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {new Date(
                          order.created_at
                        ).toLocaleString("zh-TW")}
                      </p>
                    </div>

                    <div className="text-left md:text-right">

                      <p className="font-bold text-orange-600">
                        NT$ {order.grand_total.toLocaleString()}
                      </p>

                      <p className="mt-1 text-sm text-gray-600">
                        付款狀態：{order.payment_status ?? "—"}
                      </p>

                      <p className="text-sm text-gray-600">
                        訂單狀態：{order.status ?? "—"}
                      </p>

                    </div>

                  </div>

                </Link>
              ))}

            </div>
          )}

        </section>

      </div>
    </main>
  );
}