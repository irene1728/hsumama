type DeliveryMethodProps = {
  deliveryMethod: string;
  onDeliveryMethodChange: (value: string) => void;
};

export default function DeliveryMethod({
  deliveryMethod,
  onDeliveryMethodChange,
}: DeliveryMethodProps) {

  return (
    <section className="bg-white border border-gray-200 rounded-2xl shadow p-8">
      <h2 className="text-2xl font-bold text-stone-800">
        配送方式
      </h2>

      <p className="mt-2 text-gray-500">
        請選擇您希望的配送方式。
      </p>

      <div className="mt-8 space-y-4">

        {/* 新竹物流冷凍宅配 */}
        <label
          className="
            flex
            items-center
            gap-4
            rounded-xl
            border
            border-gray-300
            p-5
            cursor-pointer
            transition
            hover:border-orange-500
            hover:bg-orange-50
          "
        >
        <input
  type="radio"
  name="deliveryMethod"
  value="新竹物流冷凍宅配"
  checked={deliveryMethod === "新竹物流冷凍宅配"}
  onChange={(e) =>
    onDeliveryMethodChange(e.target.value)
  }
  className="w-5 h-5 accent-orange-600"
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

        {/* 7-11 */}
        <label
          className="
            flex
            items-center
            gap-4
            rounded-xl
            border
            border-gray-300
            p-5
            cursor-not-allowed
            bg-gray-50
            opacity-60
          "
        >
          <input
            type="radio"
            name="deliveryMethod"
            value="seven"
            disabled
            className="w-5 h-5"
          />

          <div>
            <p className="font-semibold text-stone-800">
              7-ELEVEN 冷凍店到店
            </p>

            <p className="text-sm text-gray-500 mt-1">
              即將推出
            </p>
          </div>
        </label>

        {/* 全家 */}
        <label
          className="
            flex
            items-center
            gap-4
            rounded-xl
            border
            border-gray-300
            p-5
            cursor-not-allowed
            bg-gray-50
            opacity-60
          "
        >
          <input
            type="radio"
            name="deliveryMethod"
            value="family"
            disabled
            className="w-5 h-5"
          />

          <div>
            <p className="font-semibold text-stone-800">
              全家冷凍店到店
            </p>

            <p className="text-sm text-gray-500 mt-1">
              即將推出
            </p>
          </div>
        </label>

      </div>
    </section>
  );
}