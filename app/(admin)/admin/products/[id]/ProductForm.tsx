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

  description: string | null;
  weight: string | null;

  storage: string | null;
  delivery: string |null;

  featured: boolean;
  is_active: boolean;
  sort_order: number;
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
const [description, setDescription] = useState(product.description ?? "");
const [category, setCategory] = useState(product.category);
const [weight, setWeight] = useState(product.weight ?? "");
const [storage, setStorage] = useState(product.storage ?? "");
const [delivery, setDelivery] = useState(product.delivery ?? "");
const [sortOrder, setSortOrder] = useState(product.sort_order);
const [featured, setFeatured] = useState(product.featured);
const [isActive, setIsActive] = useState(product.is_active);
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

  let error;

  if (product.id === 0) {

    const result = await supabase
      .from("products")
     .insert({
  slug,
  image,

  name,
  category,
  price,
  description,
  weight,
  storage,
  delivery,
  sort_order: sortOrder,
  featured,
  is_active: isActive,
})
      
      ;
    error = result.error;

  } else {

    const result = await supabase
      .from("products")
  .update({
  slug,
  image,

  name,
  category,
  price,
  description,
  weight,
  storage,
  delivery,
  sort_order: sortOrder,
  featured,
  is_active: isActive,
})

      .eq("id", product.id);

    error = result.error;

  }

  setLoading(false);

  if (error) {
    alert("儲存失敗！");
    return;
  }

  alert(product.id === 0 ? "新增成功！" : "修改成功！");

  router.push("/admin/products");
  router.refresh();

}

  return (
    <div className="max-w-3xl space-y-4">

      <div>
        <label className="block font-semibold mb-2">
          商品名稱
        </label>

        <input
          value={name}
onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-xl px-4 py-3"
        />
      </div>
<div>
  <label className="block font-semibold mb-2">
    商品網址 (Slug)
  </label>

  <input
    value={slug}
    onChange={(e) => setSlug(e.target.value)}
    placeholder="例如：pork-ring"
    className="w-full border rounded-xl px-4 py-3"
  />
</div>

<div>
  <label className="block font-semibold mb-2">
    商品圖片
  </label>

  {imagePreview && (
    <img
      src={imagePreview}
      alt="商品圖片"
      className="w-48 h-48 object-cover rounded-xl border mb-4"
    />
  )}

 <input
  type="file"
  accept="image/*"
  onChange={handleImageChange}
  className="w-full border rounded-xl px-4 py-3"
/>
</div>



      <div>
        <label className="block font-semibold mb-2">
          價格
        </label>

        <input
          type="number"
          value={price}
onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full border rounded-xl px-4 py-3"
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">
          商品介紹
        </label>

        <textarea
         value={description}
onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full border rounded-xl px-4 py-3"
        />
      </div>

<div>
  <label className="block font-semibold mb-2">
    分類
  </label>

  <select
    value={category}
onChange={(e) => setCategory(e.target.value)}
    className="w-full border rounded-xl px-4 py-3"
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
  <label className="block font-semibold mb-2">
    重量
  </label>

  <input
   value={weight}
onChange={(e) => setWeight(e.target.value)}
    className="w-full border rounded-xl px-4 py-3"
  />
</div>

<div>
  <label className="block font-semibold mb-2">
    保存方式
  </label>

  <input
   value={storage}
onChange={(e) => setStorage(e.target.value)}
    className="w-full border rounded-xl px-4 py-3"
  />
</div>

<div>
  <label className="block font-semibold mb-2">
    配送方式
  </label>

  <input
    value={delivery}
onChange={(e) => setDelivery(e.target.value)}
    className="w-full border rounded-xl px-4 py-3"
  />
</div>

<div className="flex gap-10">

  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={featured}
      onChange={(e) => setFeatured(e.target.checked)}
    />
    人氣商品
  </label>

  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={isActive}
      onChange={(e) => setIsActive(e.target.checked)}
    />
    上架
  </label>

</div>
<div className="pt-8 flex justify-between">

  <Link
    href="/admin/products"
    className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
  >
    ← 返回商品管理
  </Link>

  <button
    onClick={saveProduct}
    disabled={loading}
    className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-bold px-8 py-3 rounded-xl transition"
  >
    {
  loading
    ? "儲存中..."
    : product.id === 0
      ? "➕ 新增商品"
      : "💾 儲存修改"
}
  </button>

</div>
    </div>
  );
}