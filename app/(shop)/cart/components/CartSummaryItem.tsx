"use client";

import Image from "next/image";

import { formatPrice } from "@/lib/formatPrice";
import type { Product } from "@/types/product";

type CartSummaryItemProps = {
  item: Product & {
    quantity: number;
  };
};

export default function CartSummaryItem({
  item,
}: CartSummaryItemProps) {
 const subtotal = item.price * item.quantity;

  return (
    <div className="flex gap-3 py-1">
      <div className="flex-shrink-0 ml-4">
        <Image
          src={item.image}
          alt={item.name}
          width={70}
          height={70}
          className="rounded-lg object-cover border"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-stone-800 line-clamp-2">
          {item.name}
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          {item.quantity} × {formatPrice(item.price)}
        </p>

        <p className="mt-1 text-sm font-bold text-orange-600">
          {formatPrice(subtotal)}
        </p>
      </div>
    </div>
  );
}