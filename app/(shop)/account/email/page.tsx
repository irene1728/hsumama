"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export default function EmailPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/account/login");
        return;
      }

      setCurrentEmail(user.email ?? "");
      setLoading(false);
    }

    loadUser();
  }, [router, supabase]);

  async function handleChangeEmail() {
    if (!newEmail) {
      alert("請輸入新的 Email。");
      return;
    }

    if (newEmail === currentEmail) {
      alert("新的 Email 與目前 Email 相同。");
      return;
    }

    setSaving(true);

    try {
      const { error } = await supabase.auth.updateUser({
        email: newEmail,
      });

      if (error) {
        console.error("Update email error:", error);
        alert("Email 更新失敗，請稍後再試。");
        return;
      }

      alert(
        "Email 變更驗證信已寄出，請依照 徐媽媽冰鑽滷味 信件完成驗證。"
      );

      router.push("/account");
      router.refresh();
    } catch (error) {
      console.error("Change email error:", error);
      alert("更新 Email 時發生錯誤，請稍後再試。");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-25">
        <p className="text-gray-500">
          載入會員資料中...
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-25">

      <h1 className="text-4xl font-bold text-[#4E342E] mb-8">
        修改 Email
      </h1>

      <div className="border rounded-2xl p-6 space-y-6 shadow-sm">

        {/* 目前 Email */}
        <div>
          <label className="block text-gray-500 mb-2">
            目前 Email
          </label>

          <p className="text-lg">
            {currentEmail}
          </p>
        </div>

        {/* 新 Email */}
        <div>
          <label className="block text-gray-800 mb-2">
            新 Email
          </label>

          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="請輸入新的 Email"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:text-xl"
          />

        <p className="mt-2 text-lg text-gray-800 leading-relaxed">
  提交後，系統會寄出 徐媽媽冰鑽滷味 驗證信。
  <br />
  請依照 徐媽媽冰鑽滷味 信件完成驗證後，新的 Email 才會正式生效。
        </p>
        </div>

        {/* 按鈕 */}
        <div className="flex gap-3 pt-3">

          <button
            type="button"
            onClick={() => router.push("/account")}
            className="flex-1 rounded-xl border border-gray-300 py-3 font-bold text-gray-700 transition hover:bg-gray-100"
          >
            取消
          </button>

          <button
            type="button"
            onClick={handleChangeEmail}
            disabled={saving}
            className="flex-1 rounded-xl bg-orange-600 py-3 font-bold text-white transition hover:bg-orange-700 disabled:bg-gray-400"
          >
            {saving ? "送出中..." : "送出變更"}
          </button>

        </div>

      </div>
    </main>
  );
}