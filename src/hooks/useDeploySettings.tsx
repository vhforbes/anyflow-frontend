import { useDeployStepsContext } from "@/contexts/DeployStepsContext";
import { ChainWithSettings } from "@/interfaces/ChainSettingsInterface";
import api from "@/utils/axios";
import { useEffect, useState } from "react";

const useDeploySettings = () => {
  const [chanisList, setChainsList] = useState<ChainWithSettings[]>();

  const [selectedChains, setSelectedChains] = useState(
    [] as ChainWithSettings[]
  );

  const [globalEnvVariables, setGlobalEnvVariables] = useState("");

  const [verifyAllChecked, setVerifyAllChecked] = useState(false);

  const { setDeploySettingsStep } = useDeployStepsContext();

  const getAvailableChains = async () => {
    try {
      const { data: chainsResponse } = await api.get("/api/chains");

      if (chainsResponse.data) {
        console.log(chainsResponse.data);
        setChainsList(chainsResponse.data);
      }
    } catch (error) {}
  };

  const handleSelectAll = () => {
    if (!chanisList) return;

    if (chanisList.length === selectedChains.length) {
      setSelectedChains([]);
    } else {
      setSelectedChains([...chanisList]);
    }
  };

  const handleChainSelection = (chain_id: number) => {
    const alreadySelected = selectedChains.find(
      (item) => item.chain_id === chain_id
    );

    const selectedChainToAdd = chanisList?.filter(
      (chain) => chain.chain_id === chain_id
    )[0] as ChainWithSettings;

    if (!selectedChainToAdd) return;

    selectedChainToAdd.verifyContracts = verifyAllChecked;

    console.log(selectedChainToAdd);

    if (!alreadySelected && selectedChainToAdd) {
      setSelectedChains([...selectedChains, selectedChainToAdd]);
    }

    if (alreadySelected) {
      setSelectedChains(
        selectedChains.filter((chain) => chain.chain_id !== chain_id)
      );
    }
  };

  const handleSelectedChainSettingsChange = ({
    id,
    envValues,
    verifyContracts = false,
  }: {
    id: number;
    envValues?: string;
    verifyContracts?: boolean;
  }) => {
    const currentChainIndex = selectedChains.findIndex(
      (chain) => chain.id === id
    );
    const updatedChain = Object.assign({}, selectedChains[currentChainIndex]);

    if (envValues) updatedChain.envVariables = envValues;

    // Only changes the verify in case it changed
    if (verifyContracts !== updatedChain.verifyContracts) {
      updatedChain.verifyContracts = verifyContracts;
    }

    const updatedSelectChains = selectedChains.slice();
    updatedSelectChains[currentChainIndex] = updatedChain;

    setSelectedChains(updatedSelectChains);
  };

  const handlevalidateAllClick = () => {
    const newValidateAllChecked = !verifyAllChecked;

    setVerifyAllChecked(newValidateAllChecked);

    setSelectedChains(
      selectedChains.map((chain) => ({
        ...chain,
        verifyContracts: newValidateAllChecked,
      }))
    );
  };

  useEffect(() => {
    getAvailableChains();
  }, []);

  useEffect(() => {
    const allVerifyChecked = selectedChains.filter(
      (chain) => chain.verifyContracts
    );

    if (
      allVerifyChecked.length === selectedChains.length &&
      selectedChains.length
    ) {
      setVerifyAllChecked(true);
    }

    if (
      allVerifyChecked.length !== selectedChains.length &&
      selectedChains.length
    ) {
      setVerifyAllChecked(false);
    }

    setDeploySettingsStep({
      selectedChains,
      globalEnvVariables,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChains, globalEnvVariables]);

  return {
    chanisList,
    selectedChains,
    globalEnvVariables,
    setGlobalEnvVariables,
    verifyAllChecked,
    handlevalidateAllClick,
    handleSelectAll,
    handleChainSelection,
    handleSelectedChainSettingsChange,
  };
};

export default useDeploySettings;
