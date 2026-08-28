import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

type OrderItem = {
  id: number;
  product_name: string | null;
  quantity: number;
  price: number;
  subtotal: number;
  slug: string | null;
};

export default async function AccountOrderPage({
  params,
}: PageProps) {
  const { id } = await params;

  const orderId = Number(id);

  if (!Number.isInteger(orderId)) {
    notFound();
  }

  const supabase = await createClient();

  // =========================
  // 確認目前登入會員
  // =========================
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/account/login");
  }

  // =========================
  // 只取得目前會員自己的訂單
  // =========================
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select(
      `
        id,
        user_id,
        member_no,
        created_at,
        customer_name,
        phone,
        email,
        address,
        note,
        payment,
        total_quantity,
        total_amount,
        status,
        delivery_method,
        shipping_fee,
        grand_total,
        free_shipping_threshold,
        payment_status
      `
    )
    .eq("id", orderId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (orderError) {
    return (
      <main className="max-w-4xl mx-auto px-4 md:px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-[#4E342E]">
          訂單讀取失敗
        </h1>

        <p className="mt-4 text-red-600">
          {orderError.message}
        </p>

        <Link
          href="/account"
          className="inline-block mt-6 rounded-xl border border-orange-600 px-5 py-3 font-bold text-orange-600 hover:bg-orange-50"
        >
          ← 返回會員中心
        </Link>
      </main>
    );
  }

  if (!order) {
    notFound();
  }

  // =========================
  // 取得訂單商品
  // =========================
  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .select(
      `
        id,
        product_name,
        quantity,
        price,
        subtotal
      `
    )
    .eq("order_id", order.id)
    .order("id", { ascending: true });

  // =========================
  // 取得商品 slug
  // =========================
  const productNames = (items ?? [])
    .map((item) => item.product_name)
    .filter(
      (name): name is string =>
        typeof name === "string" && name.length > 0
    );

  const { data: products } =
    productNames.length > 0
      ? await supabase
          .from("products")
          .select("name, slug")
          .in("name", productNames)
      : { data: [] };

  // 商品名稱 → slug
  const productSlugMap = new Map(
    (products ?? []).map((product) => [
      product.name,
      product.slug,
    ])
  );

  const orderItems: OrderItem[] = (items ?? []).map((item) => ({
    id: item.id,
    product_name: item.product_name,
    quantity: item.quantity,
    price: item.price,
    subtotal: item.subtotal,
    slug: item.product_name
      ? productSlugMap.get(item.product_name) ?? null
      : null,
  }));

  return (
    <main className="max-w-4xl mx-auto px-4 md:px-6 py-20 md:py-25">

      {/* 返回會員中心 */}
      <div className="text-right">
        <Link
          href="/account"
          className="inline-block mb-2 text-orange-600 font-bold text-xl hover:text-orange-700"
        >
          ← 返回會員中心
        </Link>
      </div>

      {/* =========================
          訂單標題
          ========================= */}
      <div className="mb-1">
        <h1 className="text-xl md:text-2xl font-bold text-[#4E342E]">
          訂單 #{order.id}
        </h1>

        <p className="text-gray-500">
          {new Date(order.created_at).toLocaleString("zh-TW")}
        </p>
      </div>

      {/* =========================
          訂單狀態
          ========================= */}
      <section className="rounded-2xl border border-gray-300 bg-white p-4 md:p-6 shadow-sm">

        <h2 className="text-xl md:text-2xl font-bold text-[#4E342E] mb-2">
          訂單狀態
        </h2>

        <div className="space-y-1 text-base md:text-lg">

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">
              付款狀態
            </span>

            <span className="text-[#FF0000] font-bold">
              {order.payment_status ?? "—"}
            </span>
          </div>

          <hr className="border-gray-200" />

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">
              訂單狀態
            </span>

            <span className="text-[#FF0000] font-bold">
              {order.status ?? "—"}
            </span>
          </div>

        </div>

      </section>

      {/* =========================
          商品明細
          ========================= */}
      <section className="mt-3">

        <h2 className="text-2xl font-bold text-[#4E342E] mb-3">
          商品明細
        </h2>

        {itemsError ? (
          <div className="rounded-2xl border border-red-200 bg-white p-5">
            <p className="text-red-600">
              讀取商品明細失敗。
            </p>
          </div>
        ) : orderItems.length === 0 ? (
          <div className="rounded-2xl border border-gray-300 bg-white p-5">
            <p className="text-gray-500">
              此訂單目前沒有商品資料。
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-300 bg-white shadow-sm overflow-hidden">

            {orderItems.map((item, index) => (
              <div
                key={item.id}
                className="px-3 py-1 md:px-5 md:py-1"
              >

                <div className="flex items-start justify-between gap-4">

                  <div className="min-w-0">

                    {/* 商品名稱 */}
                    {item.slug ? (
                      <Link
                        href={`/products/${item.slug}`}
                        className="font-bold text-lg text-[#4E342E] hover:text-orange-600 hover:underline"
                      >
                        {item.product_name ?? "商品"}
                      </Link>
                    ) : (
                      <p className="font-bold text-lg text-[#4E342E]">
                        {item.product_name ?? "商品"}
                      </p>
                    )}

                    <p className="mt-1 text-gray-500">
                      數量：{item.quantity}
                    </p>

                    <p className="text-gray-500">
                      單價：NT$ {item.price.toLocaleString()}
                    </p>

                  </div>

                  <div className="shrink-0 text-right">

                    <p className="font-bold text-orange-600 text-lg">
                      NT$ {item.subtotal.toLocaleString()}
                    </p>

                  </div>

                </div>

                {index < orderItems.length - 1 && (
                  <hr className="border-gray-200" />
                )}

              </div>
            ))}

          </div>
        )}

      </section>

      {/* =========================
          金額明細
          ========================= */}
      <section className="mt-4 rounded-2xl border border-gray-300 bg-white p-4 md:p-6 shadow-sm">

        <h2 className="text-xl md:text-2xl font-bold text-[#4E342E] mb-1">
          金額明細
        </h2>

        <div className="space-y text-base md:text-lg">

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">
              商品金額
            </span>

            <span>
              NT$ {(order.total_amount ?? 0).toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">
              運費
            </span>

            <span>
              NT$ {(order.shipping_fee ?? 0).toLocaleString()}
            </span>
          </div>

          <hr className="border-gray-200" />

          <div className="flex justify-between gap-4">
            <span className="font-bold text-[#4E342E]">
              訂單總額
            </span>

            <span className="font-bold text-xl md:text-2xl text-orange-600">
              NT$ {(order.grand_total ?? 0).toLocaleString()}
            </span>
          </div>

        </div>

      </section>

      {/* =========================
          收件資訊
          ========================= */}
      <section className="mt-4 rounded-2xl border border-gray-300 bg-white p-4 md:p-6 shadow-sm">

        <h2 className="text-xl md:text-2xl font-bold text-[#4E342E] mb-2">
          收件資訊
        </h2>

        <div className="space-y-1 text-lg md:text-xl">

          <div>
            <p className="text-base text-gray-500">
              姓名
            </p>

            <p>
              {order.customer_name ?? "—"}
            </p>
          </div>

          <hr className="border-gray-200" />

          <div>
            <p className="text-base text-gray-500">
              電話
            </p>

            <p>
              {order.phone ?? "—"}
            </p>
          </div>

          <hr className="border-gray-200" />

          <div>
            <p className="text-base text-gray-500">
              Email
            </p>

            <p className="break-all">
              {order.email ?? "—"}
            </p>
          </div>

          <hr className="border-gray-200" />

          <div>
            <p className="text-base text-gray-500">
              地址
            </p>

            <p>
              {order.address ?? "—"}
            </p>
          </div>

          <hr className="border-gray-200" />

          <div>
            <p className="text-base text-gray-500">
              配送方式
            </p>

            <p>
              {order.delivery_method ?? "—"}
            </p>
          </div>

          <hr className="border-gray-200" />

          <div>
            <p className="text-base text-gray-500">
              付款方式
            </p>

            <p>
              {order.payment ?? "—"}
            </p>
          </div>

          {order.note && (
            <>
              <hr className="border-gray-200" />

              <div>
                <p className="text-base text-gray-500">
                  訂單備註
                </p>

                <p className="whitespace-pre-wrap">
                  {order.note}
                </p>
              </div>
            </>
          )}

        </div>

      </section>

      {/* =========================
          返回會員中心
          ========================= */}
      <div className="mt-4">

        <Link
          href="/account"
          className="block w-full rounded-xl border border-orange-600 py-3 text-center font-bold text-orange-600 transition hover:bg-orange-50"
        >
          返回會員中心
        </Link>

      </div>

    </main>
  );
}