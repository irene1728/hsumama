import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./LogoutButton";

export default async function AccountPage() {
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
  // 會員資料
  // ==================================================

  const { data: profile, error } = await supabase
    .from("profiles")
    .select(
      "member_no, name, phone, email, birthday, address"
    )
    .eq("user_id", user.id)
    .single();

  if (error || !profile) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-5 md:py-10">
        <h1 className="text-4xl font-bold text-[#4E342E] mb-4">
          會員中心
        </h1>

        <p className="text-red-600">
          找不到會員資料。
        </p>
      </main>
    );
  }

  // ==================================================
  // 會員積分
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
  // 我的訂單
  // ==================================================

  const { data: orders, error: ordersError } =
    await supabase
      .from("orders")
      .select(
        "id, order_no, status, payment_status, total_amount, grand_total, created_at"
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

  return (
    <main className="max-w-2xl mx-auto px-4 md:px-6 py-2 md:py-4">
      <h1 className="text-4xl font-bold text-[#4E342E] mb-1 md:mb-2">
        會員中心
      </h1>

      <div className="border rounded-2xl p-5 space-y-2 shadow-sm">

       {/* ==================================================
    會員編號＋目前積分
    ================================================== */}

<div>
  <div className="flex items-center justify-between gap-4">

    {/* 會員編號 */}
    <div className="min-w-0">
      <p className="text-gray-500">
        會員編號
      </p>

      <p className="text-lg font-semibold">
        {profile.member_no}
      </p>
    </div>

<div className="shrink-0 text-left mb-1">
  <p className="text-base text-gray-500 ml-2">
    目前積分
  </p>

  <div className="flex items-center justify-end gap-2 md:gap-4">

    {/* 積分 */}
    
      <p className="text-xl md:text-2xl font-bold text-orange-600 whitespace-nowrap">
       🎁 {currentPoints.toLocaleString("zh-TW")} 點
      </p>
    

    {/* 查看 */}
    <Link
      href="/account/points"
      className="border border-orange-500 rounded-lg px-1 md:px-3 py-1 bg-white text-orange-600 font-bold text-base md:text-lg hover:bg-orange-100 transition whitespace-nowrap"
    >
      查 看
    </Link>

  </div>
</div>

  </div>

  <hr className="border-b border-gray-200" />
</div>

        {/* ==================================================
            姓名
            ================================================== */}

        <div>
          <p className="text-gray-500">
            姓名
          </p>

          <p className="text-lg">
            {profile.name}
          </p>

          <hr className="border-b border-gray-200" />
        </div>

        {/* ==================================================
            電話
            ================================================== */}

        <div>
          <p className="text-gray-500">
            電話
          </p>

          <p className="text-lg">
            {profile.phone}
          </p>

          <hr className="border-b border-gray-200" />
        </div>

        {/* ==================================================
            Email
            ================================================== */}

        <div>
          <p className="text-gray-500">
            Email
          </p>

          <p className="text-lg break-all">
            {profile.email}
          </p>

          <hr className="border-b border-gray-200" />
        </div>

        {/* ==================================================
            生日
            ================================================== */}

        <div>
          <p className="text-gray-500">
            生日
          </p>

          <p className="text-lg">
            {profile.birthday}
          </p>

          <hr className="border-b border-gray-200" />
        </div>

        {/* ==================================================
            地址
            ================================================== */}

        <div>
          <p className="text-gray-500">
            地址
          </p>

          <p className="text-lg break-words">
            {profile.address}
          </p>

          <hr className="border-b border-gray-200" />
        </div>

      </div>

      {/* ==================================================
          我的訂單
          ================================================== */}

      <section className="mt-4">

        <h2 className="text-2xl font-bold text-[#4E342E] mb-1 md:mb-2">
          我的訂單
        </h2>

        {ordersError ? (
          <div className="border rounded-2xl p-5 shadow-sm">
            <p className="text-red-600">
              讀取訂單失敗。
            </p>
          </div>
        ) : !orders ||
          orders.length === 0 ? (
          <div className="border rounded-2xl p-5 shadow-sm">
            <p className="text-gray-500">
              目前沒有訂單。
            </p>
          </div>
        ) : (
          <div className="space-y-3">

            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/account/orders/${order.id}`}
                className="block rounded-2xl border p-5 shadow-sm bg-white"
              >

                <div className="flex items-start justify-between gap-4">

                  <div>
                    <p className="font-bold text-lg text-[#4E342E]">
                      訂單{" "}
                      {order.order_no ??
                        `#${order.id}`}
                    </p>

                    <p className="mt-1 text-base text-gray-500">
                      {new Date(
                        order.created_at
                      ).toLocaleString(
                        "zh-TW"
                      )}
                    </p>

                  </div>

                  <p className="font-bold text-orange-600 text-lg whitespace-nowrap">
                    NT${" "}
                    {order.grand_total.toLocaleString()}
                  </p>

                </div>

                <hr className="border-b border-gray-200" />

                <div className="mt-2 text-base text-gray-600 space-y-1">

                  <p>
                    付款狀態：
                    {order.payment_status ??
                      "—"}
                  </p>

                  <p>
                    訂單狀態：
                    {order.status ?? "—"}
                  </p>

                </div>

              </Link>
            ))}

          </div>

        )}

      </section>

      {/* ==================================================
          會員功能
          ================================================== */}

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