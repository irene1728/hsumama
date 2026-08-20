import { jsPDF } from "jspdf";

import type { Order } from "../../../types/order";

import { SHIPPING_PDF } from "./shippingPdfConfig";
import { drawDivider } from "../helpers";
import {
  setBodyFont,
  setTitleFont,
} from "../fonts";

type ShippingHeaderProps = {
  doc: jsPDF;
  order: Order;
  assets: {
    brand: {
      logo: string;
    };
  };
};

/**
 * 出貨單 PDF Header
 *
 * v0.13 Step 2-3A
 *
 * 注意：
 * 本 Header 只供「出貨單 PDF」使用。
 * 不修改原本顧客訂單 PDF。
 */
export function drawShippingHeader({
  doc,
  order,
  assets,
}: ShippingHeaderProps): void {

  //------------------------------------------
  // Logo
  //------------------------------------------

  doc.addImage(
    assets.brand.logo,
    "PNG",
    SHIPPING_PDF.header.logo.x,
    SHIPPING_PDF.header.logo.y,
    SHIPPING_PDF.header.logo.width,
    SHIPPING_PDF.header.logo.height
  );

  //------------------------------------------
  // 品牌名稱
  //------------------------------------------

  setTitleFont(doc);
doc.setFontSize(30);
  doc.text(
    "徐媽媽冰鑽滷味",
    SHIPPING_PDF.header.brand.x,
    SHIPPING_PDF.header.brand.y
  );

  //------------------------------------------
  // 單據名稱
  //------------------------------------------

  setTitleFont(doc);
doc.setFontSize(16);
  doc.text(
    "出貨單",
    SHIPPING_PDF.header.documentTitle.x,
    SHIPPING_PDF.header.documentTitle.y
  );

  //------------------------------------------
  // 訂單資訊
  //------------------------------------------

  setBodyFont(doc);

  doc.text(
    `訂單編號：${order.orderNo}`,
    SHIPPING_PDF.header.orderInfo.x,
    SHIPPING_PDF.header.orderInfo.orderNoY
  );

  doc.text(
    `訂購日期：${order.orderDate}`,
    SHIPPING_PDF.header.orderInfo.x,
    SHIPPING_PDF.header.orderInfo.orderDateY
  );

  //------------------------------------------
  // 分隔線
  //------------------------------------------

  drawDivider(
    doc,
    SHIPPING_PDF.page.margin,
    SHIPPING_PDF.page.width - SHIPPING_PDF.page.margin,
    SHIPPING_PDF.header.dividerY
  );
}
