import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  try {
    // 取得訪客 IP
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");

    const ip =
      forwardedFor?.split(",")[0].trim() ||
      realIp ||
      "unknown";

    // 使用 SHA-256，不直接把 IP 存進資料庫
    const ipHash = crypto
      .createHash("sha256")
      .update(ip)
      .digest("hex");

    // 取得台灣當地日期
    const taiwanDate = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Taipei",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());

    // 呼叫 Supabase RPC
    const { data, error } = await supabase.rpc(
      "record_daily_visit",
      {
        p_ip_hash: ipHash,
        p_visit_date: taiwanDate,
      }
    );

    if (error) {
      console.error("Visitor counter error:", error);

      return NextResponse.json(
        {
          success: false,
          error: "無法取得瀏覽人次",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      totalVisits: data,
    });
  } catch (error) {
    console.error("Visitor API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "伺服器錯誤",
      },
      { status: 500 }
    );
  }
}