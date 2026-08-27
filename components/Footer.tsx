import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#8B5E3C] text-white">

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-10">

        <div className="grid md:grid-cols-4 gap-10 md:gap-12">

          {/* 品牌 */}

          <div>
            <Link
                  href="/"
                  className="hover:text-white transition"
                >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              徐媽媽冰鑽滷味
            </h2>
            </Link>
     <p className="leading-8 text-orange-100">
  獨家祕方，傳承三代；<br />
  一份用心，溫暖每一個家的餐桌。
</p>


  <img
    src="/images/brand/logo-simple.png"
    alt="徐媽媽冰鑽滷味"
    className="w-20 h-20 object-contain"
  />

          </div>

{/* 快速連結 */}

<div>

  <h3 className="text-xl font-bold mb-5">
    快速連結
  </h3>

  <ul className="space-y-3 text-orange-100">

    <li>
      <Link
        href="/shipping-policy"
        className="hover:text-white transition"
      >
        運送政策
      </Link>
    </li>

    <li>
      <Link
        href="/return-policy"
        className="hover:text-white transition"
      >
        退換貨政策
      </Link>
    </li>

  </ul>

</div>


          {/* 購物資訊 */}

          <div>

            <h3 className="text-xl font-bold mb-5">
              購物資訊
            </h3>

            <ul className="space-y-3 text-orange-100">

           <li>
                <Link
                  href="/order-info"
                  className="hover:text-white transition"
                >
                  訂購方式
                </Link>
              </li>

              <li>
                <Link
                  href="/order-info"
                  className="hover:text-white transition"
                >
                  付款方式
                </Link>
              </li>

              <li>
                <Link
                  href="/order-info"
                  className="hover:text-white transition"
                >
                  配送方式
                </Link>
              </li>

            </ul>

          </div>

          {/* 聯絡我們 */}
          <div>

            <h3 className="text-xl font-bold mb-2">
              聯絡我們
            </h3>

            <div className="space-y-5 text-orange-100 leading-5">

<p>
  <a
    href="https://lin.ee/q8kagIG"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="加入徐媽媽冰鑽滷味 LINE 官方帳號"
    className="hover:scale-110 transition"
  >
    <img
      src="/images/brand/line-logo.png"
      alt="LINE 官方帳號"
      className="w-12 h-12 object-contain"
    />
    歡迎加入官方帳號詢問
  </a>
</p>        <p>
                🕘 服務時間：每日 09:00－20:00
              </p>

              <p>
                📍 台灣
              </p>

            </div>

          </div>

        </div>

        {/* 底部版權 */}
        <div className="border-t border-orange-300 mt-4 pt-4 text-center">

        <p className="text-base md:text-xl text-orange-100 text-center max-w-[340px] md:max-w-none mx-auto">
  每一口滷香，都是一份傳承；<br className="md:hidden" />
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