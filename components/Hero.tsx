import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-[#FFF8F0] mt-1">
      <div className="max-w-7xl mx-auto px-2 items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* 左側：主 Banner */}
          <div className="md:col-span-2 overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/hero/banner-001.jpg"
              alt="徐媽媽冰鑽滷味"
              width={1200}
              height={760}
              priority
              className="w-full h-60 md:h-135 block"
            />
          </div>

          {/* 右側：活動／福利 */}
          <div className="flex flex-col gap-3">

            {/* 活動 */}
             <Link
        href="/products"
             className="overflow-hidden rounded-2xl shadow-lg w-93 md:w-104 h-59 md:h-66">
              <Image
                src="/images/hero/banner-002.jpg"
                alt="中秋優惠活動"
                width={180}
                height={100}
                className="w-full h-auto block"
              />
           </Link>

            {/* 福利／會員積分 */}
          <Link
   href="/account/points/rules"
  className="block overflow-hidden rounded-2xl shadow-lg hover:opacity-95 transition w-93 md:w-104 h-59 md:h-66"
>
              <Image
                src="/images/hero/banner-003.jpg"
                alt="會員積分精簡說明"
                width={180}
                height={100}
                className="w-full h-auto block"
              />
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}