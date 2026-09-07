"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";

export default function BBQPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .eq("is_bbq", true)
        .order("sort_order");

      if (error) {
        console.error(error);
        return;
      }

      if (data) {
        setProducts(data);
      }
    }

    loadProducts();
  }, []);

  return (
    <main className="max-w-7xl mx-auto pt-22 md:pt-26 px-5 md:px-8 py-6">

      {/* 標題 */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-stone-800">
        🔥 烤肉專區
      </h1>

      {/* 商品數量 */}
      <p className="text-center text-base md:text-xl text-gray-600 mt-1 md:mt-2">
        共 {products.length} 項商品
      </p>

      {/* 說明文字 */}
      <p className="text-center text-sm md:text-xl text-gray-500 mt-1 md:mt-3">
        精選適合烤肉的美味食材，家庭聚餐、聚會一次買齊！
      </p>

      {/* 商品列表 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 mt-2 md:mt-10">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

      {/* 沒有商品時 */}
      {products.length === 0 && (
        <div className="text-center text-gray-500 py-20">
          目前烤肉專區尚未上架商品
        </div>
      )}

    </main>
  );
}