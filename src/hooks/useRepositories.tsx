import { useEffect, useState } from "react";
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
  }, [source, selectedBranch, selectedRepository]);

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

  const getOrganizations = async () => {
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
  };

  const getRepositories = async () => {
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
  };

  // Where and why i need the single repo data?
  // To select the branch!!
  // Use the same searcheable thing will be nice to look for branches
  const getSingleRepoData = async ({ id }: { id: number }) => {
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
  };

  const getSingleRepoConfigs = async ({ id }: { id: number }) => {
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
  };

  // Can this handle changes be abstracted into a single function?
  // This logic should be monstly inside hooks
  const handleRepositoryChange = async (targetId: number) => {
    const repositoryToSelect = await getSingleRepoData({ id: targetId });

    if (repositoryToSelect) {
      setSelectedRepository(repositoryToSelect.repository);
      setBranches(repositoryToSelect.branches);
      setSelectedBranch(repositoryToSelect.branches[0]);
    }
  };

  const handleOrganizationChange = (targetId: number) => {
    const organizationToSelect = organizations.find(
      (organization) => organization.id === targetId
    );

    if (organizationToSelect) setSelectedOrganization(organizationToSelect);
  };

  const handleBranchChange = (name: string) => {
    const branchToSelect = branches.find((branch) => branch.name === name);

    if (branchToSelect) setSelectedBranch(branchToSelect);
  };

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
