"use client";

import DynamicSearchBar from "@/components/03-organisms/DynamicSearchBar";
import DeployStepsLayout from "@/components/04-layouts/DeployStepsLayout";
import useGithub from "@/hooks/useGithub";
import Link from "next/link";

const CodeProviderPage = () => {
  const {
    organizations,
    repositories,
    handleOrganizationChange,
    handleRepositoryChange,
  } = useGithub();

  return (
    <DeployStepsLayout currentStep={1}>
      <div className="">
        <div>
          {organizations.length > 0 ? (
            <select
              className="select select-primary w-full max-w-xs"
              onChange={(e) =>
                handleOrganizationChange(parseInt(e.target.value))
              }
            >
              {organizations.map((organization) => (
                <option key={organization.id} value={organization.id}>
                  {organization.login}
                </option>
              ))}
            </select>
          ) : null}
        </div>

        <br />

        <div>
          <DynamicSearchBar
            data={repositories}
            setterCallback={(id) => handleRepositoryChange(id)}
          />
        </div>

        <div className="mt-10">
          <button className="btn btn-secondary" disabled>
            <Link href="/deploy-steps/02-deploy-settings ">
              Step 2 Deploy Settings
            </Link>
          </button>
        </div>
      </div>
    </DeployStepsLayout>
  );
};

export default CodeProviderPage;
