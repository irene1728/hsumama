import { jsPDF } from "jspdf";

/**
 * 建立 PDF 文件
 *
 * PDF Engine v1.0
 */
export function createPdf(): jsPDF {
  return new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });
}