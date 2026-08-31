export default function OrderInfoPage() {
  const steps = [
    {
      icon: "🛒",
      title: "挑選商品",
      text: "瀏覽商品.選擇喜歡的美食。",
    },
    {
      icon: "🧺",
      title: "加入購物車",
      text: "確認商品.數量.金額後進入結帳。",
    },
  {
  icon: "💳",
  title: "完成付款",
  text: "下訂單後.請盡快完成轉帳付款。",
},
{
  icon: "🚚",
  title: "冷凍宅配到府",
  text: "商品以冷凍宅配方式送到您家。",
},
  ];

  return (
    <main className="min-h-screen bg-white pt-16 md:pt-24">
      {/* 訂購流程 */}
      <section className="bg-[#FFF8F0] py-4 md:py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-5">
          <div className="text-center mb:-3 md:mb-5">
           
            <h1 className="text-2xl md:text-5xl md:font-bold text-red-600 mt-1 md:mt-2">
              訂購方式
            </h1>

            <p className="text-gray-500 md:mt-3">
              四個步驟，輕鬆把美味帶回家
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-2 md:gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative bg-white rounded-3xl shadow-sm border border-orange-100 p-4 md:p-5 text-center hover:shadow-lg transition"
              >
                <div className="text-4xl md:text-4xl mb-4">
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
      <section className="py-4 md:py-10">
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
          
          

            <h2 className="text-2xl md:text-5xl md:font-bold text-red-600 mt-1 md:mt-4">
              付款方式
            </h2>
          

       <div className="rounded-3xl border border-orange-100 bg-[#FFF8F0] p-4 md:p-10 mt-2 md:mt-5">
  <div className="text-4xl mb-4">🏦</div>

  <h3 className="text-2xl font-bold text-stone-800 mb-4">
    ATM/線上轉帳
  </h3>

  <p className="text-gray-600 leading-8">
    訂單成立後.請盡快完成付款並LINE通知。
  </p>
</div>
        </div>
      </section>

      {/* 配送方式 */}
      <section className="bg-[#FFF8F0] py-4 md:py-10">
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
         
          <h2 className="text-2xl md:text-5xl md:font-bold text-red-600 mt-1 md:mt-4">
            配送方式
          </h2>

          <div className="bg-white rounded-3xl border border-orange-100 p-4 md:p-10 mt-2 md:mt-5">
            <div className="text-4xl mb-4">🚚</div>

         <h3 className="text-2xl font-bold text-stone-800 mb-2 md:mb-4">
  新竹貨運冷凍宅配到府
</h3>

<p className="text-gray-600 leading-6 md:leading-8 max-w-3xl mx-auto">
  <span className="block">
    商品完成備貨後，
    </span>
     <span className="block">
    將由新竹貨運以冷凍宅配方式配送，
  </span>
  <span className="block">
    讓食品在適當的保存條件下送到您手中。
  </span>
</p>
          </div>
        </div>
      </section>

      {/* 下單提醒 */}
      <section className="py-4 md:py-10">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="rounded-3xl bg-[#FFF8F0] border border-orange-100 p-8 md:p-10">
           

            <h2 className="text-3xl font-bold text-red-600 mb-6">
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
                • ATM/線上轉帳訂單請依網站提供的付款資訊完成付款。
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