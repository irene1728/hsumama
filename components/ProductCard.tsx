import Image from "next/image";
import Link from "next/link";

import { products } from "@/data/products";
import { formatPrice } from "@/lib/formatPrice";
import { useCart } from "@/cart/CartContext";
import { Check, ShoppingCart } from "lucide-react";
import { useState } from "react";

type ProductCardProps = {
  product: (typeof products)[number];
};


export default function ProductCard({ product }: ProductCardProps) {

const { addToCart } = useCart();
const [added, setAdded] = useState(false);

function handleAddToCart() {
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
        <div className="h-[180px] flex items-center justify-center bg-white p-5 overflow-hidden">
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
              text-xl
              font-bold
              text-stone-800
              line-clamp-2
              min-h-[56px]
            "
          >
            {product.name}
          </h3>
        </Link>

        {/* 商品價格 */}
        <p className="mt-3 text-xl font-bold text-orange-600">
          {formatPrice(product.price)}
        </p>

        {/* 按鈕 */}
        <div className="mt-6 flex gap-3">
          <Link
            href={`/products/${product.slug}`}
            className="
              flex-1
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

          {/* 下一步接購物車 */}
          <button
  type="button"
 onClick={handleAddToCart}
  className="
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-full
    border
    border-orange-500
    px-5
    py-2.5
    text-sm
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
      <span>加入</span>
    </>
  )}
</>
</button>
        </div>
      </div>
    </div>
  );
}