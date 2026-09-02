"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset() {
    if (!email) {
      alert("請輸入 Email。");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/account/reset-password`,
        }
      );

      if (error) {
        console.error("Reset password error:", error);
        alert("寄送重設密碼信失敗，請稍後再試。");
        return;
      }

      alert("重設密碼信已寄出，請到您的信箱查收 徐媽媽冰鑽滷味 寄出的信件。");
      router.push("/account/login");
    } catch (error) {
      console.error("Forgot password error:", error);
      alert("發生錯誤，請稍後再試。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-md mx-auto px-6 py-28">

      <h1 className="text-4xl font-bold text-center text-[#4E342E] mb-6">
        忘記密碼
      </h1>

      <p className="text-center text-gray-600 leading-relaxed mb-8">
        請輸入您註冊時使用的 Email，
        <br />
        我們會寄送重設密碼信給您。
      </p>

      <div className="space-y-6">

        <div>
          <label className="block font-semibold text-lg mb-2">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="請輸入 Email"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg"
          />
        </div>

        <button
          type="button"
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-bold text-lg py-3 rounded-xl transition"
        >
          {loading ? "寄送中..." : "寄送重設密碼信"}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => router.push("/account/login")}
            className="text-orange-600 font-semibold hover:text-orange-700 hover:underline"
          >
            返回會員登入
          </button>
        </div>

      </div>
    </main>
  );
}