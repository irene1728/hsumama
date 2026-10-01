
import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

type Banner = {
  id: number;
  type: "main" | "activity" | "benefit";
  title: string;
  image_url: string;
  mobile_image_url: string | null;
  link_url: string | null;
  is_active: boolean;
  sort_order: number;
  start_at: string | null;
  end_at: string | null;
};

function isBannerCurrentlyActive(banner: Banner, now: Date) {
  // 尚未到開始時間
  if (banner.start_at && new Date(banner.start_at) > now) {
    return false;
  }

  // 已超過結束時間
  if (banner.end_at && new Date(banner.end_at) < now) {
    return false;
  }

  return true;
}

export default async function Hero() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("homepage_banners")
    .select(
      `
        id,
        type,
        title,
        image_url,
        mobile_image_url,
        link_url,
        is_active,
        sort_order,
        start_at,
        end_at
      `
    )
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("載入首頁 Banner 失敗:", error);
  }

  const now = new Date();

  const banners: Banner[] = (data ?? []).filter((banner) =>
    isBannerCurrentlyActive(banner, now)
  );

  // 每一種類型只取排序最前面的啟用 Banner
  const mainBanner = banners.find((banner) => banner.type === "main");
  const activityBanner = banners.find(
    (banner) => banner.type === "activity"
  );
  const benefitBanner = banners.find(
    (banner) => banner.type === "benefit"
  );

  // 沒有任何 Banner 時，不顯示空白區塊
  if (!mainBanner && !activityBanner && !benefitBanner) {
    return null;
  }

  // 圖片元件
  const BannerImage = ({
    banner,
    main = false,
  }: {
    banner: Banner;
    main?: boolean;
  }) => {
    const desktopImage = (
      <img
        src={banner.image_url}
        alt={banner.title}
        className={
          main
            ? "w-full h-60 md:h-135 block object-cover"
            : "w-full h-auto block"
        }
      />
    );

    // 有設定手機版圖片
    if (main && banner.mobile_image_url) {
      return (
        <picture>
          <source
            media="(max-width: 760px)"
            srcSet={banner.mobile_image_url}
          />

          {desktopImage}
        </picture>
      );
    }

    return desktopImage;
  };

  // Banner 外層連結
  const BannerLink = ({
    banner,
    children,
    className,
  }: {
    banner: Banner;
    children: React.ReactNode;
    className: string;
  }) => {
    if (!banner.link_url) {
      return <div className={className}>{children}</div>;
    }

    const isExternal =
      banner.link_url.startsWith("http://") ||
      banner.link_url.startsWith("https://");

    if (isExternal) {
      return (
        <a
          href={banner.link_url}
          className={className}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={banner.link_url} className={className}>
        {children}
      </Link>
    );
  };

  return (
    <section className="bg-[#FFF8F0] mt-1">
      <div className="max-w-7xl mx-auto px-2 items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

          {/* 左側：主 Banner */}
          {mainBanner && (
            <BannerLink
              banner={mainBanner}
              className="md:col-span-2 overflow-hidden rounded-2xl shadow-lg block w-93 md:w-210 h-56 md:h-135"
            >
              <BannerImage banner={mainBanner} main />
            </BannerLink>
          )}

          {/* 右側：活動／福利 */}
          <div className="flex flex-col gap-3">

            {/* 活動 */}
            {activityBanner && (
              <BannerLink
                banner={activityBanner}
                className="overflow-hidden rounded-2xl shadow-lg w-93 md:w-104 h-56 md:h-66 block hover:opacity-95 transition"
              >
                <BannerImage banner={activityBanner} />
              </BannerLink>
            )}

            {/* 福利／會員積分 */}
            {benefitBanner && (
              <BannerLink
                banner={benefitBanner}
                className="overflow-hidden rounded-2xl shadow-lg w-93 md:w-104 h-56 md:h-66 block hover:opacity-95 transition"
              >
                <BannerImage banner={benefitBanner} />
              </BannerLink>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}