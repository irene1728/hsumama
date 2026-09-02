"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";


export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
const [showSuccessModal, setShowSuccessModal] = useState(false);
  async function handleRegister() {
    if (!name || !phone || !address || !email || !password) {
      alert("請完整填寫註冊資料。");
      return;
    }

    if (password.length < 8) {
      alert("密碼至少需要 8 個字元。");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            phone,
            address,
          },
        },
      });

      if (error) {
        alert(error.message);
        return;
      }

     setShowSuccessModal(true);

    } catch (error) {
      console.error("Register Error:", error);
      alert("註冊時發生錯誤，請稍後再試。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white px-6 py-20 md:py-28">
      <div className="max-w-md mx-auto">

        <h1 className="text-2xl md:text-3xl font-bold text-stone-800 text-center mb-2 md:mb-4">
          會員註冊
        </h1>

        <div className="space-y-4 md:space-y-5">

          {/* 姓名 */}
          <div>
            <label className="block font-semibold mb-2">
              姓名
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="請輸入姓名"
              className="w-full rounded-lg border border-gray-500 px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          {/* 電話 */}
          <div>
            <label className="block font-semibold mb-2">
              電話
            </label>

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="請輸入電話"
              className="w-full rounded-lg border border-gray-500 px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          {/* 地址 */}
          <div>
            <label className="block font-semibold mb-2">
              地址
            </label>

            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="請輸入地址"
              className="w-full rounded-lg border border-gray-500 px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="請輸入 Email"
              className="w-full rounded-lg border border-gray-500 px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          {/* 密碼 */}
          <div>
            <label className="block font-semibold mb-2">
              密碼
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="請輸入密碼（至少 8 個字元）"
              className="w-full rounded-lg border border-gray-500 px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          {/* 註冊按鈕 */}
          <button
            type="button"
            onClick={handleRegister}
            disabled={loading}
            className="w-full rounded-lg bg-orange-600 py-2 text-lg font-bold text-white transition hover:bg-orange-700 disabled:bg-gray-400"
          >
            {loading ? "註冊中..." : "註冊"}
          </button>

        </div>

        <p className="mt-6 text-center text-gray-600">
          已經有會員帳號？{" "}
          <Link
            href="/account/login"
            className="font-semibold text-orange-600 hover:underline"
          >
            立即登入
          </Link>
        </p>

      </div>

{showSuccessModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
    <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-xl">

      <h2 className="text-2xl font-bold text-stone-800 text-center">
        註冊成功 🎉
      </h2>

      <div className="mt-5 text-center text-gray-700 leading-relaxed">
        <p>
          我們已經發送 Email 驗證信。
        </p>

        <p className="mt-2">
          請先到您的信箱點擊驗證連結，
          <br />
          完成 Email 驗證後才能登入。
        </p>
      </div>

      <button
        type="button"
        onClick={() => router.push("/account/login")}
        className="mt-6 w-full rounded-xl bg-orange-600 py-3 font-bold text-white transition hover:bg-orange-700"
      >
        知道了
      </button>

    </div>
  </div>
)}

    </main>
  );
}