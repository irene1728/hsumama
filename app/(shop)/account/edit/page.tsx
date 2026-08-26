"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export default function AccountEditPage() {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/account/login");
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("name, phone, address")
        .eq("user_id", user.id)
        .single();

      if (error || !profile) {
        alert("找不到會員資料。");
        router.push("/account");
        return;
      }

      setName(profile.name ?? "");
      setPhone(profile.phone ?? "");
      setAddress(profile.address ?? "");

      setLoading(false);
    }

    loadProfile();
  }, [router, supabase]);

  async function handleSave() {
    if (!name || !phone || !address) {
      alert("請完整填寫姓名、電話與地址。");
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

      const { error } = await supabase
        .from("profiles")
        .update({
          name,
          phone,
          address,
        })
        .eq("user_id", user.id);

      if (error) {
        console.error("Update profile error:", error);
        alert("會員資料更新失敗，請稍後再試。");
        return;
      }

      alert("會員資料已更新。");
      router.push("/account");
      router.refresh();
    } catch (error) {
      console.error("Save profile error:", error);
      alert("更新時發生錯誤，請稍後再試。");
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
        編輯會員資料
      </h1>

      <div className="border rounded-2xl p-6 space-y-5 shadow-sm">

        {/* 姓名 */}
        <div>
          <label className="block text-gray-500 mb-2">
            姓名
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
          />
        </div>

        {/* 電話 */}
        <div>
          <label className="block text-gray-500 mb-2">
            電話
          </label>

          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
          />
        </div>

        {/* 地址 */}
        <div>
          <label className="block text-gray-500 mb-2">
            地址
          </label>

          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
            {saving ? "儲存中..." : "儲存資料"}
          </button>

        </div>

      </div>
    </main>
  );
}