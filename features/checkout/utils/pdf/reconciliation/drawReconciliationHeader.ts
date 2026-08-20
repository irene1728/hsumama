import { jsPDF } from "jspdf";

import type { Order } from "../../../types/order";

import { RECONCILIATION_PDF } from "./reconciliationPdfConfig";
import { drawDivider } from "../helpers";
import {
  setBodyFont,
  setTitleFont,
} from "../fonts";

type ReconciliationHeaderProps = {
  doc: jsPDF;
  order: Order;
  assets: {
    brand: {
      logo: string;
    };
  };
};

/**
 * 對帳單 PDF Header
 *
 * v0.13 Step 2-3B
 *
 * 注意：
 * 本 Header 只供「對帳單 PDF」使用。
 * 不修改原本顧客訂單 PDF。
 * 不修改出貨單 PDF。
 *
 * 視覺尺寸與出貨單 Header 保持一致。
 */
export function drawReconciliationHeader({
  doc,
  order,
  assets,
}: ReconciliationHeaderProps): void {

  //------------------------------------------
  // Logo
  //------------------------------------------

  doc.addImage(
    assets.brand.logo,
    "PNG",
    RECONCILIATION_PDF.header.logo.x,
    RECONCILIATION_PDF.header.logo.y,
    RECONCILIATION_PDF.header.logo.width,
    RECONCILIATION_PDF.header.logo.height
  );

  //------------------------------------------
  // 品牌名稱
  //------------------------------------------

  setTitleFont(doc);
  doc.setFontSize(30);

  doc.text(
    "徐媽媽冰鑽滷味",
    RECONCILIATION_PDF.header.brand.x,
    RECONCILIATION_PDF.header.brand.y
  );

  //------------------------------------------
  // 單據名稱
  //------------------------------------------

  setTitleFont(doc);
  doc.setFontSize(16);

  doc.text(
    "對帳單",
    RECONCILIATION_PDF.header.documentTitle.x,
    RECONCILIATION_PDF.header.documentTitle.y
  );

  //------------------------------------------
  // 訂單資訊
  //------------------------------------------

  setBodyFont(doc);

  doc.text(
    `訂單編號：${order.orderNo}`,
    RECONCILIATION_PDF.header.orderInfo.x,
    RECONCILIATION_PDF.header.orderInfo.orderNoY
  );

  doc.text(
    `訂購日期：${order.orderDate}`,
    RECONCILIATION_PDF.header.orderInfo.x,
    RECONCILIATION_PDF.header.orderInfo.orderDateY
  );

  //------------------------------------------
  // 分隔線
  //------------------------------------------

  drawDivider(
    doc,
    RECONCILIATION_PDF.page.margin,
    RECONCILIATION_PDF.page.width -
      RECONCILIATION_PDF.page.margin,
    RECONCILIATION_PDF.header.dividerY
  );
}