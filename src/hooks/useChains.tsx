import { ChainWithSettings } from "@/interfaces/ChainSettingsInterface";
import api from "@/utils/axios";
import { useEffect, useState } from "react";

export const useChains = () => {
  const [chanisList, setChainsList] = useState<ChainWithSettings[]>();

  const getAvailableChains = async () => {
    try {
      const { data: chainsResponse } = await api.get("/api/chains");

      if (chainsResponse.data) {
        setChainsList(chainsResponse.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAvailableChains();
  }, []);

  return { chanisList };
};
