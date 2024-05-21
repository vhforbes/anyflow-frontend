import { useDeployStepsContext } from "@/contexts/DeployStepsContext";
import api from "@/utils/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useLoader from "./useLoader";

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
  chains: { chain_id: number; environment: string; verify_code: boolean }[];
  environment: string;
  framework: string;
  repository_id: number;
  root: string;
}

interface DeployResponse {
  message: string;
  data: {
    id: 1;
    status: string;
    repository_id: number;
    branch: string;
    root: null;
    framework: string;
    user_id: 11;
    updated_at: string;
    created_at: string;
    log: null;
  };
}

export const useDeploy = () => {
  const router = useRouter();
  const { startLoading, stopLoading } = useLoader();

  const [deployPayload, setDeployPayload] = useState<DeployPayload>();
  const [currentDeploy, setCurrentDeploy] = useState<DeployResponse>();

  const { codeProviderStep, deploySettingsStep, setDeployStatusStep } =
    useDeployStepsContext();

  const buildDeployPayload = () => {
    if (codeProviderStep && deploySettingsStep) {
      console.log(deploySettingsStep);

      const deployPayload: DeployPayload = {
        // Code Provider
        repository_id: codeProviderStep.repository.id,
        branch: codeProviderStep.branch.name,
        framework: codeProviderStep.repositoryConfigs.framework,
        root: codeProviderStep.root || "",
        // Deloy Settings
        chains: deploySettingsStep.selectedChains?.map((chain) => ({
          chain_id: chain.chain_id,
          environment: chain.envVariables || "",
          verify_code: chain.verifyContracts || false,
        })),
        environment: deploySettingsStep.globalEnvVariables,
      };

      return deployPayload;
    }
  };

  useEffect(() => {
    setDeployPayload(buildDeployPayload());
  }, [codeProviderStep, deploySettingsStep]);

  useEffect(() => {}, [deployPayload]);

  const deploy = async () => {
    // Check if user has a active deploy before deploying
    // if (currentDeploy) return;

    try {
      startLoading();
      const { data: deployResponse }: { data: DeployResponse } = await api.post(
        "/api/deployments",
        deployPayload
      );

      // Do i need to set this in two states? Doesent seem to good
      setCurrentDeploy(deployResponse);
      setDeployStatusStep(deployResponse.data);

      stopLoading();
      router.push(`/deploy-steps/04-status/${deployResponse.data.id}`);
    } catch (error) {
      stopLoading();
      console.error(error);
    }
  };

  return { deploy };
};
