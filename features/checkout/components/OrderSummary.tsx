type OrderItem = {
  name: string;
  quantity: number;
};

type OrderSummaryProps = {
  cart: OrderItem[];

  totalQuantity: number;

  totalAmount: number;

  deliveryMethod: string;

  paymentMethod: string;
};

export default function OrderSummary({
  cart,
  totalQuantity,
  totalAmount,
  deliveryMethod,
  paymentMethod,
}: OrderSummaryProps) {

  return (
    <section className="bg-white border border-gray-200 rounded-2xl shadow p-8 space-y-6">
      <h2 className="text-2xl font-bold text-stone-800">
        訂單摘要
      </h2>

      <p className="mt-2 text-gray-500">
        請再次確認您的訂單內容。
      </p>

      <div className="mt-8 space-y-5">

        {/* 商品列表（暫時示意） */}
      <div className="space-y-4">

  {cart.map((item) => (

    <div
      key={item.name}
      className="flex justify-between items-center"
    >

      <span>{item.name}</span>

      <span className="font-semibold">
        ×{item.quantity}
      </span>

    </div>

  ))}

</div>

        <hr />

        {/* 商品數量 */}
        <div className="flex justify-between">
          <span>商品數量</span>

          <span className="font-bold">
            {totalQuantity} 件
          </span>
        </div>

        <hr />

        {/* 配送方式 */}
        <div className="flex justify-between">
          <span>配送方式</span>

          <span className="font-bold">
            {deliveryMethod}
          </span>
        </div>

        <hr />

        {/* 付款方式 */}
        <div className="flex justify-between">
          <span>付款方式</span>

          <span className="font-bold">
            {paymentMethod}
          </span>
        </div>

        <hr />

        {/* 商品金額 */}
        <div className="flex justify-between text-lg">
          <span className="font-bold">
            商品金額
          </span>

          <span className="font-bold text-orange-600">
           NT$ {totalAmount.toLocaleString("zh-TW")}
          </span>
        </div>

      </div>
    </section>
  );
}