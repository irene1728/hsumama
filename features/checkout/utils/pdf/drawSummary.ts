import type { jsPDF } from "jspdf";
import type { Order } from "../../types/order";

import { PDF } from "./pdfConfig";
import { setBodyFont } from "./fonts";

interface DrawSummaryProps {
  doc: jsPDF;
  order: Order;
  startY: number;
}

export function drawSummary({
  doc,
  order,
  startY,
}: DrawSummaryProps): number {
  
  setBodyFont(doc);

  const { labelX, valueX, lineHeight } = PDF.summary;

  doc.setFontSize(10);

  // =========================
  // 商品小計
  // =========================

  doc.text("商品小計", labelX, startY);

  doc.text(
    `NT$ ${order.subtotal.toLocaleString()}`,
    valueX,
    startY,
    { align: "right" }
  );

  // =========================
  // 運費
  // =========================

  const shippingY = startY + lineHeight;

  doc.text("運費", labelX, shippingY);

  doc.text(
    `NT$ ${order.shippingFee.toLocaleString()}`,
    valueX,
    shippingY,
    { align: "right" }
  );

  // =========================
  // 積分折抵
  // =========================

  let currentY = shippingY;

  if (order.pointsUsed > 0) {
    currentY += lineHeight;

    doc.text("積分折抵", labelX, currentY);

    doc.text(
      `- NT$ ${order.pointsUsed.toLocaleString()}`,
      valueX,
      currentY,
      { align: "right" }
    );
  }

  // =========================
  // 應付總金額
  // =========================

  const totalY = currentY + lineHeight;

  doc.text("應付總金額", labelX, totalY);

  doc.text(
    `NT$ ${order.total.toLocaleString()}`,
    valueX,
    totalY,
    { align: "right" }
  );

  return totalY;
}