import { jsPDF } from "jspdf";

import type { Order } from "../../../types/order";

import { RECONCILIATION_PDF } from "./reconciliationPdfConfig";
import {
  setBodyFont,
  setTitleFont,
} from "../fonts";
import { drawDivider } from "../helpers";

type ReconciliationSummaryProps = {
  doc: jsPDF;
  order: Order;
  startY: number;
};
/**
 * 對帳單 PDF｜金額摘要
 *
 * v0.13 Step 2-3B
 *
 * 對帳規則：
 *
 * 批發商品金額
 *   = 所有 order_items.wholesale_subtotal 加總
 *
 * 運費
 *   = orders.shipping_fee
 *
 * 批發應付金額
 *   = 批發商品金額 + 運費
 *
 * 注意：
 * 免運資格是在顧客下單時，以顧客市價判斷。
 * 對帳單不重新使用批發價判斷免運。
 */
export function drawReconciliationSummary({
  doc,
  order,
  startY,
}: ReconciliationSummaryProps): number {

  //------------------------------------------
  // 計算批發商品金額
  //------------------------------------------

  const wholesaleSubtotal = order.items.reduce(
    (sum, item) => {

      if (
        item.wholesaleSubtotal === null ||
        item.wholesaleSubtotal === undefined
      ) {
        throw new Error(
          `訂單 ${order.orderNo} 缺少批發小計資料，無法產生對帳單。`
        );
      }

      return sum + item.wholesaleSubtotal;
    },
    0
  );

  //------------------------------------------
  // 運費
  //
  // 直接使用訂單建立時保存的 shippingFee
  //------------------------------------------

  const shippingFee = order.shippingFee;

  //------------------------------------------
  // 批發應付金額
  //------------------------------------------

  const reconciliationTotal =
    wholesaleSubtotal + shippingFee;

  //------------------------------------------
  // 欄位位置
  //------------------------------------------

  const labelX = RECONCILIATION_PDF.summary.labelX;

  const valueX = RECONCILIATION_PDF.summary.valueX;

  //------------------------------------------
  // 批發商品金額
  //------------------------------------------

  setBodyFont(doc);

  doc.setFontSize(12);

  doc.text(
    "批發商品金額",
    labelX,
    startY
  );

  doc.setFontSize(12);

  doc.text(
    `NT$ ${wholesaleSubtotal}`,
    valueX,
    startY,
    {
      align: "right",
    }
  );

  //------------------------------------------
  // 運費
  //------------------------------------------

  doc.setFontSize(12);

  doc.text(
    "運費",
    labelX,
    startY + 1 +
      RECONCILIATION_PDF.summary.lineHeight
  );

  doc.setFontSize(12);

  doc.text(
    `NT$ ${shippingFee}`,
    valueX,
    startY + 1 +
      RECONCILIATION_PDF.summary.lineHeight,
    {
      align: "right",
    }
  );

  //------------------------------------------
  // 分隔線
  //------------------------------------------

  const totalY =
    startY +
    3 +
    RECONCILIATION_PDF.summary.lineHeight;

  drawDivider(
    doc,
    labelX,
    RECONCILIATION_PDF.page.width -
      RECONCILIATION_PDF.page.margin,
    totalY
  );

  //------------------------------------------
  // 批發應付金額
  //------------------------------------------

  setTitleFont(doc);

  doc.setFontSize(
    RECONCILIATION_PDF.summary.totalFontSize
  );

  doc.text(
    "批發應付金額",
    labelX,
    totalY + 5
  );

  doc.text(
    `NT$ ${reconciliationTotal}`,
    valueX,
    totalY + 5,
    {
      align: "right",
    }
  );

  //------------------------------------------
  // 回傳金額區底部位置
  //------------------------------------------

  return totalY + 5;
}