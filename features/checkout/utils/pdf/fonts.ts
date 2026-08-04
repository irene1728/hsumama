import { jsPDF } from "jspdf";

/**
 * PDF Font Manager
 * ---------------------------------------------
 * PDF Engine v1.0
 *
 * 職責：
 * 1. 載入並註冊 PDF 字型
 * 2. 提供統一字型 API
 * 3. 統一管理所有 PDF 字型設定
 *
 * 呼叫流程：
 *
 * generateOrderPdf()
 *        │
 *        ▼
 * registerFonts()
 *        │
 *        ▼
 * drawHeader()
 * drawCustomer()
 * drawItems()
 * drawPayment()
 * drawShipping()
 * drawFooter()
 */

export const PDF_FONT = {
  family: {
    regular: "NotoSansTC",
    bold: "NotoSansTC",
  },

  size: {
    title: 20,
    heading: 14,
    body: 11,
    small: 9,
  },
} as const;

/**
 * 載入 TTF 並轉成 Binary String
 */
async function loadFontAsBinary(path: string): Promise<string> {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`無法載入字型：${path}`);
  }

  const buffer = await response.arrayBuffer();
  const bytes = new Uint8Array(buffer);

  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return binary;
}

/**
 * 註冊 PDF 字型
 */
export async function registerFonts(doc: jsPDF): Promise<void> {

  // Regular
  const regular = await loadFontAsBinary(
    "/fonts/NotoSansTC-Regular.ttf"
  );

  doc.addFileToVFS(
    "NotoSansTC-Regular.ttf",
    regular
  );

  doc.addFont(
    "NotoSansTC-Regular.ttf",
    "NotoSansTC",
    "normal"
  );

  // Bold（先使用同一個字型驗證流程）
  doc.addFileToVFS(
    "NotoSansTC-Bold.ttf",
    regular
  );

  doc.addFont(
    "NotoSansTC-Bold.ttf",
    "NotoSansTC",
    "bold"
  );

  // 設定預設字型

  doc.setFont(PDF_FONT.family.regular);

  console.log(doc.getFontList());

  return;
}

/**
 * 主標題
 */
export function setTitleFont(doc: jsPDF): void {
  doc.setFont(PDF_FONT.family.bold, "bold");
  doc.setFontSize(PDF_FONT.size.title);
}

/**
 * 區塊標題
 */
export function setHeadingFont(doc: jsPDF): void {
  doc.setFont(PDF_FONT.family.bold, "bold");
  doc.setFontSize(PDF_FONT.size.heading);
}

/**
 * 一般內容
 */
export function setBodyFont(doc: jsPDF): void {
  doc.setFont(PDF_FONT.family.regular, "normal");
  doc.setFontSize(PDF_FONT.size.body);
}

/**
 * 小字
 */
export function setSmallFont(doc: jsPDF): void {
  doc.setFont(PDF_FONT.family.regular, "normal");
  doc.setFontSize(PDF_FONT.size.small);
}