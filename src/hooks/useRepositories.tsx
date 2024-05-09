import { useCallback, useEffect, useState } from "react";
import useLoader from "./useLoader";
import { useAuthContext } from "@/contexts/AuthContext";
import api from "@/utils/axios";
import {
  Branch,
  Organization,
  Repository,
  RepositoryConfigs,
} from "@/interfaces/RepositoriesInterface";
import toast from "react-hot-toast";
import { useDeployStepsContext } from "@/contexts/DeployStepsContext";

interface RepositoryResponse {
  branches: Branch[];
  repository: Repository;
}

// Will this data need to be shared as a context? How many compoenents do we expect to see it?
const useRepositories = () => {
  const [organizations, setOrganizations] = useState([] as Organization[]);
  const [selectedOrganization, setSelectedOrganization] = useState(
    {} as Organization
  );
  const [repositories, setRepositories] = useState([] as Repository[]);
  const [selectedRepository, setSelectedRepository] = useState(
    {} as Repository
  );
  const [branches, setBranches] = useState([] as Branch[]);
  const [selectedBranch, setSelectedBranch] = useState({} as Branch);

  const [repositoryConfigs, setRepositoryConfigs] = useState(
    {} as RepositoryConfigs
  );

  const [source, setSource] = useState("");

  const [isHardhat, setIsHardhat] = useState(false);

  const { startLoading, stopLoading } = useLoader();
  const { userInfo } = useAuthContext();
  const { setCodeProviderStep } = useDeployStepsContext();

  const getOrganizations = useCallback(async () => {
    try {
      startLoading();
      const { data: organizationsResponse }: { data: Organization[] } =
        await api.get("/api/organizations");

      const personalOrganization = {
        id: 0,
        login: userInfo.name,
      };

      setOrganizations([personalOrganization, ...organizationsResponse]);

      setSelectedOrganization(personalOrganization);

      stopLoading();
    } catch (error) {
      console.error(error);
    }
  }, [startLoading, stopLoading, userInfo]);

  const getRepositories = useCallback(async () => {
    try {
      // Im not a fan of this if, dont know why
      if (selectedOrganization.id === 0) {
        const { data: repositoriesResponse } = await api.get(
          "/api/repositories"
        );

        setRepositories(repositoriesResponse);

        return;
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to fetch repositories");
    }
  }, [selectedOrganization]);

  const getSingleRepoData = useCallback(
    async ({ id }: { id: number }) => {
      try {
        startLoading();
        // Can this be a function that also acceps parameters?
        const { data: repository }: { data: RepositoryResponse } =
          await api.get(`/api/repositories/${id}`);

        stopLoading();
        return repository;
      } catch (error) {
        toast.error("Unable to fetch repository");
        console.error(error);
      }
    },
    [startLoading, stopLoading]
  );

  const getSingleRepoConfigs = useCallback(
    async ({ id }: { id: number }) => {
      try {
        startLoading();
        const params = {
          repositoryRoot: source,
          branch: selectedBranch.name,
        };

        const { data: repositoryConfigsResponse }: { data: RepositoryConfigs } =
          await api.get(
            `/api/repositories/${id}/configs?` + new URLSearchParams(params)
          );

        setRepositoryConfigs(repositoryConfigsResponse);

        const includesHardhat =
          repositoryConfigsResponse.framework &&
          repositoryConfigsResponse.framework.includes("hardhat");

        includesHardhat ? setIsHardhat(true) : setIsHardhat(false);

        stopLoading();
        return repositoryConfigsResponse;
      } catch (error) {
        toast.error("Unable to get repository");
        stopLoading();
      }
    },
    [source, selectedBranch, setIsHardhat, startLoading, stopLoading]
  );

  const handleRepositoryChange = useCallback(
    async (targetId: number) => {
      const repositoryToSelect = await getSingleRepoData({ id: targetId });

      if (repositoryToSelect) {
        setSelectedRepository(repositoryToSelect.repository);
        setBranches(repositoryToSelect.branches);
        setSelectedBranch(repositoryToSelect.branches[0]);
      }
    },
    [getSingleRepoData]
  );

  const handleOrganizationChange = useCallback(
    (targetId: number) => {
      const organizationToSelect = organizations.find(
        (organization) => organization.id === targetId
      );

      if (organizationToSelect) setSelectedOrganization(organizationToSelect);
    },
    [organizations]
  );

  const handleBranchChange = useCallback(
    (name: string) => {
      const branchToSelect = branches.find((branch) => branch.name === name);

      if (branchToSelect) setSelectedBranch(branchToSelect);
    },
    [branches]
  );

  useEffect(() => {
    if (Object.keys(userInfo).length) {
      getOrganizations();
    }
  }, [userInfo, getOrganizations]);

  useEffect(() => {
    getRepositories();
  }, [selectedOrganization, getRepositories]);

  useEffect(() => {
    if (selectedRepository.id)
      getSingleRepoConfigs({ id: selectedRepository.id });
  }, [source, selectedBranch, selectedRepository, getSingleRepoConfigs]);

  useEffect(() => {
    setCodeProviderStep({
      organization: selectedOrganization,
      repository: selectedRepository,
      branch: selectedBranch,
      repositoryConfigs: repositoryConfigs,
      source,
    });
  }, [
    selectedOrganization,
    selectedRepository,
    selectedBranch,
    repositoryConfigs,
    source,
    setCodeProviderStep,
  ]);

  return {
    organizations,
    selectedOrganization,
    repositories,
    selectedRepository,
    repositoryConfigs,
    branches,
    selectedBranch,
    source,
    setSource,
    isHardhat,
    setIsHardhat,

    // Api calls and handlers
    getOrganizations,
    getRepositories,
    getSingleRepoData,
    handleOrganizationChange,
    handleRepositoryChange,
    handleBranchChange,
  };
};

export default useRepositories;
