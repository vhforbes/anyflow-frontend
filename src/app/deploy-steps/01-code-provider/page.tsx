"use client";
import { Dropdown } from "@/components/01-atoms/Dropdown";
// Would be good to use server here and componentize all that uses hooks?

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
    setRoot,
    isHardhat,
    handleOrganizationChange,
    handleRepositoryChange,
    handleBranchChange,
  } = useCodeProvider();

  const [customRoot, setCustomRoot] = useState(false);

  if (!organizations) return null;

  return (
    <DeployStepsLayout currentStep={1}>
      <div
        className="flex flex-col items-center justify-between w-2/3 max-w-screen-lg mx-auto
        border-[1px] rounded-lg border-blue-6 bg-blue-0 p-6"
      >
        <div className="flex flex-col md:flex-row items-center justify-between w-full ">
          <div className="w-full md:w-1/2">
            <Dropdown
              handleChange={(value) => handleRepositoryChange(value)}
              items={organizations.map((organization) => {
                return {
                  id: organization.id.toString(),
                  value: organization.login,
                };
              })}
            />
          </div>
          <div className="w-full md:w-1/2">
            <DynamicSearchBar
              data={repositories}
              placeholder="Search repository..."
              setOnClick={(id) => handleRepositoryChange(id)}
              className={`${selectedRepository ? "border-primary" : null}`}
              disabled={organizations.length === 0}
            />
          </div>
        </div>

        <div className="min-w-64  mt-6">
          <select
            className={`select w-full ${
              selectedBranch ? "select-primary" : null
            }`}
            onChange={(e) => handleBranchChange(e.target.value)}
            disabled={branches?.length === 0}
          >
            {branches?.map((branch) => (
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
                setOnChange={(name: string) => setRoot(name)}
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
          <button
            className="btn btn-primary w-full"
            // disabled={!isHardhat}
          >
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
