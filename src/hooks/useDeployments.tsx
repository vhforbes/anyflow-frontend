"use client";
import { Info } from "@/components/01-atoms/Info";
import { useAuthContext } from "@/contexts/AuthContext";
import api from "@/utils/axios";
import { useEffect, useState } from "react";

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
  const [deployments, setDeployments] = useState<Deployment[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [hasPrevious, setHasPrevious] = useState();

  const getUserDeployments = async () => {
    const queryParams = {
      page: currentPage,
    };

    const { data: deploymentsResponse }: { data: PaginatedDeployments } =
      await api.get(`api/user/${userInfo?.id}/deployments`, {
        params: queryParams,
      });

    setDeployments(deploymentsResponse.data);
  };

  useEffect(() => {
    if (userInfo) {
      getUserDeployments();
    }
  }, [userInfo]);

  return { deployments };
};
