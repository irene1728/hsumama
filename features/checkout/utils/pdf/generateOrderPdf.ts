import { jsPDF } from "jspdf";

import type { Order } from "../../types/order";

import { createPdf } from "./createPdf";
import { drawHeader } from "./drawHeader";
import { registerFonts } from "./fonts";
import { loadPdfAssets } from "./loader";
import { drawCustomer } from "./drawCustomer";
import { drawItems } from "./drawItems";
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

console.log(order);
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
  // Shipping
  //------------------------------------------

  // drawShipping({
  //   doc,
  //   order,
  // });

  //------------------------------------------
  // Items
  //------------------------------------------

 drawItems({
  doc,
  order,
  assets,
});

  //------------------------------------------
  // Payment
  //------------------------------------------

  // drawPayment({
  //   doc,
  //   order,
  // });

  //------------------------------------------
  // Footer
  //------------------------------------------

  // drawFooter({
  //   doc,
  //   assets,
  // });

  //------------------------------------------
  // Return PDF
  //------------------------------------------

  return doc;
}