import { useCallback, useState } from "react";

import type { Order } from "../types/order";

import { generateOrderPdf } from "../utils/pdf/generateOrderPdf";

/**
 * 下載訂單 PDF
 */
export function useDownloadOrder() {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadOrder = useCallback(async (order: Order) => {
    try {
      setIsDownloading(true);

      const pdf = await generateOrderPdf(order);

      pdf.save(`order-${order.orderNo}.pdf`);
    } finally {
      setIsDownloading(false);
    }
  }, []);

  return {
    isDownloading,
    downloadOrder,
  };
}