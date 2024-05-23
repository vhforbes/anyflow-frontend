"use client";
import DeployStepsLayout from "@/components/04-layouts/DeployStepsLayout";
import useDeploy from "@/hooks/useDeploySettings";
import { Chain } from "@/interfaces/ChainSettingsInterface";
import { NavigateButton } from "@/components/01-atoms/NavigateButton";
import { useDeployStepsContext } from "@/contexts/DeployStepsContext";
import { InputLabel } from "@/components/02-molecules/InputLabel";
import { MultiSelectDropdown } from "@/components/02-molecules/MultiSelectDropdown";
import { Checkbox } from "@/components/01-atoms/Checkbox";
import { Badge } from "@/components/ui/badge";
import GlobeIcon from "@/icons/misc/GlobeIcon";
import { Info } from "@/components/01-atoms/Info";

const DeploySettingsPage = () => {
  const {
    chanisList,
    selectedChains,
    verifyAllChecked,
    setGlobalEnvVariables,
    handleSelectAll,
    handlevalidateAllClick,
    handleChainSelection,
    handleSelectedChainSettingsChange,
  } = useDeploy();

  const { codeProviderStep } = useDeployStepsContext();

  const isSelected = (chain: Chain) => {
    const chainFound = selectedChains.find((item) => item.id === chain.id);

    if (chainFound) return true;

    return false;
  };

  if (!chanisList) return null;

  return (
    <DeployStepsLayout currentStep={2}>
      <div
        className="flex flex-col items-start justify-between md:w-2/3 max-w-screen-lg mx-auto
        border-[1px] rounded-lg border-blue-6 bg-blue-0 p-6"
      >
        <h1 className="text-2xl font-bold">Deployment settings</h1>

        <div className="text-random-2 mt-6 font-medium">
          <span className="mr-3 font-bold">Git repository selected:</span>
          <span className="mr-3">{codeProviderStep?.organization.login}</span>
          <span className="mr-3">{">"}</span>
          <span className="mr-3">
            {codeProviderStep?.repository.name} {">"}{" "}
          </span>
          <span className="mr-3">{">"}</span>
          <span className="mr-3">{codeProviderStep?.branch.name}</span>

          <span className="mr-3">
            {codeProviderStep?.root
              ? `${(<span>{">"}</span>)} ${codeProviderStep.root}`
              : null}
          </span>
        </div>

        <div className="w-full mt-6">
          <InputLabel label="Target Chains">
            <MultiSelectDropdown
              handleSelection={handleChainSelection}
              items={chanisList.map((chain) => ({
                id: chain.chain_id.toString(),
                value: chain.name,
                available: chain.is_available,
              }))}
            />
          </InputLabel>
        </div>

        <div className="flex items-center mt-6">
          <Checkbox
            clickHandler={handlevalidateAllClick}
            checked={verifyAllChecked}
            className="mr-2"
          />
          <p>
            Verify the contract`s source code in the scan of each blockchain
          </p>
        </div>

        {/* ENV VARIABLES SECTION  */}

        <div className="mt-10 w-full">
          <div className="flex items-center">
            <GlobeIcon className="w-4 mr-2" />
            <h2 className="text-xl font-bold mr-2">
              Global environment variables
            </h2>
            {/* Icon with modal here or hover */}
            <Info>
              <p>Variables that are defined for all chains</p>
            </Info>
          </div>

          <textarea
            onChange={(e) => setGlobalEnvVariables(e.target.value)}
            className="textarea textarea-bordered w-full h-28 bg-blue-0 mt-2"
            placeholder="This environment variables will be replicated across all chains"
          />
        </div>
      </div>

      {selectedChains.length > 0 ? (
        <div
          className="flex flex-col items-start justify-between md:w-2/3 max-w-screen-lg mx-auto mt-8
        border-[1px] rounded-lg border-warning-4 bg-blue-0 p-6"
        >
          <h1 className="text-xl font-bold">Chain settings</h1>

          {selectedChains.map((chain) => (
            <div className="mt-8 w-full" key={chain.chain_id}>
              <div className="flex items-center font-bold">
                <Badge className="mr-2" variant="white">
                  {chain.name}
                </Badge>{" "}
                {chain.name} environment variables
              </div>
              <textarea
                className="textarea textarea-bordered w-full h-28 bg-blue-0 mt-2"
                placeholder={`This environment variables will be replicated only across ${chain.name} `}
                onChange={(e) =>
                  handleSelectedChainSettingsChange({
                    id: chain.id,
                    envValues: e.target.value,
                  })
                }
              />
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-6 mb-6 mx-auto flex justify-center">
        <NavigateButton href="/deploy-steps/01-code-provider">
          Back
        </NavigateButton>

        <NavigateButton
          href="/deploy-steps/03-preview"
          disabled={selectedChains.length === 0}
          className="btn-primary"
        >
          Next
        </NavigateButton>
      </div>
    </DeployStepsLayout>
  );
};

export default DeploySettingsPage;
