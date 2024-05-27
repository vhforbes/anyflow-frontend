"use client";
import { Info } from "@/components/01-atoms/Info";
import { CollapsibleComponent } from "@/components/03-organisms/CollapsableComponent";
import DeployStepsLayout from "@/components/04-layouts/DeployStepsLayout";
import { Badge } from "@/components/ui/badge";
import { useDeployStepsContext } from "@/contexts/DeployStepsContext";
import { useChains } from "@/hooks/useChains";
import { useDeployStatus } from "@/hooks/useDeployStatus";
import { useTimeElapsed } from "@/hooks/useTimeElapsed";
import { ChainWithSettings } from "@/interfaces/ChainSettingsInterface";
import {
  ChainDeployment,
  Deployment,
  DeploymentDetails,
} from "@/interfaces/DeploymentInterface";
import dayjs from "dayjs";
import { CircleAlert, CircleCheck, Globe } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const DeployStatusPage = ({ params }: { params: { id: string } }) => {
  const { deployment, getGeneralDeployment } = useDeployStatus();
  const { deploySettingsStep } = useDeployStepsContext();
  const { chanisList } = useChains();

  const { timeElapsed } = useTimeElapsed({
    createdAt: deployment?.created_at,
    finishedAt: deployment?.finished_at,
  });

  useEffect(() => {
    if (params.id) {
      getGeneralDeployment(parseInt(params.id));
    }
  }, [timeElapsed]);

  if (!deployment) return null;

  const getChainName = ({
    chainId,
    chains,
  }: {
    chainId: number;
    chains: ChainWithSettings[];
  }) => {
    const selectedChain = chains.find((chain) => chain.chain_id === chainId);

    if (!selectedChain) {
      return "";
    }

    return selectedChain?.name;
  };

  return (
    <DeployStepsLayout currentStep={5}>
      <div
        className="flex flex-col items-start justify-between md:w-2/3 max-w-screen-lg mx-auto
              border-[1px] rounded-lg border-blue-6 bg-blue-0 p-6 w-full"
      >
        <p className="text-2xl font-bold">Deployment Details</p>

        <p className="mt-6">Check the information below to deploy</p>

        <p className="text-xl font-bold mt-6">Selected repository</p>

        {/* first table */}
        <div className="border-[1px] border-blue-6 rounded-md w-full mt-5 bg-blue-2">
          <table className="w-full">
            <tbody>
              <tr className="w-full border-b-2 border-blue-6">
                <th className="ml-4 text-left font-normal px-5 py-6 w-1/3">
                  <div className="flex items-center">
                    <span className="mr-2">Chains</span>
                  </div>
                </th>
                <th className="text-left py-6 font-medium flex">
                  {deployment.chain_deployments?.map((selectedChain) => (
                    <div className="flex" key={selectedChain.chain_id}>
                      <Badge className="mr-2" variant="white">
                        {chanisList
                          ? getChainName({
                              chainId: selectedChain.chain_id,
                              chains: chanisList,
                            })
                          : null}
                      </Badge>
                    </div>
                  ))}
                </th>
              </tr>

              <tr className="w-full border-b-2 border-blue-6">
                <th className="ml-4 text-left font-normal px-5 py-6 w-1/3">
                  <div className="flex items-center">
                    <span className="mr-2">Status</span>
                  </div>
                </th>
                <th className="ml-6 text-left py-6 font-medium">
                  {deployment.status}
                </th>
              </tr>

              <tr className="w-full border-b-2 border-blue-6">
                <th className="ml-4 text-left font-normal px-5 py-6 w-1/3">
                  <div className="flex items-center">
                    <span className="mr-2">Address</span>
                  </div>
                </th>
                <th className="ml-6 text-left py-6 font-medium">Unknown TBI</th>
              </tr>

              <tr className="w-full border-b-2 border-blue-6">
                <th className="ml-4 text-left font-normal px-5 py-6 w-1/3">
                  <div className="flex items-center">
                    <span className="mr-2">Total gas cost</span>
                  </div>
                </th>
                <th className="flex text-left py-6 font-medium">
                  <span className="font-bold mr-2">US$ 30.96</span>
                  <Info>
                    <p>Estimated total gas cost</p>
                  </Info>
                </th>
              </tr>

              <tr className="w-full">
                <th className="ml-4 text-left font-normal px-5 py-6 w-1/3">
                  <div className="flex items-center">
                    <span className="mr-2">Time elapsed</span>
                  </div>
                </th>
                <th className="flex text-left py-6 font-medium">
                  {timeElapsed}
                </th>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-6 flex items-center text-xl font-bold">
          <Globe width={17} className="mr-2" /> Global Log
        </p>

        <div className="border-[1px] border-blue-6 rounded-md w-full mt-5 bg-blue-2 overflow-auto max-h-48 p-4">
          {deployment.log}
        </div>

        <p className="text-2xl font-bold my-6">Chain deployment Details</p>

        <div className="flex justify-between w-full mb-2">
          <p className="md:ml-6">Chain</p>
          <p className="md:mr-36">Status</p>
        </div>

        {deployment.chain_deployments.map((selectedChain) => (
          <CollapsibleComponent
            key={selectedChain.id}
            className="bg-blue-2 w-full border-[1px] border-blue-0"
            headerChildren={
              <div className="w-full h-20 flex items-center justify-between border-blue-0">
                <Badge variant={"white"}>
                  {chanisList
                    ? getChainName({
                        chainId: selectedChain.chain_id,
                        chains: chanisList,
                      })
                    : null}
                </Badge>
                <p>{deployment.status}</p>
              </div>
            }
            contentChildren={
              <div className="flex flex-col relative bg-blue-0">
                <ChainDetailsTable
                  chain={selectedChain}
                  deployment={deployment}
                />
                <p className="mb-2 font-bold">
                  {chanisList
                    ? getChainName({
                        chainId: selectedChain.chain_id,
                        chains: chanisList,
                      })
                    : null}{" "}
                  log
                </p>
                <div className="border-[1px] rounded-md p-3 max-h-48 overflow-auto mb-4">
                  {deployment.log}
                </div>
              </div>
            }
          />
        ))}
      </div>
    </DeployStepsLayout>
  );
};

const ChainDetailsTable = ({
  chain,
  deployment,
}: {
  chain: ChainDeployment;
  deployment: Deployment;
}) => (
  <div className="bg-blue-0 pb-3">
    <table className="w-full mt-3">
      <thead>
        <tr className="border-b border-blue-8 text-blue-8">
          <th className="text-left p-2 font-medium text-xs">Transaction</th>
          <th className="text-left p-2 font-medium text-xs">Cost</th>
          <th className="text-left p-2 font-medium text-xs">Contract name</th>
          <th className="text-left p-2 font-medium text-xs">Verified</th>
          <th className="text-left p-2 font-medium text-xs">Address</th>
        </tr>
      </thead>

      {deployment.chain_deployments.map((chainDeployment) => {
        if (chainDeployment.chain_id === chain.chain_id) {
          return chainDeployment.transactions.map((transaction) => (
            <tbody key={transaction.hash} className="">
              <tr className="border-b border-blue-8 mt-4">
                <td className="py-4 max-w-xs pr-16 break-all">
                  {transaction.hash}
                </td>
                <td className="p-2 py-4 ">
                  <div className="flex items-center">
                    <span className="mr-2">
                      {transaction.cost_usd.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </span>
                    <Info>
                      <p>Estimated total gas cost</p>
                    </Info>
                  </div>
                </td>
                <td className="p-2 py-4">
                  {transaction.contracts.map((contract) => (
                    <p key={contract.id} className="">
                      Name
                    </p>
                  ))}
                </td>
                <td className="p-2 py-4">
                  {transaction.contracts.map((contract) => (
                    // Not checking if is veryfied, need beckend
                    <CircleCheck
                      key={contract.id}
                      className="stroke-success-4"
                      width={13}
                    />
                    // <CircleAlert width={13} className="stroke-alert-4" />
                  ))}
                </td>
                <td className="p-2 py-4">
                  {transaction.contracts.map((contract) => (
                    <p key={contract.id} className="">
                      {contract.address}
                    </p>
                  ))}
                </td>
              </tr>
            </tbody>
          ));
        }

        return null;
      })}
    </table>
  </div>
);

export default DeployStatusPage;
