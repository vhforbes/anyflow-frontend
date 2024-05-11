"use client";
import { useDeployStepsContext } from "@/contexts/DeployStepsContext";
import api from "@/utils/axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DeployResponse {
  status: string;
  verify_code: boolean;
  repository_id: number;
  branch: string;
  root: string;
  framework: string;
  user_id: number;
  updated_at: string; // OR DATE?
  created_at: string; // OR DATE?
  id: number;
  log: string;
}

interface DeployPayload {
  branch: string;
  chains: { chain_id: number; environment: string }[];
  environment: string;
  framework: string;
  repository_id: number;
  root: string;
  verify_code: boolean;
}

const DeployStatusPage = () => {
  const [deployPayload, setDeployPayload] = useState({} as DeployPayload);

  const { codeProviderStep, deploySettingsStep } = useDeployStepsContext();

  const buildDeployPayload = () => {
    const deployPayload: DeployPayload = {
      // Code Provider
      repository_id: codeProviderStep.repository?.id,
      branch: codeProviderStep.branch?.name,
      framework: codeProviderStep.repositoryConfigs?.framework,
      root: codeProviderStep?.root || "",
      // Deloy Settings
      verify_code: true, // THIS WILL BE SENT AS A INDIVIDUAL ON EACH CHAIN
      chains: deploySettingsStep?.selectedChains, // Alinhar Type com o Yudi
      environment: deploySettingsStep?.globalEnvVariables,
    };

    return deployPayload;
  };

  useEffect(() => {
    setDeployPayload(buildDeployPayload());

    // console.log(codeProviderStep);
    // console.log(deploySettingsStep);
  }, [codeProviderStep, deploySettingsStep]);

  useEffect(() => {
    const isDeployPayload = (value: DeployPayload): value is DeployPayload => {
      // Check if all required properties exist and have the correct types
      return (
        typeof value.branch === "string" &&
        Array.isArray(value.chains) &&
        value.chains.every(
          (chain) =>
            typeof chain.chain_id === "number" &&
            typeof chain.environment === "string"
        ) &&
        typeof value.environment === "string" &&
        typeof value.framework === "string" &&
        typeof value.repository_id === "number" &&
        typeof value.root === "string" &&
        typeof value.verify_code === "boolean"
      );
    };

    if (isDeployPayload(deployPayload)) {
      deploy();
    }
  }, [deployPayload]);

  const deploy = async () => {
    const { data: deployResponse }: { data: DeployResponse } = await api.post(
      "/api/deployments",
      deployPayload
    );
  };

  return (
    <div className="text-center">
      <p>Deploy Status</p>
      <button className="btn btn-secondary">
        <Link href="/deploy-steps/02-deploy-settings">
          Step 2 Deploy Settings
        </Link>
      </button>
    </div>
  );
};

export default DeployStatusPage;
