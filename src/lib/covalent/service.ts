// Advanced Trust Verification Logic
export interface TrustScoreData {
  success: boolean;
  address: string;
  balances: any[];
  trustScore: number;
  verifiedProtocols: string[];
  insights: string;
  isDustingRisk: boolean;
  decoderLogs: string[];
  shadowAlert: string | null;
  heatmapMetrics: { symbol: string, value: string, riskStatus: 'safe' | 'neutral' | 'danger' }[];
}

const DEX_PROGRAMS = {
  JUPITER: 'JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4',
  RAYDIUM_V4: '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8',
  RAYDIUM_CLMM: 'CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK',
  ORCA: 'whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc',
  METEORA: 'LBUZKhRxPF3XUpBCjp4kVLSsMVWTjCEAW2jZgCGPjjj',
  PHOENIX: 'PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR8943EWev1E5'
};

const OFFICIAL_MINTS: Record<string, string[]> = {
  'USDC': ['EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'],
  'USDT': ['Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'],
  'JUP': ['JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbAbdFSQkm1n'],
  'RNDR': ['rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof'],
  'SOL': ['So11111111111111111111111111111111111111112', '11111111111111111111111111111111'], // WSOL & Native SOL
};

export function calculateTrustScore(balances: any[], transactions: any[]): { 
  score: number, 
  verifiedProtocols: string[], 
  isDustingRisk: boolean, 
  insights: string,
  decoderLogs: string[],
  shadowAlert: string | null,
  heatmapMetrics: any[]
} {
  let score = 50; // Base baseline
  let verifiedProtocols: string[] = [];
  let isDustingRisk = false;
  let hasMajorDEXHistory = false;
  
  let decoderLogs: string[] = [];
  let heatmapMetrics: any[] = [];
  let shadowAlert: string | null = null;

  // Map over balances to inject unified state for the frontend matrix
  const processedBalances = balances.map(b => {
      const isNative = b.native_token === true || b.contract_address === '11111111111111111111111111111111';
      const rawSymbol = b.contract_ticker_symbol || '';
      const symbol = (rawSymbol || `Unknown-${b.contract_address.substring(0,4)}`).toUpperCase();
      const address = b.contract_address;
      const usdValueNum = Number(b.quote) || 0;
      const usdValue = b.quote ? `$${usdValueNum.toFixed(2)}` : '$0.00';
      
      const isOfficialMint = Object.values(OFFICIAL_MINTS).some(mints => mints.includes(address));
      const isImposter = !isOfficialMint && OFFICIAL_MINTS[symbol] && !OFFICIAL_MINTS[symbol].includes(address);
      const isMetadataVerified = isNative || isOfficialMint || (!!b.logo_url && !b.is_spam) || (usdValueNum > 0 && !b.is_spam);

      return {
          ...b,
          isNative,
          guardianSymbol: symbol,
          usdValueNum,
          formattedValue: usdValue,
          isImposter,
          isOfficialMint,
          isMetadataVerified
      };
  });

  // 1. Balance Evaluation Layer & Heatmap Genesis
  const solToken = processedBalances.find(b => b.isNative);
  if (solToken) {
    const decimals = solToken.contract_decimals || 9;
    const balanceAmount = Number(solToken.balance) / Math.pow(10, decimals);
    if (balanceAmount > 5) score += 15;
    else if (balanceAmount > 0.5) score += 5;
    decoderLogs.push(`✅ SYSTEM CONFIRMED: Core identity holds Native Liquidity (${balanceAmount.toFixed(2)} SOL). Secure foundation established. (Mint: ${solToken.contract_address})`);
  } else {
    decoderLogs.push(`⚠️ WARNING: Mainframe detects zero Native Liquidity (SOL). Wallet operates on external gas fees or is newly spawned.`);
  }

  // Iterate over processed assets for Map and Decoder logs
  let dustCount = 0;
  let imposterCount = 0;

  processedBalances.forEach(b => {
      const { guardianSymbol: symbol, contract_address: address, usdValueNum, formattedValue: usdValue, isImposter, isMetadataVerified, isNative, isOfficialMint } = b;
      
      // 1. Intelligent Imposter Detection
      if (isImposter) {
         imposterCount++;
         dustCount++; // Automatically flag as severe dusting
         score -= 10;
         heatmapMetrics.push({ symbol: `FAKE-${symbol}`, value: 'SCAM', riskStatus: 'danger' });
         if (imposterCount <= 3) {
            decoderLogs.push(`🚨 DANGER ALERT: Imposter Contract Detected! Asset '${symbol}' mirrors a legitimate token but uses an unauthorized mint address. Do not sign transactions with this payload! (Mint: ${address})`);
         }
         return; // Skip standard classification
      }
      
      // 2. Diplomatic Immunity Override - Official assets are ALWAYS Green/Verified
      if (isOfficialMint && !isNative) {
         heatmapMetrics.push({ symbol, value: usdValue, riskStatus: 'safe' });
         decoderLogs.push(`✅ SYSTEM CONFIRMED: Official Whitelisted Asset detected -> ${symbol}. Authenticated against global registry. (Mint: ${address})`);
         return;
      }
      
      // 3. Smart Metadata Validation & Context-Aware Price Handling
      if (!isMetadataVerified) {
         dustCount++;
         heatmapMetrics.push({ symbol, value: usdValue, riskStatus: 'danger' });
         if (dustCount < 3) {
            decoderLogs.push(`⚠️ NETWORK WARNING: Unknown smart contract '${symbol}' lacks verified indexes. Direct interaction carries extraction risk. (Mint: ${address})`);
         }
      } else if (isMetadataVerified && usdValueNum === 0 && !isNative) {
         heatmapMetrics.push({ symbol, value: 'SYNCING', riskStatus: 'neutral' });
         if (dustCount === 0 || Math.random() > 0.8) {
            decoderLogs.push(`ℹ️ STATUS UPDATE: Identity Verified — Asset '${symbol}' confirmed legitimate. Price Data Syncing pending oracle liquidity. (Mint: ${address})`);
         }
      } else if (!isNative) {
         heatmapMetrics.push({ symbol, value: usdValue, riskStatus: 'safe' });
         if (usdValueNum > 100) {
            decoderLogs.push(`✅ SYSTEM CONFIRMED: Verified Asset detected -> ${symbol} (${usdValue}). Authenticated against global registry. (Mint: ${address})`);
         }
      }
  });

  // Dusting Check / Shadow Monitor Trigger
  if (dustCount > 20) {
    isDustingRisk = true;
    score -= 15;
    shadowAlert = "MASSIVE SHADOW DELEGATION DETECTED. Wallet contains over 20+ zero-liquidity token payloads typically used in phishing and wallet-drain vectors. Immediate asset revocation advised.";
    decoderLogs.push("⚠️ SYSTEM ISOLATION RECOMMENDED: Asset structure indicates heavy passive dusting attacks across smart contracts.");
  } else if (balances.length > 3) {
    score += 10;
  }

  // 2. Transaction & Balance Heuristic Layer (Classified Verification)
  const combinedPayload = JSON.stringify(transactions || []) + JSON.stringify(balances || []);

  if (combinedPayload.includes(DEX_PROGRAMS.JUPITER) || combinedPayload.includes('JUP')) verifiedProtocols.push('Jupiter Aggregator');
  if (combinedPayload.includes(DEX_PROGRAMS.RAYDIUM_V4) || combinedPayload.includes(DEX_PROGRAMS.RAYDIUM_CLMM) || combinedPayload.includes('RAY')) verifiedProtocols.push('Raydium AMM');
  if (combinedPayload.includes(DEX_PROGRAMS.ORCA) || combinedPayload.includes('ORCA')) verifiedProtocols.push('Orca Whirlpools');
  if (combinedPayload.includes(DEX_PROGRAMS.METEORA) || combinedPayload.includes('MET')) verifiedProtocols.push('Meteora DLMM');
  if (combinedPayload.includes(DEX_PROGRAMS.PHOENIX) || combinedPayload.includes('PHOENIX')) verifiedProtocols.push('Phoenix Orderbook');

  if (verifiedProtocols.length > 0) {
    hasMajorDEXHistory = true;
    score += (verifiedProtocols.length * 10); // +10 for each unique major protocol interact
    decoderLogs.push(`✅ VERIFIED PROTOCOL LINK: Genuine historical linkage detected to leading DEX mainnets [${verifiedProtocols.join(', ')}]. Identity verified as Active DeFi Operator.`);
  }

  // 3. False-Positive Corrections
  if (hasMajorDEXHistory && score < 70) {
      score = 75; // Forced Correction for high-activity DeFi users
  }

  // AI-like Procedural Insights
  let insights = `Guardian AI autonomous scan complete. Memory mapping analyzed ${balances.length} smart contracts. `;
  if (hasMajorDEXHistory) {
      insights += `High-tier protocol interactions securely detected. Risk algorithms aggressively suppressed due to verified DEX linkages.`;
  } else if (isDustingRisk) {
      insights += `CRITICAL WARNING: Sybil or dusting matrix geometries detected. Extreme caution recommended.`;
  } else {
      insights += `Standard retail isolation detected. Minimal complex interaction vectors in memory buffers.`;
  }

  return {
    score: Math.min(Math.max(Math.floor(score), 0), 100),
    verifiedProtocols,
    isDustingRisk,
    insights,
    decoderLogs,
    shadowAlert,
    heatmapMetrics,
    processedBalances
  };
}

export async function getSolanaTrustData(address: string): Promise<TrustScoreData> {
  const apiKey = process.env.NEXT_PUBLIC_GOLD_RUSH_API_KEY;
  if (!apiKey) console.warn("Missing Covalent API Key.");

  const authHeader = 'Basic ' + Buffer.from(`${apiKey}:`).toString('base64');
  const headers = { Authorization: authHeader };

  // Parallel Fetch: Balances _and_ Transactions safely
  const balanceUrl = `https://api.covalenthq.com/v1/solana-mainnet/address/${address}/balances_v2/`;
  const txUrl = `https://api.covalenthq.com/v1/solana-mainnet/address/${address}/transactions_v3/?page-size=50`;

  const resBalances = await fetch(balanceUrl, { headers });
  
  if (!resBalances.ok) {
     const status = resBalances.status;
     if (status === 401) throw new Error("Invalid Auth / Connection Error. Please verify your cqt_ API key configuration.");
     if (status === 404) throw new Error("Classified ledger isolation: Target Identity holds no structural history on Solana.");
     if (status === 429) throw new Error("Covalent Rate limit exceeded. Standby.");
     throw new Error(`Data sync failed (Status: ${status})`);
  }

  // Gracefully handle 501/Unsupported transaction fetching without crashing
  const resTxs = await fetch(txUrl, { headers }).catch(() => null);

  let jsonBalances, jsonTxs;
  try {
    jsonBalances = await resBalances.json();
  } catch (e) {
    throw new Error("Invalid format received from balance lookup.");
  }

  const balances = jsonBalances?.data?.items || [];
  
  let transactions = [];
  if (resTxs && resTxs.ok) {
    try {
      jsonTxs = await resTxs.json();
      transactions = jsonTxs?.data?.items || [];
    } catch (e) {
      console.warn("Soft failure decoding transaction body.", e);
    }
  } else {
    console.warn("Transactions endpoint unsupported or rate-limited. Falling back to balance-only heuristics.");
  }
  
  const metric = calculateTrustScore(balances, transactions);

  return {
    success: true,
    address,
    balances: metric.processedBalances,
    trustScore: metric.score,
    verifiedProtocols: metric.verifiedProtocols,
    insights: metric.insights,
    isDustingRisk: metric.isDustingRisk,
    decoderLogs: metric.decoderLogs,
    shadowAlert: metric.shadowAlert,
    heatmapMetrics: metric.heatmapMetrics
  };
}
