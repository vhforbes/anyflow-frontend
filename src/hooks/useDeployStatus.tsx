import { useDeployStepsContext } from "@/contexts/DeployStepsContext";
import api from "@/utils/axios";
import { useEffect } from "react";

export const useDeployStatus = () => {
  const { deployStatusStep } = useDeployStepsContext();

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

  useEffect(() => {
    if (deployStatusStep?.id) {
      getStatus(deployStatusStep?.id);
      getChainDeployments(deployStatusStep?.id);
      getTransactions(deployStatusStep?.id);
      getContracts(deployStatusStep?.id);
    }
  }, [deployStatusStep]);

  return { getStatus };
};
