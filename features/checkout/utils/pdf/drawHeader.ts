import { jsPDF } from "jspdf";

import type { PdfContext } from "../../types/pdf";

import { PDF } from "./pdfConfig";
import { drawDivider } from "./helpers";
import {
  setBodyFont,
  setTitleFont,
} from "./fonts";



/**
 * PDF Header
 * --------------------------------------------------
 * Logo
 * 品牌名稱
 * Order Receipt
 * 訂單編號
 * 訂購日期
 */
export function drawHeader({
  doc,
  order,
  assets,
}: PdfContext): void {

  //------------------------------------------
  // Logo
  //------------------------------------------

  doc.addImage(
    assets.brand.logo,
    "PNG",
    PDF.header.logo.x,
    PDF.header.logo.y,
    PDF.header.logo.width,
    PDF.header.logo.height
  );

  //------------------------------------------
  // 品牌名稱
  //------------------------------------------

  setTitleFont(doc);

  doc.text(
    "徐媽媽冰鑽滷味",
    PDF.header.title.x,
    PDF.header.title.y
  );

  //------------------------------------------
  // 副標題
  //------------------------------------------

  setBodyFont(doc);

  doc.text(
    "Order Receipt",
    PDF.header.subtitle.x,
    PDF.header.subtitle.y
  );

  //------------------------------------------
  // 訂單編號
  //------------------------------------------

  doc.text(
    `訂單編號：${order.orderNo}`,
    PDF.header.orderInfo.x,
    PDF.header.orderInfo.orderNoY
  );

  //------------------------------------------
  // 訂購日期
  //------------------------------------------

  doc.text(
    `訂購日期：${order.orderDate}`,
    PDF.header.orderInfo.x,
    PDF.header.orderInfo.orderDateY
  );

  //------------------------------------------
  // 分隔線
  //------------------------------------------

  drawDivider(
    doc,
    PDF.page.margin,
    PDF.page.width - PDF.page.margin,
    PDF.header.dividerY
  );
}