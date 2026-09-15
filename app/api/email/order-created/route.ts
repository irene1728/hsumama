import { NextResponse } from "next/server";
import { Resend } from "resend";

import { createClient } from "@/lib/supabase/server";
import { orderToPdf } from "@/features/checkout/mapper/orderToPdf";
import { generateOrderPdf } from "@/features/checkout/utils/pdf/generateOrderPdf";

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

    const { data: orderData, error: orderError } =
      await supabase
        .from("orders")
        .select(
          `
            id,
            order_no,
            customer_name,
            phone,
            email,
            address,
            note,
            payment,
            delivery_method,
            total_amount,
            shipping_fee,
            points_used,
            grand_total
          `
        )
        .eq("id", orderId)
        .single();

    if (orderError) {
      console.error(
        "Order query error:",
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

    if (!orderData) {
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
    // 確認 Email
    // ------------------------------------------

    if (
      !orderData.email ||
      !orderData.email.trim()
    ) {
      return NextResponse.json(
        {
          error: "此訂單沒有 Email，無法寄送通知",
        },
        {
          status: 400,
        }
      );
    }

    // ------------------------------------------
    // 取得訂單商品
    // ------------------------------------------

    const {
      data: items,
      error: itemsError,
    } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", orderId);

    if (itemsError) {
      console.error(
        "Order items query error:",
        itemsError
      );

      return NextResponse.json(
        {
          error: "無法取得訂單商品",
        },
        {
          status: 500,
        }
      );
    }

    // ------------------------------------------
    // 組成 PDF Order Model
    // ------------------------------------------

    const pdfOrder = orderToPdf({
      ...orderData,
      items: items ?? [],
    });

    // ------------------------------------------
    // 產生 PDF
    // ------------------------------------------

    const pdf = await generateOrderPdf(
      pdfOrder
    );

    const pdfArrayBuffer =
      pdf.output("arraybuffer");

    const pdfBase64 = Buffer.from(
      pdfArrayBuffer
    ).toString("base64");

    // ------------------------------------------
    // 訂單編號
    // ------------------------------------------

    const orderNo =
      orderData.order_no ??
      String(orderData.id);

    // ------------------------------------------
    // 寄送 Email
    // ------------------------------------------

    const { data: emailData, error: emailError } =
      await resend.emails.send({
        from:
          "徐媽媽冰鑽滷味 <hsumama@bestlife.tw>",

        to: [orderData.email],

        subject:
          `徐媽媽冰鑽滷味｜訂單成立通知｜${orderNo}`,

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
              您好 ${orderData.customer_name}，
            </p>

            <p>
              您的訂單已成功建立。
            </p>

            <p>
              <strong>
                訂單編號：${orderNo}
              </strong>
            </p>

            <p>
              訂單金額：
              <strong>
                NT$ ${Number(
                  orderData.grand_total
                ).toLocaleString("zh-TW")}
              </strong>
            </p>

            <p>
              訂單明細與完整資訊，
              請參閱本信附上的訂單 PDF。
            </p>

            <p>
              感謝您的訂購！
            </p>

            <p>
              徐媽媽冰鑽滷味
            </p>
          </div>
        `,

        attachments: [
          {
            filename:
              `order-${orderNo}.pdf`,

            content: pdfBase64,
          },
        ],
      });

    // ------------------------------------------
    // Resend 錯誤
    // ------------------------------------------

    if (emailError) {
      console.error(
        "Resend error:",
        emailError
      );

      return NextResponse.json(
        {
          error:
            "Email 寄送失敗",
          details:
            emailError.message,
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

      email:
        orderData.email,

      resendId:
        emailData?.id ?? null,
    });
  } catch (error) {
    console.error(
      "Order email API error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Email 寄送失敗",
      },
      {
        status: 500,
      }
    );
  }
}