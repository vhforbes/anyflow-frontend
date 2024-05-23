export interface Deployment extends DeploymentDetails {
  chain_deployments: ChainDeployment[];
}

export interface ChainDeployment {
  id: number;
  created_at: string;
  updated_at: string;
  status: string;
  chain_id: number;
  deployment_id: number;
  log: string | null;
  started_at: string | null;
  finished_at: string | null;
  cost_usd: number | null;
  verify_code: number;
  transactions: Transaction[];
  deployment: DeploymentDetails;
}

export interface DeploymentDetails {
  id: number;
  created_at: string;
  updated_at: string;
  status: string;
  user_id: number;
  repository_id: number;
  branch: string;
  root: string | null;
  framework: string;
  started_at: string;
  finished_at: string;
  cost_usd: number | null;
  log: string;
}

export interface Transaction {
  block_hash: string;
  block_number: string;
  chain_deployment_id: number;
  chain_id: number;
  contract_address: string;
  contracts: Contract[];
  cost_native: string;
  cost_usd: number;
  created_at: string;
  effective_gas_price: string;
  from: string;
  gas_used: string;
  hash: string;
  id: number;
  updated_at: string;
}

interface Contract {
  address: string;
  chain_id: number;
  created_at: string;
  id: number;
  transaction_id: number;
  updated_at: string;
}
