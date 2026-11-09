
type ValidateCheckoutParams = {
  customerName: string;
  phone: string;
  email: string;
  address: string;
  deliveryMethod: string;
  cartLength: number;
};

export function validateCheckout({
  customerName,
  phone,
  email,
  address,
  deliveryMethod,
  cartLength,
}: ValidateCheckoutParams): string | null {

  // 訂購人姓名
  if (!customerName.trim()) {
    return "請填寫訂購人姓名";
  }

  // 聯絡電話
  if (!phone.trim()) {
    return "請填寫聯絡電話";
  }

  // Email
  if (!email.trim()) {
    return "請填寫 Email";
  }

  // 地址
  if (!address.trim()) {
    return "請填寫地址";
  }

  // 自取限台中市
  if (
    deliveryMethod === "自取" &&
    !/^(台中市|臺中市)/.test(address.trim())
  ) {
    return "自取免運僅限台中市，請確認您的地址。";
  }

  // 購物車
  if (cartLength === 0) {
    return "購物車沒有商品";
  }

  return null;
}
