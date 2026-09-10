import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import PointsTabs from "./PointsTabs";

type PageProps = {
  params: Promise<{
    memberNo: string;
  }>;
};

type PointTransaction = {
  id: string;
  type: string;
  amount: number;
  balance_after: number;
  description: string | null;
  created_at: string;
  reference_key: string | null;
  order_id: number | null;
};

type PointTransactionForClient = PointTransaction & {
  display_created_at: string;
};

export default async function MemberPointsPage({
  params,
}: PageProps) {
  const { memberNo } = await params;

  const supabase = await createClient();

  // ==================================================
  // 找會員
  // ==================================================

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("user_id, member_no, name")
    .eq("member_no", memberNo)
    .maybeSingle();

  if (profileError) {
    return (
      <main className="min-h-screen bg-[#F7FFE5]">
        <div className="max-w-5xl mx-auto px-3 md:px-6 py-5">

          <h1 className="text-3xl font-bold text-stone-800">
            會員積分與優惠券
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
        <div className="max-w-5xl mx-auto px-3 md:px-6 py-5">

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

  // ==================================================
  // 取得會員所有積分紀錄
  // ==================================================

  const {
    data: transactions,
    error: transactionsError,
  } = await supabase
    .from("point_transactions")
    .select(
      "id, type, amount, balance_after, description, created_at, reference_key, order_id"
    )
    .eq("user_id", profile.user_id)
    .order("created_at", { ascending: false });

  const pointTransactions: PointTransaction[] =
    transactions ?? [];

  // ==================================================
  // 目前積分
  // ==================================================

  const currentPoints =
    pointTransactions.length > 0
      ? pointTransactions[0].balance_after
      : 0;

  // ==================================================
  // 累計獲得
  // ==================================================

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

  // ==================================================
  // 累計使用
  // ==================================================

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

  // ==================================================
  // Server 端先格式化日期
  //
  // 避免 Client Component 因為 locale 日期格式不同
  // 造成 Hydration Error
  // ==================================================

  const pointTransactionsForClient: PointTransactionForClient[] =
    pointTransactions.map((transaction) => ({
      ...transaction,

      display_created_at: new Date(
        transaction.created_at
      ).toLocaleString("zh-TW"),
    }));

  return (
    <main className="min-h-screen bg-[#F7FFE5]">

      <div className="max-w-5xl mx-auto px-3 md:px-6 py-5">

        {/* ==================================================
            返回會員詳細資料
            ================================================== */}

        <div className="mb-4">

          <Link
            href={`/admin/members/${profile.member_no}`}
            className="inline-flex items-center text-gray-600 hover:text-orange-600"
          >
            ← 返回會員資料
          </Link>

        </div>

        {/* ==================================================
            頁面標題
            ================================================== */}

        <h1 className="text-3xl font-bold text-stone-800 mb-2">
          會員積分與優惠券
        </h1>

        {/* ==================================================
            會員資訊
            ================================================== */}

        <div className="rounded-xl border border-gray-300 bg-white p-5 shadow-sm">

          <p className="text-lg text-gray-500">
            會員
          </p>

          <p className="mt-1 text-xl font-bold text-stone-800">
            {profile.name}
          </p>

          <p className="mt-1 text-gray-600">
            會員編號：{profile.member_no}
          </p>

        </div>

        {/* ==================================================
            積分／優惠券左右切換
            ================================================== */}

        <PointsTabs
          currentPoints={currentPoints}
          totalEarned={totalEarned}
          totalUsed={totalUsed}
          pointTransactions={pointTransactionsForClient}
          transactionsError={
            transactionsError
              ? "讀取積分紀錄失敗。"
              : null
          }
        />

      </div>

    </main>
  );
}