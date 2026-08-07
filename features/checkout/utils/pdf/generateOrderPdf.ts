import { jsPDF } from "jspdf";
import { PDF } from "./pdfConfig";
import type { Order } from "../../types/order";

import { createPdf } from "./createPdf";
import { drawHeader } from "./drawHeader";
import { registerFonts } from "./fonts";
import { loadPdfAssets } from "./loader";
import { drawCustomer } from "./drawCustomer";
import { drawItems } from "./drawItems";
import { drawSummary } from "./drawSummary";
import { drawPayment } from "./drawPayment";
import { drawShipping } from "./drawShipping";
import { drawFooter } from "./drawFooter";
import { ensurePageSpace } from "./pageBreak";
/**
 * 產生訂單 PDF
 *
 * PDF Engine v1.0
 *
 * 職責：
 * 1. 建立 PDF
 * 2. 載入共用素材
 * 3. 呼叫各繪圖模組
 * 4. 回傳 jsPDF
 *
 * 注意：
 * 本函式不負責下載 PDF。
 */
export async function generateOrderPdf(
  order: Order
): Promise<jsPDF> {


  //------------------------------------------
  // 建立 PDF
  //------------------------------------------

 const doc = createPdf();

await registerFonts(doc);

  //------------------------------------------
  // 載入共用素材
  //------------------------------------------

  const assets = await loadPdfAssets();

  //------------------------------------------
  // Header
  //------------------------------------------

  drawHeader({
    doc,
    order,
    assets,
  });


//------------------------------------------
// Customer
//------------------------------------------

drawCustomer({
  doc,
  order,
  assets,

});

//------------------------------------------
// Items
//------------------------------------------

const itemsBottom = drawItems({
  doc,
  order,
  assets,
});

  //------------------------------------------
  // Summary
  //------------------------------------------

const summaryBottom = drawSummary({
  doc,
  order,
  startY: itemsBottom + PDF.summary.topSpacing,
});

  //------------------------------------------
  // Payment
  //------------------------------------------

const paymentStart = ensurePageSpace(
  doc,
  summaryBottom + PDF.payment.topSpacing,
  PDF.payment.height
);

const paymentBottom = drawPayment({
  doc,
  order,
  assets,
  startY: paymentStart,
});

//------------------------------------------
// Shipping
//------------------------------------------

const shippingBottom = drawShipping({
  doc,
  order,
  assets,
  startY: paymentBottom + PDF.shipping.topSpacing,
   
});

//------------------------------------------
// Footer
//------------------------------------------

const footerStart = ensurePageSpace(
  doc,
  shippingBottom + PDF.footer.topSpacing,
  PDF.footer.height
);

drawFooter({
  doc,
  order,
  assets,
  startY: footerStart,
});

  //------------------------------------------
  // Return PDF
  //------------------------------------------

  return doc;
}