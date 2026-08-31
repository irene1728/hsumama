
export default function ShippingPolicyPage() {
  return (
    <main className="min-h-screen bg-white pt-28">
      {/* 頁面標題 */}
      <section className="bg-[#FFF8F0] py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-8 text-center">
          <p className="text-orange-600 font-semibold tracking-widest">
            SHIPPING POLICY
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mt-2">
            運送政策
          </h1>

          <p className="text-gray-500 mt-5">
            保鮮真空包裝，冷凍宅配送到您家。
          </p>
        </div>
      </section>

      {/* 01 配送方式 */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-8">
            配送方式
          </h2>

          <div className="rounded-3xl bg-[#FFF8F0] border border-orange-100 p-6 md:p-8">
            <h3 className="text-xl font-bold text-stone-800 mb-4">
              新竹貨運冷凍宅配
            </h3>

            <p className="text-gray-600 leading-8">
              本店所有商品均委託新竹貨運以冷凍宅配方式配送，
              讓商品在適當的保存條件下送達您手中。
            </p>
          </div>
        </div>
      </section>

      {/* 02 配送範圍 */}
      <section className="bg-[#FFF8F0] py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-8">
            配送範圍
          </h2>

          <div className="bg-white rounded-3xl border border-orange-100 p-6 md:p-8">
            <h3 className="text-xl font-bold text-stone-800 mb-4">
              台灣本島
            </h3>

            <p className="text-gray-600 leading-8">
              目前配送範圍為台灣本島地區。
              實際配送地區仍依新竹貨運冷凍宅配服務範圍為準。
            </p>
          </div>
        </div>
      </section>

      {/* 03 出貨時間 */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-8">
            出貨時間
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-orange-100 bg-[#FFF8F0] p-6 md:p-8">
              <h3 className="text-xl font-bold text-stone-800 mb-4">
                一般商品
              </h3>

              <p className="text-gray-600 leading-8">
                本店商品皆為接單生產、手工製作及自產自銷。
                正常情況下，於下單後約 3～10 天內出貨。
              </p>
            </div>

            <div className="rounded-3xl border border-orange-100 bg-[#FFF8F0] p-6 md:p-8">
              <h3 className="text-xl font-bold text-stone-800 mb-4">
                預購商品
              </h3>

              <p className="text-gray-600 leading-8">
                如您訂購的商品為「預購商品」，
                原則上於下單後約 7～14 天內出貨。
              </p>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-3xl border border-orange-100 p-6 md:p-8">
            <p className="text-gray-600 leading-8">
              ※ 實際出貨時間可能因訂單量、生產狀況、節慶或其他不可預期因素而有所調整。
            </p>
          </div>
        </div>
      </section>

      {/* 04 配送時間 */}
      <section className="bg-[#FFF8F0] py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-8">
            配送時間
          </h2>

          <div className="bg-white rounded-3xl border border-orange-100 p-6 md:p-8">
            <h3 className="text-xl font-bold text-stone-800 mb-4">
              物流配送
            </h3>

            <ul className="space-y-3 text-gray-600 leading-8">
              <li>
                • 配送時間約為出貨後依物流配送狀況而定。
              </li>

              <li>
                • 配送時段通常為週一至週五 08:00～17:00。
              </li>

              <li>
                • 例假日原則上無安排配送。
              </li>

              <li>
                • 實際配送時間及路線依新竹貨運物流安排為準。
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 05 收貨注意事項 */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-8">
            收貨注意事項
          </h2>

          <div className="rounded-3xl bg-[#FFF8F0] border border-orange-100 p-6 md:p-8">
            <ul className="space-y-4 text-gray-600 leading-8">
              <li>
                • 收到商品後，請儘速確認包裝及商品狀況。
              </li>

              <li>
                • 冷凍食品收到後，請立即依商品包裝標示之保存方式妥善保存。
              </li>

              <li>
                • 如發現商品有破損、異常解凍、品項錯誤或其他問題，
                請儘速聯繫客服並提供相關照片，以便協助處理。
              </li>

              <li>
                • 如因收件人無法收貨、地址填寫錯誤或其他非本店因素造成配送延誤，
                可能影響商品品質及配送時間。
              </li>
            </ul>
          </div>
        </div>
      </section>


{/* 配送提醒 */}
<section className="bg-[#FFF8F0] py-12 md:py-16">
  <div className="max-w-5xl mx-auto px-6 md:px-8">
    <div className="bg-white rounded-3xl border border-orange-100 p-8 md:p-10 text-center">
      <p className="text-orange-600 font-semibold tracking-widest mb-2">
        SHIPPING NOTICE
      </p>

      <h2 className="text-3xl font-bold text-stone-800 mb-6">
        冷凍宅配配送提醒
      </h2>

      <p className="text-gray-600 leading-8">
        <span className="block">
          為確保商品品質，請確認收件資訊正確，並於預計配送期間留意物流配送通知。
        </span>

        <span className="block">
          商品送達後請儘速開箱並妥善冷凍保存。
        </span>
      </p>
    </div>
  </div>
</section>

    </main>
  );
}
