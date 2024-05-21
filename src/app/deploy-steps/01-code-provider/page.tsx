"use client";
import { Checkbox } from "@/components/01-atoms/Checkbox";
import { Dropdown } from "@/components/01-atoms/Dropdown";
// Would be good to use server here and componentize all that uses hooks?

import DynamicSearchBar from "@/components/01-atoms/DynamicSearchBar";
import { NavigateButton } from "@/components/01-atoms/NavigateButton";
import { InputLabel } from "@/components/02-molecules/InputLabel";
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
          <div className="w-full mr-6 md:w-1/2">
            <InputLabel label="Organization">
              <Dropdown
                handleChange={(value) => handleRepositoryChange(value)}
                items={organizations.map((organization) => {
                  return {
                    id: organization.id.toString(),
                    value: organization.login,
                  };
                })}
              />
            </InputLabel>
          </div>
          <div className="w-full md:w-1/2">
            <InputLabel label="Repository">
              <DynamicSearchBar
                items={repositories?.map((repository) => {
                  return {
                    id: repository.id.toString(),
                    value: repository.name,
                  };
                })}
                placeholder="Search repository..."
                setOnClick={(id) => handleRepositoryChange(id)}
                disabled={organizations.length === 0}
              />
            </InputLabel>
          </div>
        </div>

        <div className="w-full mt-6">
          <Dropdown
            handleChange={(value) => handleBranchChange(value)}
            items={branches?.map((branch) => {
              return {
                id: branch.name,
                value: branch.name,
              };
            })}
          />
        </div>

        <div className="mt-6 self-start">
          {/* // THIS GUY ONLY WORKS WHEN CLICKING... */}
          <div className="flex">
            <Checkbox
              clickHandler={() => setCustomRoot(!customRoot)}
              checked={customRoot}
            />

            <p className="ml-2 text-sm">Custom root folder?</p>
          </div>
        </div>
        {customRoot ? (
          <div className="mt-6 w-full">
            <InputLabel label="Project Root">
              <DynamicSearchBar
                placeholder=""
                items={[
                  {
                    id: "/src",
                    value: "/src",
                  },
                  {
                    id: "/app",
                    value: "/app",
                  },
                ]}
                setOnChange={(name: string) => setRoot(name)}
              />
            </InputLabel>
            <p className="font-light">Leave empty if root is / </p>
          </div>
        ) : null}

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
      </div>
      <div className="mt-6 mb-6 mx-auto flex justify-center">
        <NavigateButton
          href="/deploy-steps/01-code-provider"
          text="Back"
          disabled
        />

        <NavigateButton
          href="/deploy-steps/02-deploy-settings"
          text="Next"
          disabled={!isHardhat}
          primary
        />
      </div>
    </DeployStepsLayout>
  );
};

export default CodeProviderPage;
