/**
 * PDF 共用設定
 * PDF Engine v1.0
 *
 * 所有尺寸、座標、間距集中管理
 * 禁止在 drawXXX.ts 使用 Magic Number
 */

export const PDF = {
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
  // Table（全站 PDF 共用）
  // =========================
  table: {
    width: 178,
  },

  // =========================
  // Font
  // =========================
  font: {
    title: 20,
    heading: 14,
    body: 11,
    small: 9,
  },

  // =========================
  // Spacing
  // =========================
  spacing: {
    section: 12,
    line: 7,
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

    title: {
      x: 46,
      y: 20,
    },

    subtitle: {
      x: 46,
      y: 28,
    },

    orderInfo: {
      x: 140,
      orderNoY: 20,
      orderDateY: 28,
    },

    dividerY: 35,
  },

// =========================
// Customer
// =========================
customer: {
  titleY: 42,

  table: {
    x: 16,
    y: 44,

    leftWidth: 100,
    rightWidth: 78,

    rowHeight: 7,
  },
},

  // =========================
  // Items
  // =========================
  items: {
    titleY: 79,
    tableStartY: 81,

     marginX: 16,

    tableWidth: 178,

  columnWidth: {
    name: 100,
    quantity: 26,
    price: 26,
    subtotal: 26,
    },
  },

// =========================
// Summary  topSpacing(離Items的高度)
// =========================
summary: {
  labelX: 120,
  valueX: 194,

  lineHeight: 4,

  topSpacing: 4,
},
// =========================
// Payment 付款資訊
// =========================
payment: {
  titleY: 190,
  contentStartY: 200,

  leftX: 16,
  rightX: 110,

  line: 5,
 topSpacing: 6,
  height: 35,
},

// =========================
// Shipping 配送資訊
// =========================
shipping: {
  titleY: 230,

  contentY: 240,

   topSpacing: 8,

  height: 50,

},

  // =========================
  // Footer
  // =========================
  footer: {
     topSpacing: 8,
       height: 50,

 centerX: 105,

 titleY: 0,
  brandY: 6,
 systemTextY: 50,

    qr: {

    leftX: 55,
    rightX: 131,

      titleY: 15,
    imageY: 19,

      size: 24,

    },
   
  },

  
} as const;