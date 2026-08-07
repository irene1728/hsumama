import type { PdfContext } from "../../types/pdf";

import { PDF } from "./pdfConfig";
import {
  setBodyFont,
  setHeadingFont,
} from "./fonts";

/**
 * PDF Payment Section
 *
 * 職責：
 * - 顯示付款資訊
 * - ATM 與 COD 分開顯示
 * - 不處理付款邏輯
 */
interface DrawPaymentProps extends PdfContext {
  startY: number;
}

export function drawPayment({
  doc,
  order,
  startY,
}: DrawPaymentProps): number {

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

  doc.text(
    `付款方式：${order.paymentMethod === "ATM" ? "ATM 轉帳" : "貨到付款"}`,
    PDF.payment.leftX,
    y
  );

  doc.text(
    `付款狀態：${order.paymentMethod === "ATM" ? "未付款" : "待收款"}`,
    PDF.payment.rightX,
    y
  );

  //------------------------------------------
  // ATM
  //------------------------------------------

  if (order.paymentMethod === "ATM") {

    doc.text(
      "銀行代碼：822",
      PDF.payment.leftX,
      y + PDF.payment.line
    );
    
    doc.text(
      "帳號：123456789012",
      PDF.payment.rightX,
      y + PDF.payment.line
    );

    doc.text(
      "※ 請於三日內完成付款。",
      PDF.payment.leftX,
      y + PDF.payment.line * 2
    );
  }

const endY =
  order.paymentMethod === "ATM"
    ? y + PDF.payment.line * 2
    : y;

return endY;

}