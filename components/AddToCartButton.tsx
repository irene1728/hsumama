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
    const productImage = document.querySelector(
      "[data-product-image]"
    ) as HTMLElement | null;

    if (productImage) {
      flyToCart(product.image, productImage);
    }

    addToCart(product);
  }

  return (
    <button
      onClick={handleAddToCart}
      className="mt-12 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition"
    >
      加入購物車
    </button>
  );
}