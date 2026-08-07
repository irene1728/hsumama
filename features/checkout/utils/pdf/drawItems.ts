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
}: PdfContext): number {

  console.log(order.items);
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

  body: order.items.map(item => [
    item.name,
    item.quantity,
    item.price,
    item.subtotal,
  ]),
  
    theme: "grid",

  bodyStyles: {
    minCellHeight: 6,
  },

   styles: {
  font: "NotoSansTC",
  fontSize: 10,
   cellPadding: 1.2,
},

headStyles: {
  font: "NotoSansTC",
  fontStyle: "bold",
  fontSize: 10,
  cellPadding: 1.2,
},
didParseCell: (data) => {
  if (data.section === "head") {
    switch (data.column.index) {
      case 0:
        data.cell.styles.halign = "left";
        break;

      case 1:
      case 2:
      case 3:
        data.cell.styles.halign = "right";
        break;
    }
  }
},

    columnStyles: {
      0: {
        halign: "left",
      },

      1: {
        halign: "right",
      },

      2: {
        halign: "right",
      },

      3: {
        halign: "right",
      },
    },
  });
return (
  (doc as any).lastAutoTable?.finalY ??
  PDF.items.tableStartY
);

}