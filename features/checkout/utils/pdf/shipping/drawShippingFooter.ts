import { jsPDF } from "jspdf";

import { SHIPPING_PDF } from "./shippingPdfConfig";
import { setBodyFont } from "../fonts";
import { drawDivider } from "../helpers";

type ShippingFooterProps = {
  doc: jsPDF;
  startY: number;
};

/**
 * 出貨單 PDF｜Footer
 *
 * 只保留：
 * - 品牌名稱
 * - 文件用途
 */
export function drawShippingFooter({
  doc,
  startY,
}: ShippingFooterProps): number {

  //------------------------------------------
  // 分隔線
  //------------------------------------------

  drawDivider(
    doc,
    SHIPPING_PDF.page.margin,
    SHIPPING_PDF.page.width - SHIPPING_PDF.page.margin,
    startY
  );

  //------------------------------------------
  // Footer
  //------------------------------------------

  setBodyFont(doc);

  const footerY = startY + 5;

  // 左側：品牌名稱
  doc.text(
    "徐媽媽冰鑽滷味",
    SHIPPING_PDF.page.margin,
    footerY
  );

  // 右側：文件用途
  doc.text(
    "出貨單｜供出貨與配送使用",
    SHIPPING_PDF.page.width - SHIPPING_PDF.page.margin,
    footerY,
    {
      align: "right",
    }
  );

  return footerY;
}