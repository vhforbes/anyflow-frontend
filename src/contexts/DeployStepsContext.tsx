"use client";
import { useAuth } from "@/hooks/useAuth";
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
  codeProviderStep: CodeProviderStep;
  setCodeProviderStep: Dispatch<SetStateAction<CodeProviderStep>>;
  //   deploySettingsStep: {
  //     // thigs that need to be shared for that step
  //   };
};

type CodeProviderStep = {
  organization: Organization;
  repository: Repository;
  branch: Branch;
  repositoryConfigs: RepositoryConfigs;
  source: string;
};

const DeployStepsContext = createContext<DeployStepsContextType>(
  {} as DeployStepsContextType
);

export const DeployStepsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [codeProviderStep, setCodeProviderStep] = useState<CodeProviderStep>(
    {} as CodeProviderStep
  );

  useEffect(() => {
    const codeProverStepLocalStorage = JSON.parse(
      localStorage.getItem("codeProviderStep") || ""
    );

    console.log(codeProverStepLocalStorage);

    // Recover state in case the user refreshes the page
    if (
      !Object.keys(codeProviderStep).length &&
      Object.keys(codeProverStepLocalStorage).length
    ) {
      console.log("Trying to setCodeProviderStep");
      setCodeProviderStep(JSON.parse(codeProverStepLocalStorage));
      return;
    }

    localStorage.setItem("codeProviderStep", JSON.stringify(codeProviderStep));
  }, [codeProviderStep]);

  return (
    <DeployStepsContext.Provider
      value={{
        codeProviderStep,
        setCodeProviderStep,
      }}
    >
      {children}
    </DeployStepsContext.Provider>
  );
};

export const useDeployStepsContext = () => {
  return useContext(DeployStepsContext);
};
