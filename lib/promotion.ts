import type { Product } from "@/types/product";

export function getEffectivePrice(product: Product): number {
  // 沒有啟用促銷
  if (!product.promotion_enabled) {
    return product.price;
  }

  // 檢查活動時間
  const now = new Date();

  if (product.promotion_start_at) {
    const start = new Date(product.promotion_start_at);

    if (now < start) {
      return product.price;
    }
  }

  if (product.promotion_end_at) {
    const end = new Date(product.promotion_end_at);

    if (now > end) {
      return product.price;
    }
  }

  // 特價活動
  if (
    product.promotion_type === "special" &&
    product.promotion_price !== null
  ) {
    return product.promotion_price;
  }

  // 折扣活動
  if (
    product.promotion_type === "discount" &&
    product.promotion_discount !== null
  ) {
    return Math.round(
      product.price * (product.promotion_discount / 100)
    );
  }

  // 促銷設定不完整時，回到原價
  return product.price;
}