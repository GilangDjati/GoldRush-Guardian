"use client";

import React from "react";
import { GoldRushProvider } from "@covalenthq/goldrush-kit";

// Gunakan named export (tanpa 'default')
export function GoldRushWrapper({ children }: { children: React.ReactNode }) {
  return (
    <GoldRushProvider apikey={process.env.NEXT_PUBLIC_GOLD_RUSH_API_KEY || ""}>
      {children}
    </GoldRushProvider>
  );
}