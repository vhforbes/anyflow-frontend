"use client";
import DeployStepsLayout from "@/components/04-layouts/DeployStepsLayout";
import useDeploy from "@/hooks/useDeploy";
import Link from "next/link";
import { Chain } from "viem";
import { ArrowLeft, ArrowRight } from "@/components/icons/ArrowsIcons";

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

  const isSelected = (chain: Chain) => {
    const chainFound = selectedChains.find((item) => item.id === chain.id);

    if (chainFound) return true;

    return false;
  };

  return (
    <DeployStepsLayout currentStep={2}>
      <div className="flex flex-col m-auto p-2 md:p-8">
        <div className="max-w-4xl m-auto">
          <p className="text-xl font-bold">
            Select the chains where you want to deploy
          </p>
          <div
            className={`flex items-center font-bold text-xl justify-center mr-2 mt-2 border-neutral border-2 p-2 bg-base-100 bg-opacity-50 cursor-pointer hover:bg-base-200 ${
              chanisList.length === selectedChains.length
                ? "bg-base-300 bg-opacity-80"
                : ""
            }`}
            onClick={handleSelectAll}
          >
            <p className="mr-2">Select All</p>
            <input
              type="checkbox"
              className="checkbox checked:checkbox-primary"
              onChange={handleSelectAll}
              checked={chanisList.length === selectedChains.length}
            />
          </div>

          {/* CHAINS LIST SELECTOR */}
          <div className="flex flex-wrap items-stretch">
            {chanisList.map((chain) => (
              <div
                key={chain.id}
                className={`flex flex-grow justify-between mr-2 mt-2 border-neutral border-2 p-2 bg-base-100 bg-opacity-50 cursor-pointer hover:bg-opacity-90
                ${isSelected(chain) ? "bg-base-300" : "bg-opacity-80"}`}
                onClick={() => handleChainSelection(chain.id)}
              >
                <div className="flex mr-2 items-center">
                  <p className="mr-2">{chain.name}</p>
                  <p className="font-extralight text-xs">({chain.id})</p>
                </div>

                <input
                  type="checkbox"
                  className="checkbox checked:checkbox-primary"
                  onChange={() => handleChainSelection(chain.id)}
                  checked={isSelected(chain)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ENV VARIABLES SECTION  */}

        <div className="mt-10">
          <h2 className="text-2xl font-bold text-center">
            Define your custom settings:
          </h2>

          <div
            tabIndex={0}
            className="collapse collapse-arrow bg-base-100 max-w-md h-fit m-auto mt-4"
          >
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              Global environment variables
            </div>
            <div className="collapse-content h-fit">
              <textarea
                onChange={(e) => setGlobalEnvVariables(e.target.value)}
                className="textarea textarea-bordered w-full h-56"
              />
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <input
              type="checkbox"
              className="checkbox mr-2"
              checked={verifyAllChecked}
              onChange={handlevalidateAllClick}
            />
            <p>Verify all contracts source code: </p>
          </div>

          {/* 
          
            IF THIS IS SELECTED WHEN USER ADD NEW CONTRACT IT WILL COME DEFAULT TRUE
            IF NOT SELETEC THE DEFAULT WILL BE FALSE
            
            WHEN USER CLICKS AND NOT CHECKED WILL SELECT ALL CONTRACTS

            OTHERWISE WILL CLEAR ALL VERIFYS

            */}

          {selectedChains.length > 0 ? (
            <h2 className="text-xl font-bold text-center mt-4">
              Chain specific Variables:
            </h2>
          ) : null}

          <div className="flex flex-wrap justify-center">
            {selectedChains.map((chain) => (
              <div
                tabIndex={chain.id}
                key={chain.name}
                className="collapse collapse-arrow bg-base-100 max-w-md h-fit mr-4 mt-4"
              >
                <input type="checkbox" value={chain.name} />
                <div className="collapse-title text-xl font-medium">
                  {chain.name}
                </div>
                <div className="collapse-content">
                  <textarea
                    className="textarea textarea-bordered w-full h-36"
                    placeholder="ENV_NAME=VALUE"
                    onChange={(e) =>
                      handleSelectedChainSettingsChange({
                        id: chain.id,
                        envValues: e.target.value,
                      })
                    }
                  />
                  <div className="flex justify-center mt-4">
                    <input
                      type="checkbox"
                      className="checkbox mr-2"
                      checked={chain.verifyContracts}
                      onChange={(e) =>
                        handleSelectedChainSettingsChange({
                          id: chain.id,
                          verifyContracts: e.target.checked,
                        })
                      }
                    />
                    <p>Verify contracts source code</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BUTTONS SECTION
        
            COMPONENTIZE THIS GUY

        */}
        <div className="flex justify-between mt-10 w-full max-w-2xl m-auto">
          <button className="flex justify-between btn btn-sm md:btn-md">
            <ArrowLeft />
            <Link href="/deploy-steps/01-code-provider">Code Provider</Link>
          </button>

          <button className="btn btn-sm md:btn-md">
            <Link href="/deploy-steps/03-deploy-status">Deploy Status</Link>
            <ArrowRight />
          </button>
        </div>
      </div>
    </DeployStepsLayout>
  );
};

export default DeploySettingsPage;
