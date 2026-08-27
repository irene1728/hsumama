import { useOrderSummary } from "@/features/checkout/hooks/useOrderSummary";

type OrderItem = {
  slug: string;
  name: string;
  quantity: number;
};

type OrderSummaryProps = {
  cart: OrderItem[];

  totalQuantity: number;

  totalAmount: number;

  shippingFee: number;

  freeShippingThreshold: number;

  grandTotal: number;

  deliveryMethod: string;

  paymentMethod: string;
};

export default function OrderSummary({
  cart,
  totalQuantity,
  totalAmount,
  shippingFee,
  freeShippingThreshold,
  grandTotal,
  deliveryMethod,
  paymentMethod,
}: OrderSummaryProps) {
  const {
    expanded,
    toggleExpanded,
  } = useOrderSummary();

  const hiddenCount = Math.max(cart.length - 5, 0);

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-800">
        訂單摘要
      </h2>

      <p className="mt-1 text-[#CC0000]">
        請再次確認您的訂單內容。
      </p>

      <div className="mt-3 space-y-3">

        {/* 商品列表 */}
        {(expanded ? cart : cart.slice(0, 5)).map((item) => (
          <div
            key={item.slug}
            className="flex justify-between items-start gap-3"
          >
            <span className="flex-1">
              {item.name}
            </span>

            <span className="font-semibold whitespace-nowrap">
              × {item.quantity}
            </span>
          </div>
        ))}

        {/* 查看其他商品 */}
        {!expanded && hiddenCount > 0 && (
          <button
            type="button"
            onClick={toggleExpanded}
            className="text-orange-600 font-semibold hover:text-orange-700"
          >
            ▼ 查看其餘 {hiddenCount} 項商品
          </button>
        )}

        {expanded && hiddenCount > 0 && (
          <button
            type="button"
            onClick={toggleExpanded}
            className="text-orange-600 font-semibold hover:text-orange-700"
          >
            ▲ 收起商品
          </button>
        )}

        {/* 商品數量 */}
        <div className="flex justify-between">
          <span>商品數量</span>

          <span className="font-bold">
            {totalQuantity} 件
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

        <hr />

        {/* 配送方式 */}
        <div className="flex justify-between">
          <span>配送方式</span>

          <span className="font-bold">
            {deliveryMethod}
          </span>
        </div>

        {/* 運送金額 */}
        <div className="flex justify-between">
          <span>運送金額</span>

          <span className="font-bold">
            {shippingFee === 0
              ? "NT$ 0"
              : `NT$ ${shippingFee.toLocaleString("zh-TW")}`}
          </span>
        </div>

        {/* 免運說明 */}
        <p className="text-base text-[#CC0000]">
          滿 NT$
          {freeShippingThreshold.toLocaleString("zh-TW")}
          免運費
        </p>

        <hr />

        {/* 付款方式 */}
        <div className="flex justify-between">
          <span>付款方式</span>

          <span className="font-bold">
            {paymentMethod}
          </span>
        </div>

        <hr />

        {/* 應付總金額 */}
        <div className="flex justify-between text-xl">
          <span className="font-bold">
            應付總金額
          </span>

          <span className="font-bold text-orange-600">
            NT$ {grandTotal.toLocaleString("zh-TW")}
          </span>
        </div>

      </div>
    </section>
  );
}
