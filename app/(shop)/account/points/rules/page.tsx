import Link from "next/link";

export default function PointsRulesPage() {
  return (
    <main className="max-w-2xl mx-auto px-2 md:px-3 py-5 md:py-6">

      {/* ==================================================
          標題
          ================================================== */}
      <div className="flex items-center justify-between mb-2 md:mb-4">
        <h1 className="text-xl md:text-4xl font-bold text-[#4E342E]">
          🎁 會員積分獎勵規則
        </h1>

        <Link
          href="/account"
          className="md:text-2xl text-orange-600 font-bold hover:text-orange-700 transition whitespace-nowrap mr-5"
        >
          返回會員中心
        </Link>
      </div>

      {/* ==================================================
          核心規則
          ================================================== */}
      <section className="grid grid-cols-[26%_26%_42%] gap-2 md:gap-4 mb-2 md:mb-5">

        <div className="rounded-2xl border p-2 md:p-4 text-center shadow-sm bg-white">
          <p className="text-2xl md:text-3xl font-bold text-purple-700">
            100元
          </p>
          <p className="mt-1 text-sm md:text-lg text-[#FF0000]">
            → 1 點
          </p>
        </div>

        <div className="rounded-2xl border p-2 md:p-4 text-center shadow-sm bg-white">
          <p className="text-2xl md:text-3xl font-bold text-purple-700">
            1 點
          </p>
          <p className="mt-1 text-sm md:text-lg text-[#FF0000]">
            = NT$1
          </p>
        </div>

        <div className="rounded-2xl border p-2 md:p-4 text-center shadow-sm bg-white">
          <p className="text-2xl md:text-3xl font-bold text-purple-700">
            NT$100
          </p>
          <p className="mt-1 text-sm md:text-base text-[#FF0000]">
            每筆訂單最高折抵
          </p>
        </div>

      </section>

      {/* ==================================================
          積分如何累積
          ================================================== */}
      <section className="border rounded-2xl p-4 md:p-5 shadow-sm bg-white mb-3 md:mb-4">

        <h2 className="text-2xl font-bold text-[#4E342E] mb-3">
          ⭐ 積分如何累積
        </h2>

        <p className="text-lg leading-relaxed">
          會員消費每滿 <strong>NT$100，贈 1 點積分</strong>。
        </p>

        <p className="mt-2 text-gray-600 leading-relaxed">
          積分將依符合資格的實際消費金額計算，
          會員可於會員中心查看目前積分。
        </p>

      </section>

      {/* ==================================================
          積分折抵
          ================================================== */}
      <section className="border rounded-2xl p-4 md:p-5 shadow-sm bg-white mb-3 md:mb-4">

        <h2 className="text-2xl font-bold text-[#4E342E] mb-3">
          💰 積分折抵
        </h2>

        <p className="text-lg leading-relaxed">
          <strong>1 點積分 = NT$1</strong>
        </p>

        <p className="mt-2 text-gray-600 leading-relaxed">
          會員積分可於符合使用條件的訂單中折抵消費金額。
        </p>

      </section>

      {/* ==================================================
          使用條件
          ================================================== */}
      <section className="border rounded-2xl p-4 md:p-5 shadow-sm bg-white mb-3 md:mb-4">

        <h2 className="text-2xl font-bold text-[#4E342E] mb-3">
          🛒 積分使用條件
        </h2>

        <ul className="space-y-2 text-lg leading-relaxed">
          <li>
            • 單筆訂單金額須滿 <strong>NT$1,000（含）</strong>，方可使用積分。
          </li>
          <li>
            • 每筆訂單最多使用 <strong>100 點積分</strong>。
          </li>
          <li>
            • 每筆訂單最高可折抵 <strong>NT$100</strong>。
          </li>
        </ul>

      </section>

      {/* ==================================================
          優惠擇一
          ================================================== */}
      <section className="border rounded-2xl p-4 md:p-5 shadow-sm bg-white mb-3 md:mb-4">

        <h2 className="text-2xl font-bold text-[#4E342E] mb-3">
          🎁 優惠擇一使用
        </h2>

        <p className="text-lg leading-relaxed">
          每筆訂單的折價優惠採 <strong>擇一使用</strong>。
        </p>

        <p className="mt-2 text-gray-600 leading-relaxed">
          會員可依當次訂單符合的優惠條件，
          選擇使用會員積分、生日優惠券、運費折價券或其他適用的折價優惠。
        </p>

        <p className="mt-3 font-bold text-orange-600">
          同一筆訂單不得同時使用多種折價優惠。
        </p>

      </section>

      {/* ==================================================
          取消訂單與退貨
          ================================================== */}
      <section className="border rounded-2xl p-4 md:p-5 shadow-sm bg-white mb-3 md:mb-4">

        <h2 className="text-2xl font-bold text-[#4E342E] mb-3">
          🔄 訂單取消與退貨
        </h2>

        <p className="text-lg leading-relaxed text-gray-700">
          會員積分依實際完成的消費提供回饋。
          若訂單取消、退貨或其他原因導致消費不成立，
          系統將依實際交易狀況調整相關積分。
        </p>

        <p className="mt-3 text-lg leading-relaxed text-gray-700">
          已發放的消費回饋積分，將於符合回收條件時由系統回收。
        </p>

        <p className="mt-3 text-lg leading-relaxed text-gray-700">
          若訂單曾使用會員積分折抵，
          取消或退貨時，系統將依實際交易狀況處理已使用積分的返還。
        </p>

      </section>

      {/* ==================================================
          注意事項
          ================================================== */}
      <section className="border rounded-2xl p-4 md:p-5 shadow-sm bg-white mb-2 md:mb-4">

        <h2 className="text-2xl font-bold text-[#4E342E] mb-3">
          📋 積分注意事項
        </h2>

        <ol className="space-y-2 text-base md:text-lg leading-relaxed text-gray-700">
          <li>1. 會員積分僅限會員本人於徐媽媽冰鑽滷味網站購物時使用。</li>
          <li>2. 會員積分每 1 點折抵 NT$1，不得兌換現金。</li>
          <li>3. 會員積分不得轉讓予其他會員。</li>
          <li>4. 積分使用須符合網站所公告之使用門檻及使用上限。</li>
          <li>5. 積分與其他折價優惠不得於同一筆訂單同時使用。</li>
          <li>6. 若有異常取得、使用或其他不符合規則之積分，系統得進行調整或回收。</li>
          <li>7. 會員積分制度及相關優惠規則如有調整，將於網站公告後生效。</li>
        </ol>

      </section>

      {/* ==================================================
          結尾
          ================================================== */}
      <section className="text-center py-3">

        <p className="text-xl font-bold text-[#4E342E]">
          💜 每一次消費，都是下一次購物的回饋
        </p>

        <p className="mt-2 text-gray-600">
  感謝您的支持，
   <br className="md:hidden" />
  徐媽媽冰鑽滷味陪您一起分享每一份美味。
</p>

      </section>

    </main>
  );
}