import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./LogoutButton";

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/account/login");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("member_no, name, phone, email, address")
    .eq("user_id", user.id)
    .single();

  if (error || !profile) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-24 md:py-27">
        <h1 className="text-4xl font-bold text-[#4E342E] mb-4">
          會員中心
        </h1>

        <p className="text-red-600">
          找不到會員資料。
        </p>
      </main>
    );
  }

 const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select(
      "id, status, payment_status, total_amount, grand_total, created_at"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <main className="max-w-2xl mx-auto px-6 py-22 md:py-27">
      <h1 className="text-4xl font-bold text-[#4E342E] mb-2">
        會員中心
      </h1>

      <div className="border rounded-2xl p-5 space-y-2 shadow-sm">
        <div>
          <p className="text-gray-500">會員編號</p>
          <p className="text-lg font-semibold">
            {profile.member_no}
          </p>
          <hr className="border-b border-gray-200"></hr>
        </div>

        <div>
          <p className="text-gray-500">姓名</p>
          <p className="text-lg">
            {profile.name}
          </p>
          <hr className="border-b border-gray-200"></hr>
        </div>

        <div>
          <p className="text-gray-500">電話</p>
          <p className="text-lg">
            {profile.phone}
          </p>
          <hr className="border-b border-gray-200"></hr>
        </div>

        <div>
          <p className="text-gray-500">Email</p>
          <p className="text-lg">
            {profile.email}
          </p>
          <hr className="border-b border-gray-200"></hr>
        </div>

        <div>
          <p className="text-gray-500">地址</p>
          <p className="text-lg">
            {profile.address}
          </p>
           <hr className="border-b border-gray-200"></hr>
        </div>
    
      </div>

      {/* 我的訂單 */}
      <section className="mt-4">

        <h2 className="text-2xl font-bold text-[#4E342E] mb-2">
          我的訂單
        </h2>

        {ordersError ? (
          <div className="border rounded-2xl p-5 shadow-sm">
            <p className="text-red-600">
              讀取訂單失敗。
            </p>
          </div>
        ) : !orders || orders.length === 0 ? (
          <div className="border rounded-2xl p-5 shadow-sm">
            <p className="text-gray-500">
              目前沒有訂單。
            </p>
          </div>
        ) : (
          <div className="space-y-3">

            {orders.map((order) => (
              <div
                key={order.id}
                className="border rounded-2xl p-5 shadow-sm bg-white"
              >

                <div className="flex items-start justify-between gap-4">

                  <div>
                    <p className="font-bold text-lg text-[#4E342E]">
                      訂單 #{order.id}
                    </p>

                    <p className="mt-1 text-base text-gray-500">
                      {new Date(order.created_at).toLocaleString("zh-TW")}
                    </p>
                    
                  </div>

                  <p className="font-bold text-orange-600 text-lg whitespace-nowrap">
                    NT$ {order.grand_total.toLocaleString()}
                  </p>

                </div>
 <hr className="border-b border-gray-200"></hr>
                <div className="mt-2 text-base text-gray-600 space-y-1">
                  <p>
                    付款狀態：{order.payment_status ?? "—"}
                  </p>

                  <p>
                    訂單狀態：{order.status ?? "—"}
                  </p>
                </div>

              </div>
            ))}

          </div>
        )}

      </section>

<div className="mt-6 space-y-3">
  <Link
    href="/account/edit"
    className="block w-full rounded-xl border border-orange-600 py-3 text-center font-bold text-orange-600 transition hover:bg-orange-50"
  >
    編輯會員資料
  </Link>

<Link
  href="/account/password"
  className="block w-full rounded-xl border border-orange-600 py-3 text-center font-bold text-orange-600 transition hover:bg-orange-50"
>
  修改密碼
</Link>

<Link
  href="/account/email"
  className="block w-full rounded-xl border border-orange-600 py-3 text-center font-bold text-orange-600 transition hover:bg-orange-50"
>
  修改 Email
</Link>

  <LogoutButton />

</div>

    </main>
  );
}