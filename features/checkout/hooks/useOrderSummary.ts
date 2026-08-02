"use client";

import { useState } from "react";

export function useOrderSummary() {

  const [expanded, setExpanded] = useState(false);

  function toggleExpanded() {
    setExpanded((prev) => !prev);
  }

  return {
    expanded,
    toggleExpanded,
  };
}