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
};

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
}: CheckoutFormProps) {


  return (
    <section className="bg-white border border-gray-200 rounded-2xl shadow p-8">
      <h2 className="text-2xl font-bold text-stone-800">
        收件資訊
      </h2>

      <p className="mt-2 text-gray-500">
        請填寫收件人資訊，以便安排配送。
      </p>

      <div className="mt-8 space-y-6">

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
  placeholder="請輸入收件人姓名"
  className="
    w-full
    rounded-xl
    border
    border-gray-300
    px-4
    py-3
    transition
    focus:border-orange-500
    focus:ring-2
    focus:ring-orange-500
    focus:outline-none
  "
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
  className="
    w-full
    rounded-xl
    border
    border-gray-300
    px-4
    py-3
    transition
    focus:border-orange-500
    focus:ring-2
    focus:ring-orange-500
    focus:outline-none
  "
/>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block mb-2 font-semibold text-stone-700"
          >
            Email
            <span className="ml-2 text-sm font-normal text-gray-500">
              （選填）
            </span>
          </label>

        <input
  id="email"
  type="email"
  value={email}
  onChange={(e) =>
    onEmailChange(e.target.value)
  }
  placeholder="example@email.com"
  className="
    w-full
    rounded-xl
    border
    border-gray-300
    px-4
    py-3
    transition
    focus:border-orange-500
    focus:ring-2
    focus:ring-orange-500
    focus:outline-none
  "
/>
        </div>

        {/* 地址 */}
        <div>
          <label
            htmlFor="address"
            className="block mb-2 font-semibold text-stone-700"
          >
            地址 <span className="text-red-500">*</span>
          </label>

        <input
  id="address"
  type="text"
  value={address}
  onChange={(e) =>
    onAddressChange(e.target.value)
  }
  placeholder="請輸入完整收件地址"
  className="
    w-full
    rounded-xl
    border
    border-gray-300
    px-4
    py-3
    transition
    focus:border-orange-500
    focus:ring-2
    focus:ring-orange-500
    focus:outline-none
  "
/>
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
  placeholder="例如：下午配送、到貨前請先來電..."
  className="
    w-full
    rounded-xl
    border
    border-gray-300
    px-4
    py-3
    transition
    resize-none
    focus:border-orange-500
    focus:ring-2
    focus:ring-orange-500
    focus:outline-none
  "
/>
        </div>

      </div>
    </section>
  );
}