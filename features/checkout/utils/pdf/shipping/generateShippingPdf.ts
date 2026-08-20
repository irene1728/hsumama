import { jsPDF } from "jspdf";

import type { Order } from "../../../types/order";
import { drawShippingCustomer } from "./drawShippingCustomer";
import { drawShippingItems } from "./drawShippingItems";
import { drawShippingSummary } from "./drawShippingSummary";
import { SHIPPING_PDF } from "./shippingPdfConfig";
import { ensurePageSpace } from "../pageBreak";
import { drawShippingFooter } from "./drawShippingFooter";

import { createPdf } from "../createPdf";
import { registerFonts } from "../fonts";
import { loadPdfAssets } from "../loader";

import { drawShippingHeader } from "./drawShippingHeader";

/**
 * 產生出貨單 PDF
 *
 * v0.13 Step 2-3A
 *
 * 注意：
 * 本 PDF Engine 與原本顧客訂單 PDF 完全分離。
 */
export async function generateShippingPdf(
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

  drawShippingHeader({
    doc,
    order,
    assets,
  });

//------------------------------------------
// Customer
//------------------------------------------

drawShippingCustomer({
  doc,
  order,
});

//------------------------------------------
// Items
//------------------------------------------

drawShippingItems({
  doc,
  order,
});


//------------------------------------------
// Summary
//------------------------------------------

const itemsBottom = drawShippingItems({
  doc,
  order,
});

const summaryBottom = drawShippingSummary({
  doc,
  order,
  startY:
    itemsBottom +
    SHIPPING_PDF.summary.topSpacing,
});

//------------------------------------------
// Footer
//------------------------------------------

const footerStart = ensurePageSpace(
  doc,
  summaryBottom + SHIPPING_PDF.footer.topSpacing,
  SHIPPING_PDF.footer.height
);

drawShippingFooter({
  doc,
  
  startY: footerStart,
});

  return doc;
}