"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type ProductFormData = {
  id: number;

  slug: string;
  image: string;

  name: string;
  category: string;
  price: number | null;
  wholesale_price: number | null;
  stock_quantity: number;
  description: string | null;
  weight: string | null;

  storage: string | null;
  delivery: string | null;

  featured: boolean;
  is_active: boolean;
  sort_order: number;

  // 商品促銷
  promotion_enabled: boolean;
  promotion_type: "special" | "discount" | null;
  promotion_price: number | null;
  promotion_discount: number | null;
  promotion_start_at: string | null;
  promotion_end_at: string | null;
};

type Props = {
  product: ProductFormData;
};

export default function ProductForm({ product }: Props) {
  const router = useRouter();

  const [slug, setSlug] = useState(product.slug);
  const [image, setImage] = useState(product.image);
  const [imagePreview, setImagePreview] = useState(product.image);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price ?? 0);
  const [wholesalePrice, setWholesalePrice] = useState(
    product.wholesale_price ?? 0
  );
  const [stockQuantity, setStockQuantity] = useState(
    product.stock_quantity ?? 0
  );
  const [description, setDescription] = useState(
    product.description ?? ""
  );
  const [category, setCategory] = useState(product.category);
  const [weight, setWeight] = useState(product.weight ?? "");
  const [storage, setStorage] = useState(product.storage ?? "");
  const [delivery, setDelivery] = useState(product.delivery ?? "");
  const [sortOrder, setSortOrder] = useState(product.sort_order);
  const [featured, setFeatured] = useState(product.featured);
  const [isActive, setIsActive] = useState(product.is_active);

  // =========================
  // 商品促銷
  // =========================

  const [promotionEnabled, setPromotionEnabled] = useState(
    product.promotion_enabled ?? false
  );

  const [promotionType, setPromotionType] = useState<
    "special" | "discount" | null
  >(product.promotion_type ?? null);

  const [promotionPrice, setPromotionPrice] = useState(
    product.promotion_price ?? 0
  );

  const [promotionDiscount, setPromotionDiscount] = useState(
    product.promotion_discount ?? 95
  );

  const [promotionStartAt, setPromotionStartAt] = useState(
    product.promotion_start_at
      ? product.promotion_start_at.slice(0, 16)
      : ""
  );

  const [promotionEndAt, setPromotionEndAt] = useState(
    product.promotion_end_at
      ? product.promotion_end_at.slice(0, 16)
      : ""
  );

  const [loading, setLoading] = useState(false);

  async function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!slug.trim()) {
      alert("請先輸入商品網址 (Slug)");
      return;
    }

    const preview = URL.createObjectURL(file);

    setImagePreview(preview);

    const extension = file.name.split(".").pop();

    const fileName = `${slug}.${extension}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, file, {
        upsert: true,
      });

    if (error) {
      alert("圖片上傳失敗");
      console.error(error);
      return;
    }

    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    setImage(data.publicUrl);
  }

  async function saveProduct() {
    setLoading(true);

    // =========================
    // 促銷資料整理
    // =========================

    const promotionData = {
      promotion_enabled: promotionEnabled,

      promotion_type: promotionEnabled
        ? promotionType
        : null,

      promotion_price:
        promotionEnabled && promotionType === "special"
          ? promotionPrice
          : null,

      promotion_discount:
        promotionEnabled && promotionType === "discount"
          ? promotionDiscount
          : null,

      promotion_start_at:
        promotionEnabled && promotionStartAt
          ? new Date(promotionStartAt).toISOString()
          : null,

      promotion_end_at:
        promotionEnabled && promotionEndAt
          ? new Date(promotionEndAt).toISOString()
          : null,
    };

    let error;

    if (product.id === 0) {
      // 新增商品
      const result = await supabase
        .from("products")
        .insert({
          slug,
          image,
          name,
          category,
          price,
          wholesale_price: wholesalePrice,
          stock_quantity: stockQuantity,
          description,
          weight,
          storage,
          delivery,
          sort_order: sortOrder,
          featured,
          is_active: isActive,

          ...promotionData,
        });

      error = result.error;
    } else {
      // 修改商品
      const result = await supabase
        .from("products")
        .update({
          slug,
          image,
          name,
          category,
          price,
          wholesale_price: wholesalePrice,
          stock_quantity: stockQuantity,
          description,
          weight,
          storage,
          delivery,
          sort_order: sortOrder,
          featured,
          is_active: isActive,

          ...promotionData,
        })
        .eq("id", product.id);

      error = result.error;
    }

    setLoading(false);

    if (error) {
      console.error(error);
      alert("儲存失敗！");
      return;
    }

    alert(
      product.id === 0
        ? "新增成功！"
        : "修改成功！"
    );

    router.push("/admin/products");
    router.refresh();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-0 space-y-2 md:space-y-3">

      <div>
        <label className="block font-semibold mb-1 md:mb-2">
          商品名稱
        </label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-xl px-4 py-2 md:py-3"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1 md:mb-2">
          商品網址 (Slug)
        </label>

        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="例如：pork-ring"
          className="w-full border rounded-xl px-4 py-2 md:py-3"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1 md:mb-2">
          商品圖片
        </label>

        {imagePreview && (
          <img
            src={imagePreview}
            alt="商品圖片"
            className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-xl border mb-2"
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border rounded-xl px-4 py-2 md:py-3"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1 md:mb-2">
          價格
        </label>

        <input
          type="number"
          value={price}
          onChange={(e) =>
            setPrice(Number(e.target.value))
          }
          className="w-full border rounded-xl px-4 py-2 md:py-3"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1 md:mb-2">
          批發價
        </label>

        <input
          type="number"
          value={wholesalePrice}
          onChange={(e) =>
            setWholesalePrice(Number(e.target.value))
          }
          className="w-full border rounded-xl px-4 py-2 md:py-3"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1 md:mb-2">
          存貨數量
        </label>

        <input
          type="number"
          min="0"
          value={stockQuantity}
          onChange={(e) =>
            setStockQuantity(Number(e.target.value))
          }
          className="w-full border rounded-xl px-4 py-2 md:py-3"
        />
      </div>

      {/* =========================
          商品促銷
          ========================= */}

      <div className="rounded-2xl border-2 border-orange-200 bg-orange-50 p-2 md:p-5 space-y-1 md:space-y-2">

        <h2 className="text-xl font-bold text-orange-700">
          🏷️ 商品促銷
        </h2>

        {/* 啟用促銷 */}

        <label className="flex items-center gap-3 text-lg font-semibold cursor-pointer">
          啟用促銷活動
           <input
            type="checkbox"
            checked={promotionEnabled}
            onChange={(e) =>
              setPromotionEnabled(e.target.checked)
            }
            className="w-6 h-6"
          />

        </label>

        {promotionEnabled && (
          <div className="space-y-1 md:space-y-2">

            {/* 促銷類型 */}

            <div>
              <label className="block font-semibold md:mt-2">
                促銷類型
              </label>

              <div className="flex flex-col md:flex-row gap-3 mt-1">

                <label className="flex items-center gap-2 border rounded-xl px-4 py-3 bg-white cursor-pointer">
                  <input
                    type="radio"
                    name="promotionType"
                    value="special"
                    checked={promotionType === "special"}
                    onChange={() =>
                      setPromotionType("special")
                    }
                  />

                  <span>
                    💰 特價活動
                  </span>
                </label>

                <label className="flex items-center gap-2 border rounded-xl px-4 py-3 bg-white cursor-pointer">
                  <input
                    type="radio"
                    name="promotionType"
                    value="discount"
                    checked={promotionType === "discount"}
                    onChange={() =>
                      setPromotionType("discount")
                    }
                  />

                  <span>
                    🔖 折扣活動
                  </span>
                </label>

              </div>
            </div>

            {/* 特價 */}

            {promotionType === "special" && (
              <div>
                <label className="block font-semibold mt-2">
                  活動特價
                </label>

                <div className="flex items-center gap-2">
                  <span>NT$</span>

                  <input
                    type="number"
                    min="0"
                    value={promotionPrice}
                    onChange={(e) =>
                      setPromotionPrice(
                        Number(e.target.value)
                      )
                    }
                    className="flex-1 border rounded-xl px-4 py-2 bg-white"
                  />
                </div>
              </div>
            )}

            {/* 折扣 */}

            {promotionType === "discount" && (
              <div>
                <label className="block font-semibold mt-1 md:mt-2">
                  折扣
                </label>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={promotionDiscount}
                    onChange={(e) =>
                      setPromotionDiscount(
                        Number(e.target.value)
                      )
                    }
                    className="w-28 h-9 border rounded-xl px-4 py-2 bg-white text-center"
                  />

                  <span className="font-bold">
                    折
                  </span>
                </div>

                {price > 0 && (
                  <p className="text-sm text-[#DC143C] mt-2">
                    原價 NT$ {price} → 活動價 NT${" "}
                    {Math.round(
                      price *
                        (promotionDiscount / 100)
                    )}
                  </p>
                )}
              </div>
            )}

            {/* 活動時間 */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">

              <div>
                <label className="block font-semibold mt-1">
                  活動開始
                </label>

                <input
                  type="datetime-local"
                  value={promotionStartAt}
                  onChange={(e) =>
                    setPromotionStartAt(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-xl px-3 py-2 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold mt-1">
                  活動結束
                </label>

                <input
                  type="datetime-local"
                  value={promotionEndAt}
                  onChange={(e) =>
                    setPromotionEndAt(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-xl px-3 py-2 bg-white"
                />
              </div>

            </div>

          </div>
        )}

      </div>

      <div>
        <label className="block font-semibold mb-1 md:mb-2">
          商品介紹
        </label>

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          rows={3}
          className="w-full h-26 md:h-40 border rounded-xl px-2 md:px-4 py-1 md:py-3"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1 md:mb-2">
          分類
        </label>

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="w-full border rounded-xl px-4 py-2 md:py-3"
        >
          <option value="pork">豬肉</option>
          <option value="chicken">雞肉</option>
          <option value="beef">牛肉</option>
          <option value="lamb">羊肉</option>
          <option value="sausage">香腸</option>
          <option value="seafood">海鮮</option>
          <option value="soup">湯品</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1 md:mb-2">
          重量
        </label>

        <input
          value={weight}
          onChange={(e) =>
            setWeight(e.target.value)
          }
          className="w-full border rounded-xl px-4 py-2 md:py-3"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1 md:mb-2">
          保存方式
        </label>

        <input
          value={storage}
          onChange={(e) =>
            setStorage(e.target.value)
          }
          className="w-full border rounded-xl px-4 py-2 md:py-3"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1 md:mb-2">
          配送方式
        </label>

        <input
          value={delivery}
          onChange={(e) =>
            setDelivery(e.target.value)
          }
          className="w-full border rounded-xl px-4 py-2 md:py-3"
        />
      </div>

      <div className="flex gap-10 text-xl">

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) =>
              setFeatured(e.target.checked)
            }
          />

          人氣商品
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) =>
              setIsActive(e.target.checked)
            }
          />

          上架
        </label>

      </div>

      <div className="pt-1 md:pt-2 flex justify-between">

        <Link
          href="/admin/products"
          className="px-6 py-2 md:py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
        >
          ← 返回商品管理
        </Link>

        <button
          onClick={saveProduct}
          disabled={loading}
          className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-bold px-8 py-2 md:py-3 rounded-xl transition"
        >
          {loading
            ? "儲存中..."
            : product.id === 0
            ? "➕ 新增商品"
            : "💾 儲存修改"}
        </button>

      </div>

    </div>
  );
}