"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
const supabase = createClient();
async function handleLogin() {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert("Email 或密碼錯誤");
    return;
  }

  router.push("/admin/products");
  router.refresh();
}

  return (
    <main className="max-w-md mx-auto px-2 md:px-2 py-20">
      <h1 className="text-5xl font-bold text-center mb-10">
        管理員登入
      </h1>

      <div className="space-y-6">

        <div>
          <label className="block font-medium mb-2">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-xl text-lg md:text-2xl px-4 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">
            密碼
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-xl px-4 py-2 text-lg md:text-2xl"
          />
        </div>

       <button
  onClick={handleLogin}
  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition text-lg md:text-2xl"
>
  登入
</button>
      </div>
    </main>
  );
}