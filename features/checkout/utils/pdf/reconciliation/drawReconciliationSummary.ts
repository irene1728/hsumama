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
 * 對帳內容：
 *
 * ① 商品總額
 *    = 顧客下單時的商品總額
 *
 * ② 運費
 *    = 訂單建立時保存的 shipping_fee
 *
 * ③ 顧客應付總額
 *    = 商品總額 + 運費
 *
 * ④ 批發商品總額
 *    = 所有 order_items.wholesale_subtotal 加總
 *
 * ⑤ 差價利潤
 *    = 所有 order_items.profit 加總
 *
 * 注意：
 * profit 使用訂單建立當時保存的資料。
 * 不重新查詢 products.wholesale_price。
 */
export function drawReconciliationSummary({
  doc,
  order,
  startY,
}: ReconciliationSummaryProps): number {


  //------------------------------------------
  // 商品總額
  //
  // 顧客下單時保存的商品總額
  //------------------------------------------

  const productTotal = order.subtotal;

  //------------------------------------------
  // 運費
  //
  // 訂單建立時保存的 shippingFee
  //------------------------------------------

  const shippingFee = order.shippingFee;

  //------------------------------------------
  // 顧客實際應付總額
  //------------------------------------------

  const customerTotal = order.total;

  //------------------------------------------
  // 批發商品總額
  //
  // 使用每一項商品當時保存的批發小計
  //------------------------------------------

  const wholesaleTotal = order.items.reduce(
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
  // 差價利潤
  //
  // 使用 order_items.profit
  //------------------------------------------

  const profitTotal = order.items.reduce(
    (sum, item) => {

      if (
        item.profit === null ||
        item.profit === undefined
      ) {
        throw new Error(
          `訂單 ${order.orderNo} 缺少差價利潤資料，無法產生對帳單。`
        );
      }

      return sum + item.profit;
    },
    0
  );

  //------------------------------------------
  // 欄位位置
  //------------------------------------------

  const labelX =
    RECONCILIATION_PDF.summary.labelX;

  const valueX =
    RECONCILIATION_PDF.summary.valueX;

  const lineHeight =
    RECONCILIATION_PDF.summary.lineHeight;

  //------------------------------------------
  // 商品總額
  //------------------------------------------

  setBodyFont(doc);

  doc.setFontSize(11);

  doc.text(
    "商品總額",
    labelX,
    startY
  );



  doc.text(
    `NT$ ${productTotal.toLocaleString("zh-TW")}`,
    valueX,
    startY,
    {
      align: "right",
    }
  );

  //------------------------------------------
  // 運費
  //------------------------------------------



  doc.text(
    "運費",
    labelX,
    startY + lineHeight
  );

  doc.text(
    `NT$ ${shippingFee.toLocaleString("zh-TW")}`,
    valueX,
    startY + lineHeight,
    {
      align: "right",
    }
  );

  //------------------------------------------
  // 顧客應付總額
  //------------------------------------------

  doc.text(
    "顧客應付總額",
    labelX,
    startY + lineHeight * 2
  );

  doc.text(
    `NT$ ${customerTotal.toLocaleString("zh-TW")}`,
    valueX,
    startY + lineHeight * 2,
    {
      align: "right",
    }
  );

  //------------------------------------------
  // 第一段分隔線
  //------------------------------------------

  const wholesaleStartY =
    startY + lineHeight * 3 + 3;

  drawDivider(
    doc,
    labelX,
    RECONCILIATION_PDF.page.width -
      RECONCILIATION_PDF.page.margin,
    wholesaleStartY
  );

  //------------------------------------------
  // 批發商品總額
  //------------------------------------------

  setBodyFont(doc);

  doc.setFontSize(11);

  doc.text(
    "批發商品總額",
    labelX,
    wholesaleStartY + 6
  );

  doc.text(
    `NT$ ${wholesaleTotal.toLocaleString("zh-TW")}`,
    valueX,
    wholesaleStartY + 6,
    {
      align: "right",
    }
  );

  //------------------------------------------
  // 差價利潤
  //------------------------------------------

  setTitleFont(doc);

  doc.setFontSize(
    RECONCILIATION_PDF.summary.totalFontSize
  );

  const profitY =
    wholesaleStartY + 6 + lineHeight;

  doc.text(
    "差價利潤",
    labelX,
    profitY
  );

  doc.text(
    `NT$ ${profitTotal.toLocaleString("zh-TW")}`,
    valueX,
    profitY,
    {
      align: "right",
    }
  );

  //------------------------------------------
  // 回傳金額區底部位置
  //------------------------------------------

  return profitY;
}