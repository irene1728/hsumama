
import { supabase } from "@/lib/supabase";
import ProductForm from "./ProductForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({
  params,
}: Props) {

  const { id } = await params;
const { data: product, error } = await supabase
  .from("products")
  .select("*")
  .eq("id", Number(id))
  .single();

  if (error || !product) {
  return (
    <main className="max-w-5xl mx-auto py-12">
      <h1 className="text-3xl font-bold">
        找不到商品
      </h1>
    </main>
  );
}

  return (
    <main className="max-w-3xl mx-auto py-1">

      <h1 className="ml-1 text-2xl font-bold text-orange-600">
        編輯商品
      </h1>
<hr></hr>
    <ProductForm product={product} />

    </main>
  );
}