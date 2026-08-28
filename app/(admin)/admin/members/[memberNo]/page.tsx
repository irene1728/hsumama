import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{
    memberNo: string;
  }>;
};

type MemberOrder = {
  id: number;
  status: string | null;
  payment_status: string | null;
  total_amount: number;
  grand_total: number;
  created_at: string;
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
      "user_id, member_no, name, phone, email, address, created_at, updated_at"
    )
    .eq("member_no", memberNo)
    .maybeSingle();

  if (profileError) {
    return (
      <main className="min-h-screen bg-[#F7FFE5]">
        <div className="max-w-5xl mx-auto px-3 md:px-10 py-10">
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
        <div className="max-w-5xl mx-auto px-3 md:px-10 py-10">
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
      "id, status, payment_status, total_amount, grand_total, created_at"
    )
    .eq("user_id", profile.user_id)
    .order("created_at", { ascending: false });

  const memberOrders: MemberOrder[] = orders ?? [];

  return (
    <main className="min-h-screen bg-[#F7FFE5]">
      <div className="max-w-5xl mx-auto px-1 md:px-10 py-5">

        {/* 會員資料 */}
        <h1 className="text-3xl font-bold text-stone-800 mb-2">
          會員資料
        </h1>

        <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
          <div className="space-y-2">

            <div>
              <p className="text-lg text-gray-500">
                會員編號
              </p>

              <p className="mt-1 font-bold text-xl">
                {profile.member_no}
              </p>
               <hr className="border-b border-gray-200"></hr>
            </div>

            <div>
              <p className="text-lg text-gray-500">
                姓名
              </p>

              <p className="mt-1 text-xl">
                {profile.name}
              </p>
               <hr className="border-b border-gray-200"></hr>
            </div>

            <div>
              <p className="text-lg text-gray-500">
                電話
              </p>

              <p className="mt-1 text-xl">
                {profile.phone}
              </p>
               <hr className="border-b border-gray-200"></hr>
            </div>

            <div>
              <p className="text-lg text-gray-500">
                Email
              </p>

              <p className="mt-1 text-lg md:text-xl">
                {profile.email}
              </p>
               <hr className="border-b border-gray-200"></hr>
            </div>

            <div>
              <p className="text-lg text-gray-500">
                地址
              </p>

              <p className="mt-1 text-lg md:text-xl">
                {profile.address}
              </p>
               <hr className="border-b border-gray-200"></hr>
            </div>

            <div>
              <p className="text-lg text-gray-500">
                註冊時間
              </p>

              <p className="mt-1 text-lg md:text-xl">
                {new Date(profile.created_at).toLocaleString("zh-TW")}
              </p>
               <hr className="border-b border-gray-200"></hr>
            </div>

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
                        訂單 #{order.id}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleString("zh-TW")}
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