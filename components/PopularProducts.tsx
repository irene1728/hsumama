"use client";
import Link from "next/link";
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
    <section className="pt-12 pb-8 bg-[#FFF8F0]">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center text-stone-800">
          🔥人氣推薦🔥
        </h2>

        <p className="text-center text-gray-500 mt-2">
          精選徐媽媽最受歡迎的冰鑽滷味，
每一口都是傳承三代的經典滋味。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

          {products.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
         
        </div>
 <div className="mt-8 text-center">
  <Link
    href="/products"
    className="inline-flex items-center gap-2 rounded-full border border-orange-500 px-8 py-3 font-semibold text-orange-600 
    transition-all duration-300 hover:bg-orange-500 hover:text-white"
  >
    查看全部商品 →
  </Link>
</div>
      </div>
    </section>
  );
}