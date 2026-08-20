"use client";

import { useEffect, useState } from "react";
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

export default function AdminOrdersPage() {
const [orders, setOrders] = useState<Order[]>([]);
const [loading, setLoading] = useState(true);
const [selectedOrderId, setSelectedOrderId] =useState<number | null>(null);

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
    // ------------------------------------------
    // 將資料庫付款方式轉成 Shipping PDF 格式
    // ------------------------------------------

  const paymentMethod: "ATM" | "COD" =
  selectedOrder.payment.includes("ATM")
    ? "ATM"
    : "COD";

    // ------------------------------------------
    // 將資料庫訂單資料轉成 Shipping PDF Order
    // ------------------------------------------

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

      shippingMethod:
        selectedOrder.delivery_method,

      items: items.map((item) => ({
        id: String(item.id),

        name: item.product_name,

        quantity: Number(item.quantity),

        price: Number(item.price),

        subtotal: Number(item.subtotal),
      })),

      subtotal: Number(
        selectedOrder.total_amount
      ),

      shippingFee: Number(
        selectedOrder.shipping_fee
      ),

      total: Number(
        selectedOrder.grand_total
      ),
    };

    // ------------------------------------------
    // 產生出貨單 PDF
    // ------------------------------------------

    const doc = await generateShippingPdf(
      shippingOrder
    );

    // ------------------------------------------
    // 下載 PDF
    // ------------------------------------------

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
    // ------------------------------------------
    // 建立對帳單資料
    //
    // 注意：
    // wholesale_price / wholesale_subtotal
    // 直接使用 order_items 的歷史快照。
    // 不重新查詢 products。
    // ------------------------------------------

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
      })),
    });

    // ------------------------------------------
    // 產生對帳單 PDF
    // ------------------------------------------

    const doc = await generateReconciliationPdf(
      reconciliationOrder
    );

    // ------------------------------------------
    // 下載 PDF
    // ------------------------------------------

    doc.save(
      `徐媽媽冰鑽滷味_對帳單_訂單${selectedOrder.id}.pdf`
    );

  } catch (error) {
    console.error(error);

    alert("對帳單 PDF 產生失敗");
  }
}


  return (
    <main className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">
        訂單管理
      </h1>

      {loading ? (
        <p>讀取中...</p>

            ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* 左邊：訂單列表 */}

          <div className="overflow-x-auto rounded-xl border">

            <table className="min-w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="px-4 py-3 text-left">訂單</th>

                  <th className="px-4 py-3 text-left">收件人</th>

                  <th className="px-4 py-3 text-left">電話</th>

                  <th className="px-4 py-3 text-left">狀態</th>

                  <th className="px-4 py-3 text-left">建立時間</th>

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

                    <td className="px-4 py-3">

                      {new Date(order.created_at).toLocaleString("zh-TW")}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* 右邊：商品明細 */}

          <div className="border rounded-xl p-6">

         <div className="flex items-center justify-between mb-4">

  <h2 className="text-2xl font-bold">
    商品明細
  </h2>

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

            {selectedOrderId === null ? (

              <p className="text-gray-500">

                請點選左側訂單

              </p>

            ) : (

              <>
  <p className="font-bold text-lg mb-4">
    訂單 #{selectedOrderId}
  </p>

  <div className="space-y-2 mb-6">
    <p>
      <span className="font-semibold">👤 收件人：</span>
      {selectedOrder?.customer_name}
    </p>

    <p>
      <span className="font-semibold">📞 電話：</span>
      {selectedOrder?.phone}
    </p>

    <p>
      <span className="font-semibold">📧 Email：</span>
      {selectedOrder?.email}
    </p>

    <p>
      <span className="font-semibold">📍 地址：</span>
      {selectedOrder?.address}
    </p>

    <p>
      <span className="font-semibold">📝 備註：</span>
      {selectedOrder?.note || "無"}
    </p>

    <p>
      <span className="font-semibold">💳 付款方式：</span>
      {selectedOrder?.payment}
    </p>

<p>
  <span className="font-semibold">💰 付款狀態：</span>
  {selectedOrder?.payment_status}
</p>

<div className="space-y-2">
  <p>
    <span className="font-semibold">💰 商品金額：</span>
    NT$ {selectedOrder?.total_amount.toLocaleString("zh-TW")}
  </p>

  <p>
    <span className="font-semibold">🚚 運費說明：</span>
    {selectedOrder?.shipping_fee === 0
      ? `滿 NT$${selectedOrder?.free_shipping_threshold.toLocaleString(
          "zh-TW"
        )} 免運費`
      : `未達免運門檻，運費 NT$${selectedOrder?.shipping_fee.toLocaleString(
          "zh-TW"
        )}`}
  </p>

  <p>
    <span className="font-semibold">💰 應付總金額：</span>
    <span className="font-bold text-orange-600">
      NT$ {selectedOrder?.grand_total.toLocaleString("zh-TW")}
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
                      className="flex justify-between border-b pb-2"
                    >

                      <span>{item.product_name}</span>

                      <span>x {item.quantity}</span>

                    </li>

                  ))}

                </ul>

<div className="mt-6">
  <label className="block font-semibold mb-2">
    付款狀態
  </label>

  <select
    value={paymentStatus}
    onChange={(e) => setPaymentStatus(e.target.value)}
    className="border rounded-lg px-3 py-2 w-full"
  >
    <option value="未付款">未付款</option>
    <option value="已付款">已付款</option>
    <option value="待收款">待收款</option>
  </select>
</div>


                <div className="mt-8 border-t pt-6">
  <h3 className="font-bold text-lg mb-3">
    訂單狀態
  </h3>

  <select
    value={status}
    onChange={(e) => setStatus(e.target.value)}
    className="border rounded-lg px-3 py-2 w-full"
  >
    <option value="待處理">待處理</option>

    <option value="處理中">處理中</option>
    <option value="已完成">已完成</option>
    <option value="已取消">已取消</option>
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
      )}
      
    </main>
  );
}