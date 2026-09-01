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

  // 取得目前商品
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

  // 取得所有上架商品，依照商品排序
  const { data: products } = await supabase
    .from("products")
    .select("id, name, slug, sort_order")
    .eq("is_active", true)
    .order("sort_order");

  // 找出目前商品在排序中的位置
  const currentIndex =
    products?.findIndex((item) => item.id === product.id) ?? -1;

  // 上一個商品
  const previousProduct =
    currentIndex > 0
      ? products?.[currentIndex - 1]
      : null;

  // 下一個商品
  const nextProduct =
    currentIndex >= 0 && products && currentIndex < products.length - 1
      ? products[currentIndex + 1]
      : null;

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-20 md:py-26">

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
        <div className="bg-white rounded-3xl shadow p-1 flex justify-center w-82 h-60 md:w-130 md:h-130">

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
              <br />
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


      {/* 上一個 / 下一個商品 */}
      <div className="max-w-4xl text-center mt-4 border-t border-gray-200 pt-6">

        <div className="flex items-center justify-between gap-4">

          {/* 上一個商品 */}
          <div className="text-left md:ml-55 flex-1">

            {previousProduct ? (
              <Link
                href={`/products/${previousProduct.slug}`}
                className="group block"
              >
                <div className="text-base md:text-lg text-gray-500 group-hover:text-orange-600 transition-colors">
                  ◀️ 上一個商品
                </div>

                <div className="mt-1 text-sm md:text-lg font-bold text-stone-800 group-hover:text-orange-600 transition-colors">
                  {previousProduct.name}
                </div>
              </Link>
            ) : (
              <div />
            )}

          </div>


          {/* 下一個商品 */}
          <div className="flex-1 text-right">

            {nextProduct ? (
              <Link
                href={`/products/${nextProduct.slug}`}
                className="group block"
              >
                <div className="text-base md:text-lg text-gray-500 group-hover:text-orange-600 transition-colors">
                  下一個商品 ▶️
                </div>

                <div className="mt-1 text-sm md:text-lg font-bold text-stone-800 group-hover:text-orange-600 transition-colors">
                  {nextProduct.name}
                </div>
              </Link>
            ) : (
              <div />
            )}

          </div>

        </div>

      </div>

    </main>
  );
}