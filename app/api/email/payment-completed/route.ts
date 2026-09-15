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
          payment_status,
          grand_total
        `
      )
      .eq("id", orderId)
      .single();

    if (orderError) {
      console.error(
        "Payment completed order query error:",
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
    // 確認付款狀態
    // ------------------------------------------

    if (order.payment_status !== "已付款") {
      return NextResponse.json(
        {
          error: "此訂單目前尚未標記為已付款",
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
            "此訂單沒有 Email，無法寄送付款通知",
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
    // 訂單金額
    // ------------------------------------------

    const grandTotal = Number(
      order.grand_total ?? 0
    ).toLocaleString("zh-TW");

    // ------------------------------------------
    // 寄送付款完成 Email
    // ------------------------------------------

    const {
      data: emailData,
      error: emailError,
    } = await resend.emails.send({
      from:
        "徐媽媽冰鑽滷味 <hsumama@bestlife.tw>",

      to: [order.email],

      subject:
        `徐媽媽冰鑽滷味｜付款完成通知｜${orderNo}`,

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
            徐媽媽冰鑽滷味
          </h2>

          <p>
            您好 ${order.customer_name}，
          </p>

          <p>
            我們已確認收到您的訂單款項。
          </p>

          <p>
            <strong>
              訂單編號：${orderNo}
            </strong>
          </p>

          <p>
            訂單金額：
            <strong>
              NT$ ${grandTotal}
            </strong>
          </p>

          <p>
            您的訂單已完成付款確認，
            後續將依訂單進度處理。
          </p>

          <p>
            感謝您的訂購！
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
        "Payment completed email error:",
        emailError
      );

      return NextResponse.json(
        {
          error: "付款完成 Email 寄送失敗",
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

      resendId:
        emailData?.id ?? null,
    });
  } catch (error) {
    console.error(
      "Payment completed email API error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "付款完成 Email 寄送失敗",
      },
      {
        status: 500,
      }
    );
  }
}