"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import { generateShippingPdf } from "@/features/checkout/utils/pdf/shipping/generateShippingPdf";
import { generateReconciliationPdf } from "@/features/checkout/utils/pdf/reconciliation/generateReconciliationPdf";
import { orderToReconciliationPdf } from "@/features/checkout/mapper/orderToReconciliationPdf";

type Order = {
  id: number;
  customer_name: string;
  phone: string;
  email: string;
  address: string;
  note: string;
  payment: string;
  payment_status: string;
  delivery_method: string;
  total_quantity: number;
  total_amount: number;
  shipping_fee: number;
  grand_total: number;
  free_shipping_threshold: number;
  status: string;
  created_at: string;
};

type OrderItem = {
  id: number;
  product_name: string;
  quantity: number;
  price: number;
  subtotal: number;
  wholesale_price: number | null;
  wholesale_subtotal: number | null;
  profit: number | null;
};

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();

  const orderId = Number(params.id);

  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [paymentStatus, setPaymentStatus] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!orderId) return;

    loadOrder();
  }, [orderId]);

  async function loadOrder() {

    setLoading(true);

    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError || !orderData) {
      console.error(orderError);
      setLoading(false);
      return;
    }

 const { data: itemData, error: itemError } = await supabase
  .from("order_items")
  .select(`
    id,
    product_name,
    quantity,
    price,
    subtotal,
    wholesale_price,
    wholesale_subtotal,
    profit
  `)
  .eq("order_id", orderId);


    if (itemError) {
      console.error(itemError);
    }

    setOrder(orderData);
    setItems(itemData ?? []);

    setPaymentStatus(orderData.payment_status ?? "");
    setStatus(orderData.status ?? "");

    setLoading(false);
  }

  async function saveStatus() {
    if (!order) return;

    const { error } = await supabase
      .from("orders")
      .update({
        payment_status: paymentStatus,
        status,
      })
      .eq("id", order.id);

    if (error) {
      console.error(error);
      alert("更新失敗");
      return;
    }

    alert("狀態已更新");

    await loadOrder();
  }

  async function downloadShippingPdf() {
    if (!order) return;

    try {

console.error(
 
  JSON.stringify(
    items.map((item) => ({
      id: item.id,
      product_name: item.product_name,
      wholesale_subtotal: item.wholesale_subtotal,
      profit: item.profit,
    })),
    null,
    2
  )
);


      const paymentMethod: "ATM" | "COD" =
        order.payment.includes("ATM") ? "ATM" : "COD";

      const shippingOrder = {
        orderNo: String(order.id),

        orderDate: new Date(
          order.created_at
        ).toLocaleDateString("zh-TW"),

        customerName: order.customer_name,

        phone: order.phone,

        email: order.email,

        address: order.address,

        note: order.note ?? "",

        paymentMethod,

        shippingMethod: order.delivery_method,

        items: items.map((item) => ({
          id: String(item.id),

          name: item.product_name,

          quantity: Number(item.quantity),

          price: Number(item.price),

          subtotal: Number(item.subtotal),
        })),

        subtotal: Number(order.total_amount),

        shippingFee: Number(order.shipping_fee),

        total: Number(order.grand_total),
      };

      const doc = await generateShippingPdf(shippingOrder);

      doc.save(
        `徐媽媽冰鑽滷味_出貨單_訂單${order.id}.pdf`
      );
    } catch (error) {
      console.error(error);

      alert("出貨單 PDF 產生失敗");
    }
  }

  async function downloadReconciliationPdf() {
    if (!order) return;

    try {
      const reconciliationOrder =
        orderToReconciliationPdf({
          ...order,

          items: items.map((item) => ({
            product_name: item.product_name,

            quantity: Number(item.quantity),

            price: Number(item.price),

            subtotal: Number(item.subtotal),

            wholesale_price:
              item.wholesale_price !== null &&
              item.wholesale_price !== undefined
                ? Number(item.wholesale_price)
                : null,

            wholesale_subtotal:
              item.wholesale_subtotal !== null &&
              item.wholesale_subtotal !== undefined
                ? Number(item.wholesale_subtotal)
                : null,

            profit:
              item.profit !== null &&
              item.profit !== undefined
              ? Number(item.profit)
              : null, 
          })),
        });

      const doc = await generateReconciliationPdf(
        reconciliationOrder
      );

      doc.save(
        `徐媽媽冰鑽滷味_對帳單_訂單${order.id}.pdf`
      );
    } catch (error) {
      console.error(error);

      alert("對帳單 PDF 產生失敗");
    }
  }

  if (loading) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-8">
        <p>讀取中...</p>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-8">
        <p className="text-red-600 font-bold">
          找不到此訂單
        </p>

        <button
          onClick={() => router.back()}
          className="mt-4 bg-gray-200 px-4 py-2 rounded-lg"
        >
          ← 返回
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-6">
      <section className="border rounded-xl bg-gray-50 p-4">

        {/* 標題＋PDF */}
        <div className="mb-5">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-xl font-bold text-gray-800">
              商品明細
            </h1>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={downloadShippingPdf}
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-3 py-2 rounded-lg text-sm"
              >
                📦 出貨單
              </button>

              <button
                onClick={downloadReconciliationPdf}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-3 py-2 rounded-lg text-sm"
              >
                📋 對帳單
              </button>
            </div>
          </div>
        </div>

        {/* 訂單編號 */}
        <p className="font-bold text-lg mb-4">
          訂單 #{order.id}
        </p>

        {/* 客戶資料 */}
        <div className="space-y-3 mb-6 min-w-0">

          <p className="break-words">
            <span className="font-semibold">
              👤 收件人：
            </span>
            {order.customer_name}
          </p>

          <p>
            <span className="font-semibold">
              📞 電話：
            </span>
            {order.phone}
          </p>

          <p className="break-all">
            <span className="font-semibold">
              📧 Email：
            </span>
            {order.email}
          </p>

          <p className="break-words">
            <span className="font-semibold">
              📍 地址：
            </span>
            {order.address}
          </p>

          <p className="break-words">
            <span className="font-semibold">
              📝 備註：
            </span>
            {order.note || "無"}
          </p>

          <p className="break-words">
            <span className="font-semibold">
              💳 付款方式：
            </span>
            {order.payment}
          </p>

          <p>
            <span className="font-semibold">
              💰 付款狀態：
            </span>
            {order.payment_status}
          </p>

          <div className="space-y-2">

            <p>
              <span className="font-semibold">
                💰 商品金額：
              </span>

              NT${" "}
              {order.total_amount.toLocaleString(
                "zh-TW"
              )}
            </p>

            <p className="break-words">
              <span className="font-semibold">
                🚚 運費說明：
              </span>

              {order.shipping_fee === 0
                ? `滿 NT$${order.free_shipping_threshold.toLocaleString(
                    "zh-TW"
                  )} 免運費`
                : `未達免運門檻，運費 NT$${order.shipping_fee.toLocaleString(
                    "zh-TW"
                  )}`}
            </p>

            <p>
              <span className="font-semibold">
                💰 應付總金額：
              </span>

              <span className="font-bold text-orange-600">
                NT${" "}
                {order.grand_total.toLocaleString(
                  "zh-TW"
                )}
              </span>
            </p>

          </div>
        </div>

        {/* 商品內容 */}
        <h2 className="font-bold text-lg mb-3">
          商品內容
        </h2>

        <ul className="space-y-3 mb-6">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between gap-4 border-b pb-2 min-w-0"
            >
              <span className="break-words min-w-0">
                {item.product_name}
              </span>

              <span className="shrink-0">
                x {item.quantity}
              </span>
            </li>
          ))}
        </ul>

        {/* 付款狀態 */}
        <div className="mt-6">
          <label className="block font-semibold mb-2">
            付款狀態
          </label>

          <select
            value={paymentStatus}
            onChange={(e) =>
              setPaymentStatus(e.target.value)
            }
            className="border rounded-lg px-3 py-3 w-full bg-white"
          >
            <option value="未付款">
              未付款
            </option>

            <option value="已付款">
              已付款
            </option>

            <option value="待收款">
              待收款
            </option>
          </select>
        </div>

        {/* 訂單狀態 */}
        <div className="mt-8 border-t pt-6">
          <h2 className="font-bold text-lg mb-3">
            訂單狀態
          </h2>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="border rounded-lg px-3 py-3 w-full bg-white"
          >
            <option value="待處理">
              待處理
            </option>

            <option value="處理中">
              處理中
            </option>

            <option value="已出貨">
              已出貨
            </option>

            <option value="已完成">
              已完成
            </option>

            <option value="已取消">
              已取消
            </option>
          </select>

          <button
            onClick={saveStatus}
            className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg font-bold"
          >
            儲存
          </button>
        </div>

        {/* 返回 */}
        <button
          onClick={() => router.back()}
          className="mt-4 w-full border border-gray-300 bg-white text-gray-700 px-5 py-3 rounded-lg font-medium"
        >
          ← 返回訂單列表
        </button>

      </section>
    </main>
  );
}