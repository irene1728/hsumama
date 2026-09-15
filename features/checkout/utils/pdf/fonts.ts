import { jsPDF } from "jspdf";

import { PDF_FONTS } from "./fontConfig";

/**
 * PDF Font Manager
 * 
 *
 * 職責：
 * - 載入 PDF 使用的中文字型
 * - 註冊到 jsPDF
 * - 提供統一字型設定
 *
 * 支援：
 * - Browser：從 /fonts/... 載入
 * - Server：從 public/fonts/... 讀取
 */

export const PDF_FONT = {
  family: {
    regular: "NotoSansTC",
    bold: "NotoSansTC",
  },

  size: {
    title: 20,
    heading: 13,
    body: 11,
    small: 9,
  },
} as const;

/**
 * 將 ArrayBuffer 轉成 binary string
 *
 * jsPDF.addFileToVFS() 需要 binary string。
 */
function arrayBufferToBinary(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);

  let binary = "";

  const chunkSize = 0x8000;

  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(
      i,
      Math.min(i + chunkSize, bytes.length)
    );

    binary += String.fromCharCode(...chunk);
  }

  return binary;
}

/**
 * Browser / Server 共用字型載入
 */
async function loadFontAsBinary(path: string): Promise<string> {
  // ------------------------------------------
  // Browser
  // ------------------------------------------

  if (typeof window !== "undefined") {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`無法載入字型：${path}`);
    }

    const buffer = await response.arrayBuffer();

    return arrayBufferToBinary(buffer);
  }

  // ------------------------------------------
  // Server
  // ------------------------------------------

  const { readFile } = await import("node:fs/promises");
  const { join } = await import("node:path");

  const filePath = join(
    process.cwd(),
    "public",
    path.replace(/^\/+/, "")
  );

  try {
    const buffer = await readFile(filePath);

    return buffer.toString("latin1");
  } catch (error) {
    console.error("PDF font load error:", filePath, error);

    throw new Error(`無法載入字型：${filePath}`);
  }
}

/**
 * 註冊 PDF 字型
 */
export async function registerFonts(doc: jsPDF): Promise<void> {
  // ------------------------------------------
  // Regular
  // ------------------------------------------

  const regular = await loadFontAsBinary(
    PDF_FONTS.zh.regular
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

  // ------------------------------------------
  // Bold
  // ------------------------------------------

  const bold = await loadFontAsBinary(
    PDF_FONTS.zh.bold
  );

  doc.addFileToVFS(
    "NotoSansTC-Bold.ttf",
    bold
  );

  doc.addFont(
    "NotoSansTC-Bold.ttf",
    "NotoSansTC",
    "bold"
  );

  // ------------------------------------------
  // Default Font
  // ------------------------------------------

  doc.setFont(
    PDF_FONT.family.regular,
    "normal"
  );
}

/**
 * 標題字型
 */
export function setTitleFont(doc: jsPDF): void {
  doc.setFont(
    PDF_FONT.family.bold,
    "bold"
  );

  doc.setFontSize(
    PDF_FONT.size.title
  );
}

/**
 * 區塊標題字型
 */
export function setHeadingFont(doc: jsPDF): void {
  doc.setFont(
    PDF_FONT.family.bold,
    "bold"
  );

  doc.setFontSize(
    PDF_FONT.size.heading
  );
}

/**
 * 內文字型
 */
export function setBodyFont(doc: jsPDF): void {
  doc.setFont(
    PDF_FONT.family.regular,
    "normal"
  );

  doc.setFontSize(
    PDF_FONT.size.body
  );
}

/**
 * 小字型
 */
export function setSmallFont(doc: jsPDF): void {
  doc.setFont(
    PDF_FONT.family.regular,
    "normal"
  );

  doc.setFontSize(
    PDF_FONT.size.small
  );
}