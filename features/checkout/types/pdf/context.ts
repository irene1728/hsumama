import { jsPDF } from "jspdf";

import type { Order } from "../order";
import type { LoadedPdfAssets } from "../../utils/pdf/loader";

/**
 * PDF 共用 Context
 *
 * 所有 drawXXX.ts 共用
 */
export interface PdfContext {
  doc: jsPDF;
  order: Order;
  assets: LoadedPdfAssets;
}