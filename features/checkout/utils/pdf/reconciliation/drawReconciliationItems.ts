import { jsPDF } from "jspdf";

import type { Order } from "../../../types/order";

import { RECONCILIATION_PDF } from "./reconciliationPdfConfig";
import {
  setBodyFont,
  setTitleFont,
} from "../fonts";
import { drawDivider } from "../helpers";

type ReconciliationItemsProps = {
  doc: jsPDF;
  order: Order;
};

/**
 * 對帳單 PDF｜商品明細
 *
 * v0.13 Step 2-3B
 *
 * 商品金額使用「下單當時保存的批發價快照」。
 *
 * wholesalePrice
 *   → order_items.wholesale_price
 *
 * wholesaleSubtotal
 *   → order_items.wholesale_subtotal
 *
 * 不重新查詢 products.wholesale_price。
 *
 * 欄位對齊：
 * 序號、商品名稱 → 左對齊
 * 數量、批發價、批發小計 → 右對齊
 */
export function drawReconciliationItems({
  doc,
  order,
}: ReconciliationItemsProps): number {

  //------------------------------------------
  // 標題
  //------------------------------------------

  setTitleFont(doc);

  const titleY = RECONCILIATION_PDF.items.titleY;

  doc.setFontSize(16);

  doc.text(
    "商品明細",
    RECONCILIATION_PDF.page.margin,
    titleY
  );

  drawDivider(
    doc,
    RECONCILIATION_PDF.page.margin,
    RECONCILIATION_PDF.page.width -
      RECONCILIATION_PDF.page.margin,
    titleY + 2
  );

  //------------------------------------------
  // 表格起始位置
  //------------------------------------------

  const startY = RECONCILIATION_PDF.items.tableStartY;

  const x = RECONCILIATION_PDF.items.x;

  const columns = RECONCILIATION_PDF.items.columnWidth;

  //------------------------------------------
  // 各欄位右邊界
  //------------------------------------------

  const quantityRightX =
    x +
    columns.no +
    columns.name +
    columns.quantity;

  const wholesalePriceRightX =
    quantityRightX +
    columns.price;

  const wholesaleSubtotalRightX =
    wholesalePriceRightX +
    columns.subtotal;

  //------------------------------------------
  // 表頭
  //------------------------------------------

  setBodyFont(doc);

  const headerY = startY;

  //------------------------------------------
  // 序號：左對齊
  //------------------------------------------

  doc.text(
    "序號",
    x,
    headerY
  );

  //------------------------------------------
  // 商品名稱：左對齊
  //------------------------------------------

  doc.text(
    "商品名稱",
    x + columns.no,
    headerY
  );

  //------------------------------------------
  // 數量：右對齊
  //------------------------------------------

  doc.text(
    "數量",
    quantityRightX,
    headerY,
    {
      align: "right",
    }
  );

  //------------------------------------------
  // 批發價：右對齊
  //------------------------------------------

  doc.text(
    "批發價",
    wholesalePriceRightX,
    headerY,
    {
      align: "right",
    }
  );

  //------------------------------------------
  // 批發小計：右對齊
  //------------------------------------------

  doc.text(
    "批發小計",
    wholesaleSubtotalRightX,
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
    x + RECONCILIATION_PDF.items.width,
    headerDividerY
  );

  //------------------------------------------
  // 商品資料
  //------------------------------------------

  let currentY = headerY + 10;

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
    // 批發價：右對齊
    //----------------------------------------

    doc.setFontSize(10);

    doc.text(
      item.wholesalePrice !== null &&
        item.wholesalePrice !== undefined
        ? `NT$ ${item.wholesalePrice}`
        : "-",
      wholesalePriceRightX,
      currentY,
      {
        align: "right",
      }
    );

    //----------------------------------------
    // 批發小計：右對齊
    //----------------------------------------

    doc.setFontSize(12);

    doc.text(
      item.wholesaleSubtotal !== null &&
        item.wholesaleSubtotal !== undefined
        ? `NT$ ${item.wholesaleSubtotal}`
        : "-",
      wholesaleSubtotalRightX,
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
      x + RECONCILIATION_PDF.items.width,
      currentY
    );

    currentY += 6;
  });

  //------------------------------------------
  // 回傳商品表格底部位置
  //------------------------------------------

  return currentY;
}