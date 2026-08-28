"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { generateShippingPdf } from "@/features/checkout/utils/pdf/shipping/generateShippingPdf";
import { generateReconciliationPdf } from "@/features/checkout/utils/pdf/reconciliation/generateReconciliationPdf";
import { orderToReconciliationPdf } from "@/features/checkout/mapper/orderToReconciliationPdf";


type Order = {
  id: number;
  user_id: string | null;
  member_no: string | null;
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

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const [items, setItems] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setOrders(data ?? []);
    }

    setLoading(false);
  }

  async function loadItems(orderId: number) {
    const { data, error } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", orderId);

    if (error) {
      console.error(error);
      return;
    }

    const order = orders.find((o) => o.id === orderId) ?? null;

    setSelectedOrder(order);
    setStatus(order?.status ?? "");
    setPaymentStatus(order?.payment_status ?? "");
    setSelectedOrderId(orderId);
    setItems(data ?? []);
  }

  async function saveStatus() {
    if (!selectedOrderId) return;

    const { error } = await supabase
      .from("orders")
      .update({
        status,
        payment_status: paymentStatus,
      })
      .eq("id", selectedOrderId);

    if (error) {
      alert("更新失敗");
      console.error(error);
      return;
    }

    alert("狀態已更新");

    await loadOrders();

    if (selectedOrderId) {
      await loadItems(selectedOrderId);
    }
  }

  async function downloadShippingPdf() {
    if (!selectedOrder) {
      alert("請先選擇訂單");
      return;
    }

    try {
      const paymentMethod: "ATM" | "COD" =
        selectedOrder.payment.includes("ATM") ? "ATM" : "COD";

      const shippingOrder = {
        orderNo: String(selectedOrder.id),

        orderDate: new Date(
          selectedOrder.created_at
        ).toLocaleDateString("zh-TW"),

        customerName: selectedOrder.customer_name,

        phone: selectedOrder.phone,

        email: selectedOrder.email,

        address: selectedOrder.address,

        note: selectedOrder.note ?? "",

        paymentMethod,

        shippingMethod: selectedOrder.delivery_method,

        items: items.map((item) => ({
          id: String(item.id),

          name: item.product_name,

          quantity: Number(item.quantity),

          price: Number(item.price),

          subtotal: Number(item.subtotal),
        })),

        subtotal: Number(selectedOrder.total_amount),

        shippingFee: Number(selectedOrder.shipping_fee),

        total: Number(selectedOrder.grand_total),
      };

      const doc = await generateShippingPdf(shippingOrder);

      doc.save(
        `徐媽媽冰鑽滷味_出貨單_訂單${selectedOrder.id}.pdf`
      );
    } catch (error) {
      console.error(error);

      alert("出貨單 PDF 產生失敗");
    }
  }

  async function downloadReconciliationPdf() {
    if (!selectedOrder) {
      alert("請先選擇訂單");
      return;
    }

    try {
      const reconciliationOrder = orderToReconciliationPdf({
        ...selectedOrder,

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
        `徐媽媽冰鑽滷味_對帳單_訂單${selectedOrder.id}.pdf`
      );
    } catch (error) {
      console.error(error);

      alert("對帳單 PDF 產生失敗");
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-2 py-2 md:p-1 overflow-x-hidden">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-2">
        訂單管理
      </h1>

      {loading ? (
        <p>讀取中...</p>
      ) : (
        <>
          {/* ==================================================
              Desktop
              左邊：訂單列表
              右邊：商品明細
              ================================================== */}
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 左邊：訂單列表 */}
            <div className="overflow-x-auto rounded-xl border">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      訂單
                    </th>

<th className="px-4 py-3 text-left">
  會員
</th>

                    <th className="px-4 py-3 text-left">
                      收件人
                    </th>

                    <th className="px-4 py-3 text-left">
                      電話
                    </th>

                    <th className="px-4 py-3 text-left">
                      狀態
                    </th>

                    <th className="px-4 py-3 text-left">
                      建立時間
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      onClick={() => loadItems(order.id)}
                      className={`border-t cursor-pointer hover:bg-orange-50 ${
                        selectedOrderId === order.id
                          ? "bg-orange-100"
                          : ""
                      }`}
                    >


                      <td className="px-4 py-3">
  #{order.id}
</td>

<td className="px-4 py-3">
{order.member_no ? (
  <button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = `/admin/members/${order.member_no}`;
    }}
    className="text-blue-600 hover:text-blue-800 hover:underline font-semibold"
  >
    {order.member_no}
  </button>
) : (
  "訪客"
)}
</td>

<td className="px-4 py-3">
  {order.customer_name}
</td>

                      <td className="px-4 py-3">
                        {order.phone}
                      </td>

                      <td className="px-4 py-3">
                        <div className="space-y-1 text-sm">
                          <div>
                            💰 {order.payment_status}
                          </div>

                          <div>
                            📦 {order.status}
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        {new Date(
                          order.created_at
                        ).toLocaleString("zh-TW")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 右邊：商品明細 */}
            <div className="border rounded-xl p-6 min-w-0">
              <div className="flex items-center justify-between gap-3 mb-4">
                <h2 className="text-2xl font-bold">
                  商品明細
                </h2>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={downloadShippingPdf}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 rounded-lg"
                  >
                    📦 出貨單
                  </button>

                  <button
                    onClick={downloadReconciliationPdf}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-lg"
                  >
                    📋 對帳單
                  </button>
                </div>
              </div>

              {selectedOrderId === null ? (
                <p className="text-gray-500">
                  請點選左側訂單
                </p>
              ) : (
                <>
                  <p className="font-bold text-lg mb-4">
                    訂單 #{selectedOrderId}
                  </p>

                  <div className="space-y-3 mb-6 min-w-0">
                    <p>
                      <span className="font-semibold">
                        👤 收件人：
                      </span>
                      {selectedOrder?.customer_name}
                    </p>

                    <p>
                      <span className="font-semibold">
                        📞 電話：
                      </span>
                      {selectedOrder?.phone}
                    </p>

                    <p className="break-words">
                      <span className="font-semibold">
                        📧 Email：
                      </span>
                      <span className="break-all">
                        {selectedOrder?.email}
                      </span>
                    </p>

                    <p className="break-words">
                      <span className="font-semibold">
                        📍 地址：
                      </span>
                      {selectedOrder?.address}
                    </p>

                    <p className="break-words">
                      <span className="font-semibold">
                        📝 備註：
                      </span>
                      {selectedOrder?.note || "無"}
                    </p>

                    <p>
                      <span className="font-semibold">
                        💳 付款方式：
                      </span>
                      {selectedOrder?.payment}
                    </p>

                    <p>
                      <span className="font-semibold">
                        💰 付款狀態：
                      </span>
                      {selectedOrder?.payment_status}
                    </p>

                    <div className="space-y-2">
                      <p>
                        <span className="font-semibold">
                          💰 商品金額：
                        </span>
                        NT${" "}
                        {selectedOrder?.total_amount.toLocaleString(
                          "zh-TW"
                        )}
                      </p>

                      <p className="break-words">
                        <span className="font-semibold">
                          🚚 運費說明：
                        </span>

                        {selectedOrder?.shipping_fee === 0
                          ? `滿 NT$${selectedOrder?.free_shipping_threshold.toLocaleString(
                              "zh-TW"
                            )} 免運費`
                          : `未達免運門檻，運費 NT$${selectedOrder?.shipping_fee.toLocaleString(
                              "zh-TW"
                            )}`}
                      </p>

                      <p>
                        <span className="font-semibold">
                          💰 應付總金額：
                        </span>

                        <span className="font-bold text-orange-600">
                          NT${" "}
                          {selectedOrder?.grand_total.toLocaleString(
                            "zh-TW"
                          )}
                        </span>
                      </p>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg mb-3">
                    商品內容
                  </h3>

                  <ul className="space-y-3">
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

                  <div className="mt-6">
                    <label className="block font-semibold mb-2">
                      付款狀態
                    </label>

                    <select
                      value={paymentStatus}
                      onChange={(e) =>
                        setPaymentStatus(e.target.value)
                      }
                      className="border rounded-lg px-3 py-2 w-full"
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

                  <div className="mt-8 border-t pt-6">
                    <h3 className="font-bold text-lg mb-3">
                      訂單狀態
                    </h3>

                    <select
                      value={status}
                      onChange={(e) =>
                        setStatus(e.target.value)
                      }
                      className="border rounded-lg px-3 py-2 w-full"
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
                      className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg"
                    >
                      儲存
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ==================================================
              Mobile
              訂單列表 + 商品明細
              ================================================== */}
          <div className="lg:hidden space-y-3">
            {/* Mobile 訂單列表 */}
            <section>
              <h2 className="text-xl font-bold mb-2">
                訂單列表
              </h2>

              <div className="px-3 space-y-3">
                {orders.map((order) => (
               <Link
  key={order.id}
  href={`/admin/orders/${order.id}`}
  className="block w-full text-left rounded-xl border p-4 transition bg-white hover:bg-orange-50"
>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-lg">
                        訂單 #{order.id}
                      </span>

                      <span className="text-base text-gray-500 whitespace-nowrap">
                        點擊查看
                      </span>
                    </div>

<div className="flex items-start gap-2">
  <span className="shrink-0">
    🆔
  </span>

  <span className="break-words font-semibold">
{order.member_no ? (
  <button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = `/admin/members/${order.member_no}`;
    }}
    className="text-blue-600 hover:text-blue-800 hover:underline font-semibold"
  >
    {order.member_no}
  </button>
) : (
  "訪客"
)}
  </span>
</div>

                    <div className="mt-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="shrink-0">
                          👤
                        </span>

                        <span className="break-words">
                          {order.customer_name}
                        </span>
                      </div>

                      <div className="flex items-start gap-2">
                        <span className="shrink-0">
                          📞
                        </span>

                        <span>
                          {order.phone}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        <span className="inline-flex items-center rounded-full bg-yellow-100 text-yellow-700 px-3 py-1 text-sm font-medium">
                          💰 {order.payment_status}
                        </span>

                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                            order.status === "已完成"
                              ? "bg-green-100 text-green-700"
                              : order.status === "已取消"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          📦 {order.status}
                        </span>
                      </div>

                      <div className="flex items-start gap-2 pt-1 text-sm text-gray-500">
                        <span className="shrink-0">
                          🕒
                        </span>

                        <span className="break-words">
                          {new Date(
                            order.created_at
                          ).toLocaleString("zh-TW")}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            
         
          </div>
        </>
      )}
      
    </main>
  );
}