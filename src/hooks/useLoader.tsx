import { useLoaderContext } from "@/contexts/LoaderContext";

const useLoader = () => {
  const { isLoading, startLoading, stopLoading } = useLoaderContext();

  return {
    isLoading,
    startLoading,
    stopLoading,
  };
};

export default useLoader;
