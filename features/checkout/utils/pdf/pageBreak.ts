import type { jsPDF } from "jspdf";

import { PDF } from "./pdfConfig";

/**
 * 如果下一個區塊放不下
 * 自動換頁
 */
export function ensurePageSpace(
  doc: jsPDF,
  currentY: number,
  requiredHeight: number
): number {

  const bottom =
    PDF.page.height - PDF.page.margin;

  if (currentY + requiredHeight > bottom) {

    doc.addPage();

    return PDF.page.margin;
  }

  return currentY;
}