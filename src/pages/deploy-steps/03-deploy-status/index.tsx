import Link from "next/link";

const DeployStatusPage = () => {
  return (
    <div className="text-center">
      <p>Deploy Status</p>
      <button className="btn btn-secondary">
        <Link href="/deploy-steps/01-code-provider">
          Step 2 Deploy Settings
        </Link>
      </button>
    </div>
  );
};

export default DeployStatusPage;
