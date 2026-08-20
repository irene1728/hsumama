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
      y: 12,
      width: 22,
      height: 22,
    },

    brand: {
      x: 40,
      y: 27,
    },

    documentTitle: {
      x: 150,
      y: 18,
    },

    orderInfo: {
      x: 150,
      orderNoY: 25,
      orderDateY: 31,
    },

    dividerY: 33,
  },

  // =========================
  // Customer / Order Info
  // =========================
customer: {
  titleY: 41,

  table: {
    x: 16,
    y: 44,
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
    titleY: 88,

    tableStartY: 95,

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

  height: 40,
},

} as const;