"use client";
import { useDeployStepsContext } from "@/contexts/DeployStepsContext";
import { useDeployStatus } from "@/hooks/useDeployStatus";
import Link from "next/link";

const DeployStatusPage = () => {
  const { deployStatusStep } = useDeployStepsContext();
  const { getStatus } = useDeployStatus();

  return (
    <div className="text-center">
      <p>Deploy Status</p>
      {/* Now I need to organize the infos about the deploy status */}

      <p>ID: {deployStatusStep?.id}</p>
      <p>Status: {deployStatusStep?.status}</p>
      <br />
      <p>Log: {deployStatusStep?.log}</p>

      <button className="btn btn-secondary">
        <Link href="/deploy-steps/03-preview">
          Back
          {/* Can he go back to settings after deploy? */}
        </Link>
      </button>
    </div>
  );
};

export default DeployStatusPage;
