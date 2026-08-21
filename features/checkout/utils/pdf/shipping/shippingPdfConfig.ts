/**
 * 出貨單 PDF 共用設定
 *
 * v0.13 Step 2-3A
 *
 * 注意：
 * 本設定檔只供「出貨單 PDF」使用。
 * 不與原本顧客訂單 PDF 共用。
 */

export const SHIPPING_PDF = {
  // =========================
  // Page
  // =========================
  page: {
    width: 210,
    height: 297,
    margin: 16,
    centerX: 105,
  },

  // =========================
  // Font
  // =========================
  font: {
    title: 20,
    heading: 13,
    body: 10,
    small: 9,
  },

  // =========================
  // Header
  // =========================
  header: {
    logo: {
      x: 16,
      y: 10,
      width: 22,
      height: 22,
    },

    brand: {
      x: 40,
      y: 25,
    },

    documentTitle: {
      x: 150,
      y: 16,
    },

    orderInfo: {
      x: 150,
      orderNoY: 22,
      orderDateY: 28,
    },

    dividerY: 31,
  },

  // =========================
  // Customer / Order Info
  // =========================
customer: {
  titleY: 39,

  table: {
    x: 16,
    y: 42,
    width: 178,

    leftWidth: 100,
    rightWidth: 78,

    rowHeight: 7,
  },
},
  // =========================
  // Items
  // =========================
  items: {
    titleY: 86,

    tableStartY: 93,

    x: 16,
    width: 178,

    columnWidth: {
      no: 12,
      name: 86,
      quantity: 20,
      price: 30,
      subtotal: 30,
    },
  },

  // =========================
  // Summary
  // =========================
  summary: {
    topSpacing: 1,

    labelX: 135,
    valueX: 194,

    lineHeight: 4,

     totalFontSize: 12,
  },

  // =========================
  // Payment / Shipping Notice
  // =========================
  notice: {
    topSpacing: 10,

    x: 16,
    width: 178,

    height: 22,
  },

  // =========================
  // Footer / Note
  // =========================
footer: {
  topSpacing: 10,

  x: 16,
  width: 178,

  height: 25,
},

} as const;