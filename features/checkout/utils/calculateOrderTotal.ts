type CalculateOrderTotalParams = {
  totalAmount: number;
  shippingFee: number;
  freeShippingThreshold: number;
};

export function calculateOrderTotal({
  totalAmount,
  shippingFee,
  freeShippingThreshold,
}: {
  totalAmount: number;
  shippingFee: number;
  freeShippingThreshold: number;
}) {
  const actualShippingFee =
    totalAmount >= freeShippingThreshold ? 0 : shippingFee;

  return {
    shippingFee: actualShippingFee,
    grandTotal: totalAmount + actualShippingFee,
    freeShippingThreshold,
  };
}