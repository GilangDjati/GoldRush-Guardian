"use client";

import React, { useState, useEffect } from "react";
import { GoldRushProvider } from "@covalenthq/goldrush-kit";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => { 
    setMounted(true); 
  }, []);
  
  // 1. Defend Against Hydration Mismatch safely without blank frames
  if (!mounted) {
    return <>{children}</>;
  }

  const apiKey = process.env.NEXT_PUBLIC_GOLD_RUSH_API_KEY;
  
  // 2. Strong Key Format Validation (Covalent requires cqt_ format)
  if (!apiKey || !apiKey.startsWith('cqt_')) {
    console.error("ENVIRONMENT WARNING: Missing or incorrectly formatted Covalent API Key. Must start with 'cqt_'.");
    return <>{children}</>;
  }

  return (
    <GoldRushProvider apikey={apiKey}>
      {children}
    </GoldRushProvider>
  );
}
