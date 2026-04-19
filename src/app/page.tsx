import React from 'react';

export default function GuardianLanding() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center selection:bg-emerald-accent/30 selection:text-emerald-accent">
      {/* Background glowing effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-accent/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-crimson-accent/20 blur-[120px] rounded-full pointer-events-none" />
      
      <main className="z-10 text-center px-4 max-w-5xl mx-auto w-full py-16">
        <div className="mb-6 inline-block">
          <span className="px-3 py-1 rounded-full border border-emerald-accent/30 bg-emerald-accent/10 text-emerald-accent text-sm font-medium tracking-wide uppercase">
            System Operational
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
          <span className="text-foreground">Guardian</span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-accent to-emerald-accent-hover">Trust Protocol</span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12">
          High-end on-chain trust scoring dashboard for Solana. 
          Real-time wallet health evaluation, risk mitigation, and interaction monitoring.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-6 py-3 rounded-lg bg-emerald-accent hover:bg-emerald-accent-hover text-zinc-950 font-semibold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]">
            Connect Wallet
          </button>
          
          <button className="px-6 py-3 rounded-lg border border-zinc-800 hover:border-crimson-accent/50 hover:bg-crimson-accent/10 text-zinc-300 transition-all">
            Report Threat
          </button>
        </div>
        
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm hover:border-emerald-accent/50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-emerald-accent/10 flex items-center justify-center mb-4">
              <div className="w-4 h-4 rounded-full bg-emerald-accent shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Analysis</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">Instant evaluation of wallet health based on protocol interactions and historical data.</p>
          </div>
          
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm hover:border-crimson-accent/50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-crimson-accent/10 flex items-center justify-center mb-4">
              <div className="w-4 h-4 rounded-full bg-crimson-accent shadow-[0_0_10px_rgba(225,29,72,0.8)]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Risk Mitigation</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">Identify interactions with unknown or highly suspicious smart contracts flagged by our system.</p>
          </div>
          
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm hover:border-zinc-500/50 transition-colors">
            <div className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center mb-4">
              <div className="w-4 h-4 rounded-full bg-zinc-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Detailed Audits</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">Comprehensive breakdown of transaction history, token balances, and wallet forensics.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
