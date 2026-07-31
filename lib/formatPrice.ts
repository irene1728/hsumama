export function formatPrice(price: number | null) {
  if (price === null) {
    return "請洽詢";
  }

  return `NT$${price.toLocaleString("zh-TW")}`;
}
