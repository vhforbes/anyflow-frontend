"use client";

import DynamicSearchBar from "@/components/03-organisms/DynamicSearchBar";
import DeployStepsLayout from "@/components/04-layouts/DeployStepsLayout";
import useCodeProvider from "@/hooks/useCodeProvider";
import Link from "next/link";
import { useState } from "react";

const CodeProviderPage = () => {
  const {
    organizations,
    selectedOrganization,
    repositories,
    branches,
    selectedBranch,
    selectedRepository,
    setSource,
    isHardhat,
    handleOrganizationChange,
    handleRepositoryChange,
    handleBranchChange,
  } = useCodeProvider();

  const [customRoot, setCustomRoot] = useState(false);

  return (
    <DeployStepsLayout currentStep={1}>
      <div className="flex flex-col items-center justify-between">
        <div>
          <select
            className={`select min-w-64 ${
              selectedOrganization ? "border-primary" : null
            }`}
            onChange={(e) => handleOrganizationChange(parseInt(e.target.value))}
            disabled={organizations.length === 0}
          >
            {organizations.map((organization) => (
              <option key={organization.id} value={organization.id}>
                {organization.login}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-64 mt-6">
          <DynamicSearchBar
            data={repositories}
            placeholder="Search repository..."
            setOnClick={(id) => handleRepositoryChange(id)}
            className={`${
              Object.keys(selectedRepository).length > 0
                ? "border-primary"
                : null
            }`}
            disabled={organizations.length === 0}
          />
        </div>

        <div className="min-w-64  mt-6">
          <select
            className={`select w-full ${
              selectedBranch ? "select-primary" : null
            }`}
            onChange={(e) => handleBranchChange(e.target.value)}
            disabled={branches.length === 0}
          >
            {branches.map((branch) => (
              <option key={branch.name} value={branch.name}>
                {branch.name}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-64 mt-6">
          {/* // THIS GUY ONLY WORKS WHEN CLICKING... */}
          <div className="flex">
            <p className="mr-6">Custom root folder?</p>
            <input
              type="checkbox"
              className="checkbox"
              onClick={() => setCustomRoot(!customRoot)}
            />
          </div>

          {customRoot ? (
            <div className="mt-6">
              <DynamicSearchBar
                placeholder="Project Root"
                data={[
                  {
                    id: "/src",
                    name: "/src",
                  },
                  {
                    id: "/app",
                    name: "/app",
                  },
                ]}
                setOnChange={(name: string) => setSource(name)}
              />
              <p className="font-light">Leave empty if root is / </p>
            </div>
          ) : null}
        </div>

        <div className="text-center text-base-300 font-extrabold  mt-6">
          {isHardhat ? (
            <div className="min-w-64 bg-primary  p-4">
              <p>Hardhat Detected!</p>
            </div>
          ) : (
            <div className="min-w-64 bg-warning  p-4">
              <p>Hardhat Not Found!</p>
            </div>
          )}
        </div>

        <div className="min-w-64  mt-6 mb-6">
          <button className="btn btn-secondary w-full" disabled={!isHardhat}>
            <Link href="/deploy-steps/02-deploy-settings ">
              Step 2: Deploy Settings
            </Link>
          </button>
        </div>
      </div>
    </DeployStepsLayout>
  );
};

export default CodeProviderPage;
