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
    width: 210, // A4 (mm)
    height: 297,
    margin: 16,
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

    dividerY: 42,
  },

  // =========================
  // Customer
  // =========================
  customer: {
    titleY: 52,
    contentStartY: 62,
  },

  // =========================
  // Items
  // =========================
  items: {
    titleY: 100,
    tableStartY: 110,
  },

  // =========================
  // Payment
  // =========================
  payment: {
    titleY: 190,
    contentStartY: 200,
  },

  // =========================
  // Shipping
  // =========================
  shipping: {
    titleY: 220,
    contentStartY: 230,
  },

  // =========================
  // Footer
  // =========================
  footer: {
    startY: 255,

    qr: {
      size: 24,
      gap: 28,
    },
  },
} as const;