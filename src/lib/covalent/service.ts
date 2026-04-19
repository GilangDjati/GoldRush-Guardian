export function calculateTrustScore(balances: any[]): number {
  let score = 50;

  // Add +10 if the total SOL balance is > 1
  const solToken = balances.find((b) => 
    b.contract_ticker_symbol === 'SOL' || 
    b.native_token === true ||
    b.contract_address === '11111111111111111111111111111111'
  );

  if (solToken) {
    // Solana uses 9 decimal places
    const decimals = solToken.contract_decimals || 9;
    
    // Safely parse balance (balances can be large strings)
    const balanceAmount = Number(solToken.balance) / Math.pow(10, decimals);
    
    if (balanceAmount > 1) {
      score += 10;
    }
  }

  // Add +20 if the account has more than 5 different tokens
  if (balances.length > 5) {
    score += 20;
  }

  // Cap the score between 0 and 100
  return Math.min(Math.max(score, 0), 100);
}

export async function getSolanaTrustData(address: string) {
  const apiKey = process.env.NEXT_PUBLIC_GOLD_RUSH_API_KEY;
  
  if (!apiKey) {
    console.warn("Missing Covalent API Key. Trust data might fail to load.");
  }

  // Construct standard Covalent fetch URL for Solana Mainnet balances
  const url = `https://api.covalenthq.com/v1/solana-mainnet/address/${address}/balances_v2/`;
  
  // Use Basic Auth with the API Key per Covalent standard
  const authHeader = 'Basic ' + Buffer.from(`${apiKey}:`).toString('base64');

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: authHeader,
    },
    // Useful for Next cache/revalidation tuning later:
    // next: { revalidate: 60 } 
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Solana balances: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  const balances = json.data?.items || [];
  
  const score = calculateTrustScore(balances);

  return {
    success: true,
    address,
    balances,
    trustScore: score,
  };
}
