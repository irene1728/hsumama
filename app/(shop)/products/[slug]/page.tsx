import AddToCartButton from "../../../components/AddToCartButton";
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
  <main className="max-w-6xl mx-auto py-16 px-8">

    {/* 麵包屑 */}
    <div className="mb-8 text-sm text-gray-500">

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


    <div className="grid md:grid-cols-2 gap-16 items-start">

      {/* 商品圖片 */}
      <div className="bg-white rounded-3xl shadow p-8 flex justify-center">

        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="object-contain"
        />

      </div>

      {/* 商品資訊 */}
      <div>

        <h1 className="text-4xl font-bold text-stone-800">
          {product.name}
        </h1>

        <p className="text-orange-600 text-3xl font-bold mt-6">
  {product.price
    ? `NT$ ${product.price.toLocaleString("zh-TW")}`
    : "價格請洽詢"}
</p>
        <div className="mt-10 space-y-5 text-lg">

          <p>
            <span className="font-bold">
              商品介紹：
            </span>

            {product.description || "商品介紹即將更新"}
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

        </div>

        <AddToCartButton product={product} />

      </div>

    </div>

  </main>
);
}