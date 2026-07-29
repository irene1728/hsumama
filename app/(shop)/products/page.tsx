"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";

const categories = [
  { label: "全部", value: "all" },
  { label: "豬肉", value: "pork" },
  { label: "雞肉", value: "chicken" },
  { label: "牛肉", value: "beef" },
  { label: "羊肉", value: "lamb" },
  { label: "香腸", value: "sausage" },
  { label: "海鮮", value: "seafood" },
  { label: "湯品", value: "soup" },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState<any[]>([]);
useEffect(() => {

  async function loadProducts() {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
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
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  return (
    <main className="max-w-7xl mx-auto px-8 py-12">

      <h1 className="text-4xl font-bold text-center text-stone-800">
        全部商品
      </h1>

      <p className="text-center text-sm text-gray-400 mt-2">
        共 {filteredProducts.length} 項商品
      </p>

      <div className="flex flex-wrap justify-center gap-3 mt-8">

        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`px-6 py-2 rounded-full border transition-all duration-300 ${
              selectedCategory === category.value
                ? "bg-orange-600 text-white border-orange-600"
                : "bg-white text-black border-gray-300 hover:bg-orange-600 hover:text-white hover:border-orange-600"
            }`}
          >
            {category.label}
          </button>
        ))}

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">

        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </main>
  );
}