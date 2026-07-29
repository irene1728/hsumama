"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { supabase } from "@/lib/supabase";


export default function PopularProducts() {

  const [products, setProducts] = useState<any[]>([]);

useEffect(() => {

  async function loadProducts() {

 const { data, error } = await supabase
  .from("products")
  .select("*")
  .eq("featured", true)
  .eq("is_active", true)
  .order("sort_order");

    console.log(data);
console.log(error);

if (data) {
  setProducts(data);
}

  }

  loadProducts();

}, []);

  return (
    <section className="pt-4 pb-8 bg-[#FFF8F0]">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center text-stone-800">
          人氣推薦
        </h2>

        <p className="text-center text-gray-500 mt-2">
          八款人氣精選商品
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">

          {products.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      </div>
    </section>
  );
}