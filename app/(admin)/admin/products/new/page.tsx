import ProductForm from "../[id]/ProductForm";

export default function NewProductPage() {

 const emptyProduct = {
  id: 0,

  slug: "",
  image: "",

  name: "",
  category: "pork",
 price: null,
  wholesale_price: null,
  stock_quantity: 0,
  description: "",
  weight: "",

  storage: "冷凍保存",
  delivery: "新竹物流冷凍宅配",

  featured: false,
  is_active: true,
 
    promotion_enabled: false,
  promotion_type: null,
  promotion_price: null,
  promotion_discount: null,
  promotion_start_at: null,
  promotion_end_at: null,
  sort_order: 999,
};

  return (
    <main className="max-w-5xl mx-auto pt-4 pb-10">

      <h1 className="text-3xl font-bold text-orange-400 mb-3">
        新增商品
      </h1>

      <ProductForm product={emptyProduct} />

    </main>
  );
}