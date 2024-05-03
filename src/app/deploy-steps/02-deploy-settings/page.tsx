import Link from "next/link";

const DeploySettingsPage = () => {
  return (
    <div className="text-center">
      <div className="flex justify-around">
        <button className="btn btn-secondary">
          <Link href="/deploy-steps/01-code-provider">
            Step 1 Code Provider
          </Link>
        </button>
        <p>Deploy Settings</p>
        <button className="btn btn-secondary">
          <Link href="/deploy-steps/03-deploy-status">
            Step 3 Deploy Status
          </Link>
        </button>
      </div>
    </div>
  );
};

export default DeploySettingsPage;
