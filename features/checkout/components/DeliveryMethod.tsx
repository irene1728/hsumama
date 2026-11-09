
type DeliveryMethodProps = {
  deliveryMethod: string;
  onDeliveryMethodChange: (value: string) => void;
};

export default function DeliveryMethod({
  deliveryMethod,
  onDeliveryMethodChange,
}: DeliveryMethodProps) {
  return (
    <section className="bg-white border border-gray-200 rounded-2xl shadow p-4">
      <h2 className="text-2xl font-bold text-stone-800">
        配送方式
      </h2>

      <p className="mt-2 text-gray-500">
        請選擇您希望的配送方式。
      </p>

      {/* 宅配與自取：手機上下、電腦左右 */}
      <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-2">

        {/* 新竹物流冷凍宅配 */}
        <label
          className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition ${
            deliveryMethod === "新竹物流冷凍宅配"
              ? "border-orange-500 bg-orange-50"
              : "border-gray-300 hover:border-orange-500 hover:bg-orange-50"
          }`}
        >
          <input
            type="radio"
            name="deliveryMethod"
            value="新竹物流冷凍宅配"
            checked={deliveryMethod === "新竹物流冷凍宅配"}
            onChange={(e) =>
              onDeliveryMethodChange(e.target.value)
            }
            className="w-5 h-5 accent-orange-600 shrink-0"
          />

          <div>
            <p className="font-semibold text-stone-800">
              新竹物流冷凍宅配
            </p>
            <p className="text-sm text-gray-500 mt-1">
              配送至指定地址
            </p>
          </div>
        </label>

        {/* 自取免運 */}
        <label
          className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition ${
            deliveryMethod === "自取"
              ? "border-orange-500 bg-orange-50"
              : "border-gray-300 hover:border-orange-500 hover:bg-orange-50"
          }`}
        >
          <input
            type="radio"
            name="deliveryMethod"
            value="自取"
            checked={deliveryMethod === "自取"}
            onChange={(e) =>
              onDeliveryMethodChange(e.target.value)
            }
            className="w-5 h-5 accent-orange-600 shrink-0"
          />

          <div>
            <p className="font-semibold text-stone-800">
              自取免運
              <span className="ml-2 text-orange-600">
                NT$0
              </span>
            </p>

            <p className="text-sm text-gray-500 mt-1">
              限台中市顧客
            </p>
          </div>
        </label>

      </div>

    </section>
  );
}
