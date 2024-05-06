"use client";

import useLoader from "@/hooks/useLoader";
import { useEffect } from "react";

const Loader = () => {
  const { isLoading } = useLoader();

  if (!isLoading) return null;

  return (
    <div className="flex items-center w-full h-full flex-grow absolute justify-center bg-base-300 bg-opacity-80 z-10">
      <div className="">Loading...</div>
    </div>
  );
};

export default Loader;
