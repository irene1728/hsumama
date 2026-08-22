import { jsPDF } from "jspdf";

import type { Order } from "../../../types/order";

import { SHIPPING_PDF } from "./shippingPdfConfig";
import {
  setBodyFont,
  setTitleFont,
} from "../fonts";

type ShippingCustomerProps = {
  doc: jsPDF;
  order: Order;
};

/**
 * 出貨單 PDF｜客戶資訊
 *
 * v0.13 Step 2-3A-3
 *
 * 保留出貨單原本的文字排列，
 * 框線方式參考顧客訂單 PDF。
 */
export function drawShippingCustomer({
  doc,
  order,
}: ShippingCustomerProps): number {

  const {
    x,
    y,
    leftWidth,
    rowHeight,
  } = SHIPPING_PDF.customer.table;

  const width = SHIPPING_PDF.customer.table.width;

  //------------------------------------------
  // 標題
  //------------------------------------------

  setTitleFont(doc);
doc.setFontSize(16);
  doc.text(
    "客戶資訊",
    SHIPPING_PDF.page.margin,
    SHIPPING_PDF.customer.titleY
  );

  //------------------------------------------
  // 外框
  //------------------------------------------

  const tableHeight = rowHeight * 5;

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

  doc.line(
    x,
    y + rowHeight * 4,
    x + width,
    y + rowHeight * 4
  );

  //------------------------------------------
  // 第一列中線
  //------------------------------------------

  doc.line(
    x + leftWidth,
    y,
    x + leftWidth,
    y + rowHeight * 3
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
    `付款方式：${
      order.paymentMethod === "ATM"
        ? "ATM轉帳"
        : "貨到付款"
    }`,
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
  //------------------------------------------

  doc.text(
    `Email：${order.email}`,
    x + 2,
    y + rowHeight * 2 + textOffset
  );

  //------------------------------------------
  // 第四列
  //------------------------------------------

  doc.text(
    `配送地址：${order.address}`,
    x + 2,
    y + rowHeight * 3 + textOffset
  );

  //------------------------------------------
  // 第五列
  //------------------------------------------

  doc.text(
    `備註：${order.note || "-"}`,
    x + 2,
    y + rowHeight * 4 + textOffset
  );

  //------------------------------------------
  // 回傳表格底部位置
  //------------------------------------------

  return y + tableHeight;
}