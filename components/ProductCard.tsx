import Image from "next/image";
import Link from "next/link";

import { products } from "@/data/products";

type ProductCardProps = {
  product: (typeof products)[number];
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      className="
        group
        bg-white
        rounded-3xl
        overflow-hidden
        shadow-md
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl
      "
    >
      {/* 商品圖片 */}
      <div className="h-[180px] flex items-center justify-center bg-white p-5">
        <Image
          src={product.image}
          alt={product.name}
          width={190}
          height={190}
          className="
            object-contain
            transition-transform
            duration-300
            group-hover:scale-105
          "
        />
      </div>

      {/* 商品資訊 */}
      <div className="px-5 pb-5 pt-2">
        <h3
          className="
            text-xl
            font-bold
            text-stone-800
            line-clamp-2
            min-h-[56px]
          "
        >
          {product.name}
        </h3>

     <Link
  href={`/products/${product.slug}`}
  className="
    mt-8
    inline-flex
    items-center
    justify-center
    rounded-full
    bg-orange-500
    px-6
    py-2.5
    text-sm
    font-semibold
    text-white
    transition-all
    duration-300
    hover:bg-orange-600
    hover:shadow-lg
    active:scale-95
  "
>
  查看商品
</Link>
      </div>
    </div>
  );
}