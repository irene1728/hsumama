import Link from "next/link";
import VisitorCounter from "@/components/VisitorCounter";

export default function Footer() {
  return (
    <footer className="bg-[#8B5E3C] text-white">

      <div className="max-w-7xl mx-auto px-6 md:px-5 py-4 md:py-8">

       <div className="grid md:grid-cols-[1.2fr_0.7fr_0.7fr_1.2fr_1.2fr] gap-5 md:gap-15">

          {/* 品牌 */}

          <div>
            <Link
              href="/"
              className="hover:text-[#FFFF33] transition"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">
                徐媽媽冰鑽滷味
              </h2>
            </Link>

            <p className="text-lg md:text-sm leading-6 text-orange-100">
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

            <h3 className="text-xl font-bold mb-1 md:mb-3">
              快速連結
            </h3>

            <ul className="space-y-2 text-orange-100">

              <li>
                <Link
                  href="/shipping-policy"
                  className="hover:text-[#FFFF33] transition"
                >
                  運送政策
                </Link>
              </li>

              <li>
                <Link
                  href="/return-policy"
                  className="hover:text-[#FFFF33] transition"
                >
                  退換貨政策
                </Link>
              </li>

            </ul>

          </div>


          {/* 購物資訊 */}

          <div>

            <h3 className="text-xl font-bold mb-1 md:mb-3">
              購物資訊
            </h3>

            <ul className="space-y-2 text-orange-100">

              <li>
                <Link
                  href="/order-info"
                  className="hover:text-[#FFFF33] transition"
                >
                  訂購方式
                </Link>
              </li>

              <li>
                <Link
                  href="/order-info"
                  className="hover:text-[#FFFF33] transition"
                >
                  付款方式
                </Link>
              </li>

              <li>
                <Link
                  href="/order-info"
                  className="hover:text-[#FFFF33] transition"
                >
                  配送方式
                </Link>
              </li>

            </ul>

          </div>


          {/* 聯絡我們 */}

          <div>

            <h3 className="text-xl font-bold mb-1 md:mb-3">
              聯絡我們
            </h3>

            <div className="space-y-2 text-orange-100 ">

            <p>
  <a
    href="https://lin.ee/q8kagIG"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="加入徐媽媽冰鑽滷味 LINE 官方帳號"
    className="inline-flex items-center gap-1 text-green-400 hover:text-white transition"
  >
    <span className="font-bold">
      LINE 官方帳號📱
    </span>
  
  </a>
</p>

              <p>
                ☎ 客服電話：04-22753930
              </p>

              <p>
                ✉ 客服 Email：hsumama1992@gmail.com
              </p>

              <p className="text-sm">
                🕘 服務時間：平日 08:00－17:00
              </p>

              <p>
                📍 台灣
              </p>

            </div>

          </div>


          {/* 公司資訊 */}

          <div>

            <h3 className="text-xl font-bold mb-1 md:mb-3">
              公司資訊
            </h3>

            <div className="space-y-3 text-orange-100 leading-6">  

              <p>
                徐記食品有限公司
              </p>

              <p>
                統一編號：25085954
              </p>

              <p>
                工廠登記編號：66012039
              </p>
  <p className="text-xs">
      食品業者登錄字號：B-125085954-00000-7
    </p>
     <p className="text-xs">
      投保產品責任險：南山產物產品責任險22A0070482
    </p>
              <p className="text-xs">
                臺中市太平區中興里永義路139巷20號1樓
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
<VisitorCounter />
          <p className="text-sm mt-2 text-orange-200">

            © 2026 徐媽媽冰鑽滷味 All Rights Reserved.

          </p>

        </div>

      </div>

    </footer>
  );
}