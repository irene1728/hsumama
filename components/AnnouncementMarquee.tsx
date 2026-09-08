"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type MarqueeAnnouncement = {
  id: string;
  content: string;
  sort_order: number;
};

type MarqueeSettings = {
  speed_seconds: number;
};

export default function AnnouncementMarquee() {
  const [marqueeAnnouncements, setMarqueeAnnouncements] = useState<
    MarqueeAnnouncement[]
  >([]);

  const [marqueeSpeed, setMarqueeSpeed] = useState(24);

  const supabase = createClient();

  useEffect(() => {
    async function loadMarqueeAnnouncements() {
      const { data, error } = await supabase
        .from("marquee_announcements")
        .select("id, content, sort_order")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (error) {
        console.error("讀取跑馬燈失敗：", error);
      } else {
        setMarqueeAnnouncements(data ?? []);
      }

      const { data: settings, error: settingsError } = await supabase
        .from("marquee_settings")
        .select("speed_seconds")
        .eq("id", 1)
        .maybeSingle();

      if (settingsError) {
        console.error("讀取跑馬燈速度失敗：", settingsError);
        return;
      }

      setMarqueeSpeed(settings?.speed_seconds ?? 24);
    }

    loadMarqueeAnnouncements();
  }, [supabase]);

  return (
    <>
      {marqueeAnnouncements.length > 0 && (
        <div className="max-w-7xl mx-auto overflow-hidden mt-19 md:mt-22 md:px-4">
          <div className="relative h-6 overflow-hidden">
            <div
              className="marquee-track"
              style={{
                animationDuration: `${marqueeSpeed}s`,
              }}
            >
              {[...marqueeAnnouncements, ...marqueeAnnouncements].map(
                (item, index) => (
                  <span
                    key={`${item.id}-${index}`}
                    className="inline-block whitespace-nowrap text-lg mr-16 text-[#FFFF00] drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
                  >
                    {item.content}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
