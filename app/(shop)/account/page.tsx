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
      <main className="max-w-2xl mx-auto px-6 py-25">
        <h1 className="text-4xl font-bold text-[#4E342E] mb-8">
          會員中心
        </h1>

        <p className="text-red-600">
          找不到會員資料。
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-25">
      <h1 className="text-4xl font-bold text-[#4E342E] mb-5">
        會員中心
      </h1>

      <div className="border rounded-2xl p-6 space-y-5 shadow-sm">
        <div>
          <p className="text-gray-500">會員編號</p>
          <p className="text-lg font-semibold">
            {profile.member_no}
          </p>
        </div>

        <div>
          <p className="text-gray-500">姓名</p>
          <p className="text-lg">
            {profile.name}
          </p>
        </div>

        <div>
          <p className="text-gray-500">電話</p>
          <p className="text-lg">
            {profile.phone}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Email</p>
          <p className="text-lg">
            {profile.email}
          </p>
        </div>

        <div>
          <p className="text-gray-500">地址</p>
          <p className="text-lg">
            {profile.address}
          </p>
        </div>
      </div>

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