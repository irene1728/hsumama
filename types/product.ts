export type Product = {
  id: number;

  slug: string;

  name: string;

  image: string;

  category:
    | "pork"
    | "chicken"
    | "beef"
    | "lamb"
    | "sausage"
    | "seafood"
    | "soup";

  price: number;

  wholesale_price: number | null;

  // 商品促銷
  promotion_enabled: boolean;

  promotion_type: "special" | "discount" | null;

  // 特價活動使用
  promotion_price: number | null;

  // 折扣活動使用，例如 95 代表 95 折
  promotion_discount: number | null;

  // 活動期間
  promotion_start_at: string | null;

  promotion_end_at: string | null;

  stock_quantity: number;

  description: string;

  weight: string | null;

  storage: string;

  delivery: string;

  featured: boolean;
};