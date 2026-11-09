
type CheckoutFormProps = {
  customerName: string;
  onCustomerNameChange: (value: string) => void;

  phone: string;
  onPhoneChange: (value: string) => void;

  email: string;
  onEmailChange: (value: string) => void;

  address: string;
  onAddressChange: (value: string) => void;

  note: string;
  onNoteChange: (value: string) => void;

  deliveryMethod: string;

paymentMethod: string;

  onPaymentMethodChange: (value: string) => void;

};

const PICKUP_ADDRESS =
  "臺中市太平區中興里永義路139巷20號";

export default function CheckoutForm({
  customerName,
  onCustomerNameChange,

  phone,
  onPhoneChange,

  email,
  onEmailChange,

  address,
  onAddressChange,

  note,
  onNoteChange,

  deliveryMethod,

    paymentMethod,
  onPaymentMethodChange,

}: CheckoutFormProps) {

  const isPickup = deliveryMethod === "自取";

  return (
    <section className="bg-white border border-gray-200 rounded-2xl shadow p-4">
      <h2 className="text-2xl font-bold text-stone-800">
        訂購人資訊
      </h2>

      <p className="mt-1 text-lg text-gray-500">
        請填寫您的聯絡資料及地址。
      </p>

      <div className="mt-4 space-y-4">

        {/* 姓名 */}
        <div>
          <label
            htmlFor="customerName"
            className="block mb-2 font-semibold text-stone-700"
          >
            姓名 <span className="text-red-500">*</span>
          </label>

          <input
            id="customerName"
            type="text"
            value={customerName}
            onChange={(e) =>
              onCustomerNameChange(e.target.value)
            }
            placeholder="請輸入姓名"
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>

        {/* 手機 */}
        <div>
          <label
            htmlFor="phone"
            className="block mb-2 font-semibold text-stone-700"
          >
            手機 <span className="text-red-500">*</span>
          </label>

          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) =>
              onPhoneChange(e.target.value)
            }
            placeholder="請輸入手機號碼"
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block mb-2 font-semibold text-stone-700"
          >
            Email <span className="text-red-500">*</span>
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) =>
              onEmailChange(e.target.value)
            }
            placeholder="example@email.com"
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>

        {/* 顧客地址 */}
        <div>
          <label
            htmlFor="address"
            className="block mb-2 font-semibold text-stone-700"
          >
            {isPickup ? "居住地址" : "收件地址"}
            <span className="text-red-500"> *</span>
          </label>

          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) =>
              onAddressChange(e.target.value)
            }
            placeholder={
              isPickup
                ? "自取免運限台中市，請填寫台中市地址"
                : "請輸入完整收件地址"
            }
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />

          {isPickup && (
            <p className="mt-2 text-sm text-green-700">
              自取免運僅限居住地址為台中市的顧客。
            </p>
          )}
        </div>

        {/* 自取地址 */}
        {isPickup && (
          <div className="rounded-xl border border-green-200 bg-green-50 p-4">
            <p className="font-bold text-green-800">
              📍 固定自取地點
            </p>

            <p className="mt-2 text-stone-700">
              {PICKUP_ADDRESS}
            </p>

            <p className="mt-2 text-sm font-semibold text-green-700">
              自取免運｜運費 NT$0
            </p>

            <p className="mt-1 text-xs text-gray-500">
              請先完成線上訂單，再前往指定地點取貨。
            </p>
          </div>
        )}


{/* 付款方式 */}
<div>
  <label className="block mb-3 font-semibold text-stone-700">
    付款方式
    <span className="text-red-500"> *</span>
  </label>

  <div className="space-y-3">

    {/* ATM／線上轉帳 */}
    <label className="flex items-center gap-3 rounded-xl border border-gray-300 p-4 cursor-pointer hover:border-orange-500 hover:bg-orange-50">
      <input
        type="radio"
        name="paymentMethod"
        value="ATM／線上轉帳"
        checked={paymentMethod === "ATM／線上轉帳"}
        onChange={(e) =>
          onPaymentMethodChange(e.target.value)
        }
        className="w-5 h-5 accent-orange-600"
      />

      <div>
        <p className="font-semibold text-stone-800">
          ATM／線上轉帳
        </p>
        <p className="mt-1 text-sm text-gray-500">
          訂單成立後，依照提供的銀行帳號完成匯款。
        </p>
      </div>
    </label>

    {/* 自取現場現金付款 */}
    {isPickup && (
      <label className="flex items-center gap-3 rounded-xl border border-gray-300 p-4 cursor-pointer hover:border-orange-500 hover:bg-orange-50">
        <input
          type="radio"
          name="paymentMethod"
          value="自取現場現金付款"
          checked={paymentMethod === "自取現場現金付款"}
          onChange={(e) =>
            onPaymentMethodChange(e.target.value)
          }
          className="w-5 h-5 accent-orange-600"
        />

        <div>
          <p className="font-semibold text-stone-800">
            自取現場現金付款
          </p>
          <p className="mt-1 text-sm text-gray-500">
            前往指定取貨地點時，以現金支付訂單金額。
          </p>
        </div>
      </label>
    )}

  </div>
</div>


        {/* 備註 */}
        <div>
          <label
            htmlFor="note"
            className="block mb-2 font-semibold text-stone-700"
          >
            備註
            <span className="ml-2 text-sm font-normal text-gray-500">
              （選填）
            </span>
          </label>

          <textarea
            id="note"
            rows={4}
            value={note}
            onChange={(e) =>
              onNoteChange(e.target.value)
            }
            placeholder="有任何訂單需求，歡迎留言..."
            className="w-full rounded-xl border border-gray-300 px-4 py-3 transition resize-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>

      </div>
    </section>
  );
}
