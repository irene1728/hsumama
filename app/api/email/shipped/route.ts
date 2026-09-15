import { NextResponse } from "next/server";
import { Resend } from "resend";

import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST(request: Request) {
  try {
    // ------------------------------------------
    // 讀取 Request
    // ------------------------------------------

    const body = await request.json();

    const orderId = Number(body?.orderId);

    if (!Number.isInteger(orderId) || orderId <= 0) {
      return NextResponse.json(
        {
          error: "無效的訂單 ID",
        },
        {
          status: 400,
        }
      );
    }

    // ------------------------------------------
    // 確認 Resend API Key
    // ------------------------------------------

    if (!process.env.RESEND_API_KEY) {
      console.error(
        "RESEND_API_KEY 尚未設定"
      );

      return NextResponse.json(
        {
          error: "Email 系統尚未設定",
        },
        {
          status: 500,
        }
      );
    }

    // ------------------------------------------
    // Supabase Server Client
    // ------------------------------------------

    const supabase = await createClient();

    // ------------------------------------------
    // 取得訂單
    // ------------------------------------------

    const {
      data: order,
      error: orderError,
    } = await supabase
      .from("orders")
      .select(
        `
          id,
          order_no,
          customer_name,
          email,
          status
        `
      )
      .eq("id", orderId)
      .single();

    if (orderError) {
      console.error(
        "Shipped order query error:",
        orderError
      );

      return NextResponse.json(
        {
          error: "找不到訂單",
        },
        {
          status: 404,
        }
      );
    }

    if (!order) {
      return NextResponse.json(
        {
          error: "找不到訂單",
        },
        {
          status: 404,
        }
      );
    }

    // ------------------------------------------
    // 確認訂單狀態
    // ------------------------------------------

    if (order.status !== "已出貨") {
      return NextResponse.json(
        {
          error:
            "此訂單目前尚未標記為已出貨",
        },
        {
          status: 400,
        }
      );
    }

    // ------------------------------------------
    // 確認 Email
    // ------------------------------------------

    if (
      !order.email ||
      !order.email.trim()
    ) {
      return NextResponse.json(
        {
          error:
            "此訂單沒有 Email，無法寄送出貨通知",
        },
        {
          status: 400,
        }
      );
    }

    // ------------------------------------------
    // 訂單編號
    // ------------------------------------------

    const orderNo =
      order.order_no ??
      String(order.id);

    // ------------------------------------------
    // 寄送出貨通知 Email
    // ------------------------------------------

    const {
      data: emailData,
      error: emailError,
    } = await resend.emails.send({
      from:
        "徐媽媽冰鑽滷味 <hsumama@bestlife.tw>",

      to: [order.email],

      subject:
        `徐媽媽冰鑽滷味｜出貨通知｜${orderNo}`,

      html: `
        <div
          style="
            font-family:
              Arial,
              'Microsoft JhengHei',
              sans-serif;
            line-height: 1.8;
            color: #333;
          "
        >
          <h2>
            徐媽媽冰鑽滷味｜出貨通知
          </h2>

          <p>
            您好 ${order.customer_name}，
          </p>

          <p>
            您的訂單已經完成出貨囉！ 📦
          </p>

          <p>
            <strong>
              訂單編號：${orderNo}
            </strong>
          </p>

          <p>
            收件人：${order.customer_name}
          </p>

          <p>
            感謝您的訂購，請留意包裹配送。
          </p>

          <p>
            徐媽媽冰鑽滷味
          </p>
        </div>
      `,
    });

    // ------------------------------------------
    // Resend 錯誤
    // ------------------------------------------

    if (emailError) {
      console.error(
        "Shipped email error:",
        emailError
      );

      return NextResponse.json(
        {
          error:
            "出貨通知 Email 寄送失敗",
          details: emailError.message,
        },
        {
          status: 500,
        }
      );
    }

    // ------------------------------------------
    // 成功
    // ------------------------------------------

    return NextResponse.json({
      success: true,

      orderId,

      orderNo,

      email: order.email,

      customerName:
        order.customer_name,

      resendId:
        emailData?.id ?? null,
    });
  } catch (error) {
    console.error(
      "Shipped email API error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "出貨通知 Email 寄送失敗",
      },
      {
        status: 500,
      }
    );
  }
}