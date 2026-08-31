export default function ReturnPolicyPage() {
  return (
    <main className="min-h-screen bg-white pt-28">
      {/* 頁面標題 */}
      <section className="bg-[#FFF8F0] py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-8 text-center">
          <p className="text-orange-600 font-semibold tracking-widest">
            RETURN & EXCHANGE
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mt-2">
            退換貨政策
          </h1>

          <p className="text-gray-500 mt-5">
            商品有任何問題，請先聯繫我們，我們會協助您處理
          </p>
        </div>
      </section>

      {/* 01 退換貨政策 */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
       
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-8">
            退換貨政策
          </h2>

          <div className="space-y-6 text-gray-600 leading-8">
            <div className="rounded-3xl bg-[#FFF8F0] border border-orange-100 p-6 md:p-8">
              <h3 className="text-xl font-bold text-stone-800 mb-4">
                冷凍食品之退貨說明
              </h3>

              <p>
                本網站所販售之冷凍食品具有保存期限及需冷凍保存等商品特性。
                依「通訊交易解除權合理例外情事適用準則」規定，
                對於易於腐敗、保存期限較短或解約時即將逾期之商品，
                經事先告知消費者後，得排除消費者保護法第19條之7日解除權。
              </p>

              <p className="mt-4">
                因此，符合上述條件之冷凍食品，除商品本身瑕疵、
                運送過程造成損壞或其他依法應由本店負責之情形外，
                恕無法因個人因素或改變購買意願而辦理退換貨。
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-stone-800 mb-4">
                以下情況可申請退換貨
              </h3>

              <ul className="list-disc pl-6 space-y-2">
                <li>商品本身有明顯瑕疵或損壞。</li>
                <li>商品於運送過程中發生破損、異常或嚴重解凍。</li>
                <li>收到的商品與訂購商品不符。</li>
                <li>商品數量短少或有其他可歸責於本店之問題。</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-stone-800 mb-4">
                以下情況恕無法受理一般退換貨
              </h3>

              <ul className="list-disc pl-6 space-y-2">
                <li>因個人因素而改變購買意願。</li>
                <li>商品已食用或部分食用。</li>
                <li>因保存方式不當造成商品變質。</li>
                <li>商品未依規定冷凍保存。</li>
                <li>因人為因素造成商品損壞。</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 02 商品瑕疵／運送損壞 */}
      <section className="bg-[#FFF8F0] py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
        
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-8">
            商品瑕疵／運送損壞
          </h2>

          <div className="bg-white rounded-3xl border border-orange-100 p-6 md:p-8">
            <p className="text-gray-600 leading-8 mb-6">
              收到商品後請儘速檢查商品狀況。
              若發現商品有瑕疵、破損、異常解凍或品項錯誤，
              請立即與客服聯繫，以便我們協助處理。
            </p>

            <h3 className="text-xl font-bold text-stone-800 mb-4">
              發現商品異常時，請協助提供
            </h3>

            <ul className="list-disc pl-6 space-y-2 text-gray-600 leading-8">
              <li>訂單編號及訂購人姓名。</li>
              <li>商品外箱及物流標籤照片。</li>
              <li>商品本體及異常狀況的清楚照片。</li>
              <li>如有需要，可提供開箱過程照片或影片。</li>
              <li>商品請先妥善冷凍保存，勿自行丟棄。</li>
            </ul>

            <p className="mt-6 text-gray-600 leading-8">
              客服確認商品狀況後，將依實際情況協助安排退貨、
              換貨或其他適當處理方式。
            </p>
          </div>
        </div>
      </section>

      {/* 03 退貨流程 */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
      
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-8">
            退貨流程
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "STEP 1",
                title: "聯繫客服",
                text: "提供訂單編號、訂購人姓名及商品問題說明。",
              },
              {
                step: "STEP 2",
                title: "提供照片",
                text: "提供商品及外箱等相關照片，協助我們確認商品狀況。",
              },
              {
                step: "STEP 3",
                title: "確認退換貨",
                text: "客服確認後，依實際情況安排後續退換貨處理。",
              },
              {
                step: "STEP 4",
                title: "物流回收",
                text: "依客服通知將商品妥善包裝，並配合物流回收。",
              },
              {
                step: "STEP 5",
                title: "商品確認",
                text: "商品退回後，由本店確認商品狀況。",
              },
              {
                step: "STEP 6",
                title: "退款／換貨",
                text: "確認符合退換貨條件後，辦理退款或補寄商品。",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-3xl border border-orange-100 bg-[#FFF8F0] p-6"
              >
                <p className="text-orange-600 font-semibold tracking-widest text-sm mb-2">
                  {item.step}
                </p>

                <h3 className="text-xl font-bold text-stone-800 mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 退款方式 */}
      <section className="bg-[#FFF8F0] py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-8">
            退款方式
          </h2>

    <div className="max-w-3xl">
  <div className="bg-white rounded-3xl border border-orange-100 p-6 md:p-8">
    <div className="text-4xl mb-4">🏦</div>

    <h3 className="text-xl font-bold text-stone-800 mb-4">
      ATM/線上轉帳
    </h3>

    <p className="text-gray-600 leading-8">
      確認退貨.商品無誤完成後，將由本店依顧客提供之銀行帳戶辦理退款。
    </p>
  </div>
</div>

          <div className="mt-6 bg-white rounded-3xl border border-orange-100 p-6 md:p-8">
            <h3 className="text-xl font-bold text-stone-800 mb-4">
              退款時間
            </h3>

            <p className="text-gray-600 leading-8">
              退款作業將於退貨商品確認完成後辦理，
              實際入帳時間依銀行作業時間而定。
            </p>
          </div>
        </div>
      </section>

      {/* 05 特別注意事項 */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
       
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-8">
            特別注意事項
          </h2>

          <div className="rounded-3xl bg-[#FFF8F0] border border-orange-100 p-6 md:p-8">
            <ul className="space-y-4 text-gray-600 leading-8">
              <li>
                • 收到商品後請儘速檢查，並確認商品包裝及內容物是否完整。
              </li>

              <li>
                • 冷凍食品收到後請依商品包裝標示之保存方式妥善保存。
              </li>

              <li>
                • 如商品有異常，請先拍照或錄影存證，再聯繫客服。
              </li>

              <li>
                • 未經客服確認前，請勿自行丟棄問題商品，以利後續確認及處理。
              </li>

              <li>
                • 商品如已食用或部分食用，因商品狀況難以確認，
                一般情況下恕無法辦理退換貨。
              </li>

              <li>
                • 因消費者保存方式不當、未依規定冷凍保存或人為因素造成商品變質或損壞，
                恕無法辦理一般退換貨。
              </li>

              <li>
                • 因個人喜好、口味或改變購買意願等非商品瑕疵因素，
                不適用於本網站所提供之退換貨處理。
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-orange-100">
              <p className="text-gray-600 leading-8">
                ※ 上述退換貨規定，不影響消費者依法就商品瑕疵或其他法定權利所為之主張。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 客服提醒 */}
      <section className="bg-[#FFF8F0] py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <p className="text-orange-600 font-semibold tracking-widest mb-2">
            CUSTOMER SERVICE
          </p>

          <h2 className="text-3xl font-bold text-stone-800 mb-4">
            商品有任何問題，請先聯繫我們
          </h2>

          <p className="text-gray-600 leading-8">
            如收到商品後發現異常，請保留商品及相關包裝，
            並儘速與客服聯繫，我們會協助您確認及處理。
          </p>
        </div>
      </section>
    </main>
  );
}
