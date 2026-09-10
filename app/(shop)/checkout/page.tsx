"use client";


import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

// Features
import CheckoutForm from "@/features/checkout/components/CheckoutForm";

import OrderSummary from "@/features/checkout/components/OrderSummary";


import { useCheckout } from "@/features/checkout/hooks/useCheckout";
import { validateCheckout } from "@/features/checkout/utils/validateCheckout";
import { createOrder } from "@/features/checkout/utils/createOrder";
import { calculateOrderTotal } from "@/features/checkout/utils/calculateOrderTotal";

// Shared
import { useCart } from "@/cart/CartContext";
import { createClient } from "@/lib/supabase/client";

export default function CheckoutPage() {

  const router = useRouter();
  
  const { cart, clearCart } = useCart();

  // 建立目前瀏覽器端 Supabase Client
  const [supabase] = useState(() => createClient());

  const [stockError, setStockError] = useState<string | null>(null);

  // ==========================================
  // 會員積分
  // ==========================================

  const [currentPoints, setCurrentPoints] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pointsLoading, setPointsLoading] = useState(true);

  // 本次訂單要使用的積分
  const [pointsUsed, setPointsUsed] = useState(0);

  type ShippingSetting = {
    delivery_method: string;
    shipping_fee: number;
    free_shipping_threshold: number;
    is_active: boolean;
  };

  const [shippingSetting, setShippingSetting] =
    useState<ShippingSetting | null>(null);

  const {
    customerName,
    setCustomerName,

    phone,
    setPhone,

    email,
    setEmail,

    address,
    setAddress,

    note,
    setNote,

    deliveryMethod,
    setDeliveryMethod,

    paymentMethod,
    setPaymentMethod,

    loading,
    setLoading,
  } = useCheckout();

  // ==========================================
  // 讀取目前登入會員
  // 以及會員積分
  // ==========================================

  useEffect(() => {
    async function loadMemberPoints() {
      setPointsLoading(true);

      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          setIsLoggedIn(false);
          setCurrentPoints(0);
          setPointsUsed(0);
          return;
        }

        setIsLoggedIn(true);

        const { data, error } = await supabase
          .from("member_points")
          .select("points")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) {
          console.error("Member points error:", error);
          setCurrentPoints(0);
          setPointsUsed(0);
          return;
        }

        setCurrentPoints(data?.points ?? 0);
      } catch (error) {
        console.error("Load member points error:", error);
        setIsLoggedIn(false);
        setCurrentPoints(0);
        setPointsUsed(0);
      } finally {
        setPointsLoading(false);
      }
    }

    loadMemberPoints();
  }, [supabase]);

  // ==========================================
  // 讀取運費設定
  // ==========================================

  useEffect(() => {
    async function loadShippingSetting() {
      const { data, error } = await supabase
        .from("shipping_settings")
        .select(
          "delivery_method, shipping_fee, free_shipping_threshold, is_active"
        )
        .eq("delivery_method", deliveryMethod)
        .eq("is_active", true)
        .maybeSingle();

      if (error) {
        console.error("Shipping settings error:", error);
        return;
      }

      setShippingSetting(data);
    }

    loadShippingSetting();
  }, [deliveryMethod, supabase]);

  // ==========================================
  // 計算商品數量
  // ==========================================

  const totalQuantity = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // ==========================================
  // 商品金額
  // ==========================================

  const totalAmount = cart.reduce(
    (sum, item) => sum + (item.price ?? 0) * item.quantity,
    0
  );

  // ==========================================
  // 計算運費與原始應付金額
  // ==========================================

  const {
    shippingFee,
    grandTotal,
    freeShippingThreshold,
  } = shippingSetting
    ? calculateOrderTotal({
        totalAmount,
        shippingFee: shippingSetting.shipping_fee,
        freeShippingThreshold:
          shippingSetting.free_shipping_threshold,
      })
    : {
        shippingFee: 0,
        grandTotal: totalAmount,
        freeShippingThreshold: 0,
      };

  // ==========================================
  // 積分使用資格
  // ==========================================
  // ★ 只看商品金額
  // ★ 不包含運費
  // ==========================================

  const pointsEligible =
    isLoggedIn &&
    !pointsLoading &&
    totalAmount >= 800 &&
    currentPoints > 0;

  // 每筆最多 500 點
  const maxUsablePoints = pointsEligible
    ? Math.min(currentPoints, 500)
    : 0;

  // ==========================================
  // 如果購物車或會員積分狀態改變
  // 自動修正 pointsUsed
  // ==========================================

  useEffect(() => {
    if (!pointsEligible) {
      setPointsUsed(0);
      return;
    }

    setPointsUsed((current) =>
      Math.min(current, maxUsablePoints)
    );
  }, [pointsEligible, maxUsablePoints]);

  // ==========================================
  // 最終應付金額
  // ==========================================

  const finalGrandTotal = Math.max(
    grandTotal - pointsUsed,
    0
  );

  // ==========================================
  // 積分輸入
  // ==========================================

  function handlePointsChange(value: string) {
    // 清空輸入
    if (value === "") {
      setPointsUsed(0);
      return;
    }

    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
      return;
    }

    const integerValue = Math.floor(numericValue);

    const limitedValue = Math.min(
      Math.max(integerValue, 0),
      maxUsablePoints
    );

    setPointsUsed(limitedValue);
  }

  // ==========================================
  // 送出訂單
  // ==========================================

  async function handleSubmit() {
    const error = validateCheckout({
      customerName,
      phone,
      address,
      cartLength: cart.length,
    });

    if (error) {
      alert(error);
      return;
    }

    setLoading(true);

    try {
      const order = await createOrder({
        customerName,
        phone,
        email,
        address,
        note,
        paymentMethod,
        deliveryMethod,

        totalQuantity,
        totalAmount,
        shippingFee,
        grandTotal: finalGrandTotal,
        freeShippingThreshold,

        // ★ 本次使用積分
        pointsUsed,

        cart,
      });

      clearCart();

      if (order) {
        router.push(`/order-success?id=${order.id}`);
      }
    } catch (error) {
      console.error("Supabase Error:", error);

      const message =
        error &&
        typeof error === "object" &&
        "message" in error &&
        typeof error.message === "string"
          ? error.message
          : "目前無法建立訂單，請稍後再試。";

      setStockError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <main className="max-w-7xl mx-auto px-8 py-2 md:py-3">

        <h1 className="text-4xl font-bold text-stone-800 mb-2">
          結帳
        </h1>

        <div className="grid lg:grid-cols-3 gap-3 md:gap-10">

          {/* ==========================================
              左邊：收件資料
          ========================================== */}

          <div className="lg:col-span-2">
            <CheckoutForm
              customerName={customerName}
              onCustomerNameChange={setCustomerName}

              phone={phone}
              onPhoneChange={setPhone}

              email={email}
              onEmailChange={setEmail}

              address={address}
              onAddressChange={setAddress}

              note={note}
              onNoteChange={setNote}
            />
          </div>

          {/* ==========================================
              右邊：訂單摘要
          ========================================== */}

          <div className="h-fit sticky top-28 space-y-3 md:space-y-5">

            <OrderSummary
              cart={cart}
              totalQuantity={totalQuantity}
              totalAmount={totalAmount}
              shippingFee={shippingFee}
              freeShippingThreshold={
                shippingSetting?.free_shipping_threshold ?? 0
              }
              grandTotal={finalGrandTotal}
              deliveryMethod={deliveryMethod}
              paymentMethod={paymentMethod}
            />

            {/* ========================================
                積分折抵
            ======================================== */}

            {isLoggedIn && !pointsLoading && (
              <section className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">

                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-bold text-stone-800">
                    積分折抵
                  </h2>

                  <span className="text-sm text-stone-500">
                    目前積分：
                    <span className="ml-1 font-bold text-orange-600">
                      {currentPoints}
                    </span>
                  </span>
                </div>

                {/* 未滿 800 */}
                {totalAmount < 800 && (
                  <p className="mt-3 text-sm text-stone-500">
                    商品金額滿 NT$800 才能使用積分折抵。
                  </p>
                )}

                {/* 已滿 800，但沒有積分 */}
                {totalAmount >= 800 && currentPoints <= 0 && (
                  <p className="mt-3 text-sm text-stone-500">
                    目前沒有可使用的積分。
                  </p>
                )}

                {/* 可以使用積分 */}
                {pointsEligible && (
                  <div className="mt-3">

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        max={maxUsablePoints}
                        step={1}
                        value={pointsUsed}
                        onChange={(e) =>
                          handlePointsChange(e.target.value)
                        }
                        className="w-28 rounded-lg border border-stone-300 px-3 py-2 text-right text-base font-bold text-stone-800 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />

                      <span className="text-stone-700">
                        點
                      </span>

                      <span className="text-sm text-stone-500">
                        最多 {maxUsablePoints} 點
                      </span>
                    </div>

                    {pointsUsed > 0 && (
                      <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-3">
                        <span className="text-stone-600">
                          積分折抵
                        </span>

                        <span className="font-bold text-orange-600">
                          - NT${pointsUsed.toLocaleString()}
                        </span>
                      </div>
                    )}

                  </div>
                )}

              </section>
            )}

            {/* ========================================
                應付總金額
            ======================================== */}

            <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-4">

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-stone-800">
                  應付總金額
                </span>

                <span className="text-2xl font-bold text-orange-600">
                  NT${finalGrandTotal.toLocaleString()}
                </span>
              </div>

              {pointsUsed > 0 && (
                <p className="mt-2 text-right text-sm text-stone-500">
                  已使用 {pointsUsed} 點積分折抵
                </p>
              )}

            </div>

            {/* ========================================
                確認送出訂單
            ======================================== */}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white py-4 rounded-xl text-lg font-bold transition"
            >
              {loading ? "送出中..." : "確認送出訂單"}
            </button>

          </div>

        </div>

      </main>

      {/* ==========================================
          錯誤視窗
      ========================================== */}

      {stockError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6">

          <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl">

            <h2 className="text-2xl font-bold text-stone-800 text-center">
              徐媽媽冰鑽滷味
            </h2>

            <div className="mt-5 text-center text-gray-700 leading-relaxed">

              <p className="text-xl font-bold text-orange-600">
                無法建立訂單
              </p>

              <p className="mt-4">
                {stockError}
              </p>

              <p className="mt-4">
                請確認訂單內容後再試。
              </p>

            </div>

            <button
              type="button"
              onClick={() => setStockError(null)}
              className="mt-6 w-full rounded-xl bg-orange-600 py-3 font-bold text-white transition hover:bg-orange-700"
            >
              確定
            </button>

          </div>

        </div>
      )}
    </>
  );
}