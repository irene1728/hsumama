import { jsPDF } from "jspdf";

/**
 * 將數字格式化為金額
 * 例如：123456 -> 123,456
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("zh-TW").format(value);
}

/**
 * 將日期格式化為 YYYY/MM/DD
 */
export function formatDate(date: string | Date): string {
  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
}

/**
 * 取得文字置中的 X 座標
 */
export function getCenterX(
  doc: jsPDF,
  text: string,
  pageWidth: number
): number {
  const textWidth = doc.getTextWidth(text);

  return (pageWidth - textWidth) / 2;
}

/**
 * 繪製區塊標題
 */
export function drawSectionTitle(
  doc: jsPDF,
  title: string,
  x: number,
  y: number
): void {
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(title, x, y);
}

/**
 * 繪製水平分隔線
 */
export function drawDivider(
  doc: jsPDF,
  startX: number,
  endX: number,
  y: number
): void {
  doc.setDrawColor(210);
  doc.line(startX, y, endX, y);
}