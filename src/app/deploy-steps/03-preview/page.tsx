import Link from "next/link";

const DeployPreviewPage = () => {
  return (
    <div className="text-center">
      <p>Deploy Status</p>
      <button className="btn btn-secondary">
        <Link href="/deploy-steps/04-status">Step 4 Deploy Settings</Link>
      </button>
    </div>
  );
};

export default DeployPreviewPage;
