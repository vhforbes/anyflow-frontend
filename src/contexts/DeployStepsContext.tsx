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
};

type CodeProviderStep = {
  organization: Organization;
  repository: Repository;
  branch: Branch;
  repositoryConfigs: RepositoryConfigs;
  root: string;
};

type DeploySettingsStep = {
  selectedChains: Pick<
    ChainWithSettings,
    "name" | "id" | "verifyContracts" | "envVariables"
  >[];
  globalEnvVariables: string;
};

const DeployStepsContext = createContext<DeployStepsContextType>({
  codeProviderStep: undefined,
  setCodeProviderStep: () => {}, // Initial function for setting codeProviderStep
  deploySettingsStep: undefined,
  setDeploySettingsStep: () => {}, // Initial function for setting deploySettingsStep
});

export const DeployStepsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [codeProviderStep, setCodeProviderStep] = useState<CodeProviderStep>();

  const [deploySettingsStep, setDeploySettingsStep] =
    useState<DeploySettingsStep>();

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

    localStorage.setItem("codeProviderStep", JSON.stringify(codeProviderStep));

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
      setCodeProviderStep(JSON.parse(deploySettingsStepLocalStorage as string));
    }

    localStorage.setItem(
      "deploySettingsStep",
      JSON.stringify(deploySettingsStep)
    );

    localStorage.setItem(
      "deploySettingsStep",
      JSON.stringify(deploySettingsStep)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deploySettingsStep]);

  return (
    <DeployStepsContext.Provider
      value={{
        codeProviderStep,
        setCodeProviderStep,
        deploySettingsStep,
        setDeploySettingsStep,
      }}
    >
      {children}
    </DeployStepsContext.Provider>
  );
};

export const useDeployStepsContext = () => {
  return useContext(DeployStepsContext);
};
