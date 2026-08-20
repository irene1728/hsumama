import { jsPDF } from "jspdf";

import type { Order } from "../../../types/order";

import { SHIPPING_PDF } from "./shippingPdfConfig";
import {
  setBodyFont,
  setTitleFont,
} from "../fonts";
import { drawDivider } from "../helpers";

type ShippingItemsProps = {
  doc: jsPDF;
  order: Order;
};

/**
 * 出貨單 PDF｜商品明細
 *
 * 使用顧客實際購買價格。
 *
 * price    → 顧客市價
 * subtotal → 顧客市價小計
 *
 * 批發價不在出貨單顯示。
 *
 * 欄位對齊：
 * 序號、商品名稱 → 左對齊
 * 數量、單價、小計 → 右對齊
 */
export function drawShippingItems({
  doc,
  order,
  
}: ShippingItemsProps): number {

  //------------------------------------------
  // 標題
  //------------------------------------------

  setTitleFont(doc);

  const titleY = SHIPPING_PDF.items.titleY;
doc.setFontSize(16);
  doc.text(
    "商品明細",
    SHIPPING_PDF.page.margin,
    titleY
  );

  drawDivider(
  doc,
  SHIPPING_PDF.page.margin,
  SHIPPING_PDF.page.width - SHIPPING_PDF.page.margin,
  titleY + 2
);

  //------------------------------------------
  // 表格起始位置
  //------------------------------------------

  const startY = SHIPPING_PDF.items.tableStartY;

  const x = SHIPPING_PDF.items.x;

  const columns = SHIPPING_PDF.items.columnWidth;

  //------------------------------------------
  // 各欄位右邊界
  //------------------------------------------

  const quantityRightX =
    x +
    columns.no +
    columns.name +
    columns.quantity;

  const priceRightX =
    quantityRightX +
    columns.price;

  const subtotalRightX =
    priceRightX +
    columns.subtotal;

  //------------------------------------------
  // 表頭
  //------------------------------------------

  setBodyFont(doc);

  const headerY = startY;

  // 序號：左對齊
  doc.text(
    "序號",
    x,
    headerY
  );

  // 商品名稱：左對齊
  doc.text(
    "商品名稱",
    x + columns.no,
    headerY
  );

  // 數量：右對齊
  doc.text(
    "數量",
    quantityRightX,
    headerY,
    {
      align: "right",
    }
  );

  // 單價：右對齊
  doc.text(
    "單價",
    priceRightX,
    headerY,
    {
      align: "right",
    }
  );

  // 小計：右對齊
  doc.text(
    "小計",
    subtotalRightX,
    headerY,
    {
      align: "right",
    }
  );

  //------------------------------------------
  // 表頭分隔線
  //------------------------------------------

  const headerDividerY = headerY + 3;

  drawDivider(
    doc,
    x,
    x + SHIPPING_PDF.items.width,
    headerDividerY
  );

  //------------------------------------------
  // 商品資料
  //------------------------------------------

  let currentY = headerY + 10;
doc.setFontSize(10);
  order.items.forEach((item, index) => {

    //----------------------------------------
    // 序號：左對齊
    //----------------------------------------
doc.setFontSize(10);
    doc.text(
      String(index + 1),
      x,
      currentY
    );

    //----------------------------------------
    // 商品名稱：左對齊
    //----------------------------------------
doc.setFontSize(10);
    doc.text(
      item.name,
      x + columns.no,
      currentY
    );

    //----------------------------------------
    // 數量：右對齊
    //----------------------------------------
doc.setFontSize(10);
    doc.text(
      String(item.quantity),
      quantityRightX,
      currentY,
      {
        align: "right",
      }
    );

    //----------------------------------------
    // 顧客單價：右對齊
    //----------------------------------------
doc.setFontSize(10);
    doc.text(
      `NT$ ${item.price}`,
      priceRightX,
      currentY,
      {
        align: "right",
      }
    );

    //----------------------------------------
    // 顧客小計：右對齊
    //----------------------------------------
 doc.setFontSize(12);
    doc.text(
      `NT$ ${item.subtotal}`,
      subtotalRightX,
      currentY,
      {
        align: "right",
      }
    );

    //----------------------------------------
    // 商品分隔線
    //----------------------------------------

    currentY += 3;

    drawDivider(
      doc,
      x,
      x + SHIPPING_PDF.items.width,
      currentY
    );

    currentY += 6;
  });

  return currentY;
}