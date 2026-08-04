import type { PdfContext } from "../../types/pdf";

import { PDF } from "./pdfConfig";
import {
  setBodyFont,
  setHeadingFont,
} from "./fonts";

/**
 * PDF Customer Section
 * --------------------------------------------------
 * 客戶資訊
 *
 * 職責：
 * - 顯示客戶基本資料
 * - 不負責格式化
 * - 不負責換頁
 * - 不負責地址自動換行
 */
export function drawCustomer({
  doc,
  order,
}: PdfContext): void {

  //------------------------------------------
  // 標題
  //------------------------------------------

  setHeadingFont(doc);

  doc.text(
    "客戶資訊",
    PDF.page.margin,
    PDF.customer.titleY
  );

  //------------------------------------------
  // 內容
  //------------------------------------------

  setBodyFont(doc);

  const y = PDF.customer.contentStartY;
  const line = PDF.spacing.line;

  doc.text(
    `客戶：${order.customerName}`,
    PDF.page.margin,
    y
  );

  doc.text(
    `電話：${order.phone}`,
    PDF.page.margin,
    y + line
  );

  doc.text(
    `郵件：${order.email}`,
    PDF.page.margin,
    y + line * 2
  );

  doc.text(
    `地址：${order.address}`,
    PDF.page.margin,
    y + line * 3
  );
}