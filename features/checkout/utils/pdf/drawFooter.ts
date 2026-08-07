import type { PdfContext } from "../../types/pdf";
import { PDF } from "./pdfConfig";
import {
  setBodyFont,
  setHeadingFont,
} from "./fonts";

interface DrawFooterProps extends PdfContext {
  startY: number;
}

export function drawFooter({
  doc,
  assets,
  startY,
}: DrawFooterProps): number {
  //------------------------------------------
  // 感謝文字
  //------------------------------------------
  
  setHeadingFont(doc);
  
doc.text(
  "感謝您的訂購！",
  PDF.page.centerX,
  startY + PDF.footer.titleY,
  { align: "center" }
);

doc.text(
  "徐媽媽冰鑽滷味",
  PDF.footer.centerX,
  startY + PDF.footer.brandY,
  { align: "center" }
);
  //------------------------------------------
  // QR Code（下一步加入）
  //------------------------------------------
const qrSize = 24;

setBodyFont(doc);

doc.text(
  "LINE 官方帳號",
  PDF.footer.qr.leftX + PDF.footer.qr.size / 2,
  startY + PDF.footer.qr.titleY,
  {
    align: "center",
  }
);

doc.text(
  "官方網站",
  PDF.footer.qr.rightX + PDF.footer.qr.size / 2,
  startY + PDF.footer.qr.titleY,
  {
    align: "center",
  }
);


doc.addImage(
  assets.qr.lineOfficial,
  "PNG",
  PDF.footer.qr.leftX,
  startY + PDF.footer.qr.imageY,
  PDF.footer.qr.size,
  PDF.footer.qr.size
);

doc.addImage(
  assets.qr.website,
  "PNG",
  PDF.footer.qr.rightX,
  startY + PDF.footer.qr.imageY,
  PDF.footer.qr.size,
  PDF.footer.qr.size
);
  //------------------------------------------
  // 系統文字
  //------------------------------------------

  setBodyFont(doc);

doc.text(
  "本訂單由徐媽媽冰鑽滷味系統自動產生。",
  PDF.page.centerX,
  startY + PDF.footer.systemTextY,
  { align: "center" }
);

  return startY + PDF.footer.height;
}