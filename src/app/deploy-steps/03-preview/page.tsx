"use client";

import { NavigateButton } from "@/components/01-atoms/NavigateButton";
import DeployStepsLayout from "@/components/04-layouts/DeployStepsLayout";
import { useDeployStepsContext } from "@/contexts/DeployStepsContext";
import { useDeploy } from "@/hooks/useDeploy";
import Link from "next/link";

const DeployPreviewPage = () => {
  const { codeProviderStep, deploySettingsStep } = useDeployStepsContext();
  const { deploy } = useDeploy();

  if (!codeProviderStep || !deploySettingsStep) return null;

  return (
    <DeployStepsLayout currentStep={3}>
      <div className="text-center">
        <h1 className="text-2xl">Preview your deployment</h1>

        <div className="border-2 w-fit m-auto p-4 rounded-lg mt-4">
          <p className="text-xl">Selected Repository</p>
          <p>Organization: {codeProviderStep.organization?.login}</p>
          <p>Branch: {codeProviderStep.branch?.name}</p>
          <p>Repository: {codeProviderStep.repository?.name}</p>
          {codeProviderStep.root ? (
            <p>Custom root: {codeProviderStep.root}</p>
          ) : null}

          <p>Framework: {codeProviderStep.repositoryConfigs?.framework}</p>
        </div>

        <div className="mt-8">
          <p className="text-xl">Deployment Settings</p>

          <div>
            <p>Global Environment Variables:</p>
            <pre className="bg-base-100 text-sm p-4 rounded-md w-fit text-left m-auto text-base-content mt-4">
              <code className="whitespace-pre-wrap">
                <p>{deploySettingsStep?.globalEnvVariables}</p>
              </code>
            </pre>
          </div>

          <p className="mt-8">Selected Chains:</p>
          <div className="flex flex-row flex-wrap justify-around m-auto">
            {deploySettingsStep.selectedChains?.map((chain) => (
              <div key={chain.id} className="border-2 w-48 p-2 mt-4">
                <p>{chain?.name}</p>
                <p>{chain?.chain_id}</p>
                <p>{chain?.verifyContracts ? "Verify!" : "Don't Verify"}</p>
                <p>Env Variables:</p>
                <pre className="bg-base-100 text-sm p-4 rounded-md w-fit text-left m-auto text-base-content mt-4">
                  <code className="whitespace-pre-wrap">
                    <p>{chain?.envVariables}</p>
                  </code>
                </pre>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <p>Cost estimates here: to be implemented!</p>
        </div>

        <div className="mt-6 mb-6 mx-auto flex justify-center">
          <NavigateButton href="/deploy-steps/02-deploy-settings" text="Back" />

          <NavigateButton onClick={() => deploy()} text="Next" />
        </div>
      </div>
    </DeployStepsLayout>
  );
};

export default DeployPreviewPage;
