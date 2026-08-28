import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

type Member = {
  user_id: string;
  member_no: string | null;
  name: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  created_at: string;
};

export default async function MembersPage() {
  const supabase = await createClient();

  const { data: members, error } = await supabase
    .from("profiles")
    .select(
      "user_id, member_no, name, phone, email, address, created_at"
    )
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-[#F7FFE5]">
        <div className="max-w-7xl mx-auto px-3 md:px-6 py-4 md:py-5">
          <h1 className="text-3xl font-bold text-stone-800 mb-4">
            會員管理
          </h1>

          <div className="rounded-xl border border-red-200 bg-white p-6">
            <p className="text-red-600">
              讀取會員資料失敗。
            </p>
          </div>
        </div>
      </main>
    );
  }

  const memberList: Member[] = members ?? [];

  return (
    <main className="min-h-screen bg-[#F7FFE5]">
      <div className="max-w-7xl mx-auto px-3 md:px-6 py-4 md:py-5">

        {/* 標題 */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-stone-800">
            會員管理
          </h1>

          <p className="mt-1 text-gray-600">
            共 {memberList.length} 位會員
          </p>
        </div>

        {/* 沒有會員 */}
        {memberList.length === 0 ? (
          <div className="rounded-xl border border-gray-300 bg-white p-6">
            <p className="text-gray-500">
              目前沒有會員資料。
            </p>
          </div>
        ) : (
          <>
            {/* ==================== */}
            {/* 電腦版 */}
            {/* ==================== */}
            <div className="hidden md:block overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-orange-50 text-left">
                      <th className="border-b px-4 py-3 font-bold text-stone-800">
                        會員編號
                      </th>

                      <th className="border-b px-4 py-3 font-bold text-stone-800">
                        姓名
                      </th>

                      <th className="border-b px-4 py-3 font-bold text-stone-800">
                        電話
                      </th>

                      <th className="border-b px-4 py-3 font-bold text-stone-800">
                        Email
                      </th>

                      <th className="border-b px-4 py-3 font-bold text-stone-800">
                        地址
                      </th>

                      <th className="border-b px-4 py-3 font-bold text-stone-800">
                        註冊時間
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {memberList.map((member) => (
                      <tr
                        key={member.user_id}
                        className="transition hover:bg-orange-50"
                      >
                        <td className="border-b px-4 py-4">
                          <Link
                            href={`/admin/members/${member.member_no}`}
                            className="font-bold text-orange-600 hover:underline"
                          >
                            {member.member_no ?? "—"}
                          </Link>
                        </td>

                        <td className="border-b px-4 py-4">
                          {member.name ?? "—"}
                        </td>

                        <td className="border-b px-4 py-4">
                          {member.phone ?? "—"}
                        </td>

                        <td className="border-b px-4 py-4">
                          {member.email ?? "—"}
                        </td>

                        <td className="border-b px-4 py-4">
                          {member.address ?? "—"}
                        </td>

                        <td className="border-b px-4 py-4 whitespace-nowrap">
                          {new Date(member.created_at).toLocaleString(
                            "zh-TW"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ==================== */}
            {/* 手機版 */}
            {/* ==================== */}
            <div className="space-y-3 md:hidden">
              {memberList.map((member) => (
                <Link
                  key={member.user_id}
                  href={`/admin/members/${member.member_no}`}
                  className="block rounded-xl border border-gray-300 bg-white p-4 shadow-sm transition hover:bg-orange-50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-gray-500">
                        會員編號
                      </p>

                      <p className="mt-1 text-lg font-bold text-orange-600">
                        {member.member_no ?? "—"}
                      </p>
                    </div>

                    <span className="rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-700">
                      查看
                    </span>
                  </div>

                  <div className="mt-3 space-y-2 border-t border-gray-200 pt-3">

                    <div>
                      <p className="text-sm text-gray-500">
                        姓名
                      </p>

                      <p className="text-lg text-stone-800">
                        {member.name ?? "—"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        電話
                      </p>

                      <p className="text-base text-stone-800">
                        {member.phone ?? "—"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Email
                      </p>

                      <p className="text-base break-all text-stone-800">
                        {member.email ?? "—"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        地址
                      </p>

                      <p className="text-base text-stone-800">
                        {member.address ?? "—"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        註冊時間
                      </p>

                      <p className="text-base text-stone-800">
                        {new Date(
                          member.created_at
                        ).toLocaleString("zh-TW")}
                      </p>
                    </div>

                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

      </div>
    </main>
  );
}