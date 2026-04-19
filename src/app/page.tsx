"use client";

import React, { useState } from 'react';
import { getSolanaTrustData } from '@/lib/covalent/service';

// 1. Reliability Framework: Error Boundary wrapper
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-crimson-accent/20 flex items-center justify-center mb-4">
            <span className="text-crimson-accent text-2xl font-bold">!</span>
          </div>
          <h2 className="text-2xl font-semibold mb-2">System Error</h2>
          <p className="text-zinc-400">An unexpected exception crashed the component tree.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// 3. Premium Trust Score Display: Circular Progress Gauge
const TrustGauge = ({ score }: { score: number }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  // Dynamic color thresholding based on Score
  let colorClass = "text-zinc-500";
  let statusText = "EVALUATING";
  let glowFilter = "none";

  if (score > 70) {
    colorClass = "text-emerald-accent";
    statusText = "SAFE";
    glowFilter = "drop-shadow(0 0 16px rgba(16, 185, 129, 0.7))";
  } else if (score < 30) {
    colorClass = "text-crimson-accent";
    statusText = "VULNERABLE";
    glowFilter = "drop-shadow(0 0 16px rgba(220, 38, 38, 0.7))";
  } else {
    colorClass = "text-yellow-500";
    statusText = "SUSPICIOUS";
    glowFilter = "drop-shadow(0 0 16px rgba(234, 179, 8, 0.7))";
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-56 h-56 flex flex-col items-center justify-center mb-8">
        <svg className="w-full h-full transform -rotate-90 pointer-events-none" viewBox="0 0 160 160">
          <circle
            className="text-zinc-800"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="80"
            cy="80"
          />
          <circle
            className={`${colorClass} transition-all duration-[1.5s] ease-out`}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="80"
            cy="80"
            style={{ filter: glowFilter }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-6xl font-extrabold tabular-nums tracking-tighter" style={{ filter: glowFilter }}>
            {score}
          </span>
        </div>
      </div>
      
      {/* Risk Assessment Block */}
      <div className={`px-6 py-2 border rounded-full text-sm font-bold tracking-[0.2em] ${colorClass} bg-zinc-950/80 border-zinc-800/80 backdrop-blur-md uppercase`}>
        {statusText}
      </div>
    </div>
  );
};

export default function GuardianDashboard() {
  const [address, setAddress] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{ trustScore: number; balances: any[] } | null>(null);

  // 4. Data Integration: Handling state natively
  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;

    setIsScanning(true);
    setError(null);
    setData(null);

    try {
      const result = await getSolanaTrustData(address.trim());
      setData(result);
    } catch (err: any) {
      setError(err.message || 'Address Not Found');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background relative flex flex-col">
        
        {/* 1. High-End Branding: Glassmorphism Sticky Header */}
        <header className="sticky top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-zinc-800/50 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
            <h1 className="text-2xl font-extrabold text-foreground tracking-[0.4em] uppercase opacity-90">
              Guardian
            </h1>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-accent animate-pulse shadow-[0_0_12px_rgba(16,185,129,1)]" />
              <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">Live Index</span>
            </div>
          </div>
        </header>

        <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-24 flex flex-col items-center">
          
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
              Protocol Audit
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed font-light">
              Submit a public Solana address to dynamically generate a cryptographic trust profile, real-time exposure rating, and forensic metadata.
            </p>
          </div>

          {/* 2. Hero Search Section: Glowing focus bordered container */}
          <form 
            onSubmit={handleScan}
            className="w-full max-w-3xl relative group mb-20"
          >
            {/* Glow backing effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-accent/60 to-cyan-500/60 rounded-2xl blur-lg opacity-10 group-focus-within:opacity-40 transition duration-[600ms] pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col sm:flex-row items-center bg-zinc-950/80 border border-zinc-800 rounded-2xl p-2.5 shadow-2xl backdrop-blur-md">
              <div className="pl-5 text-zinc-600 hidden sm:block">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Target Identity (e.g. 9xQE...)"
                className="w-full bg-transparent text-foreground px-5 py-4 focus:outline-none placeholder:text-zinc-600 font-mono text-lg"
                disabled={isScanning}
              />
              <button 
                type="submit"
                disabled={isScanning || !address}
                className="w-full sm:w-auto bg-emerald-accent hover:bg-gradient-to-r hover:from-emerald-accent hover:to-cyan-500 text-black px-10 py-4 rounded-xl font-bold tracking-widest uppercase text-sm mt-3 sm:mt-0 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isScanning ? 'Syncing...' : 'Scan Wallet'}
              </button>
            </div>
          </form>

          {/* State Rendering Framework */}
          <div className="w-full relative min-h-[400px] flex items-center justify-center">
            
            {/* Shimmer Placeholder Loading Effect */}
            {isScanning && (
              <div className="w-full max-w-4xl p-12 rounded-3xl border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-xl animate-pulse">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div className="flex flex-col items-center justify-center border-r border-zinc-800/50">
                    <div className="w-56 h-56 rounded-full border-[8px] border-zinc-800/80 mb-8" />
                    <div className="w-32 h-10 bg-zinc-800/80 rounded-full" />
                  </div>
                  <div className="space-y-8 py-8">
                    <div className="w-full h-8 bg-zinc-800/80 rounded" />
                    <div className="grid grid-cols-2 gap-6">
                      <div className="h-24 bg-zinc-800/80 rounded-2xl" />
                      <div className="h-24 bg-zinc-800/80 rounded-2xl" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Error Handlers / Address Not Found Interface */}
            {!isScanning && error && (
              <div className="w-full max-w-xl p-12 rounded-3xl border border-crimson-accent/20 bg-crimson-accent/5 backdrop-blur-xl text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-crimson-accent/10 flex items-center justify-center mb-6 border border-crimson-accent/20">
                  <svg className="w-10 h-10 text-crimson-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold tracking-wide text-foreground mb-3">Address Not Found</h3>
                <p className="text-zinc-500 max-w-md mx-auto">{error}</p>
              </div>
            )}

            {/* Validation Screen */}
            {!isScanning && data && !error && (
              <div className="w-full max-w-4xl p-10 md:p-14 rounded-3xl border border-zinc-800/60 bg-zinc-900/40 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                  <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l-10 5 10 5 10-5-10-5z"/></svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">
                  
                  {/* Performance Visualization */}
                  <div className="flex justify-center border-b border-zinc-800/80 md:border-b-0 md:border-r pb-12 md:pb-0">
                    <TrustGauge score={data.trustScore} />
                  </div>
                  
                  {/* Core Forensics */}
                  <div className="space-y-10">
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-[0.2em] mb-2">Validated Identity</p>
                      <p className="font-mono text-zinc-300 break-all bg-black/40 p-3 rounded-lg border border-zinc-800/50 text-sm">{address}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-5">
                      <div className="bg-black/40 p-6 rounded-2xl border border-zinc-800/50">
                        <p className="text-xs text-zinc-500 uppercase tracking-[0.2em] mb-3">Holdings Size</p>
                        <p className="text-3xl font-extrabold tracking-tighter text-foreground">{data.balances.length}</p>
                      </div>
                      
                      <div className="bg-black/40 p-6 rounded-2xl border border-zinc-800/50">
                        <p className="text-xs text-zinc-500 uppercase tracking-[0.2em] mb-3">Network</p>
                        <p className="text-xl font-medium text-emerald-accent uppercase tracking-widest mt-2">Solana</p>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            )}
            
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}
