import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    // ------------------------------------------
    // 讀取 Request
    // ------------------------------------------

    const body = await request.json();

    const orderId = Number(body?.orderId);
    const email =
      typeof body?.email === "string"
        ? body.email.trim()
        : "";

    const phone =
      typeof body?.phone === "string"
        ? body.phone.trim()
        : "";

    // ------------------------------------------
    // 基本驗證
    // ------------------------------------------

    if (
      !Number.isInteger(orderId) ||
      orderId <= 0 ||
      !email ||
      !phone
    ) {
      return NextResponse.json(
        {
          error: "無效的訂單驗證資料",
        },
        {
          status: 400,
        }
      );
    }

    // ------------------------------------------
    // 取得訂單
    //
    // Service Role 僅在伺服器端使用
    // ------------------------------------------

    const {
      data: orderData,
      error: orderError,
    } = await supabase
      .from("orders")
 .select(
  `
    id,
    order_no,
    customer_name,
    email,
    phone,
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
      .eq("email", email)
      .eq("phone", phone)
      .maybeSingle();

    if (orderError) {
      console.error(
        "Order success query error:",
        orderError
      );

      return NextResponse.json(
        {
          error: "無法取得訂單",
        },
        {
          status: 500,
        }
      );
    }

    if (!orderData) {
      return NextResponse.json(
        {
          error: "找不到符合驗證條件的訂單",
        },
        {
          status: 404,
        }
      );
    }

    // ------------------------------------------
    // 取得訂單商品
    //
    // 只回傳前台需要的欄位
    // 不回傳批發價 / 毛利
    // ------------------------------------------

    const {
      data: items,
      error: itemsError,
    } = await supabase
      .from("order_items")
      .select(
        `
          product_name,
          quantity,
          price,
          subtotal
        `
      )
      .eq("order_id", orderId);

    if (itemsError) {
      console.error(
        "Order success items query error:",
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
    // 回傳前台需要的訂單資料
    // ------------------------------------------

    return NextResponse.json({
      success: true,

      order: {
  id: orderData.id,
  order_no: orderData.order_no,
  customer_name: orderData.customer_name,
  email: orderData.email,
  phone: orderData.phone,
  address: orderData.address,
  note: orderData.note,
payment: orderData.payment,

        delivery_method:
          orderData.delivery_method,
        total_amount:
          Number(orderData.total_amount ?? 0),
        shipping_fee:
          Number(orderData.shipping_fee ?? 0),
        points_used:
          Number(orderData.points_used ?? 0),
        grand_total:
          Number(orderData.grand_total ?? 0),

        items:
          (items ?? []).map((item) => ({
            product_name:
              item.product_name,
            quantity:
              Number(item.quantity ?? 0),
            price:
              Number(item.price ?? 0),
            subtotal:
              Number(item.subtotal ?? 0),
          })),
      },
    });
  } catch (error) {
    console.error(
      "Order success API error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "伺服器錯誤",
      },
      {
        status: 500,
      }
    );
  }
}