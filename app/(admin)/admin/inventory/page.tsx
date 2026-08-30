import { supabase } from "@/lib/supabase";
import InventoryList from "./InventoryList";

export default async function InventoryPage() {
  const { data: products, error } = await supabase
    .from("products")
    .select("id, name, stock_quantity")
    .order("sort_order", { ascending: true });

  if (error) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-stone-800">
          📦 商品存貨
        </h1>

        <p className="mt-6 text-red-600">
          載入商品存貨失敗
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-stone-800 mb-8">
        📦 商品存貨
      </h1>

      <InventoryList products={products ?? []} />
    </main>
  );
}