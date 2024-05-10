"use client";

import DeployStepsLayout from "@/components/04-layouts/DeployStepsLayout";
import { useDeployStepsContext } from "@/contexts/DeployStepsContext";
import Link from "next/link";

const DeployPreviewPage = () => {
  const { codeProviderStep, deploySettingsStep } = useDeployStepsContext();

  return (
    <DeployStepsLayout currentStep={3}>
      <div className="text-center">
        <h1 className="text-2xl">Preview your deployment</h1>

        <div className="border-2 w-fit m-auto p-4 rounded-lg mt-4">
          <p className="text-xl">Selected Repository</p>
          <p>Organization: {codeProviderStep.organization?.login}</p>
          <p>Branch: {codeProviderStep.branch?.name}</p>
          <p>Repository: {codeProviderStep.repository?.name}</p>
          {codeProviderStep.source ? (
            <p>Custom root: {codeProviderStep.source}</p>
          ) : null}
          <pre className="whitespace-pre-wrap">
            <code className="whitespace-pre-wrap">
              Framework: {codeProviderStep.repositoryConfigs?.framework}
            </code>
          </pre>
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
                <p>{chain?.id}</p>
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

        <button className="btn btn-secondary mt-4">
          <Link href="/deploy-steps/04-status">Step 4 Deploy!</Link>
        </button>
      </div>
    </DeployStepsLayout>
  );
};

export default DeployPreviewPage;
