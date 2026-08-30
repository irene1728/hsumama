"use client";

import type { Product } from "@/types/product";
import { useCart } from "@/cart/CartContext";
import { flyToCart } from "@/lib/flyToCart";

type Props = {
  product: Product;
};

export default function AddToCartButton({
  product,
}: Props) {
  const { addToCart } = useCart();

  function handleAddToCart() {

    // 庫存不足
    if (product.stock_quantity <= 0) {
      alert(
        "目前存貨不足，無法購買。\n\n請選購其他商品。"
      );
      return;
    }

    const productImage = document.querySelector(
      "[data-product-image]"
    ) as HTMLElement | null;

    if (productImage) {
      flyToCart(product.image, productImage);
    }

    addToCart(product);
  }

  return (
    <div className="flex justify-end md:justify-start">
    <button
      onClick={handleAddToCart}
      className="mt-2 md:mt-5 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition"
    >
      加入購物車
    </button>
    </div>
  );
}