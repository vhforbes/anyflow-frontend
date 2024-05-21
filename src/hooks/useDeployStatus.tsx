import { useDeployStepsContext } from "@/contexts/DeployStepsContext";
import api from "@/utils/axios";
import { useEffect, useState } from "react";

interface Deployment extends DeploymentDetails {
  chain_deployments: ChainDeployment[];
}

interface ChainDeployment {
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

interface DeploymentDetails {
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

interface Transaction {}

export const useDeployStatus = () => {
  const { deployStatusStep } = useDeployStepsContext();
  const [deployment, setDeployment] = useState<Deployment>();

  const getGeneralDeployment = async (id: number) => {
    try {
      const { data: deploymentStatus }: { data: Deployment } = await api.get(
        `/api/deployments/${id}`
      );

      setDeployment(deploymentStatus);

      console.log(deploymentStatus);
    } catch (error) {
      console.error(error);
    }
  };

  const getStatus = async (id: number) => {
    try {
      const deploymentStatus = await api.get(`/deployment/${id}`);

      console.log(deploymentStatus);
    } catch (error) {
      console.error(error);
    }
  };

  const getChainDeployments = async (id: number) => {
    try {
      const chainDeploymentStatus = await api.get(
        `/deployment/${id}/chain_deployments`
      );

      console.log(chainDeploymentStatus);
    } catch (error) {
      console.error(error);
    }
  };

  const getTransactions = async (id: number) => {
    try {
      const transactionsStatus = await api.get(
        `/deployment/${id}/transactions`
      );

      console.log(transactionsStatus);
    } catch (error) {
      console.error(error);
    }
  };

  const getContracts = async (id: number) => {
    try {
      const contractsStatus = await api.get(
        `/deployment/${id}/transactions/contracts`
      );

      console.log(contractsStatus);
    } catch (error) {
      console.error(error);
    }
  };

  return { deployment, getGeneralDeployment };
};
