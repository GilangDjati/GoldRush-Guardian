# 🛡️ GoldRush Guardian: Autonomous Security Sentinel

> **Defensive AI Trace & Anomaly Decryption Engine**
> Built for the **GoldRush Frontier Hackathon**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel_Deploy-emerald?style=for-the-badge&logo=vercel)](https://gold-rush-guardian-1bc4-au24hflgw.vercel.app/) 
[![Video Pitch](https://img.shields.io/badge/Video_Pitch-X_(Twitter)-black?style=for-the-badge&logo=x)](https://x.com/_JD_ID_/status/2048822490651381863?s=20)

---

## 🛑 The Problem: Blockchain Blindness
Raw ledger data is mathematically flawless, but human-readably useless. Explorers and traditional portfolio trackers just list assets, hiding the critical context needed to evaluate exposure. Users cannot distinguish between an officially verified token and a malicious zero-liquidity payload designed to drain their wallet. 

## 🌌 The Solution: NASA-Grade Telemetry
**GoldRush Guardian** is not a basic dashboard; it is an **Autonomous Security Sentinel**. It acts as a proactive cyber-defense firewall, aggressively decrypting holding matrices to map exposure anomalies. 

By consuming unified data structures from the **Covalent GoldRush API**, Guardian bypasses tedious indexing and immediately applies strict heuristic reasoning. We instantly convert raw base58 hashes into a **Security Heatmap**, human-readable **Decoder Logs**, and a cryptographic **Trust Score**, providing immediate visibility into wallet risk.

---

## 🥇 Hackathon Track Alignment
Guardian bridges the gap between static analytics and active defense, explicitly answering the GoldRush mission: *"Surfacing insights that raw blockchain data alone can't provide."*

* **Track 1: Wallet & Portfolio Apps** — We transform standard asset listing into a 'Zero-Trust' visual grid, grouping portfolios not by fiat value, but by threat exposure and metadata verification.
* **Track 2: Compliance & Risk Tools** — Our mathematical engine calculates counterparty trust scores and autonomously evaluates wallet risk based on liquidity depth, protocol history, and malicious dusting detection.

---

## 🧠 The GoldRush Edge (Powered by Covalent)
Guardian's intelligence is solely possible due to Covalent's **Unified API** infrastructure. 

Instead of deploying custom RPC nodes or indexers to scrape the Solana blockchain, we seamlessly utilize the `balances_v2` and `transactions_v3` endpoints. We rely heavily on Covalent's structured metadata (specifically `logo_url`, `is_spam` flagging, and `quote` pricing) as the foundational ground truth for our anomaly detection. 

Covalent hands us the raw, structured data; Guardian acts as the heuristic brain that interprets it.

---

## ⚙️ Technical Depth: The Sentinel Architecture

### 1. Diplomatic Immunity (Strict Whitelisting)
The Sentinel hardcodes the true Mint Addresses of systemic Solana assets (SOL, USDC, USDT, JUP, RNDR). These assets bypass standard pricing heuristics and are granted absolute "Safe" status, eliminating the false positives that plague other scanners during API oracle lag or $0.00 fallback quotes.

### 2. Intelligent Imposter Detection
The engine cross-references token ticker symbols against official mint registries. If a target wallet holds a token named "USDC" but its contract address does not match `EPjFW...`, it is instantly slapped with a critical risk penalty, generating a Red Alert and visually isolating the asset as an active Phishing Vector.

### 3. Shadow Subnet Monitoring
Guardian aggressively analyzes "Dusting Attacks". If a wallet is flooded with >20 unverified, zero-liquidity smart contracts, the system triggers a **Massive Shadow Delegation** alert, drastically downgrading the wallet's Trust Score to warn of an active Sybil or drainer attack setup.

### 4. Flawless State Synchronization
The entire Command Center—from the prioritized sorting of the **Decoder Logs** (✅ Safe -> ℹ️ Neutral -> 🚨 Danger) to the visual rendering of the **Global Security Heatmap**—consumes a single, algorithmically sorted state array. This guarantees perfect visual, narrative, and statistical parity across the entire matrix.

---

## 🛰️ Future Roadmap
- **V2 Neural Link:** Integration with WebSocket for real-time, live-streaming threat detection.
- **Smart Contract Profiler:** Deeper analysis of program-account logic to identify honeypots automatically.
- **Mobile Tactical Interface:** A PWA version for security monitoring on-the-go.

## 🚀 Getting Started

### Prerequisites
* Node.js (v18+)
* A Covalent GoldRush API Key (`cqt_...`)

### Local Deployment
```bash
# 1. Clone the repository
git clone https://github.com/GilangDjati/GoldRush-Guardian.git
cd GoldRush-Guardian

# 2. Install dependencies
npm install

# 3. Configure Neural Link (Environment Variables)
echo "NEXT_PUBLIC_GOLD_RUSH_API_KEY=cqt_your_api_key_here" > .env.local

# 4. Boot the Sentinel
npm run dev
```
Open `http://localhost:3000` to access the Command Center.

---
*Built with React, Next.js, Tailwind CSS, and the Covalent GoldRush API.*
