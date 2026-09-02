"use client";

import { useEffect, useState } from "react";

export default function VisitorCounter() {
  const [totalVisits, setTotalVisits] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/visitor-count")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTotalVisits(data.totalVisits);
        }
      })
      .catch((error) => {
        console.error("Visitor counter error:", error);
      });
  }, []);

  if (totalVisits === null) {
    return null;
  }

  const displayNumber = totalVisits.toString().padStart(6, "0");

  return (
    <p className="text-sm mt-2 text-orange-200">
      🌐 網站瀏覽人次：{displayNumber}
    </p>
  );
}