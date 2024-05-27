"use client";

import { useDeployments } from "@/hooks/useDeployments";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const DeploymentsPage = () => {
  const { deployments } = useDeployments();

  useEffect(() => {}, []);

  return (
    <div className="h-full mx-auto md:w-2/3 md:mt-40">
      <h1 className="text-2xl font-bold mb-8">Deployment History</h1>
      <table className="w-full">
        <thead>
          <tr className="border-b border-blue-8">
            <th className="text-left p-2 font-bold text-normal">
              Organization
            </th>
            <th className="text-left p-2 font-bold text-normal">
              Repository ID
            </th>
            <th className="text-left p-2 font-bold text-normal">Date</th>
            <th className="text-left p-2 font-bold text-normal">Status</th>
          </tr>
        </thead>

        <tbody>
          {deployments?.map((deployment) => (
            <tr
              key={deployment.id}
              className="w-full border-b-[1px] border-blue-6"
            >
              <td className="px-5 py-6">Name placeholder</td>
              <td>{deployment.repository_id}</td>
              <td>
                {new Date(deployment.created_at).toLocaleString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })}
              </td>
              <td>
                <div className="flex items-center h-full">
                  <span className="mr-2">{deployment.status} </span>
                  <Link href={`/deploy-steps/04-status/${deployment.id}`}>
                    <SquareArrowOutUpRight width={19} />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeploymentsPage;
