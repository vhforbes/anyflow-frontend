"use client";
import { useDeployStepsContext } from "@/contexts/DeployStepsContext";
import { useDeployStatus } from "@/hooks/useDeployStatus";
import Link from "next/link";
import { useEffect, useState } from "react";

const DeployStatusPage = ({ params }: { params: { id: string } }) => {
  const { deployment, getGeneralDeployment } = useDeployStatus();

  const [timeElapsed, setTimeElapsed] = useState();

  useEffect(() => {
    console.log(deployment);

    if (params.id) {
      getGeneralDeployment(parseInt(params.id));
    }
  }, []);

  if (!deployment) return null;

  return (
    <div className="flex flex-col items-center">
      <div className="text-center">
        <p>Deployment Details</p>
        <div className="">
          <p>Chains: </p>
          {deployment?.chain_deployments.map((chain) => (
            // CHANGE TO NAME  (VIEM or BACKEND ?)
            <p key={chain.id}>{chain.chain_id}</p>
          ))}
        </div>
        <br />
        <p>Status: {deployment?.status}</p>
        <p>Address: TBI (backend)</p>
        <p>Total gas cost: {deployment?.cost_usd}</p>
        <p>Time Elapsed: TBI (frontend)</p>
        <br />

        <p>Log:</p>
        <p className="border-2 mt-2 max-h-80 w-2/3 mx-auto overflow-y-auto">
          {deployment?.log}
        </p>
      </div>

      <hr className="boder-2 mt-10" />

      <p>Chains: </p>

      <div className="text-center">
        {deployment?.chain_deployments.map((chain) => (
          <div key={chain.chain_id}>
            <p className="text-2xl">{chain.chain_id} Log (replace with name)</p>
            <p>Status: {chain.status}</p>
            {/* Probally only works on a successfull deploy */}
            <p>Address: TBI (backend)</p>
            <p>
              Cost:{" "}
              {chain.cost_usd?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <p>Time Elapsed: TBI (frontend)</p>

            <p className="border-2 mt-2 max-h-80 w-2/3 mx-auto overflow-y-auto">
              {chain.log}
            </p>
          </div>
        ))}
      </div>

      {/* <button className="btn btn-secondary">
        <Link href="/deploy-steps/03-preview">
          Back
        </Link>
      </button> */}
    </div>
  );
};

export default DeployStatusPage;
