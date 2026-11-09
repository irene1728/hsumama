
import type { PdfContext } from "../../types/pdf";

import { PDF } from "./pdfConfig";
import {
  setBodyFont,
  setHeadingFont,
} from "./fonts";

interface DrawPaymentProps extends PdfContext {
  startY: number;
}

export function drawPayment({
  doc,
  order,
  startY,
}: DrawPaymentProps): number {

  //------------------------------------------
  // 判斷付款方式
  //------------------------------------------

  const isCashPickup =
    order.paymentMethod === "自取現場現金付款";

  const isPickup =
    order.shippingMethod === "自取";

  //------------------------------------------
  // 標題
  //------------------------------------------

  setHeadingFont(doc);

  doc.text(
    "付款資訊",
    PDF.page.margin,
    startY
  );

  doc.line(
    PDF.page.margin,
    startY + 2,
    PDF.page.width - PDF.page.margin,
    startY + 2
  );

  //------------------------------------------
  // 內容
  //------------------------------------------

  setBodyFont(doc);

  const y = startY + PDF.spacing.line;

  // 付款方式
  doc.text(
    `付款方式：${order.paymentMethod}`,
    PDF.payment.leftX,
    y
  );

  // 付款狀態
  doc.text(
    `付款狀態：${order.paymentStatus ?? "未付款"}`,
    PDF.payment.rightX,
    y
  );

  //------------------------------------------
  // 自取現場現金付款
  //------------------------------------------

  if (isCashPickup) {

    doc.text(
      "※ 請於取貨時支付現金。",
      PDF.payment.leftX,
      y + PDF.payment.line
    );

    if (isPickup) {
      doc.text(
        "取貨方式：自取",
        PDF.payment.leftX,
        y + PDF.payment.line * 2
      );
    }

  } else {

    //------------------------------------------
    // ATM／線上轉帳付款資訊
    //------------------------------------------

    doc.text(
      "銀行：台灣銀行",
      PDF.payment.leftX,
      y + PDF.payment.line
    );

    doc.text(
      "銀行代碼：004",
      PDF.payment.rightX,
      y + PDF.payment.line
    );

    doc.text(
      "帳號：170001010083",
      PDF.payment.leftX,
      y + PDF.payment.line * 2
    );

    doc.text(
      "※ 請於三日內完成付款。",
      PDF.payment.leftX,
      y + PDF.payment.line * 3
    );

  }

  //------------------------------------------
  // 結束位置
  //------------------------------------------

  const endY =
    isCashPickup
      ? y + PDF.payment.line * 2
      : y + PDF.payment.line * 3;

  return endY;
}
