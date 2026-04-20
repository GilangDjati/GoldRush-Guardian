"use client";

import React, { useState } from 'react';
import { getSolanaTrustData } from '@/lib/covalent/service';
import { TransactionList } from '@covalenthq/goldrush-kit';

// 1. Reliability Framework: Error Boundary wrapper
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-12 text-center text-white">
          <div className="w-16 h-16 rounded-full bg-crimson-accent/20 flex items-center justify-center mb-4">
            <span className="text-crimson-accent text-2xl font-bold">!</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Connection Error</h2>
          <p className="text-zinc-400">Failed to mount core UI frameworks. Check console logs.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// 2. Trust Score Gauge (Updated for Luxury Gold Theme)
const TrustGauge = ({ score }: { score: number }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  let colorClass = "text-zinc-500";
  let statusText = "EVALUATING";
  let glowFilter = "none";

  if (score >= 75) {
    colorClass = "text-gold-accent";
    statusText = "VERIFIED";
    glowFilter = "drop-shadow(0 0 16px rgba(212, 175, 55, 0.7))";
  } else if (score < 40) {
    colorClass = "text-crimson-accent";
    statusText = "VULNERABLE";
    glowFilter = "drop-shadow(0 0 16px rgba(220, 38, 38, 0.7))";
  } else {
    colorClass = "text-yellow-500";
    statusText = "SUSPICIOUS";
    glowFilter = "drop-shadow(0 0 16px rgba(234, 179, 8, 0.7))";
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative w-48 h-48 flex items-center justify-center mb-6">
        <svg className="w-full h-full transform -rotate-90 pointer-events-none" viewBox="0 0 160 160">
          <circle className="text-zinc-800" strokeWidth="8" stroke="currentColor" fill="transparent" r={radius} cx="80" cy="80" />
          <circle
            className={`${colorClass} transition-all duration-[1.5s] ease-out`}
            strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
            strokeLinecap="round" stroke="currentColor" fill="transparent" r={radius} cx="80" cy="80"
            style={{ filter: glowFilter }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <span className="text-6xl font-extrabold tabular-nums tracking-tighter" style={{ filter: glowFilter }}>{score}</span>
        </div>
      </div>
      <div className={`px-6 py-2 border rounded-full text-xs font-bold tracking-[0.2em] ${colorClass} bg-zinc-950/80 border-zinc-800/80 backdrop-blur-md uppercase`}>
        {statusText}
      </div>
    </div>
  );
};

export default function GuardianDashboard() {
  const [address, setAddress] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{ trustScore: number; balances: any[]; verifiedProtocols: string[]; insights: string } | null>(null);

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
      <div className="min-h-screen bg-background relative flex flex-col text-foreground overflow-x-hidden">
        
        {/* Header */}
        <header className="sticky top-0 w-full z-50 bg-[#121212]/80 backdrop-blur-xl border-b border-gold-accent/20">
          <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
            <h1 className="text-2xl font-extrabold text-gold-accent tracking-[0.4em] uppercase">
              Guardian
            </h1>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gold-accent animate-pulse shadow-[0_0_12px_rgba(212,175,55,1)]" />
              <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">Solana Index</span>
            </div>
          </div>
        </header>

        <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
          
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-md">
              Protocol Audit
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed font-light">
              Submit a public Solana address to dynamically generate a cryptographic trust profile, real-time exposure rating, and forensic metadata.
            </p>
          </div>

          {/* Search Section */}
          <form onSubmit={handleScan} className="w-full max-w-3xl relative group mb-16 z-[100]">
            <div className="absolute -inset-1 z-0 bg-gold-accent/20 rounded-2xl blur-xl opacity-20 group-focus-within:opacity-50 transition duration-[600ms] pointer-events-none"></div>
            
            <div className="relative z-[100] pointer-events-auto flex flex-col sm:flex-row items-center bg-[#1a1a1a] border border-gold-accent/30 rounded-2xl p-2.5 shadow-2xl backdrop-blur-md">
              <div className="pl-5 text-gold-accent hidden sm:block">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Target Identity (e.g. 9xQE...)"
                autoFocus
                className="w-full bg-transparent text-foreground px-5 py-4 focus:outline-none placeholder:text-zinc-500 font-mono text-lg pointer-events-auto"
                disabled={isScanning}
              />
              <button 
                type="submit"
                disabled={isScanning || !address}
                className="w-full sm:w-auto relative z-50 flex items-center justify-center gap-3 bg-gold-accent hover:bg-gold-accent-hover text-black px-8 py-4 rounded-xl font-bold tracking-widest uppercase text-sm mt-3 sm:mt-0 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                {isScanning ? (
                  <svg className="w-5 h-5 animate-spin text-black" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
                <span>{isScanning ? 'Scanning...' : 'Scan Wallet'}</span>
              </button>
            </div>
          </form>

          {/* Results Area */}
          <div className="w-full relative min-h-[400px] flex flex-col items-center justify-start z-10 w-full max-w-6xl">
            
            {/* Error Handlers */}
            {error && !isScanning && (
              <div className="w-full max-w-xl p-10 rounded-2xl border border-crimson-accent/30 bg-[#1a1a1a] shadow-xl text-center">
                <h3 className="text-xl font-bold text-white mb-2">Protocol Error</h3>
                <p className="text-zinc-400">{error}</p>
              </div>
            )}

            {/* Success Dashboard */}
            {data && !isScanning && !error && (
              <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
                
                {/* Top Metrics Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Trust Score Card */}
                  <div className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-gold-accent/20 rounded-3xl p-8 shadow-2xl flex flex-col items-center">
                     <h3 className="w-full text-left text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6">Real-time Trust Index</h3>
                     <TrustGauge score={data.trustScore} />
                  </div>

                  {/* Guardian AI Card */}
                  <div className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-gold-accent/20 rounded-3xl p-8 shadow-2xl lg:col-span-2 flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1.5 h-6 bg-gold-accent rounded-full"></div>
                      <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Guardian AI Insights</h3>
                    </div>
                    <div className="flex-1 bg-[#121212] rounded-xl p-6 border border-zinc-800/50 font-mono text-sm text-zinc-300 leading-relaxed overflow-y-auto">
                      <p className="text-gold-accent mb-2">{">"} SYSTEM_ANALYSIS_INITIALIZED</p>
                      <p className="mb-4">{">"} {data.insights}</p>
                      {data.verifiedProtocols.length > 0 && (
                        <div className="mt-4 border-t border-zinc-800 pt-4">
                          <p className="text-emerald-400 mb-2">{">"} VERIFIED_DEX_INTERACTIONS_FOUND:</p>
                          <div className="flex flex-wrap gap-2">
                            {data.verifiedProtocols.map(p => (
                              <span key={p} className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md text-xs">{p}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                </div>

                {/* Portfolio & Activity Split */}
                <div className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-gold-accent/20 rounded-3xl p-8 shadow-2xl">
                   <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">Network Activity Log</h3>
                        <p className="text-sm font-mono text-zinc-500">Target: {address}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Total Assets</p>
                         <p className="text-2xl font-bold text-gold-accent">{data.balances.length}</p>
                      </div>
                   </div>

                   {/* GoldRush Kit Implementation */}
                   <div className="goldrush-kit mt-6 w-full rounded-xl overflow-hidden bg-[#121212] border border-zinc-800/50 p-2">
                       <TransactionList chain_name="solana-mainnet" address={address} />
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
