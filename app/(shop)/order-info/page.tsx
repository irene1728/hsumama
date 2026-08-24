export default function OrderInfoPage() {
  const steps = [
    {
      icon: "🛒",
      title: "挑選商品",
      text: "瀏覽商品，選擇喜歡的滷味與數量。",
    },
    {
      icon: "🧺",
      title: "加入購物車",
      text: "確認商品、數量與訂單金額後進入結帳。",
    },
    {
      icon: "💳",
      title: "完成付款",
      text: "選擇適合您的付款方式，完成訂單。",
    },
{
  icon: "🚚",
  title: "冷凍宅配到府",
  text: "商品完成出貨後，以冷凍宅配方式送到您家。",
},
  ];

  return (
    <main className="min-h-screen bg-white pt-28">
      {/* 訂購流程 */}
      <section className="bg-[#FFF8F0] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-10">
            <p className="text-orange-600 font-semibold tracking-widest">
              ORDER PROCESS
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mt-2">
              訂購方式
            </h1>

            <p className="text-gray-500 mt-5">
              四個步驟，輕鬆把美味帶回家
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative bg-white rounded-3xl shadow-sm border border-orange-100 p-8 md:p-10 text-center hover:shadow-lg transition"
              >
                <div className="text-5xl md:text-6xl mb-5">
                  {step.icon}
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-stone-800 mb-4">
                  {step.title}
                </h2>

                <p className="text-gray-600 leading-7">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 付款方式 */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="text-center mb-10">
            <p className="text-orange-600 font-semibold tracking-widest">
              PAYMENT
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mt-2">
              付款方式
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-orange-100 bg-[#FFF8F0] p-8">
              <div className="text-4xl mb-4">🏦</div>

              <h3 className="text-2xl font-bold text-stone-800 mb-4">
                ATM 轉帳
              </h3>

              <p className="text-gray-600 leading-8">
                下單時選擇 ATM 轉帳付款方式，
                完成轉帳後依網站流程提供付款資訊，
                方便我們確認您的訂單。
              </p>
            </div>

            <div className="rounded-3xl border border-orange-100 bg-[#FFF8F0] p-8">
              <div className="text-4xl mb-4">📦</div>

              <h3 className="text-2xl font-bold text-stone-800 mb-4">
                貨到付款
              </h3>

              <p className="text-gray-600 leading-8">
                下單時選擇貨到付款，
                商品配送到府時再支付訂單款項，
                讓您購買更加方便。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 配送方式 */}
      <section className="bg-[#FFF8F0] py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-8 text-center">
          <p className="text-orange-600 font-semibold tracking-widest">
            DELIVERY
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mt-2 mb-8">
            配送方式
          </h2>

          <div className="bg-white rounded-3xl border border-orange-100 p-8 md:p-10">
            <div className="text-5xl mb-5">🚚</div>

         <h3 className="text-2xl font-bold text-stone-800 mb-4">
  新竹貨運冷凍宅配到府
</h3>

<p className="text-gray-600 leading-8 max-w-3xl mx-auto">
  <span className="block">
    商品完成備貨後，將由新竹貨運以冷凍宅配方式配送，
  </span>
  <span className="block">
    讓食品在適當的保存條件下送到您手中。
  </span>
</p>
          </div>
        </div>
      </section>

      {/* 下單提醒 */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="rounded-3xl bg-[#FFF8F0] border border-orange-100 p-8 md:p-10">
            <p className="text-orange-600 font-semibold tracking-widest mb-2">
              NOTICE
            </p>

            <h2 className="text-3xl font-bold text-stone-800 mb-6">
              下單前小提醒
            </h2>

            <div className="space-y-4 text-gray-600 leading-8">
              <p>
                • 下單前請確認收件人姓名、電話與配送地址是否正確。
              </p>

              <p>
                • 請確認訂購商品與數量，再送出訂單。
              </p>

              <p>
                • ATM 轉帳訂單請依網站提供的付款資訊完成付款。
              </p>

              <p>
                • 商品採冷凍宅配方式配送，收到商品後請依包裝上的保存方式妥善保存。
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}