import type { PdfContext } from "../../types/pdf";

import { PDF } from "./pdfConfig";
import {
  setBodyFont,
  setHeadingFont,
} from "./fonts";

/**
 * 配送資訊
 */
interface DrawShippingProps extends PdfContext {
  startY: number;
}

export function drawShipping({
  doc,
  order,
  startY,
}: DrawShippingProps): number {
  //------------------------------------------
  // Title
  //------------------------------------------

  setHeadingFont(doc);

  doc.text(
    "配送資訊",
    PDF.page.margin,
    startY
  );

  //------------------------------------------
  // Divider
  //------------------------------------------

doc.line(
  PDF.page.margin,
  startY + 2,
  PDF.page.width - PDF.page.margin,
  startY + 2
);

  //------------------------------------------
  // Content
  //------------------------------------------

setBodyFont(doc);

const y = startY + PDF.spacing.line;

doc.text(
  `配送方式：${order.shippingMethod}`,
  PDF.page.margin,
  y
);

const endY = y;

return endY;
}