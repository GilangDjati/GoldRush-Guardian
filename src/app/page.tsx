"use client";

import React, { useState, useEffect } from 'react';
import { getSolanaTrustData, TrustScoreData } from '@/lib/covalent/service';

// 1. Reliability Framework: Error Boundary wrapper
class ErrorBoundary extends React.Component<
  { children: React.ReactNode, fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode, fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-12 text-center text-white border border-crimson-accent/20 bg-black rounded-3xl">
          <div className="w-16 h-16 rounded-full bg-crimson-accent/20 flex items-center justify-center mb-4">
            <span className="text-crimson-accent text-2xl font-bold">!</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Subsystem Failure</h2>
          <p className="text-zinc-400">Failed to mount core UI frameworks. Check console logs.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// 2. The Live Threat Feed (Scrolling Marquee)
const LiveThreatFeed = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-8 bg-crimson-accent text-black flex items-center overflow-hidden z-[9999] pointer-events-none shadow-[0_0_20px_rgba(220,38,38,0.5)]">
      <div className="flex font-mono text-xs font-bold uppercase tracking-widest whitespace-nowrap animate-[marquee_20s_linear_infinite]">
        <span className="mx-4">🔥 GLOBAL ALERT: Phishing vector 'Fake JUP Airdrop' detected across 14,000 wallets.</span>
        <span className="mx-4">|</span>
        <span className="mx-4">⚠️ DRAINER MOVEMENT: Target identity 7XqE... liquidated for $4.2M equivalent.</span>
        <span className="mx-4">|</span>
        <span className="mx-4">🛡️ GOLD RUSH DATA RECON: Covalent Indexer operational across 80+ blockchains.</span>
        <span className="mx-4">|</span>
        <span className="mx-4">🔥 GLOBAL ALERT: Phishing vector 'Fake JUP Airdrop' detected across 14,000 wallets.</span>
        <span className="mx-4">|</span>
        <span className="mx-4">⚠️ DRAINER MOVEMENT: Target identity 7XqE... liquidated for $4.2M equivalent.</span>
        <span className="mx-4">|</span>
        <span className="mx-4">🛡️ GOLD RUSH DATA RECON: Covalent Indexer operational across 80+ blockchains.</span>
      </div>
    </div>
  );
};

// 3. Trust Certificate (Reputation Time Machine)
const TrustCertificate = ({ score, address }: { score: number, address: string }) => {
  let isVerified = score >= 75;
  let isDanger = score < 40;
  
  const accentColor = isVerified ? 'text-[#D4AF37]' : (isDanger ? 'text-crimson-accent' : 'text-amber-500');
  const sealColor = isVerified ? 'border-[#D4AF37] text-[#D4AF37]' : (isDanger ? 'border-crimson-accent text-crimson-accent' : 'border-amber-500 text-amber-500');
  
  return (
    <div className="w-full bg-[#1e1e1e] border-2 border-zinc-800 rounded-2xl overflow-hidden relative shadow-2xl flex flex-col">
      <div className={`h-3 w-full ${isVerified ? 'bg-[#D4AF37]' : (isDanger ? 'bg-crimson-accent' : 'bg-amber-500')}`} />
      <div className="p-8 flex flex-col items-center relative">
        <h4 className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase mb-6 font-bold">Official Governance Token</h4>
        
        <div className={`w-32 h-32 rounded-full border-[6px] ${sealColor} flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] mb-6`}>
           <div className="text-5xl font-black tabular-nums tracking-tighter">{score}</div>
        </div>
        
        <p className={`text-xl font-black uppercase tracking-widest ${accentColor} mb-2`}>
           {isVerified ? 'Verified Operator' : (isDanger ? 'Risky Sub-Actor' : 'Unverified Proxy')}
        </p>
        <p className="text-zinc-400 font-mono text-xs opacity-50 mb-6 truncate w-full text-center">ID: {address}</p>
        
        <div className="w-full border-t border-zinc-800 border-dashed pt-6 flex justify-between text-xs font-mono text-zinc-500">
           <div>ISSUE: {new Date().toISOString().split('T')[0]}</div>
           <div>AUTH: COVALENT_CQT</div>
        </div>
      </div>
    </div>
  );
};

// 4. Security Heatmap
const SecurityHeatmap = ({ metrics }: { metrics: TrustScoreData['heatmapMetrics'] }) => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 w-full p-4 bg-[#121212] rounded-xl border border-zinc-800/50">
      {metrics.map((m, i) => {
        let bg = 'bg-zinc-800/50';
        let border = 'border-zinc-700/30';
        if (m.riskStatus === 'safe') { bg = 'bg-emerald-500/20'; border = 'border-emerald-500/50'; }
        if (m.riskStatus === 'danger') { bg = 'bg-crimson-accent/20'; border = 'border-crimson-accent/50'; }
        
        return (
          <div key={i} className={`aspect-square ${bg} border ${border} rounded-md relative group flex items-center justify-center overflow-hidden transition-all hover:scale-110 z-10 hover:z-20`}>
             <span className="text-[10px] font-mono text-white/50 truncate px-1">{m.symbol.slice(0,4)}</span>
             
             {/* Tooltip */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2 hidden group-hover:block w-auto bg-black border border-zinc-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap shadow-xl">
               {m.symbol}: {m.value}
             </div>
          </div>
        );
      })}
    </div>
  );
};

// 5. Decoded Portfolio Matrix (Evidence-Based Traceability)
const PortfolioMatrix = ({ balances }: { balances: any[] }) => {
  if (!balances || balances.length === 0) return null;
  return (
    <div className="w-full bg-[#121212] rounded-2xl border border-zinc-800 p-6 mt-8 shadow-2xl">
      <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6 pb-4 border-b border-zinc-800">Decoded Portfolio Matrix (Forensic Evidence)</h3>
      <div className="w-full overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest border-b border-zinc-800/50">
              <th className="py-3 px-4 font-normal">Asset</th>
              <th className="py-3 px-4 font-normal">Classification</th>
              <th className="py-3 px-4 font-normal">Mint Address (Traceable)</th>
              <th className="py-3 px-4 font-normal text-right">Value</th>
              <th className="py-3 px-4 font-normal text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {balances.map((b, i) => {
              // Rows are already pre-sorted perfectly by service.ts algorithm
              const { guardianRiskClass, formattedValue: value, contract_address: address } = b;
              const symbol = b.guardianSymbol || `Unknown-${b.contract_address.substring(0,4)}`;
              
              let classification = <span className="text-zinc-400 bg-zinc-800/50 px-2 py-1 rounded text-xs border border-zinc-700/50">Neutral / Syncing</span>;
              
              if (guardianRiskClass === 'imposter') {
                  classification = <span className="text-crimson-accent bg-crimson-accent/10 px-2 py-1 rounded text-xs font-bold text-nowrap">Imposter / Scam</span>;
              } else if (guardianRiskClass === 'safe') {
                  classification = <span className="text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded text-xs font-bold">Official Verified</span>;
              } else if (guardianRiskClass === 'danger') {
                  classification = <span className="text-crimson-accent bg-crimson-accent/10 px-2 py-1 rounded text-xs font-bold text-nowrap">High Risk</span>;
              }

              return (
                <tr key={i} className="border-b border-zinc-800/20 hover:bg-zinc-800/40 transition-colors text-sm font-mono text-zinc-300">
                  <td className="py-4 px-4 font-bold flex items-center gap-3">
                    {b.logo_url ? <img src={b.logo_url} className="w-6 h-6 rounded-full" alt="logo" /> : <div className="w-6 h-6 rounded-full bg-zinc-800"></div>}
                    {symbol}
                  </td>
                  <td className="py-4 px-4">{classification}</td>
                  <td className="py-4 px-4 text-zinc-500 text-[11px] tracking-wider font-mono">{address}</td>
                  <td className="py-4 px-4 text-right text-emerald-400">{value}</td>
                  <td className="py-4 px-4 text-right">
                    <a href={`https://solscan.io/token/${b.contract_address}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] hover:text-white transition-colors bg-[#D4AF37]/10 px-3 py-2 rounded-md border border-[#D4AF37]/30 text-nowrap">
                      View on Solscan <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Main Command Center UI
export default function GuardianDashboard() {
  const [address, setAddress] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TrustScoreData | null>(null);

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
      <div className="min-h-screen bg-background relative flex flex-col text-foreground overflow-x-hidden pb-12">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        `}} />
        
        {/* Header */}
        <header className="sticky top-0 w-full z-50 bg-[#121212]/90 backdrop-blur-xl border-b border-[#D4AF37]/20">
          <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
            <h1 className="text-2xl font-extrabold text-[#D4AF37] tracking-[0.4em] uppercase">
              SECGUARD
            </h1>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(16,185,129,1)]" />
              <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">Sentinel Link</span>
            </div>
          </div>
        </header>

        <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
          
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-md">
              Autonomous Security Sentinel
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed font-light">
              Enter identity node hash to deploy defensive AI trace. Engine will decrypt holding matrices and map exposure anomalies.
            </p>
          </div>

          {/* Search Section */}
          <form onSubmit={handleScan} className="w-full max-w-4xl relative group mb-16 z-[100] flex flex-col sm:flex-row items-stretch gap-4">
            <div className="relative flex-1">
              <div className="absolute -inset-1 z-0 bg-[#D4AF37]/20 rounded-2xl blur-xl opacity-20 group-focus-within:opacity-50 transition duration-[600ms] pointer-events-none"></div>
              
              <div className="relative z-[10] pointer-events-auto h-full flex flex-row items-center bg-[#1a1a1a] border border-[#D4AF37]/30 rounded-2xl p-2.5 shadow-2xl backdrop-blur-md">
                <div className="pl-5 text-[#D4AF37] hidden sm:block">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Target Identity Hash (e.g. 9xQE...)"
                  autoFocus
                  className="w-full h-full bg-transparent text-foreground px-5 py-4 focus:outline-none placeholder:text-zinc-500 font-mono text-lg pointer-events-auto"
                  disabled={isScanning}
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isScanning || !address}
              style={{ backgroundColor: '#D4AF37', color: '#000000' }}
              className="w-full sm:w-auto relative z-[999] pointer-events-auto flex items-center justify-center gap-3 px-10 py-6 rounded-2xl font-bold tracking-widest uppercase text-sm transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              {isScanning ? (
                <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              )}
              <span>{isScanning ? 'Decrypting...' : 'Initiate Scan'}</span>
            </button>
          </form>

          {/* Results Area */}
          <div className="w-full relative min-h-[400px] flex flex-col items-center justify-start z-10 w-full max-w-6xl">
            
            {error && !isScanning && (
              <div className="w-full max-w-xl p-10 rounded-2xl border border-crimson-accent/30 bg-[#1a1a1a] shadow-xl text-center">
                <h3 className="text-xl font-bold text-white mb-2">Protocol Error</h3>
                <p className="text-zinc-400">{error}</p>
              </div>
            )}

            {data && !isScanning && !error && (
              <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-[800ms]">
                
                {/* 1. Shadow Monitor Alert Trigger */}
                {data.shadowAlert && (
                  <div className="w-full p-8 rounded-2xl border-2 border-crimson-accent bg-crimson-accent/10 shadow-[0_0_30px_rgba(220,38,38,0.3)] animate-pulse flex items-start gap-6">
                    <div className="w-16 h-16 rounded-full bg-crimson-accent flex items-center justify-center shrink-0">
                       <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                       </svg>
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-crimson-accent uppercase tracking-wider mb-2">Shadow Subnet Compromised</h2>
                      <p className="text-white/80 font-mono leading-relaxed">{data.shadowAlert}</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Left Column: Certificate */}
                  <div className="flex flex-col gap-8">
                    <TrustCertificate score={data.trustScore} address={data.address} />
                    
                    <div className="bg-[#1a1a1a] border border-[#D4AF37]/20 p-6 rounded-2xl relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                       <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4">Total Asset Vectors</h3>
                       <p className="text-4xl font-extrabold text-[#D4AF37]">{data.balances.length}</p>
                    </div>
                  </div>

                  {/* Right Column: Decoder & Heatmap */}
                  <div className="lg:col-span-2 flex flex-col gap-8">
                    
                    {/* The Decoder Logs Subsystem */}
                    <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-6 shadow-2xl flex flex-col h-80">
                      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-zinc-800">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">The Decoder Logs</h3>
                      </div>
                      <div className="flex-1 font-mono text-sm overflow-y-auto space-y-3 custom-scrollbar pr-2">
                         {data.decoderLogs.map((log, idx) => {
                            let color = 'text-zinc-400';
                            if (log.includes('✅')) color = 'text-emerald-400';
                            if (log.includes('⚠️')) color = 'text-amber-400';
                            if (log.includes('🚨')) color = 'text-crimson-accent font-bold';
                            return (
                              <p key={idx} className={`${color} leading-relaxed`}>
                                <span className="text-zinc-600 mr-2">{'>'}</span>{log}
                              </p>
                            );
                         })}
                      </div>
                    </div>

                    {/* Security Heatmap */}
                    <div className="bg-[#1a1a1a] border border-zinc-800 rounded-2xl p-6 shadow-2xl flex flex-col">
                       <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-800">
                          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Global Security Heatmap</h3>
                          <div className="flex gap-4 text-[10px] font-mono text-zinc-600">
                            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-emerald-500/50 rounded-sm"></div> Safe</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-zinc-600 rounded-sm"></div> Neutral</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-crimson-accent/50 rounded-sm"></div> Danger</span>
                          </div>
                       </div>
                       <SecurityHeatmap metrics={data.heatmapMetrics} />
                    </div>

                  </div>
                </div>

                {/* 2. Decoded Portfolio Matrix Injection */}
                <PortfolioMatrix balances={data.balances} />

              </div>
            )}
            
          </div>
        </main>
        
        {/* Inject Live Threat Feed if app is mounted */}
        <LiveThreatFeed />
      </div>
    </ErrorBoundary>
  );
}
