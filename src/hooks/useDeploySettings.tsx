import { useDeployStepsContext } from "@/contexts/DeployStepsContext";
import { ChainWithSettings } from "@/interfaces/ChainSettingsInterface";
import { useEffect, useState } from "react";
import {
  arbitrumSepolia,
  polygonAmoy,
  auroraTestnet,
  avalancheFuji,
  baseSepolia,
  bscTestnet,
  fantomTestnet,
  gnosisChiado,
  klaytnBaobab,
  mainnet,
  optimismSepolia,
  polygon,
  polygonMumbai,
  sepolia,
  zkSyncSepoliaTestnet,
  cronosTestnet,
  moonbeamDev,
} from "viem/chains";
import { estimateContractTotalGas } from "viem/op-stack";

const useDeploy = () => {
  const [chanisList, setChainsList] = useState([
    arbitrumSepolia,
    polygonAmoy,
    auroraTestnet,
    avalancheFuji,
    baseSepolia,
    bscTestnet,
    fantomTestnet,
    gnosisChiado,
    klaytnBaobab,
    mainnet,
    optimismSepolia,
    polygon,
    polygonMumbai,
    sepolia,
    zkSyncSepoliaTestnet,
    cronosTestnet,
    moonbeamDev,
  ]);

  const [selectedChains, setSelectedChains] = useState(
    [] as ChainWithSettings[]
  );

  const [globalEnvVariables, setGlobalEnvVariables] = useState("");

  const [verifyAllChecked, setVerifyAllChecked] = useState(false);

  const { setDeploySettingsStep } = useDeployStepsContext();

  const handleSelectAll = () => {
    if (chanisList.length === selectedChains.length) {
      setSelectedChains([]);
    } else {
      setSelectedChains([...chanisList]);
    }
  };

  const handleChainSelection = (id: number) => {
    const alreadySelected = selectedChains.find((item) => item.id === id);

    const selectedChainToAdd = chanisList.filter(
      (chain) => chain.id === id
    )[0] as ChainWithSettings;

    selectedChainToAdd.verifyContracts = verifyAllChecked;

    if (!alreadySelected && selectedChainToAdd) {
      setSelectedChains([...selectedChains, selectedChainToAdd]);
    }

    if (alreadySelected) {
      setSelectedChains(selectedChains.filter((chain) => chain.id !== id));
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

export default useDeploy;
