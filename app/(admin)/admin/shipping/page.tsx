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
  const [setting, setSetting] = useState<ShippingSetting | null>(null);
  const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);
const [message, setMessage] = useState("");

  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [shippingFee, setShippingFee] = useState("");
  const [freeShippingThreshold, setFreeShippingThreshold] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    async function loadShippingSetting() {
      const { data, error } = await supabase
        .from("shipping_settings")
        .select(
          "id, delivery_method, shipping_fee, free_shipping_threshold, is_active"
        )
        .eq("is_active", true)
        .maybeSingle();

      if (error) {
        console.error("Shipping settings error:", error);
        setLoading(false);
        return;
      }

      if (data) {
        setSetting(data);

        setDeliveryMethod(data.delivery_method);
        setShippingFee(String(data.shipping_fee));
        setFreeShippingThreshold(
          String(data.free_shipping_threshold)
        );
        setIsActive(data.is_active);
      }

      setLoading(false);
    }

    loadShippingSetting();
  }, []);

async function saveShippingSetting() {
  if (!setting) return;

  const shippingFeeNumber = Number(shippingFee);
  const freeShippingThresholdNumber = Number(
    freeShippingThreshold
  );

  if (
    !Number.isFinite(shippingFeeNumber) ||
    shippingFeeNumber < 0
  ) {
    alert("基本運費格式不正確。");
    return;
  }

  if (
    !Number.isFinite(freeShippingThresholdNumber) ||
    freeShippingThresholdNumber < 0
  ) {
    alert("免運門檻格式不正確。");
    return;
  }

  setSaving(true);
  setMessage("");

const { error } = await supabase
  .from("shipping_settings")
  .update({
    delivery_method: deliveryMethod.trim(),
    shipping_fee: shippingFeeNumber,
    free_shipping_threshold: freeShippingThresholdNumber,
    is_active: isActive,
    updated_at: new Date().toISOString(),
  })
  .eq("id", setting.id);

if (error) {
  console.error("Save shipping settings error:", error);
  alert("配送設定儲存失敗。");
  setSaving(false);
  return;
}

const { data, error: reloadError } = await supabase
  .from("shipping_settings")
  .select(
    "id, delivery_method, shipping_fee, free_shipping_threshold, is_active"
  )
  .eq("id", setting.id)
  .maybeSingle();

if (reloadError || !data) {
  console.error("Reload shipping settings error:", reloadError);
  alert("設定已送出，但重新讀取設定失敗。");
  setSaving(false);
  return;
}

  if (error) {
    console.error("Save shipping settings error:", error);
    alert("配送設定儲存失敗。");
    setSaving(false);
    return;
  }

  setSetting(data);

  setDeliveryMethod(data.delivery_method);
  setShippingFee(String(data.shipping_fee));
  setFreeShippingThreshold(
    String(data.free_shipping_threshold)
  );
  setIsActive(data.is_active);

  setMessage("配送設定已成功儲存。");
  setSaving(false);
}

  return (
    <main className="mx-auto max-w-3xl px-6 py-4">
      <h1 className="text-3xl font-bold text-stone-800">
        配送設定
      </h1>

      <p className="mt-2 text-gray-600">
        管理網站的配送方式、運費與免運門檻。
      </p>

      {loading ? (
        <p className="mt-8 text-gray-500">
          讀取中...
        </p>
      ) : !setting ? (
        <p className="mt-8 text-red-600">
          找不到啟用中的配送設定。
        </p>
      ) : (
        <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
          <div className="space-y-6">

            {/* 配送方式 */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                配送方式
              </label>

              <input
                type="text"
                value={deliveryMethod}
                onChange={(e) =>
                  setDeliveryMethod(e.target.value)
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
                  value={shippingFee}
                  onChange={(e) =>
                    setShippingFee(e.target.value)
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
                  value={freeShippingThreshold}
                  onChange={(e) =>
                    setFreeShippingThreshold(e.target.value)
                  }
                  className="w-full rounded-lg border py-3 pl-14 pr-4 text-stone-800 outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* 啟用狀態 */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) =>
                    setIsActive(e.target.checked)
                  }
                  className="h-5 w-5"
                />

                <span className="font-medium text-gray-700">
                  啟用此配送設定
                </span>
              </label>
            </div>

            {/* 預覽 */}
            <div className="rounded-xl bg-orange-50 p-4">
              <p className="text-sm font-medium text-gray-600">
                免運說明預覽
              </p>

              <p className="mt-2 font-semibold text-orange-600">
                滿 NT$
                {Number(freeShippingThreshold || 0).toLocaleString(
                  "zh-TW"
                )}
                免運費
              </p>
            </div>

            {/* 儲存按鈕 */}
{message && (
  <p className="text-center text-sm font-semibold text-green-600">
    {message}
  </p>
)}

          <button
  type="button"
  onClick={saveShippingSetting}
  disabled={saving}
  className="w-full rounded-xl bg-orange-500 px-5 py-3 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-400"
>
  {saving ? "儲存中..." : "儲存配送設定"}
</button>

          </div>
        </div>
      )}
    </main>
  );
}