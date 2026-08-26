"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleResetPassword() {
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

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        console.error("Reset password error:", error);
        alert("密碼重設失敗，請重新操作。");
        return;
      }

      alert("密碼已成功重設，請使用新密碼登入。");

      await supabase.auth.signOut();

      router.push("/account/login");
      router.refresh();
    } catch (error) {
      console.error("Reset password error:", error);
      alert("重設密碼時發生錯誤，請稍後再試。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-md mx-auto px-6 py-28">

      <h1 className="text-4xl font-bold text-center text-[#4E342E] mb-6">
        重設密碼
      </h1>

      <p className="text-center text-gray-600 leading-relaxed mb-8">
        請設定您的新密碼。
        <br />
        新密碼至少需要 8 個字元。
      </p>

      <div className="space-y-6">

        {/* 新密碼 */}
        <div>
          <label className="block font-semibold text-lg mb-2">
            新密碼
          </label>

          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="請輸入新密碼"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg"
          />
        </div>

        {/* 確認新密碼 */}
        <div>
          <label className="block font-semibold text-lg mb-2">
            確認新密碼
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="請再次輸入新密碼"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg"
          />
        </div>

        {/* 重設按鈕 */}
        <button
          type="button"
          onClick={handleResetPassword}
          disabled={loading}
          className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-bold text-lg py-3 rounded-xl transition"
        >
          {loading ? "更新中..." : "重設密碼"}
        </button>

      </div>
    </main>
  );
}