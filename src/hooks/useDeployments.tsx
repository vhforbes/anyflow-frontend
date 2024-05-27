"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import api from "@/utils/axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useLoader from "./useLoader";

interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginatedDeployments {
  current_page: number;
  data: Deployment[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface Deployment {
  main: string | null;
  cost_usd: number | null;
  created_at: string;
  finished_at: string;
  framework: string;
  id: number;
  log: string;
  repository_id: number;
  root: string | null;
  started_at: string;
  status: string;
  updated_at: string;
  user_id: number;
}

export const useDeployments = () => {
  const { userInfo } = useAuthContext();
  const { startLoading, stopLoading } = useLoader();

  const [deployments, setDeployments] = useState<Deployment[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState<number>();

  const getUserDeployments = async () => {
    try {
      const queryParams = {
        page: currentPage,
      };

      startLoading();

      const { data: deploymentsResponse }: { data: PaginatedDeployments } =
        await api.get(`api/user/${userInfo?.id}/deployments`, {
          params: queryParams,
        });

      setCurrentPage(deploymentsResponse.current_page);
      setLastPage(deploymentsResponse.last_page);
      setDeployments(deploymentsResponse.data);
      stopLoading();
    } catch (error) {
      stopLoading();
      toast.error("Could not get deployments");
      console.error(error);
    }
  };

  useEffect(() => {
    if (userInfo) {
      getUserDeployments();
    }
  }, [userInfo, currentPage]);

  return { deployments, currentPage, setCurrentPage, lastPage };
};
