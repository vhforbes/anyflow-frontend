import Link from "next/link";

const DeployStatusPage = () => {
  return (
    <div className="text-center">
      <p>Deploy Status</p>
      <button className="btn btn-secondary">
        <Link href="/deploy-steps/02-deploy-settings">
          Step 2 Deploy Settings
        </Link>
      </button>
    </div>
  );
};

export default DeployStatusPage;