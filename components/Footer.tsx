export default function Footer() {
  return (
    <footer className="bg-[#8B5E3C] text-white">

      <div className="max-w-7xl mx-auto px-8 py-10">

        <div className="grid md:grid-cols-4 gap-12">

          {/* 品牌 */}

          <div>

            <h2 className="text-3xl font-bold mb-4">
              徐媽媽冰鑽滷味
            </h2>

            <p className="leading-8 text-orange-100">
              獨家祕方，傳承三代；<br />
              一份用心，溫暖每一個家的餐桌。
            </p>

            <div className="flex gap-4 text-3xl mt-8">

              <span>📘</span>

              <span>📷</span>

              <span>💬</span>

            </div>

          </div>

          {/* 快速連結 */}

          <div>

            <h3 className="text-xl font-bold mb-5">
              快速連結
            </h3>

            <ul className="space-y-3 text-orange-100">

              <li>首頁</li>

              <li>關於我們</li>

              <li>產品介紹</li>

              <li>最新消息</li>

              <li>訂購方式</li>

              <li>聯絡我們</li>

            </ul>

          </div>

          {/* 購物資訊 */}

          <div>

            <h3 className="text-xl font-bold mb-5">
              購物資訊
            </h3>

            <ul className="space-y-3 text-orange-100">

              <li>購物車</li>

              <li>會員中心</li>

              <li>付款方式</li>

              <li>配送方式</li>

              <li>常見問題</li>

            </ul>

          </div>

          {/* 聯絡 */}

          <div>

            <h3 className="text-xl font-bold mb-5">
              聯絡我們
            </h3>

            <div className="space-y-4 text-orange-100 leading-7">

              <p>
                📞 0900-000-000
              </p>

              <p>
                💬 LINE：@hsumama
              </p>

              <p>
                🕘 每日 10:00－20:00
              </p>

              <p>
                📍 台灣
              </p>

            </div>

          </div>

        </div>

        <div className="border-t border-orange-300 mt-8 pt-4 text-center">

          <p className="text-xl text-orange-100">

            每一口滷香，都是一份傳承；
            每一次相聚，都值得一道好味道。

          </p>

          <p className="text-sm mt-6 text-orange-200">

            © 2026 徐媽媽冰鑽滷味 All Rights Reserved.

          </p>

        </div>

      </div>

    </footer>
  );
}