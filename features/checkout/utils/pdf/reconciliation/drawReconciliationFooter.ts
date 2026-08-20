import { jsPDF } from "jspdf";

import { RECONCILIATION_PDF } from "./reconciliationPdfConfig";
import { setBodyFont } from "../fonts";
import { drawDivider } from "../helpers";

type ReconciliationFooterProps = {
  doc: jsPDF;
  startY: number;
};

/**
 * 對帳單 PDF｜Footer
 *
 * v0.13 Step 2-3B
 *
 * 只保留：
 * - 品牌名稱
 * - 文件用途
 *
 * 視覺尺寸、位置、字體
 * 與出貨單 Footer 保持一致。
 */
export function drawReconciliationFooter({
  doc,
  startY,
}: ReconciliationFooterProps): number {

  //------------------------------------------
  // 分隔線
  //------------------------------------------

  drawDivider(
    doc,
    RECONCILIATION_PDF.page.margin,
    RECONCILIATION_PDF.page.width -
      RECONCILIATION_PDF.page.margin,
    startY
  );

  //------------------------------------------
  // Footer
  //------------------------------------------

  setBodyFont(doc);

  const footerY = startY + 9;

  //------------------------------------------
  // 左側：品牌名稱
  //------------------------------------------

  doc.text(
    "徐媽媽冰鑽滷味",
    RECONCILIATION_PDF.page.margin,
    footerY
  );

  //------------------------------------------
  // 右側：文件用途
  //------------------------------------------

  doc.text(
    "對帳單｜供批發對帳使用",
    RECONCILIATION_PDF.page.width -
      RECONCILIATION_PDF.page.margin,
    footerY,
    {
      align: "right",
    }
  );

  return footerY;
}