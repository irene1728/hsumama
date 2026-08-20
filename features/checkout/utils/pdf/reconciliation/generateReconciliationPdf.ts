import { jsPDF } from "jspdf";

import type { Order } from "../../../types/order";

import { createPdf } from "../createPdf";
import { registerFonts } from "../fonts";
import { loadPdfAssets } from "../loader";
import { ensurePageSpace } from "../pageBreak";

import { drawReconciliationHeader } from "./drawReconciliationHeader";
import { drawReconciliationCustomer } from "./drawReconciliationCustomer";
import { drawReconciliationItems } from "./drawReconciliationItems";
import { drawReconciliationSummary } from "./drawReconciliationSummary";
import { drawReconciliationFooter } from "./drawReconciliationFooter";

import { RECONCILIATION_PDF } from "./reconciliationPdfConfig";

/**
 * 產生對帳單 PDF
 *
 * v0.13 Step 2-3B
 *
 * 注意：
 * 本 PDF Engine 與顧客訂單 PDF、出貨單 PDF 完全分離。
 */
export async function generateReconciliationPdf(
  order: Order
): Promise<jsPDF> {

  //------------------------------------------
  // 建立 PDF
  //------------------------------------------

  const doc = createPdf();

  //------------------------------------------
  // 載入字型
  //------------------------------------------

  await registerFonts(doc);

  //------------------------------------------
  // 載入共用素材
  //------------------------------------------

  const assets = await loadPdfAssets();

  //------------------------------------------
  // Header
  //------------------------------------------

  drawReconciliationHeader({
    doc,
    order,
    assets,
  });

  //------------------------------------------
  // Customer
  //------------------------------------------

  drawReconciliationCustomer({
    doc,
    order,
  });

  //------------------------------------------
  // Items
  //------------------------------------------

  const itemsBottom = drawReconciliationItems({
    doc,
    order,
  });

  //------------------------------------------
  // Summary
  //------------------------------------------

  const summaryBottom = drawReconciliationSummary({
    doc,
    order,
    startY:
      itemsBottom +
      RECONCILIATION_PDF.summary.topSpacing,
  });

  //------------------------------------------
  // Footer
  //------------------------------------------

  const footerStart = ensurePageSpace(
    doc,
    summaryBottom +
      RECONCILIATION_PDF.footer.topSpacing,
    RECONCILIATION_PDF.footer.height
  );

  drawReconciliationFooter({
    doc,
    startY: footerStart,
  });

  //------------------------------------------
  // 完成
  //------------------------------------------

  return doc;
}