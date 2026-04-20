// Advanced Trust Verification Logic
const DEX_PROGRAMS = {
  JUPITER: 'JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4',
  RAYDIUM_V4: '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8',
  RAYDIUM_CLMM: 'CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK',
  ORCA: 'whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc',
  METEORA: 'LBUZKhRxPF3XUpBCjp4kVLSsMVWTjCEAW2jZgCGPjjj',
  PHOENIX: 'PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR8943EWev1E5'
};

export function calculateTrustScore(balances: any[], transactions: any[]): { score: number, verifiedProtocols: string[], isDustingRisk: boolean, insights: string } {
  let score = 50; // Base baseline
  let verifiedProtocols: string[] = [];
  let isDustingRisk = false;
  let hasMajorDEXHistory = false;

  // 1. Balance Evaluation Layer
  const solToken = balances.find((b) => b.contract_ticker_symbol === 'SOL' || b.native_token === true);
  if (solToken) {
    const decimals = solToken.contract_decimals || 9;
    const balanceAmount = Number(solToken.balance) / Math.pow(10, decimals);
    if (balanceAmount > 5) score += 15;
    else if (balanceAmount > 0.5) score += 5;
  }

  // Dusting Check (>20 obscure assets might indicate dusting)
  if (balances.length > 25) {
    isDustingRisk = true;
    score -= 15;
  } else if (balances.length > 3) {
    score += 10;
  }

  // 2. Transaction Heuristic Layer (Classified Verification)
  if (transactions && transactions.length > 0) {
    // We analyze the recent 50 transactions for protocol signatures
    const txStringPayload = JSON.stringify(transactions);

    if (txStringPayload.includes(DEX_PROGRAMS.JUPITER)) verifiedProtocols.push('Jupiter Aggregator');
    if (txStringPayload.includes(DEX_PROGRAMS.RAYDIUM_V4) || txStringPayload.includes(DEX_PROGRAMS.RAYDIUM_CLMM)) verifiedProtocols.push('Raydium AMM');
    if (txStringPayload.includes(DEX_PROGRAMS.ORCA)) verifiedProtocols.push('Orca Whirlpools');
    if (txStringPayload.includes(DEX_PROGRAMS.METEORA)) verifiedProtocols.push('Meteora DLMM');
    if (txStringPayload.includes(DEX_PROGRAMS.PHOENIX)) verifiedProtocols.push('Phoenix Orderbook');

    if (verifiedProtocols.length > 0) {
      hasMajorDEXHistory = true;
      score += (verifiedProtocols.length * 10); // +10 for each unique major protocol interact
    }
  }

  // 3. False-Positive Corrections
  // If the wallet actively trades on verified protocols, ignore the dusting penalty heavily and ensure a 'Safe' rating.
  if (hasMajorDEXHistory && score < 70) {
      score = 75; // Forced Correction for high-activity DeFi users
  }

  // AI-like Procedural Insights
  let insights = `Guardian AI initialization complete. Payload analyzed across ${balances.length} assets and recent network interactions. `;
  if (hasMajorDEXHistory) {
      insights += `High-tier protocol interactions securely detected across ${verifiedProtocols.join(', ')}. Profile exhibits legitimate DeFi liquidity participation. Risk index suppressed via False-Positive heuristic protocol.`;
  } else if (isDustingRisk) {
      insights += `Warning: Elevated asset count detected with zero verified DEX interactions. Potential dusting or sybil wallet geometry. Use caution.`;
  } else {
      insights += `Standard retail profile. Moderate holdings isolated. No complex DEX interactions recorded in recent history.`;
  }

  return {
    score: Math.min(Math.max(Math.floor(score), 0), 100),
    verifiedProtocols,
    isDustingRisk,
    insights
  };
}

export async function getSolanaTrustData(address: string) {
  const apiKey = process.env.NEXT_PUBLIC_GOLD_RUSH_API_KEY;
  if (!apiKey) console.warn("Missing Covalent API Key.");

  const authHeader = 'Basic ' + Buffer.from(`${apiKey}:`).toString('base64');
  const headers = { Authorization: authHeader };

  // Parallel Fetch: Balances _and_ Transactions
  const balanceUrl = `https://api.covalenthq.com/v1/solana-mainnet/address/${address}/balances_v2/`;
  const txUrl = `https://api.covalenthq.com/v1/solana-mainnet/address/${address}/transactions_v3/?page-size=50`;

  const [resBalances, resTxs] = await Promise.all([
    fetch(balanceUrl, { headers }),
    fetch(txUrl, { headers })
  ]);

  if (!resBalances.ok || !resTxs.ok) {
     const status = !resBalances.ok ? resBalances.status : resTxs.status;
     if (status === 401) throw new Error("Invalid Auth / Connection Error. Please verify your cqt_ API key configuration.");
     if (status === 404) throw new Error("Classified ledger isolation: Target Identity holds no structural history on Solana.");
     if (status === 429) throw new Error("Covalent Rate limit exceeded. Standby.");
     throw new Error(`Data sync failed (Status: ${status})`);
  }

  const jsonBalances = await resBalances.json();
  const jsonTxs = await resTxs.json();

  const balances = jsonBalances.data?.items || [];
  const transactions = jsonTxs.data?.items || [];
  
  const metric = calculateTrustScore(balances, transactions);

  return {
    success: true,
    address,
    balances,
    trustScore: metric.score,
    verifiedProtocols: metric.verifiedProtocols,
    insights: metric.insights,
  };
}
