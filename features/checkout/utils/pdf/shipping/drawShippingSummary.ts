import { jsPDF } from "jspdf";

import type { Order } from "../../../types/order";

import { SHIPPING_PDF } from "./shippingPdfConfig";
import {
  setBodyFont,
  setTitleFont,
} from "../fonts";
import { drawDivider } from "../helpers";

type ShippingSummaryProps = {
  doc: jsPDF;
  order: Order;
  startY: number;
};

/**
 * 出貨單 PDF｜金額摘要＋付款資訊
 *
 * 出貨單使用「顧客市價」。
 *
 * subtotal   → 商品金額
 * shippingFee → 運費
 * total      → 顧客應付總額
 *
 * 批發價不在出貨單顯示。
 */
export function drawShippingSummary({
  doc,
  order,
  startY,
}: ShippingSummaryProps): number {



  //------------------------------------------
  // 商品金額
  //------------------------------------------

  const labelX = SHIPPING_PDF.summary.labelX;
  const valueX = SHIPPING_PDF.summary.valueX;
doc.setFontSize(12);
  doc.text(
    "商品金額",
    labelX,
    startY
  );

  doc.setFontSize(12);
  doc.text(
    `NT$ ${order.subtotal}`,
    valueX,
    startY,
    {
      align: "right",
    }
  );

  //------------------------------------------
  // 運費
  //------------------------------------------
doc.setFontSize(12);
  doc.text(
    "運費",
    labelX,
    startY + 1 + SHIPPING_PDF.summary.lineHeight
  );

  doc.setFontSize(12);
  doc.text(
    `NT$ ${order.shippingFee}`,
    valueX,
    startY + 1 + SHIPPING_PDF.summary.lineHeight,
    {
      align: "right",
    }
  );

  //------------------------------------------
  // 分隔線
  //------------------------------------------

  const totalY =
    startY +
     3+
    SHIPPING_PDF.summary.lineHeight ;

  drawDivider(
    doc,
    labelX,
    SHIPPING_PDF.page.width - SHIPPING_PDF.page.margin,
    totalY
  );

  //------------------------------------------
  // 應付總額
  //------------------------------------------

  setTitleFont(doc);
doc.setFontSize(12);
  doc.text(
    "應付總額",
    labelX,
    totalY + 5

  );

  doc.text(
    `NT$ ${order.total}`,
    valueX,
    totalY + 5,
    {
      align: "right",
    }
  );

  //------------------------------------------
  // 貨到付款提醒
  //------------------------------------------

  let bottomY = totalY + 5;

  if (order.paymentMethod === "COD") {

    const noticeY = bottomY + 10;

    setTitleFont(doc);

    doc.text(
      "貨到付款",
      SHIPPING_PDF.page.margin,
      noticeY
    );

    doc.text(
      `應收金額：NT$ ${order.total}`,
      SHIPPING_PDF.page.margin,
      noticeY + 4
    );

    bottomY = noticeY + 4;
  }

  return bottomY;
}