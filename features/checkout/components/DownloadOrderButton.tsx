"use client";

import type { Order } from "../types/order";

import { useDownloadOrder } from "../hooks/useDownloadOrder";

interface DownloadOrderButtonProps {
  order: Order;
}

export default function DownloadOrderButton({
  order,
}: DownloadOrderButtonProps) {
  const {
    isDownloading,
    downloadOrder,
  } = useDownloadOrder();

  return (
    <button
      type="button"
      onClick={() => downloadOrder(order)}
      disabled={isDownloading}
      className="
        rounded-lg
        bg-amber-700
        px-4
        py-2
        text-white
        transition
        hover:bg-amber-800
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      {isDownloading ? "產生 PDF..." : "下載訂單"}
    </button>
  );
}