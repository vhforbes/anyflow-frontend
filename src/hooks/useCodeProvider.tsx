/* eslint-disable react-hooks/exhaustive-deps */
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

// [] Create a way to get existing parameters (if exists) from localtorage / state and fill it
const useCodeProvider = () => {
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

  const [root, setRoot] = useState("");

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
  }, [userInfo]);

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

  const getSingleRepoData = useCallback(async ({ id }: { id: number }) => {
    try {
      startLoading();
      // Can this be a function that also acceps parameters?
      const { data: repository }: { data: RepositoryResponse } = await api.get(
        `/api/repositories/${id}`
      );

      stopLoading();
      return repository;
    } catch (error) {
      toast.error("Unable to fetch repository");
      console.error(error);
    }
  }, []);

  const getSingleRepoConfigs = useCallback(
    async ({ id }: { id: number }) => {
      try {
        startLoading();
        const params = {
          repositoryRoot: root,
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
    [root, selectedBranch]
  );

  const handleRepositoryChange = useCallback(async (targetId: number) => {
    const repositoryToSelect = await getSingleRepoData({ id: targetId });

    if (repositoryToSelect) {
      setSelectedRepository(repositoryToSelect.repository);
      setBranches(repositoryToSelect.branches);
      setSelectedBranch(repositoryToSelect.branches[0]);
    }
  }, []);

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
  }, [userInfo]);

  useEffect(() => {
    getRepositories();
  }, [selectedOrganization]);

  useEffect(() => {
    if (selectedRepository.id)
      getSingleRepoConfigs({ id: selectedRepository.id });
  }, [root, selectedBranch, selectedRepository]);

  // Sets the shared state context
  useEffect(() => {
    setCodeProviderStep({
      organization: {
        id: selectedOrganization.id,
        login: selectedOrganization.login,
      },
      repository: {
        id: selectedRepository.id,
        name: selectedRepository.name,
      },
      branch: {
        name: selectedBranch.name,
      },
      repositoryConfigs: {
        framework: repositoryConfigs.framework,
        name: repositoryConfigs.name,
      },
      root,
    });
  }, [
    selectedOrganization,
    selectedRepository,
    selectedBranch,
    repositoryConfigs,
    root,
  ]);

  return {
    organizations,
    selectedOrganization,
    repositories,
    selectedRepository,
    repositoryConfigs,
    branches,
    selectedBranch,
    root,
    setRoot,
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

export default useCodeProvider;
