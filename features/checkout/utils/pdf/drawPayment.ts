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
 * - 固定使用 ATM／線上轉帳
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
    "付款方式：ATM／線上轉帳",
    PDF.payment.leftX,
    y
  );

  doc.text(
    "付款狀態：未付款",
    PDF.payment.rightX,
    y
  );

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

  //------------------------------------------
  // 結束位置
  //------------------------------------------

  const endY =
    y + PDF.payment.line * 3;

  return endY;
}