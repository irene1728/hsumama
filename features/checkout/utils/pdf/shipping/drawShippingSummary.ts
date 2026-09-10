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
 * 出貨單 PDF｜金額摘要
 *
 * 顧客市價
 *
 * 商品金額
 * 運費
 * 積分折抵
 * 應付總額
 */
export function drawShippingSummary({
  doc,
  order,
  startY,
}: ShippingSummaryProps): number {

  //------------------------------------------
  // 欄位位置
  //------------------------------------------

  const labelX = SHIPPING_PDF.summary.labelX;
  const valueX = SHIPPING_PDF.summary.valueX;

  const lineHeight =
    SHIPPING_PDF.summary.lineHeight;

  const pointsUsed = Number(
    order.pointsUsed ?? 0
  );

  //------------------------------------------
  // 商品金額
  //------------------------------------------

  setBodyFont(doc);
  doc.setFontSize(12);

  doc.text(
    "商品金額",
    labelX,
    startY
  );

  

  doc.text(
    `NT$ ${order.subtotal.toLocaleString("zh-TW")}`,
    valueX,
    startY,
    {
      align: "right",
    }
  );

  //------------------------------------------
  // 運費
  //------------------------------------------



  doc.text(
    "運費",
    labelX,
    startY + lineHeight
  );


  doc.text(
    `NT$ ${order.shippingFee.toLocaleString("zh-TW")}`,
    valueX,
    startY + lineHeight,
    {
      align: "right",
    }
  );

  //------------------------------------------
  // 積分折抵
  //------------------------------------------

  let currentY =
    startY + lineHeight;

  if (pointsUsed > 0) {
    currentY += lineHeight;

    doc.text(
      "積分折抵",
      labelX,
      currentY
    );

    doc.text(
      `- NT$ ${pointsUsed.toLocaleString("zh-TW")}`,
      valueX,
      currentY,
      {
        align: "right",
      }
    );
  }

  //------------------------------------------
  // 分隔線
  //------------------------------------------

  const totalY =
    currentY + 3;

  drawDivider(
    doc,
    labelX,
    SHIPPING_PDF.page.width -
      SHIPPING_PDF.page.margin,
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
    `NT$ ${order.total.toLocaleString("zh-TW")}`,
    valueX,
    totalY + 5,
    {
      align: "right",
    }
  );

  //------------------------------------------
  // 結束位置
  //------------------------------------------

  const bottomY =
    totalY + 5;

  return bottomY;
}