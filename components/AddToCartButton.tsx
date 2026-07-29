"use client";

import { products } from "@/data/products";
import { useCart } from "@/cart/CartContext";

type Product = (typeof products)[number];

type Props = {
  product: Product;
};

export default function AddToCartButton({
  product,
}: Props) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="mt-12 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition"
    >
      加入購物車
    </button>
  );
}