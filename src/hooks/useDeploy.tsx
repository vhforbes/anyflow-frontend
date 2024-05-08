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
  Chain,
} from "viem/chains";

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

  const [selectedChains, setSelectedChains] = useState([
    arbitrumSepolia,
  ] as Chain[]);

  useEffect(() => {
    console.log(selectedChains);
  }, [selectedChains]);

  const handleChainCheckboxChange = (id: number) => {
    const alreadySelected = selectedChains.find((item) => item.id === id);
    const selectedChain = chanisList.filter((chain) => chain.id === id);

    if (!alreadySelected && selectedChain) {
      setSelectedChains([...selectedChains, selectedChain[0]]);
    }

    if (alreadySelected) {
      setSelectedChains(selectedChains.filter((chain) => chain.id !== id));
    }
  };

  const handleSelectAll = () => {
    if (chanisList.length === selectedChains.length) {
      setSelectedChains([]);
    } else {
      setSelectedChains([...chanisList]);
    }
  };

  return {
    chanisList,
    selectedChains,
    handleSelectAll,
    handleChainCheckboxChange,
  };
};

export default useDeploy;
