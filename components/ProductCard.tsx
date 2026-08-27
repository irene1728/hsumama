import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/types/product";

import { formatPrice } from "@/lib/formatPrice";
import { useCart } from "@/cart/CartContext";
import { Check, ShoppingCart } from "lucide-react";
import { useRef, useState } from "react";
import { flyToCart } from "@/lib/flyToCart";

type ProductCardProps = {
  product: Product;
};


export default function ProductCard({ product }: ProductCardProps) {

const { addToCart } = useCart();
const [added, setAdded] = useState(false);

const imageRef = useRef<HTMLDivElement>(null);

function handleAddToCart() {
  if (imageRef.current) {
    flyToCart(product.image, imageRef.current);
  }

  addToCart(product);

  setAdded(true);

  setTimeout(() => {
    setAdded(false);
  }, 800);
}

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
  hover:shadow-xl
"
    >
      {/* 商品圖片 */}
      <Link
        href={`/products/${product.slug}`}
         className="block overflow-hidden rounded-xl"
      >
        <div
         ref={imageRef}
        className="h-[180px] flex items-center justify-center bg-white p-5 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={190}
            height={190}
           className="
           object-contain
           cursor-pointer
           transition-all
           duration-300
           hover:scale-105
           active:scale-95
          "
          />
        </div>
      </Link>

      {/* 商品資訊 */}
      <div className="px-5 pb-5 pt-2">
        <Link
          href={`/products/${product.slug}`}
          className="
            block
            cursor-pointer
            transition-colors
            duration-200
            hover:text-orange-600
            hover:underline
          "
        >
          <h3
            className="
              text-2xl
              font-bold
              text-stone-800
              line-clamp-2
              min-h-[46px]
            "
          >
            {product.name}
          </h3>
        </Link>

        {/* 商品價格 */}
        <p className="mt-1 text-2xl font-bold text-orange-600">
          {formatPrice(product.price)}
        </p>

        {/* 按鈕 */}
        <div className="mt-2 flex gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="
              flex
              inline-flex
              items-center
              justify-center
              rounded-full
              bg-orange-500
              px-4
              py-2.5
              text-xl
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

          {/* 下一步接購物車 */}
          <button
  type="button"
 onClick={handleAddToCart}
  className="
    flex
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-full
    border
    border-orange-500
    px-5
    py-2.5
    text-[17px]
    font-semibold
    text-orange-600
    transition-all
    duration-300
    hover:bg-orange-50
    hover:border-orange-600
    hover:text-orange-700
    active:scale-95
  "
>
  
  <>
  {added ? (
    <>
      <Check size={18} />
      <span>已加入</span>
    </>
  ) : (
    <>
      <ShoppingCart size={18} />
      <span>加 入</span>
    </>
  )}
</>
</button>
        </div>
      </div>
    </div>
  );
}