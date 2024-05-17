"use client";
import { useAuth } from "@/hooks/useAuth";
import { ChainWithSettings } from "@/interfaces/ChainSettingsInterface";
import {
  Branch,
  Organization,
  Repository,
  RepositoryConfigs,
} from "@/interfaces/RepositoriesInterface";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type DeployStepsContextType = {
  codeProviderStep: CodeProviderStep | undefined;
  setCodeProviderStep: Dispatch<SetStateAction<CodeProviderStep | undefined>>;
  deploySettingsStep: DeploySettingsStep | undefined;
  setDeploySettingsStep: Dispatch<
    SetStateAction<DeploySettingsStep | undefined>
  >;
  deployStatusStep: DeployStatusStep | undefined;
  setDeployStatusStep: Dispatch<SetStateAction<DeployStatusStep | undefined>>;
};

type CodeProviderStep = {
  organization: Organization;
  repository: Repository;
  branch: Branch;
  repositoryConfigs: RepositoryConfigs;
  root: string;
};

type DeploySettingsStep = {
  selectedChains: ChainWithSettings[];
  globalEnvVariables: string;
};

interface DeployStatusStep {
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
}

const DeployStepsContext = createContext<DeployStepsContextType>({
  codeProviderStep: undefined,
  setCodeProviderStep: () => {}, // Initial function for setting codeProviderStep
  deploySettingsStep: undefined,
  setDeploySettingsStep: () => {}, // Initial function for setting deploySettingsStep
  deployStatusStep: undefined,
  setDeployStatusStep: () => {},
});

export const DeployStepsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [codeProviderStep, setCodeProviderStep] = useState<CodeProviderStep>();
  const [deploySettingsStep, setDeploySettingsStep] =
    useState<DeploySettingsStep>();
  const [deployStatusStep, setDeployStatusStep] = useState<DeployStatusStep>();

  // Recover codeProviderStepState from localStorage in case the user refreshes the page
  useEffect(() => {
    const codeProviderStepLocalStorage =
      localStorage.getItem("codeProviderStep");

    let hasLocalStorage =
      codeProviderStepLocalStorage === "undefined" ||
      !codeProviderStepLocalStorage
        ? false
        : true;

    if (!codeProviderStep && hasLocalStorage) {
      setCodeProviderStep(JSON.parse(codeProviderStepLocalStorage as string));
    }

    if (codeProviderStep) {
      localStorage.setItem(
        "codeProviderStep",
        JSON.stringify(codeProviderStep)
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeProviderStep]);

  // This is the same of the above with a diff getItem Key.
  // Theres probably a way to have only one function but I cant thing straight RN
  // There's maybe a better way to manage local storage but this looks straightforward
  useEffect(() => {
    const deploySettingsStepLocalStorage =
      localStorage.getItem("codeProviderStep");

    let hasLocalStorage =
      deploySettingsStepLocalStorage === "undefined" ||
      !deploySettingsStepLocalStorage
        ? false
        : true;

    if (!deploySettingsStep && hasLocalStorage) {
      setDeploySettingsStep(
        JSON.parse(deploySettingsStepLocalStorage as string)
      );
    }

    if (deploySettingsStep) {
      localStorage.setItem(
        "deploySettingsStep",
        JSON.stringify(deploySettingsStep)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deploySettingsStep]);

  useEffect(() => {
    const deployStatusStepLocalStorage =
      localStorage.getItem("deployStatusStep");

    let hasLocalStorage =
      deployStatusStepLocalStorage === "undefined" ||
      !deployStatusStepLocalStorage
        ? false
        : true;

    if (!deployStatusStep && hasLocalStorage) {
      setDeployStatusStep(JSON.parse(deployStatusStepLocalStorage as string));
    }

    if (deployStatusStep) {
      localStorage.setItem(
        "deployStatusStep",
        JSON.stringify(deployStatusStep)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deployStatusStep]);

  return (
    <DeployStepsContext.Provider
      value={{
        codeProviderStep,
        setCodeProviderStep,
        deploySettingsStep,
        setDeploySettingsStep,
        deployStatusStep,
        setDeployStatusStep,
      }}
    >
      {children}
    </DeployStepsContext.Provider>
  );
};

export const useDeployStepsContext = () => {
  return useContext(DeployStepsContext);
};
