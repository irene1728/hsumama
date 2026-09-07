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
  const [selectedView, setSelectedView] = useState("all");
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

  // 先依「全部商品／烤肉專區」篩選
  const viewProducts =
    selectedView === "bbq"
      ? products.filter((product) => product.is_bbq === true)
      : products;

  // 再依商品分類篩選
  const filteredProducts =
    selectedCategory === "all"
      ? viewProducts
      : viewProducts.filter(
          (product) => product.category === selectedCategory
        );

  return (
    <main className="max-w-7xl mx-auto pt-22 px-8 md:py-22">

      {/* 全部商品／烤肉專區切換 */}
      <div className="flex justify-center gap-3 mt-1 md:mt-3">

        <button
          onClick={() => {
            setSelectedView("all");
            setSelectedCategory("all");
          }}
          className={`px-6 py-2 rounded-full border transition-all duration-300 ${
            selectedView === "all"
              ? "bg-orange-600 text-white border-orange-600"
              : "bg-white text-black border-gray-300 hover:bg-orange-600 hover:text-white hover:border-orange-600"
          }`}
        >
          🍖 全部商品
        </button>

        <button
          onClick={() => {
            setSelectedView("bbq");
            setSelectedCategory("all");
          }}
          className={`px-6 py-2 rounded-full border transition-all duration-300 ${
            selectedView === "bbq"
              ? "bg-orange-600 text-white border-orange-600"
              : "bg-white text-black border-gray-300 hover:bg-orange-600 hover:text-white hover:border-orange-600"
          }`}
        >
          🔥 烤肉專區
        </button>

      </div>

      {/* 商品數量 */}
      <p className="text-center text-base md:text-xl text-gray-600 mt-2 md:mt-3">
        共 {filteredProducts.length} 項商品
      </p>

      {/* 商品分類 */}
      <div className="flex flex-wrap justify-center gap-1 md:gap-3 mt-2 md:mt-4">

        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={` px-4 md:px-6 py-2 rounded-full border transition-all duration-300 ${
              selectedCategory === category.value
                ? "bg-orange-600 text-white border-orange-600"
                : "bg-white text-black border-gray-300 hover:bg-orange-600 hover:text-white hover:border-orange-600"
            }`}
          >
            {category.label}
          </button>
        ))}

      </div>

      {/* 商品列表 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 mt-1 md:mt-10">

        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

      {/* 沒有商品 */}
      {filteredProducts.length === 0 && (
        <div className="text-center text-gray-500 py-20">
          {selectedView === "bbq"
            ? "目前烤肉專區尚未上架商品"
            : "目前沒有符合條件的商品"}
        </div>
      )}

    </main>
  );
}