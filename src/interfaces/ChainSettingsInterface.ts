import { Chain } from "viem";

export interface ChainWithSettings extends Chain {
  envVariables?: string;
  verifyContracts?: boolean;
}
