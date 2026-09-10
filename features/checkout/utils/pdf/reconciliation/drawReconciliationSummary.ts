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
 * 第一段｜顧客付款金額
 *
 * 商品總額
 * + 運費
 * - 積分折抵
 * = 顧客應付總額
 *
 *
 * 第二段｜徐媽媽利潤
 *
 * 商品總額
 * - 批發商品總額
 * - 優惠成本
 * = 差價利潤
 *
 *
 * 目前：
 * 優惠成本 = 積分折抵
 *
 * 未來增加優惠券、生日券等優惠時，
 * 可再擴充優惠成本的計算方式。
 */
export function drawReconciliationSummary({
  doc,
  order,
  startY,
}: ReconciliationSummaryProps): number {

  //------------------------------------------
  // 商品總額
  //------------------------------------------

  const productTotal = Number(
    order.subtotal ?? 0
  );

  //------------------------------------------
  // 運費
  //------------------------------------------

  const shippingFee = Number(
    order.shippingFee ?? 0
  );

  //------------------------------------------
  // 積分折抵
  //------------------------------------------

  const pointsUsed = Number(
    order.pointsUsed ?? 0
  );

  //------------------------------------------
  // 優惠成本
  //
  // 目前優惠成本 = 積分折抵
  //------------------------------------------

  const discountCost = pointsUsed;

  //------------------------------------------
  // 顧客實際應付總額
  //
  // 商品總額 + 運費 - 積分折抵
  //------------------------------------------

  const customerTotal = Number(
    order.total ?? 0
  );

  //------------------------------------------
  // 批發商品總額
  //
  // 使用 order_items 中
  // 下單當時保存的批發商品小計
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

      return (
        sum +
        Number(item.wholesaleSubtotal)
      );
    },
    0
  );

  //------------------------------------------
  // 差價利潤
  //
  // 商品總額
  // - 批發商品總額
  // - 優惠成本
  //------------------------------------------

  const profitTotal =
    productTotal -
    wholesaleTotal -
    discountCost;

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
  // 第一段
  // 顧客付款金額
  //------------------------------------------

  setBodyFont(doc);
  doc.setFontSize(11);

  //------------------------------------------
  // 商品總額
  //------------------------------------------

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
  // 積分折抵
  //------------------------------------------

  const pointsY =
    startY + lineHeight * 2;

  if (pointsUsed > 0) {

    doc.text(
      "積分折抵",
      labelX,
      pointsY
    );

    doc.text(
      `- NT$ ${pointsUsed.toLocaleString("zh-TW")}`,
      valueX,
      pointsY,
      {
        align: "right",
      }
    );

  } else {

    doc.text(
      "積分折抵",
      labelX,
      pointsY
    );

    doc.text(
      "NT$ 0",
      valueX,
      pointsY,
      {
        align: "right",
      }
    );
  }

  //------------------------------------------
  // 第一段分隔線
  //------------------------------------------

  const customerDividerY =
    pointsY + 3;

  drawDivider(
    doc,
    labelX,
    RECONCILIATION_PDF.page.width -
      RECONCILIATION_PDF.page.margin,
    customerDividerY
  );

  //------------------------------------------
  // 顧客應付總額
  //------------------------------------------

  const customerTotalY =
    customerDividerY + 6;

  setTitleFont(doc);

  doc.setFontSize(
    RECONCILIATION_PDF.summary.totalFontSize
  );

  doc.text(
    "顧客應付總額",
    labelX,
    customerTotalY
  );

  doc.text(
    `NT$ ${customerTotal.toLocaleString("zh-TW")}`,
    valueX,
    customerTotalY,
    {
      align: "right",
    }
  );

  //------------------------------------------
  // 第二段分隔線
  //------------------------------------------

  const profitDividerY =
    customerTotalY +
    lineHeight +
    3;

  drawDivider(
    doc,
    labelX,
    RECONCILIATION_PDF.page.width -
      RECONCILIATION_PDF.page.margin,
    profitDividerY
  );

  //------------------------------------------
  // 第二段
  // 徐媽媽利潤
  //------------------------------------------

  const profitSectionStartY =
    profitDividerY + 6;

  setBodyFont(doc);
  doc.setFontSize(11);

  //------------------------------------------
  // 商品總額
  //------------------------------------------

  doc.text(
    "商品總額",
    labelX,
    profitSectionStartY
  );

  doc.text(
    `NT$ ${productTotal.toLocaleString("zh-TW")}`,
    valueX,
    profitSectionStartY,
    {
      align: "right",
    }
  );

  //------------------------------------------
  // 批發商品總額
  //------------------------------------------

  const wholesaleY =
    profitSectionStartY + lineHeight;

  doc.text(
    "批發商品總額",
    labelX,
    wholesaleY
  );

  doc.text(
    `- NT$ ${wholesaleTotal.toLocaleString("zh-TW")}`,
    valueX,
    wholesaleY,
    {
      align: "right",
    }
  );

  //------------------------------------------
  // 優惠成本
  //------------------------------------------

  const discountY =
    wholesaleY + lineHeight;

  doc.text(
    "優惠成本",
    labelX,
    discountY
  );

  doc.text(
    `- NT$ ${discountCost.toLocaleString("zh-TW")}`,
    valueX,
    discountY,
    {
      align: "right",
    }
  );

  //------------------------------------------
  // 差價利潤
  //------------------------------------------

  const profitY =
    discountY + lineHeight;

  setTitleFont(doc);

  doc.setFontSize(
    RECONCILIATION_PDF.summary.totalFontSize
  );

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