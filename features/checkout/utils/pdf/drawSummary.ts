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

  doc.text("商品小計", labelX, startY);
  doc.text(
    `NT$ ${order.subtotal.toLocaleString()}`,
    valueX,
    startY,
    { align: "right" }
  );

  doc.text("運費", labelX, startY + lineHeight);
  doc.text(
    `NT$ ${order.shippingFee.toLocaleString()}`,
    valueX,
    startY + lineHeight,
    { align: "right" }
  );

  doc.text("總金額", labelX, startY + lineHeight * 2);
  doc.text(
    `NT$ ${order.total.toLocaleString()}`,
    valueX,
    startY + lineHeight * 2,
    { align: "right" }
  );
  
  const endY = startY + lineHeight * 2;

return endY;
}