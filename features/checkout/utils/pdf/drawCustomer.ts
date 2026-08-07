import type { PdfContext } from "../../types/pdf";

import { PDF } from "./pdfConfig";
import {
  setBodyFont,
  setHeadingFont,
} from "./fonts";

/**
 * PDF Customer
 *
 * 顯示：
 * - 客戶
 * - 電話
 * - Email
 * - 地址
 * - 備註
 */
export function drawCustomer({
  doc,
  order,
}: PdfContext): void {

 const {
  x,
  y,
  leftWidth,
  rightWidth,
  rowHeight,
} = PDF.customer.table;

const width = PDF.table.width;

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
  // 外框
  //------------------------------------------

  const tableHeight = rowHeight * 4;

  doc.rect(
    x,
    y,
    width,
    tableHeight
  );

  //------------------------------------------
  // 橫線
  //------------------------------------------

  doc.line(
    x,
    y + rowHeight,
    x + width,
    y + rowHeight
  );

  doc.line(
    x,
    y + rowHeight * 2,
    x + width,
    y + rowHeight * 2
  );

  doc.line(
    x,
    y + rowHeight * 3,
    x + width,
    y + rowHeight * 3
  );

  //------------------------------------------
  // 第一列中線
  //------------------------------------------

  doc.line(
    x + leftWidth,
    y,
    x + leftWidth,
    y + rowHeight
  );

  //------------------------------------------
  // 內容
  //------------------------------------------

  setBodyFont(doc);

  const textOffset = 5;

  // 第一列

  doc.text(
    `客戶：${order.customerName}`,
    x + 2,
    y + textOffset
  );

  doc.text(
    `電話：${order.phone}`,
    x + leftWidth + 2,
    y + textOffset
  );

  // 第二列

  doc.text(
    `郵件：${order.email}`,
    x + 2,
    y + rowHeight + textOffset
  );

  // 第三列

  doc.text(
    `地址：${order.address}`,
    x + 2,
    y + rowHeight * 2 + textOffset
  );

  // 第四列

  doc.text(
    `備註：${order.note || "-"}`,
    x + 2,
    y + rowHeight * 3 + textOffset
  );

}