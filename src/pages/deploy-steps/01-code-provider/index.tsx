import Link from "next/link";

const CodeProviderPage = () => {
  return (
    <div className="text-center">
      <p>Select Repository</p>
      <button className="btn btn-secondary">
        <Link href="/deploy-steps/02-deploy-settings">
          Step 2 Deploy Settings
        </Link>
      </button>
    </div>
  );
};

export default CodeProviderPage;
