"use client";

import React, { useState, useEffect } from "react";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => { 
    setMounted(true); 
  }, []);
  
  if (!mounted) {
    return <div className="min-h-screen bg-[#121212]" />;
  }

  return <>{children}</>;
}
