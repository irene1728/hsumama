"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Order = {
  id: number;
  customer_name: string;
  phone: string;
  address: string;
  status: string;
  created_at: string;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
const [selectedOrderId, setSelectedOrderId] =
  useState<number | null>(null);

const [items, setItems] = useState<any[]>([]);

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

  setSelectedOrderId(orderId);
  setItems(data ?? []);

}


  return (
    <main className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">
        訂單管理
      </h1>

      {loading ? (
        <p>讀取中...</p>
      ) : (
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
  className="border-t hover:bg-orange-50 cursor-pointer"

                
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
      )}
    </main>
  );
}