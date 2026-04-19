"use client";

import React, { useState, useEffect } from "react";
import { GoldRushWrapper } from "@/components/GoldRushWrapper";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return children to ensure safe hydration layout, or just a simple div.
    return <div className="min-h-full flex flex-col">{children}</div>;
  }

  return <GoldRushWrapper>{children}</GoldRushWrapper>;
}
