
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

const {
  expanded,
  toggleExpanded,
} = useOrderSummary();

const hiddenCount = Math.max(cart.length - 5, 0);

  return (
    <section className="bg-white border border-gray-200 rounded-2xl shadow p-4 space-y-2">
      <h2 className="text-2xl font-bold text-stone-800">
        訂單摘要
      </h2>

      <p className="mt-1 text-[#CC0000]">
        請再次確認您的訂單內容。
      </p>

      <div className="mt-4 space-y-5">

        {/* 商品列表（暫時示意） */}
<div className="space-y-2">

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

</div>
{cart.length > 5 && (
  <button
    type="button"
    onClick={toggleExpanded}
    className="
      mt-4
      text-orange-600
      font-semibold
      hover:underline
    "
  >
    {expanded
      ? "▲ 收合商品"
      : `▼ 查看其餘 ${hiddenCount} 項商品`}
  </button>
)}
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
