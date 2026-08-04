import autoTable from "jspdf-autotable";

import type { PdfContext } from "../../types/pdf";

import { PDF } from "./pdfConfig";
import {
  setBodyFont,
  setHeadingFont,
} from "./fonts";

/**
 * PDF 商品明細
 *
 * 職責：
 * - 顯示商品明細
 * - 使用 AutoTable
 * - 不負責總計
 * - 不負責付款資訊
 * - 不負責換頁控制
 */
export function drawItems({
  doc,
  order,
}: PdfContext): void {

  //------------------------------------------
  // 標題
  //------------------------------------------

  setHeadingFont(doc);

  doc.text(
    "商品明細",
    PDF.page.margin,
    PDF.items.titleY
  );

  //------------------------------------------
  // Table
  //------------------------------------------

  setBodyFont(doc);

  autoTable(doc, {
    startY: PDF.items.tableStartY,

    head: [[
      "商品名稱",
      "數量",
      "單價",
      "小計",
    ]],

    body: order.items.map((item) => [
      item.name,
      item.quantity.toString(),
      `$${item.price.toLocaleString()}`,
      `$${item.subtotal.toLocaleString()}`,
    ]),

    theme: "grid",

    styles: {
      font: "NotoSansTC",
      fontSize: PDF.font.body,
    },

    headStyles: {
      font: "NotoSansTC",
      fontStyle: "bold",
    },

    columnStyles: {
      0: {
        halign: "left",
      },

      1: {
        halign: "center",
      },

      2: {
        halign: "right",
      },

      3: {
        halign: "right",
      },
    },
  });
}