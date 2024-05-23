"use client";

import { Info } from "@/components/01-atoms/Info";
import { NavigateButton } from "@/components/01-atoms/NavigateButton";
import { AlertDialogComponent } from "@/components/03-organisms/AlertDialogComponent";
import DeployStepsLayout from "@/components/04-layouts/DeployStepsLayout";
import { Badge } from "@/components/ui/badge";
import { useDeployStepsContext } from "@/contexts/DeployStepsContext";
import { useDeploy } from "@/hooks/useDeploy";
import { InfoIcon, RocketIcon } from "lucide-react";
import Link from "next/link";

const DeployPreviewPage = () => {
  const { codeProviderStep, deploySettingsStep } = useDeployStepsContext();
  const { deploy } = useDeploy();

  if (!codeProviderStep || !deploySettingsStep) return null;

  const selectedRepository = [
    {
      name: "Organization",
      value: codeProviderStep.organization.login,
    },
    {
      name: "Repository",
      value: codeProviderStep.repository.name,
    },
    {
      name: "Branch",
      value: codeProviderStep.branch.name,
    },
    {
      name: "Framework",
      value: codeProviderStep.repositoryConfigs.framework,
    },
  ];

  return (
    <DeployStepsLayout currentStep={3}>
      <div
        className="flex flex-col items-start justify-between md:w-2/3 max-w-screen-lg mx-auto
              border-[1px] rounded-lg border-blue-6 bg-blue-0 p-6"
      >
        <div className="flex justify-between w-full items-center">
          <h1 className="text-2xl font-bold">Deployment preview </h1>
          <div className="flex items-center">
            {/* To be implemented - no data yet */}
            <span className="text-blue-7 text-base mr-2">
              Total cost preview:
            </span>
            <span className="font-bold mr-2">US$ 30.96</span>
            <Info>
              <p>Estimated cost</p>
            </Info>
          </div>
        </div>

        <p className="mt-4">Check the information bellow to deploy</p>

        <p className="mt-4 text-xl font-bold">Selected repository</p>

        <div className="border-[1px] border-blue-6 rounded-md w-full mt-5">
          <table className="w-full">
            <tbody>
              {selectedRepository.map((item) => (
                <tr
                  key={item.value}
                  className="w-full border-b-[1px] border-blue-6"
                >
                  <th className="ml-4 text-left font-normal text-blue-8 px-5 py-6 w-1/3">
                    {item.name}
                  </th>
                  <th className="ml-6 text-left  py-6 font-medium">
                    {item.value}
                  </th>
                </tr>
              ))}
              <tr className="w-full">
                <th className="ml-4 text-left font-normal px-5 py-6 text-brand-6 w-1/3">
                  <div className="flex items-center">
                    <span className="mr-2">Global environment variables</span>
                    <Info>
                      <p>Variables that are defined for all chains</p>
                    </Info>
                  </div>
                </th>
                <th className="ml-6 text-left py-6 font-medium">
                  {deploySettingsStep.globalEnvVariables}
                </th>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-xl font-bold">Selected chains</p>

        {deploySettingsStep.selectedChains.map((chain) => (
          <div key={chain.name} className="w-full">
            <div className="mt-4 font-bold flex items-center">
              <Badge className="mr-2" variant={"white"}>
                {chain.name}
              </Badge>
              {chain.name} Preview
            </div>

            <div className="border-[1px] border-blue-6 rounded-md w-full mt-5">
              <table className="w-full">
                <tbody>
                  <tr className="w-full border-b-[1px] border-blue-6">
                    <th className="ml-4 text-left font-normal text-blue-8 px-5 py-6 w-1/3">
                      Estimated Cost
                    </th>
                    <th className="ml-6 text-left py-6 font-medium">TBI</th>
                  </tr>
                  <tr className="w-full border-b-[1px] border-blue-6">
                    <th className="ml-4 text-left font-normal text-blue-8 px-5 py-6 w-1/3">
                      Verify Scan Code
                    </th>
                    <th className="ml-6 text-left py-6 font-medium">
                      {chain.verifyContracts ? " verify" : "dont verify"}
                    </th>
                  </tr>

                  <tr className="w-full border-b-[1px] border-blue-6">
                    <th className="ml-4 text-left font-normal text-blue-8 px-5 py-6 w-1/3">
                      Environment variables
                    </th>
                    <th className="ml-6 text-left py-6 font-medium">
                      {chain.envVariables}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 mb-6 mx-auto flex justify-center">
        <NavigateButton href="/deploy-steps/02-deploy-settings">
          Back
        </NavigateButton>

        <AlertDialogComponent onClick={() => deploy()}>
          <NavigateButton primary>
            <div className="flex items-center">
              <RocketIcon width={17} strokeWidth={3} />
              <p className="font-bold ml-1">That`s it!</p>
            </div>
          </NavigateButton>
        </AlertDialogComponent>
      </div>
    </DeployStepsLayout>
  );
};

export default DeployPreviewPage;
