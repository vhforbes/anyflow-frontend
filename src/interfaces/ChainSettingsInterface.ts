export interface Chain {
  id: number;
  chain_id: number;
  name: string;
  ticker: string;
  is_available: false;
  created_at: string;
  deployers: any[];
  is_testnet: 1;
  updated_at: "2024-05-16T12:40:40.000000Z";
}

export interface ChainWithSettings extends Chain {
  envVariables?: string;
  verifyContracts?: boolean;
}
