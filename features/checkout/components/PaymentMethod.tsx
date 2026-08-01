type PaymentMethodProps = {
  paymentMethod: string;
  onPaymentMethodChange: (value: string) => void;
};

export default function PaymentMethod({
  paymentMethod,
  onPaymentMethodChange,
}: PaymentMethodProps) {
  return (
    <section className="bg-white border border-gray-200 rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold text-stone-800">
        付款方式
      </h2>

      <div className="mt-4 space-y-4">

        {/* ATM 轉帳 */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="paymentMethod"
            value="ATM轉帳"
            checked={paymentMethod === "ATM轉帳"}
            onChange={(e) =>
              onPaymentMethodChange(e.target.value)
            }
            className="w-5 h-5 accent-orange-600"
          />

          <span className="text-stone-800 font-medium">
            ATM 轉帳
          </span>
        </label>

        {/* 貨到付款 */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="paymentMethod"
            value="貨到付款"
            checked={paymentMethod === "貨到付款"}
            onChange={(e) =>
              onPaymentMethodChange(e.target.value)
            }
            className="w-5 h-5 accent-orange-600"
          />

          <span className="text-stone-800 font-medium">
            貨到付款
          </span>
        </label>

      </div>
    </section>
  );
}