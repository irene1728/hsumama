import Image from "next/image";
import Link from "next/link";

import { products } from "@/data/products";

type ProductCardProps = {
  product: (typeof products)[number];
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl transition duration-300">

      {/* 商品圖片 */}
      <div className="h-[180px] flex items-center justify-center bg-white p-5">
        <Image
          src={product.image}
          alt={product.name}
          width={190}
          height={190}
          className="object-contain transition duration-300 hover:scale-105"
        />
      </div>

      {/* 商品資訊 */}
      <div className="px-5 pb-5 pt-2">

        <h3 className="text-xl font-bold text-stone-800">
          {product.name}
        </h3>

      <Link
  href={`/products/${product.slug}`}
  className="inline-block mt-8 text-orange-600 font-semibold hover:text-orange-700"
>
  查看商品 →
</Link>

      </div>

    </div>
  );
}