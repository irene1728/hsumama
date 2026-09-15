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
 * Browser / Server 共用圖片載入
 *
 * Browser：
 *   /public/... → fetch()
 *
 * Server：
 *   /public/... → fs.readFile()
 *
 * 最後統一回傳 Data URL，
 * 讓 jsPDF.addImage() 可以直接使用。
 */
async function imageToDataUrl(
  path: string
): Promise<string> {

  // ------------------------------------------
  // Browser
  // ------------------------------------------

  if (typeof window !== "undefined") {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(
        `Failed to load image: ${path}`
      );
    }

    const blob = await response.blob();

    return await new Promise(
      (resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          resolve(
            reader.result as string
          );
        };

        reader.onerror = reject;

        reader.readAsDataURL(blob);
      }
    );
  }

  // ------------------------------------------
  // Server
  // ------------------------------------------

  const { readFile } = await import(
    "node:fs/promises"
  );

  const { join } = await import(
    "node:path"
  );

  const filePath = join(
    process.cwd(),
    "public",
    path.replace(/^\/+/, "")
  );

  try {
    const buffer = await readFile(filePath);

    const base64 = buffer.toString("base64");

    const extension =
      path
        .split(".")
        .pop()
        ?.toLowerCase();

    let mimeType = "application/octet-stream";

    if (extension === "png") {
      mimeType = "image/png";
    } else if (
      extension === "jpg" ||
      extension === "jpeg"
    ) {
      mimeType = "image/jpeg";
    } else if (extension === "webp") {
      mimeType = "image/webp";
    } else if (extension === "gif") {
      mimeType = "image/gif";
    }

    return `data:${mimeType};base64,${base64}`;
  } catch (error) {
    console.error(
      "PDF image load error:",
      filePath,
      error
    );

    throw new Error(
      `Failed to load image: ${filePath}`
    );
  }
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
    imageToDataUrl(
      PDF_ASSETS.brand.logoSimple
    ),

    imageToDataUrl(
      PDF_ASSETS.brand.lineLogo
    ),

    imageToDataUrl(
      PDF_ASSETS.qr.website
    ),

    imageToDataUrl(
      PDF_ASSETS.qr.lineOfficial
    ),
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
  };
}