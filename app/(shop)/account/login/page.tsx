"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function AccountLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
const supabase = useMemo(() => createClient(), []);

useEffect(() => {
  async function checkLogin() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      router.replace("/account");
    }
  }

  checkLogin();
}, [router, supabase]);

  async function handleLogin() {
    if (!email || !password) {
      alert("請輸入 Email 和密碼");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Email 或密碼錯誤");
      setLoading(false);
      return;
    }

    router.push("/account");
    router.refresh();
  }

  return (
    <main className="max-w-md mx-auto px-6 py-28">
      <h1 className="text-4xl font-bold text-center text-[#4E342E] mb-10">
        會員登入
      </h1>

      <div className="space-y-6">
        <div>
          <label className="block font-semibold text-lg mb-2">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg"
            placeholder="請輸入 Email"
          />
        </div>

        <div>
          <label className="block font-semibold text-lg mb-2">
            密碼
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg"
            placeholder="請輸入密碼"
          />
        </div>

        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-bold text-lg py-3 rounded-xl transition"
        >
          {loading ? "登入中..." : "登入"}
        </button>

<div className="text-center">
  <Link
    href="/account/forgot-password"
    className="text-orange-600 font-semibold hover:text-orange-700 hover:underline"
  >
    忘記密碼？
  </Link>
</div>

        <div className="text-center pt-2">
          <span className="text-gray-600">
            還沒有會員帳號？
          </span>

          <Link
            href="/account/register"
            className="ml-2 text-orange-600 font-bold hover:text-orange-700"
          >
            立即註冊
          </Link>
        </div>
      </div>
    </main>
  );
}