import AddToCartButton from "@/components/AddToCartButton";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

 const { data: product, error } = await supabase
  .from("products")
  .select("*")
  .eq("slug", slug)
  .single();

  if (!product) {
    return (
      <main className="max-w-5xl mx-auto py-20 px-8">
        <h1 className="text-3xl font-bold">
          找不到商品
        </h1>
      </main>
    );
  }


return (
  <main className="max-w-6xl mx-auto px-8 py-20 md:py-26">

    {/* 麵包屑 */}
    <div className="mb-2 text-base text-gray-500">

      <Link
        href="/"
        className="hover:text-orange-600"
      >
        首頁
      </Link>

      <span className="mx-2">/</span>

      <Link
        href="/products"
        className="hover:text-orange-600"
      >
        全部商品
      </Link>

      <span className="mx-2">/</span>

      <span className="text-stone-800 font-semibold">
        {product.name}
      </span>

    </div>


    <div className="grid md:grid-cols-2 gap-2 md:gap-16 items-start">

      {/* 商品圖片 */}
      <div className="bg-white rounded-3xl shadow p-1 flex justify-center w-82 h-64 md:w-130 md:h-130">

        <Image
          src={product.image}
          alt={product.name}
          width={500} 
          height={500}
          loading="eager"
          data-product-image
          className="object-contain"
        />

      </div>

      {/* 商品資訊 */}
      <div>

        <h1 className="text-3xl md:text-4xl font-bold text-stone-800">
          {product.name}
        </h1>

        <p className="text-orange-600 text-3xl font-bold mt-2">
  {product.price
    ? `NT$ ${product.price.toLocaleString("zh-TW")}`
    : "價格請洽詢"}
</p>
        <div className="mt-2 space-y md:space-y-3 text-lg">
<p>
  <span className="font-bold">
    商品介紹：
  </span>
<br/>
  <span className="whitespace-pre-line">
    {product.description || "商品介紹即將更新"}
  </span>
</p>   
 <p>
            <span className="font-bold">
              保存方式：
            </span>

            {product.storage}
          </p>

          <p>
            <span className="font-bold">
              配送方式：
            </span>

            {product.delivery}
          </p>

          <p>
            <span className="font-bold">
              重量：
            </span>

            {product.weight ?? "待補"}
          </p>

<p>
  <span className="font-bold">
    存貨：
  </span>

  {product.stock_quantity}
</p>

        </div>

        <AddToCartButton product={product} />

      </div>

    </div>

  </main>
);
}