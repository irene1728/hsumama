import { jsPDF } from "jspdf";

import type { Order } from "../../../types/order";

import { RECONCILIATION_PDF } from "./reconciliationPdfConfig";
import {
  setBodyFont,
  setTitleFont,
} from "../fonts";

type ReconciliationCustomerProps = {
  doc: jsPDF;
  order: Order;
};

/**
 * 對帳單 PDF｜客戶資訊
 *
 * v0.13 Step 2-3B
 *
 * 視覺尺寸、框線、字體與出貨單保持一致。
 *
 * 對帳單只保留與內部對帳相關的資訊：
 * - 客戶姓名
 * - 電話
 * - 配送地址
 * - 付款方式
 * - 配送方式
 */
export function drawReconciliationCustomer({
  doc,
  order,
}: ReconciliationCustomerProps): number {

  const {
    x,
    y,
    leftWidth,
    rowHeight,
  } = RECONCILIATION_PDF.customer.table;

  const width = RECONCILIATION_PDF.customer.table.width;

  //------------------------------------------
  // 標題
  //------------------------------------------

  setTitleFont(doc);
  doc.setFontSize(16);

  doc.text(
    "客戶資訊",
    RECONCILIATION_PDF.page.margin,
    RECONCILIATION_PDF.customer.titleY
  );

  //------------------------------------------
  // 外框
  //------------------------------------------

  const tableHeight = rowHeight * 3;

  doc.rect(
    x,
    y,
    width,
    tableHeight
  );

  //------------------------------------------
  // 橫線
  //------------------------------------------

  doc.line(
    x,
    y + rowHeight,
    x + width,
    y + rowHeight
  );

  doc.line(
    x,
    y + rowHeight * 2,
    x + width,
    y + rowHeight * 2
  );

  doc.line(
    x,
    y + rowHeight * 3,
    x + width,
    y + rowHeight * 3
  );

  //------------------------------------------
  // 第一、二列中線
  //------------------------------------------

  doc.line(
    x + leftWidth,
    y,
    x + leftWidth,
    y + rowHeight * 2
  );

  //------------------------------------------
  // 內容
  //------------------------------------------

  setBodyFont(doc);

  const textOffset = 5;

  //------------------------------------------
  // 第一列
  //------------------------------------------

  doc.text(
    `客戶姓名：${order.customerName}`,
    x + 2,
    y + textOffset
  );

  doc.text(
    "付款方式：ATM／線上轉帳",
    x + leftWidth + 2,
    y + textOffset
  );

  //------------------------------------------
  // 第二列
  //------------------------------------------

  doc.text(
    `電話：${order.phone}`,
    x + 2,
    y + rowHeight + textOffset
  );

  doc.text(
    `配送方式：${order.shippingMethod}`,
    x + leftWidth + 2,
    y + rowHeight + textOffset
  );

  //------------------------------------------
  // 第三列
  // 配送地址
  //------------------------------------------

  doc.text(
    `配送地址：${order.address}`,
    x + 2,
    y + rowHeight * 2 + textOffset
  );

  //------------------------------------------
  // 回傳表格底部位置
  //------------------------------------------

  return y + tableHeight;
}