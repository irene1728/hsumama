
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type ShippingSetting = {
  id: number;
  delivery_method: string;
  shipping_fee: number;
  free_shipping_threshold: number;
  is_active: boolean;
};

export default function ShippingSettingsPage() {
  const supabase = createClient();

  const [settings, setSettings] = useState<ShippingSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadShippingSettings() {
      const { data, error } = await supabase
        .from("shipping_settings")
        .select(
          "id, delivery_method, shipping_fee, free_shipping_threshold, is_active"
        )
        .order("id", { ascending: true });

      if (error) {
        console.error("Shipping settings error:", error);
        setMessage("配送設定讀取失敗。");
        setLoading(false);
        return;
      }

      setSettings(data ?? []);
      setLoading(false);
    }

    loadShippingSettings();
  }, []);

  function updateSetting(
    id: number,
    field: keyof ShippingSetting,
    value: string | boolean
  ) {
    setSettings((previous) =>
      previous.map((setting) =>
        setting.id === id
          ? {
              ...setting,
              [field]: value,
            }
          : setting
      )
    );
  }

  async function saveShippingSetting(setting: ShippingSetting) {
    const shippingFeeNumber = Number(setting.shipping_fee);
    const thresholdNumber = Number(
      setting.free_shipping_threshold
    );

    if (
      !Number.isFinite(shippingFeeNumber) ||
      shippingFeeNumber < 0
    ) {
      alert("基本運費格式不正確。");
      return;
    }

    if (
      !Number.isFinite(thresholdNumber) ||
      thresholdNumber < 0
    ) {
      alert("免運門檻格式不正確。");
      return;
    }

    setSavingId(setting.id);
    setMessage("");

    const { error } = await supabase
      .from("shipping_settings")
      .update({
        delivery_method: setting.delivery_method.trim(),
        shipping_fee: shippingFeeNumber,
        free_shipping_threshold: thresholdNumber,
        is_active: setting.is_active,
        updated_at: new Date().toISOString(),
      })
      .eq("id", setting.id);

    if (error) {
      console.error("Save shipping settings error:", error);
      alert("配送設定儲存失敗。");
      setSavingId(null);
      return;
    }

    const { data, error: reloadError } = await supabase
      .from("shipping_settings")
      .select(
        "id, delivery_method, shipping_fee, free_shipping_threshold, is_active"
      )
      .eq("id", setting.id)
      .single();

    if (reloadError || !data) {
      console.error("Reload shipping settings error:", reloadError);
      alert("設定已送出，但重新讀取設定失敗。");
      setSavingId(null);
      return;
    }

    setSettings((previous) =>
      previous.map((item) =>
        item.id === setting.id ? data : item
      )
    );

    setMessage(`${setting.delivery_method} 已成功儲存。`);
    setSavingId(null);
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-6">
      <h1 className="text-3xl font-bold text-stone-800">
        配送設定
      </h1>

      <p className="mt-2 text-gray-600">
        分別管理網站的配送方式、運費與免運門檻。
      </p>

      {loading ? (
        <p className="mt-8 text-gray-500">
          讀取中...
        </p>
      ) : settings.length === 0 ? (
        <p className="mt-8 text-red-600">
          目前沒有配送設定資料。
        </p>
      ) : (
        <div className="mt-8 space-y-6">
          {settings.map((setting) => (
            <div
              key={setting.id}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold text-stone-800">
                  {setting.delivery_method === "自取"
                    ? "自取設定"
                    : setting.delivery_method}
                </h2>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    setting.is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {setting.is_active ? "啟用中" : "已停用"}
                </span>
              </div>

              <div className="space-y-5">
                {/* 配送方式 */}
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    配送方式
                  </label>

                  <input
                    type="text"
                    value={setting.delivery_method}
                    onChange={(e) =>
                      updateSetting(
                        setting.id,
                        "delivery_method",
                        e.target.value
                      )
                    }
                    className="mt-2 w-full rounded-lg border px-4 py-3 text-stone-800 outline-none focus:border-orange-500"
                  />
                </div>

                {/* 基本運費 */}
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    基本運費
                  </label>

                  <div className="relative mt-2">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      NT$
                    </span>

                    <input
                      type="number"
                      min="0"
                      value={setting.shipping_fee}
                      onChange={(e) =>
                        updateSetting(
                          setting.id,
                          "shipping_fee",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border py-3 pl-14 pr-4 text-stone-800 outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* 免運門檻 */}
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    免運門檻
                  </label>

                  <div className="relative mt-2">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      NT$
                    </span>

                    <input
                      type="number"
                      min="0"
                      value={setting.free_shipping_threshold}
                      onChange={(e) =>
                        updateSetting(
                          setting.id,
                          "free_shipping_threshold",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border py-3 pl-14 pr-4 text-stone-800 outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* 啟用狀態 */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={setting.is_active}
                    onChange={(e) =>
                      updateSetting(
                        setting.id,
                        "is_active",
                        e.target.checked
                      )
                    }
                    className="h-5 w-5"
                  />

                  <span className="font-medium text-gray-700">
                    啟用此配送設定
                  </span>
                </label>

                {/* 預覽 */}
                <div className="rounded-xl bg-orange-50 p-4">
                  <p className="text-sm font-medium text-gray-600">
                    費用說明
                  </p>

                  <p className="mt-2 font-semibold text-orange-600">
                    {Number(setting.shipping_fee) === 0
                      ? "免運費"
                      : `基本運費 NT$${Number(
                          setting.shipping_fee
                        ).toLocaleString("zh-TW")}`}
                  </p>

                  {Number(setting.free_shipping_threshold) > 0 && (
                    <p className="mt-1 text-sm text-gray-600">
                      滿 NT$
                      {Number(
                        setting.free_shipping_threshold
                      ).toLocaleString("zh-TW")}
                      免運費
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => saveShippingSetting(setting)}
                  disabled={savingId === setting.id}
                  className="w-full rounded-xl bg-orange-500 px-5 py-3 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  {savingId === setting.id
                    ? "儲存中..."
                    : "儲存此配送設定"}
                </button>
              </div>
            </div>
          ))}

          {message && (
            <p className="text-center text-sm font-semibold text-green-600">
              {message}
            </p>
          )}
        </div>
      )}
    </main>
  );
}
