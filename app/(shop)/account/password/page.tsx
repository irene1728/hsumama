"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export default function PasswordPage() {
  const router = useRouter();
  const supabase = createClient();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!newPassword || !confirmPassword) {
      alert("請完整填寫新密碼。");
      return;
    }

    if (newPassword.length < 8) {
      alert("新密碼至少需要 8 個字元。");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("兩次輸入的新密碼不一致。");
      return;
    }

    setSaving(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/account/login");
        return;
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        console.error("Update password error:", error);
        alert("密碼更新失敗，請稍後再試。");
        return;
      }

      alert("密碼已成功更新。");
      router.push("/account");
      router.refresh();
    } catch (error) {
      console.error("Save password error:", error);
      alert("更新密碼時發生錯誤，請稍後再試。");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-25">

      <h1 className="text-4xl font-bold text-[#4E342E] mb-8">
        修改密碼
      </h1>

      <div className="border rounded-2xl p-6 space-y-5 shadow-sm">

        {/* 新密碼 */}
        <div>
          <label className="block text-gray-500 mb-2">
            新密碼
          </label>

          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="請輸入新密碼"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
          />

          <p className="mt-2 text-sm text-gray-500">
            密碼至少需要 8 個字元
          </p>
        </div>

        {/* 確認新密碼 */}
        <div>
          <label className="block text-gray-500 mb-2">
            確認新密碼
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="請再次輸入新密碼"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
          />
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
            onClick={handleSave}
            disabled={saving}
            className="flex-1 rounded-xl bg-orange-600 py-3 font-bold text-white transition hover:bg-orange-700 disabled:bg-gray-400"
          >
            {saving ? "更新中..." : "更新密碼"}
          </button>

        </div>

      </div>
    </main>
  );
}