"use client";

import { useDeployStepsContext } from "@/contexts/DeployStepsContext";
import { Deployment } from "@/interfaces/DeploymentInterface";
import api from "@/utils/axios";
import { useState } from "react";
import toast from "react-hot-toast";

export const useDeployStatus = () => {
  const { deployStatusStep } = useDeployStepsContext();
  const [deployment, setDeployment] = useState<Deployment>();

  const getGeneralDeployment = async (id: number) => {
    try {
      const { data: deploymentStatus }: { data: Deployment } = await api.get(
        `/api/deployments/${id}`
      );

      console.log(deploymentStatus);

      setDeployment(deploymentStatus);
    } catch (error) {
      toast.error("Could not deploy");
      console.error(error);
    }
  };

  // To be added routes bellow
  const getStatus = async (id: number) => {
    try {
      const deploymentStatus = await api.get(`/deployment/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const getChainDeployments = async (id: number) => {
    try {
      const chainDeploymentStatus = await api.get(
        `/deployment/${id}/chain_deployments`
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getTransactions = async (id: number) => {
    try {
      const transactionsStatus = await api.get(
        `/deployment/${id}/transactions`
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getContracts = async (id: number) => {
    try {
      const contractsStatus = await api.get(
        `/deployment/${id}/transactions/contracts`
      );
    } catch (error) {
      console.error(error);
    }
  };

  return { deployment, getGeneralDeployment };
};
