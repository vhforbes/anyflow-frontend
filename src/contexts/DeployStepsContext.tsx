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

  // Recover state in case the user refreshes the page
  useEffect(() => {
    const codeProviderStepLocalStorage =
      localStorage.getItem("codeProviderStep");

    console.log(codeProviderStepLocalStorage);

    const parsedProviderStepLocalStorage: CodeProviderStep = JSON.parse(
      codeProviderStepLocalStorage || "{}"
    );

    if (
      Object.keys(codeProviderStep).length === 0 &&
      Object.keys(parsedProviderStepLocalStorage).length !== 0
    ) {
      console.log("Inside setter");
      setCodeProviderStep(parsedProviderStepLocalStorage);
      console.log(parsedProviderStepLocalStorage);
      return;
    }

    localStorage.setItem("codeProviderStep", JSON.stringify(codeProviderStep));

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
