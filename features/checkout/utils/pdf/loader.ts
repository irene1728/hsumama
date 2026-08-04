import { PDF_ASSETS } from "./assets";

/**
 * PDF 已載入的圖片資源
 */
export interface LoadedPdfAssets {
  brand: {
    logo: string;
    lineLogo: string;
  };

  qr: {
    website: string;
    lineOfficial: string;
  };
}

/**
 * 將圖片轉成 Base64 Data URL
 */
async function imageToDataUrl(path: string): Promise<string> {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to load image: ${path}`);
  }

  const blob = await response.blob();

  return await new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = reject;

    reader.readAsDataURL(blob);
  });
}

/**
 * 一次載入 PDF 所有圖片素材
 */
export async function loadPdfAssets(): Promise<LoadedPdfAssets> {
const [
  logo,
  lineLogo,
  websiteQr,
  lineOfficial,
] = await Promise.all([
  imageToDataUrl(PDF_ASSETS.brand.logoSimple),
  imageToDataUrl(PDF_ASSETS.brand.lineLogo),
  imageToDataUrl(PDF_ASSETS.qr.website),
  imageToDataUrl(PDF_ASSETS.qr.lineOfficial),
]);
return {
  brand: {
    logo,
    lineLogo,
  },

  qr: {
    website: websiteQr,
    lineOfficial,
  },
       
};}
