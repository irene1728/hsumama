type ValidateCheckoutParams = {
  customerName: string;
  phone: string;
  address: string;
  cartLength: number;
};

export function validateCheckout({
  customerName,
  phone,
  address,
  cartLength,
}: ValidateCheckoutParams): string | null {
  if (!customerName.trim()) {
    return "請填寫收件人姓名";
  }

  if (!phone.trim()) {
    return "請填寫聯絡電話";
  }

  if (!address.trim()) {
    return "請填寫收件地址";
  }

  if (cartLength === 0) {
    return "購物車沒有商品";
  }

  return null;
}