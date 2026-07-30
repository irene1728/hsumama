"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Order = {
  id: number;
  customer_name: string;
  phone: string;
  email: string;
  address: string;
  note: string;
  payment: string;
  total_quantity: number;
  total_amount: number;
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
setSelectedOrderId(orderId);
setItems(data ?? []);

}

async function saveStatus() {
  if (!selectedOrderId) return;

  const { error } = await supabase
    .from("orders")
    .update({ status })
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

                      {order.status}

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

            <h2 className="text-2xl font-bold mb-4">

              商品明細

            </h2>

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
      <span className="font-semibold">💰 訂單金額：</span>
      NT$ {selectedOrder?.total_amount.toLocaleString("zh-TW")}
    </p>
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